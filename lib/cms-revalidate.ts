"use server";

import { revalidateTag } from "next/cache";

/**
 * Server Action that invalidates cache tags. Wrapped in `"use server"`
 * because Next.js 16 narrowed both `revalidateTag` and `updateTag` to
 * contexts that have a Server Action / Server Component request scope
 * — calling them directly from a Route Handler throws
 * `"updateTag can only be called from within a Server Action."`
 *
 * The Sanity webhook (`app/api/revalidate/route.ts`) imports + awaits
 * this function instead of calling `revalidateTag` itself. The "use
 * server" directive promotes the call site into Server-Action context
 * even though the caller is a Route Handler.
 *
 * Why tag-level (not path-level): the GROQ fetch wrappers in
 * `sanity/lib/site-data.ts` cache with `next: { tags: [...] }`. Purging
 * the route cache via `revalidatePath` leaves the fetch cache hot, so
 * the next render re-uses the stale Sanity response. Tag invalidation
 * busts the right layer.
 */
export async function invalidateCmsTags(tags: string[]): Promise<void> {
  for (const tag of tags) {
    // `'default'` is the standard CacheLifeConfig profile shipped with
    // Next.js 16. Use the same profile across all CMS invalidations so
    // cache behavior stays uniform.
    revalidateTag(tag, "default");
  }
}
