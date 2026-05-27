/**
 * Sanity → Next.js cache-invalidation webhook.
 *
 * When an editor publishes a change in Studio, Sanity POSTs to this
 * endpoint with the `_type` of the affected document. We map that to
 * the cache tags used by the GROQ fetch wrappers (see
 * `sanity/lib/events.ts` etc.) and call `revalidateTag()` so the next
 * request rebuilds from fresh data.
 *
 * Configuration:
 *  1. In Sanity manage UI → GROQ webhooks → Create webhook
 *     - URL: https://moveandmeditate.in/api/revalidate
 *     - Trigger on: Create, Update, Delete
 *     - Filter: `_type in ["event","testimonial","founderProfile","siteSettings"]`
 *     - Secret: a long random string — paste the same value into the
 *       SANITY_REVALIDATE_SECRET env var (locally + Vercel)
 *     - Projection: `{ _type, _id }`
 *  2. Vercel env var SANITY_REVALIDATE_SECRET must match.
 *
 * Security: we verify the `sanity-webhook-signature` header against the
 * shared secret. Unsigned / wrong-signature requests get a 401.
 */
import { updateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env";

// Map document `_type` → the cache tag(s) it invalidates. Keep in sync
// with `next: { tags: [...] }` in the GROQ fetch wrappers.
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

  // Next.js 16 split the cache-invalidation API: `updateTag(tag)` is the
  // on-demand call usable from route handlers (the old `revalidateTag`
  // now requires a CacheLifeConfig profile and is Server-Action-only).
  for (const tag of tags) updateTag(tag);

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
