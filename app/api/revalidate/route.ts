/**
 * Sanity → Next.js cache-invalidation webhook.
 *
 * When an editor publishes a change in Studio, Sanity POSTs to this
 * endpoint. We map the affected document `_type` to the cache tags
 * used by the GROQ fetch wrappers in `sanity/lib/site-data.ts` and
 * `sanity/lib/events.ts`, then call the `invalidateCmsTags` Server
 * Action so the next request re-fetches from Sanity.
 *
 * Why a Server Action wrapper (not a direct `revalidateTag` call)?
 *   Next.js 16 throws "updateTag can only be called from within a
 *   Server Action" when cache-invalidation APIs are called from a
 *   Route Handler. The `"use server"` directive in lib/cms-revalidate.ts
 *   promotes the invalidation into the right runtime context.
 *
 * Why tags (not paths): `revalidatePath` clears the route HTML cache
 * but leaves the underlying tagged `fetch()` data cache hot — next
 * render reuses the stale Sanity response. Tag invalidation busts the
 * right layer.
 *
 * Configuration (in Sanity manage UI → API → GROQ webhooks):
 *   - URL: https://<prod-domain>/api/revalidate
 *   - Trigger on: Create + Update + Delete
 *   - Filter: `_type in ["event","testimonial","founderProfile","siteSettings","brand"]`
 *   - Projection: `{ _type, _id }`
 *   - Secret: long random string — paste same value into the
 *     SANITY_REVALIDATE_SECRET env var on Vercel
 *
 * Security: we verify the `sanity-webhook-signature` header against the
 * shared secret. Unsigned / wrong-signature requests get a 401.
 */
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { invalidateCmsTags } from "@/lib/cms-revalidate";
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

  await invalidateCmsTags(tags);

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
