/**
 * One-shot clean-out for the live Sanity dataset.
 *
 *   pnpm tsx scripts/clear-sanity.ts
 *
 * Deletes every document we own — siteSettings, founderProfile, event,
 * testimonial, videoTestimonial, brand, blogPost, author — across both
 * published and `drafts.*` rows. Image assets are deliberately left in
 * place: they're paid storage we may want to re-link to, and Sanity's
 * `delete` doesn't remove assets when the only referencing doc dies
 * (you'd see an unreferenced-asset warning, not a real cleanup).
 *
 * After this runs, the site's static fallbacks in `lib/content.ts` (and
 * the `getEffective*` adapters in `sanity/lib/site-data.ts`) keep every
 * page rendering. The client can then re-populate via /studio at their
 * own pace; each populated doc transparently takes over the corresponding
 * fallback.
 *
 * Requires `SANITY_API_WRITE_TOKEN` (Editor or stronger) in `.env.local`.
 */
import { getSanityWriteClient } from "./lib/sanity-write-client";

// Order matters: docs are deleted in the order listed. `blogPost`
// references `author` so we drop posts first to avoid dangling-ref
// validation errors that block the author delete.
const TYPES_IN_DELETE_ORDER = [
  "blogPost",
  "author",
  "videoTestimonial",
  "testimonial",
  "brand",
  "event",
  "founderProfile",
  "siteSettings",
] as const;

async function deleteAllOf(type: string): Promise<number> {
  const client = getSanityWriteClient();
  // Fetch ids first so we can log what's about to be removed. Sanity
  // permits `delete({ query })` directly but we want a deterministic
  // count for the log.
  const ids = await client.fetch<string[]>(
    `*[_type == $type]._id`,
    { type }
  );
  if (ids.length === 0) {
    console.log(`[clear] ${type}: nothing to delete.`);
    return 0;
  }
  console.log(`[clear] ${type}: deleting ${ids.length} doc${ids.length === 1 ? "" : "s"}`);
  // Chunk into reasonable batches (transaction tx mutation has a soft
  // limit per request — 50 per batch is comfortably under).
  const CHUNK = 50;
  let removed = 0;
  for (let i = 0; i < ids.length; i += CHUNK) {
    const tx = client.transaction();
    for (const id of ids.slice(i, i + CHUNK)) {
      tx.delete(id);
    }
    await tx.commit({ visibility: "async" });
    removed += Math.min(CHUNK, ids.length - i);
  }
  return removed;
}

async function main() {
  console.log("[clear] Wiping Sanity dataset. Assets are preserved.");
  let total = 0;
  for (const type of TYPES_IN_DELETE_ORDER) {
    total += await deleteAllOf(type);
  }
  console.log(`[clear] Done. Removed ${total} document${total === 1 ? "" : "s"}.`);
  console.log(
    "[clear] Live site now serves entirely from the static fallbacks " +
      "(lib/content.ts). The client can repopulate at /studio when ready."
  );
}

main().catch((err) => {
  console.error("[clear] Failed:", err);
  process.exit(1);
});
