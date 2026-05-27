import { type SanityClient } from "@sanity/client";

/**
 * Default author (Amisha) seed data. Used by `seed-blog.ts` when the
 * Sanity dataset doesn't yet have an author with the same slug.
 *
 * Editor can refine every field afterward in Studio — these placeholders
 * just guarantee a valid author reference exists for the first import.
 */
export const DEFAULT_AUTHOR_SLUG = "amisha";

export const DEFAULT_AUTHOR = {
  _id: "author.amisha",
  _type: "author",
  name: "Amisha",
  slug: { _type: "slug", current: DEFAULT_AUTHOR_SLUG },
  role: "Founder · Move & Meditate",
  bio: "Movement and meditation teacher based in Bangalore. Ten years across dance, yoga, breathwork and sound healing — with practitioners, couples, families and corporate teams.",
  credentials: [
    "Movement educator",
    "Yoga teacher",
    "Sound healing practitioner",
    "10+ years teaching",
  ],
};

export async function upsertDefaultAuthor(
  client: SanityClient
): Promise<string> {
  // `createOrReplace` is idempotent — first run creates, subsequent
  // runs overwrite with the same content (no-op if unchanged). Editor
  // edits in Studio survive because we only re-run intentionally.
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "author" && slug.current == $slug][0]{ _id }`,
    { slug: DEFAULT_AUTHOR_SLUG }
  );
  if (existing?._id) {
    console.log(
      `[seed] author '${DEFAULT_AUTHOR_SLUG}' already exists (${existing._id}); leaving it untouched.`
    );
    return existing._id;
  }
  const created = await client.create(DEFAULT_AUTHOR);
  console.log(
    `[seed] created author '${DEFAULT_AUTHOR_SLUG}' (${created._id}).`
  );
  return created._id;
}
