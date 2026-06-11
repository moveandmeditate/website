/**
 * One-shot patch for the singleton `siteSettings` Sanity document.
 *
 *   pnpm tsx scripts/patch-site-settings.ts
 *
 * Why this exists: the CMS-side email + instagram URL drifted away from
 * the canonical values in `lib/content.ts → CONTACT`. Because
 * `getEffectiveContact()` prefers Sanity values whenever they're set,
 * the live site was rendering the old gmail / instagram even after the
 * fallback was corrected in code.
 *
 * This script fetches the live `siteSettings` document and re-pins every
 * CMS-customisable contact field to the canonical fallback in
 * `lib/content.ts`. It's idempotent — running it twice is a no-op once
 * the values match.
 *
 * Requires `SANITY_API_WRITE_TOKEN` (Editor scope) in `.env.local`.
 */
import { getSanityWriteClient } from "./lib/sanity-write-client";
import { CONTACT } from "../lib/content";

type SiteSettingsLite = {
  _id: string;
  email?: string;
  whatsappCommunity?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
};

async function main() {
  const client = getSanityWriteClient();

  const doc = await client.fetch<SiteSettingsLite | null>(
    `*[_type == "siteSettings"][0]{ _id, email, whatsappCommunity, instagram, youtube, facebook }`
  );

  if (!doc) {
    console.log(
      "[patch] No siteSettings document found in Sanity — nothing to patch. The static fallback in lib/content.ts is already authoritative."
    );
    return;
  }

  const target = {
    email: CONTACT.email,
    whatsappCommunity: CONTACT.whatsappCommunityUrl,
    instagram: CONTACT.socials.instagram,
    youtube: CONTACT.socials.youtube,
    facebook: CONTACT.socials.facebook,
  };

  const drift: string[] = [];
  for (const [key, want] of Object.entries(target) as [
    keyof typeof target,
    string
  ][]) {
    const have = doc[key];
    if (have !== want) drift.push(`${key}: "${have ?? ""}" -> "${want}"`);
  }

  if (drift.length === 0) {
    console.log("[patch] siteSettings already matches CONTACT. No changes.");
    return;
  }

  console.log(`[patch] Patching siteSettings (${doc._id}):`);
  for (const line of drift) console.log(`  ${line}`);

  await client.patch(doc._id).set(target).commit();
  console.log("[patch] Done. Revalidation webhook should refresh the site within ~5s.");
}

main().catch((err) => {
  console.error("[patch] Failed:", err);
  process.exit(1);
});
