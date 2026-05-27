/**
 * Sanity → Next.js cache-invalidation webhook.
 *
 * When an editor publishes a change in Studio, Sanity POSTs to this
 * endpoint. We map the affected document `_type` to the cache tags
 * used by the GROQ fetch wrappers (see `sanity/lib/site-data.ts` and
 * `sanity/lib/events.ts`) and call `revalidateTag` so the next request
 * re-fetches from Sanity.
 *
 * Why `revalidateTag(tag, { expire: 0 })`:
 *   Next.js 16 split the cache APIs. For webhooks (route handlers
 *   invoked by external systems), official docs prescribe:
 *
 *     "For webhooks or third-party services that need immediate
 *      expiration, you can pass `{ expire: 0 }` as the second
 *      argument: revalidateTag(tag, { expire: 0 }). This pattern is
 *      necessary when external systems call your Route Handlers and
 *      require data to expire immediately."
 *
 *     — https://nextjs.org/docs/app/api-reference/functions/revalidateTag
 *
 *   `updateTag` is Server-Action-only (throws "updateTag can only be
 *   called from within a Server Action" from any other context,
 *   including modules with the `"use server"` directive when invoked
 *   from a Route Handler).
 *
 *   `revalidateTag(tag, 'max')` is stale-while-revalidate (slight delay
 *   acceptable). For an editor publishing a change, the next visitor
 *   should see fresh content immediately, hence `{ expire: 0 }`.
 *
 * Why tags (not `revalidatePath`):
 *   The GROQ fetch wrappers cache with `next: { tags: [...] }`.
 *   `revalidatePath` clears the route HTML cache but leaves the
 *   underlying fetch data cache hot — next render reuses the stale
 *   Sanity response.
 *
 * Configuration (Sanity manage UI → API → GROQ webhooks):
 *   - URL: https://<prod-domain>/api/revalidate
 *   - Trigger on: Create + Update + Delete
 *   - Filter: `_type in ["event","testimonial","founderProfile","siteSettings","brand"]`
 *   - Projection: `{ _type, _id }`
 *   - Secret: long random string — paste same value into the
 *     SANITY_REVALIDATE_SECRET env var on Vercel
 *
 * Security: signature verified via `parseBody` from next-sanity/webhook
 * against the shared secret. Unsigned / wrong-signature requests get a
 * 401.
 */
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env";

/**
 * Map document `_type` → the cache tags used by the GROQ fetch
 * wrappers. Keep in sync with `next: { tags: [...] }` in
 * `sanity/lib/site-data.ts` + `sanity/lib/events.ts`.
 */
const TYPE_TO_TAGS: Record<string, string[]> = {
  event: ["events"],
  testimonial: ["testimonials"],
  founderProfile: ["founderProfile"],
  siteSettings: ["siteSettings"],
  brand: ["brands"],
  blogPost: ["blog"],
  author: ["blog", "author"],
};

export async function POST(req: NextRequest) {
  if (!revalidateSecret) {
    return NextResponse.json(
      { ok: false, error: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 }
    );
  }

  // `parseBody` from next-sanity validates the Sanity webhook signature
  // for us and returns the parsed payload (or `isValidSignature: false`
  // when the secret doesn't match).
  const { isValidSignature, body } = await parseBody<{
    _type?: string;
    _id?: string;
  }>(req, revalidateSecret);

  if (!isValidSignature) {
    return NextResponse.json(
      { ok: false, error: "Invalid signature" },
      { status: 401 }
    );
  }
  if (!body?._type) {
    return NextResponse.json(
      { ok: false, error: "Missing _type in payload" },
      { status: 400 }
    );
  }

  const tags = TYPE_TO_TAGS[body._type];
  if (!tags) {
    // Unknown doc type — not an error, just nothing to invalidate.
    return NextResponse.json({ ok: true, revalidated: [] });
  }

  // `{ expire: 0 }` = immediate cache expiry. Per official Next.js 16
  // docs, this is the prescribed pattern for webhook-triggered
  // invalidations where the next visitor must see fresh data.
  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  // Surface in Vercel logs so we can confirm webhook deliveries when
  // editors report stale content. Cheap, no third-party dependency.
  console.log(
    `[sanity-webhook] revalidated tags=${tags.join(",")} type=${body._type} id=${body._id ?? "?"}`
  );

  return NextResponse.json({
    ok: true,
    revalidated: tags,
    type: body._type,
    id: body._id,
  });
}
