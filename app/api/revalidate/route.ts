/**
 * Sanity → Next.js cache-invalidation webhook.
 *
 * When an editor publishes a change in Studio, Sanity POSTs to this
 * endpoint. We map the affected document `_type` to the routes that
 * consume it and call `revalidatePath()` so the next request rebuilds
 * from fresh data.
 *
 * Why `revalidatePath` (not `revalidateTag` / `updateTag`)?
 *   - Next.js 16 restricts BOTH `revalidateTag(tag, profile)` and
 *     `updateTag(tag)` to Server-Action contexts. They throw
 *     `"updateTag can only be called from within a Server Action"`
 *     when called from a route handler — which is what this webhook
 *     is. `revalidatePath` still works from route handlers and gives
 *     us per-route granularity, which is enough here.
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
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env";

type RevalidationTarget = { path: string; type?: "page" | "layout" };

/**
 * Map document `_type` → the routes that need to refresh.
 *
 * `type: "layout"` revalidates the route segment AND every child route
 * that shares the layout — useful for siteSettings which feeds
 * <SiteHeader>/<SiteFooter>/<MobileCtaBar> across every page.
 */
const TYPE_TO_PATHS: Record<string, RevalidationTarget[]> = {
  // Site settings (email/whatsapp/socials/cal URL) is consumed by the
  // root layout, header, footer, mobile bar, contact section and pillar
  // CTAs — `layout` revalidation covers the whole tree in one call.
  siteSettings: [{ path: "/", type: "layout" }],
  // Founder section + JSON-LD on `/` only.
  founderProfile: [{ path: "/" }],
  // Events show on `/` and on the Dance + Yoga pillar pages.
  event: [
    { path: "/" },
    { path: "/dance" },
    { path: "/yoga" },
  ],
  // Testimonials show on `/` and every pillar page (each pillar page
  // filters by tagged pillar).
  testimonial: [
    { path: "/" },
    { path: "/dance" },
    { path: "/yoga" },
    { path: "/weddings" },
    { path: "/corporate" },
  ],
  // Trusted-by strip only renders on `/`.
  brand: [{ path: "/" }],
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

  const targets = TYPE_TO_PATHS[body._type];
  if (!targets) {
    // Unknown doc type — not an error, just nothing to invalidate.
    return NextResponse.json({ ok: true, revalidated: [] });
  }

  for (const target of targets) {
    revalidatePath(target.path, target.type);
  }

  // Surface in Vercel logs so we can confirm webhook deliveries when
  // editors report stale content. Cheap, no third-party dependency.
  const revalidated = targets.map((t) =>
    t.type ? `${t.path}[${t.type}]` : t.path
  );
  console.log(
    `[sanity-webhook] revalidated=${revalidated.join(",")} type=${body._type} id=${body._id ?? "?"}`
  );

  return NextResponse.json({
    ok: true,
    revalidated,
    type: body._type,
    id: body._id,
  });
}
