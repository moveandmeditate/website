/**
 * Types + upsert helper for seeding blog posts into Sanity.
 *
 * `SeedBlogPost` mirrors the shape an editor would fill in Studio, but
 * shaped as plain TypeScript so article files in `content/blog/*.ts`
 * can compose with the Portable Text helpers without touching Sanity
 * APIs directly.
 *
 * Behavior:
 *   - Idempotent upsert keyed by `slug`. If a doc with the same slug
 *     exists, the script overwrites the published version with the
 *     incoming data. Any edits an editor has saved in Studio's draft
 *     workspace are preserved (Sanity stores draft + published
 *     separately).
 *   - Author resolution: the seed expects an existing `author.amisha`
 *     doc; if missing, `upsertDefaultAuthor` creates one first.
 *   - Hero image is optional in the schema; the seed never sets it.
 *     Amisha can upload one in Studio later.
 */
import { randomUUID } from "node:crypto";
import { type SanityClient } from "@sanity/client";
import { type PortableTextBlock } from "./portable-text";

// Sanity arrays require a stable `_key` on every item. Without one,
// Studio shows a "Missing keys" warning and refuses to let editors
// modify the list inline. The Portable Text helpers already stamp
// keys; this helper handles plain object arrays (faq, tags, etc.).
const uid = () => randomUUID().replace(/-/g, "").slice(0, 12);

export type BlogCategory = "dance" | "yoga" | "weddings" | "corporate";

export type FaqItem = { question: string; answer: string };

export type SeedBlogPost = {
  /** URL slug. Must match across runs to be idempotent. */
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime?: number;
  body: PortableTextBlock[];
  faq?: FaqItem[];
  relatedPillar?: BlogCategory;
  seo?: {
    title?: string;
    description?: string;
    noindex?: boolean;
  };
};

export async function upsertBlogPost(
  client: SanityClient,
  post: SeedBlogPost,
  authorId: string
): Promise<{ _id: string; created: boolean }> {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id }`,
    { slug: post.slug }
  );

  // Faq items + tag entries need stable `_key` props so Studio doesn't
  // flag "Missing keys" and refuse inline editing. Body blocks already
  // ship with keys (the Portable Text helpers stamp them).
  const faqWithKeys = post.faq?.map((item) => ({ _key: uid(), ...item }));

  const doc = {
    _type: "blogPost",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    author: { _type: "reference", _ref: authorId },
    category: post.category,
    tags: post.tags ?? [],
    publishedAt: post.publishedAt,
    ...(post.updatedAt ? { updatedAt: post.updatedAt } : {}),
    ...(post.readingTime ? { readingTime: post.readingTime } : {}),
    body: post.body,
    ...(faqWithKeys?.length ? { faq: faqWithKeys } : {}),
    ...(post.relatedPillar ? { relatedPillar: post.relatedPillar } : {}),
    ...(post.seo
      ? {
          seo: {
            ...(post.seo.title ? { title: post.seo.title } : {}),
            ...(post.seo.description ? { description: post.seo.description } : {}),
            ...(post.seo.noindex === true ? { noindex: true } : {}),
          },
        }
      : {}),
    published: true,
  };

  if (existing?._id) {
    await client.patch(existing._id).set(doc).commit();
    console.log(`[seed] updated blogPost '${post.slug}' (${existing._id}).`);
    return { _id: existing._id, created: false };
  }
  const created = await client.create(doc);
  console.log(`[seed] created blogPost '${post.slug}' (${created._id}).`);
  return { _id: created._id, created: true };
}
