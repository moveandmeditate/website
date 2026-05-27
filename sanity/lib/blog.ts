/**
 * Blog data layer.
 *
 * Mirrors the pattern in `sanity/lib/events.ts` + `sanity/lib/site-data.ts`:
 *   - All reads are async server functions
 *   - Tag-based cache, 5s TTL in dev / 1h in prod
 *   - Webhook (`/api/revalidate`) busts the `blog` tag on publish
 *
 * Blog has NO static fallback. Empty CMS = empty blog. The /blog index
 * and pillar BlogStrips both render `null` when there are no posts.
 */
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  allBlogPostsQuery,
  allBlogSlugsQuery,
  allAuthorSlugsQuery,
  authorBySlugQuery,
  autoRelatedBlogPostsQuery,
  blogPostBySlugQuery,
  blogPostsByCategoryQuery,
  blogPostsForPillarQuery,
} from "@/sanity/lib/queries";
import { type PillarSlug } from "@/lib/content";

// Blog posts are stable content — once published, they rarely change
// outside of intentional revisions. Webhook handles instant
// invalidation on publish/edit, so the time-based TTL is a safety
// net. 7 days keeps Sanity API hits negligible (almost every read
// after a fresh build is served from Next.js's cache layer).
const REVALIDATE_SECONDS =
  process.env.NODE_ENV === "development" ? 5 : 7 * 24 * 60 * 60;

/** Sanity-shaped image returned by IMAGE_FRAGMENT. */
export type CmsImage = {
  alt: string | null;
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string | null;
      dimensions?: { width: number; height: number } | null;
    };
  } | null;
  hotspot?: { x: number; y: number; height: number; width: number } | null;
  crop?: { top: number; left: number; bottom: number; right: number } | null;
  caption?: string | null;
};

export type BlogCategory = "dance" | "yoga" | "weddings" | "corporate";

export type AuthorCard = {
  _id: string;
  name: string;
  slug: string;
  role: string | null;
  photo: CmsImage | null;
};

export type AuthorFull = AuthorCard & {
  bio: string | null;
  longBio?: unknown;
  credentials: string[] | null;
  social: {
    instagram?: string | null;
    youtube?: string | null;
    linkedin?: string | null;
  } | null;
};

export type BlogPostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[] | null;
  publishedAt: string;
  updatedAt: string | null;
  readingTime: number | null;
  heroImage: CmsImage | null;
  author: AuthorCard | null;
};

export type BlogPostFull = BlogPostCard & {
  body: unknown; // Portable Text — typed loosely at the boundary
  faq: { question: string; answer: string }[] | null;
  relatedPillar: PillarSlug | null;
  manualRelated: BlogPostCard[] | null;
  author: (AuthorCard & {
    bio: string | null;
    credentials: string[] | null;
    social: AuthorFull["social"];
  }) | null;
  seo: {
    title: string | null;
    description: string | null;
    ogImage: CmsImage | null;
    noindex: boolean | null;
  } | null;
};

/** Words-per-minute used to auto-calc reading time when the editor
 *  didn't override. 225 wpm = average adult silent-reading speed. */
const WORDS_PER_MINUTE = 225;

/** Extract a rough word-count from a Portable Text body for reading
 *  time estimation. Walks block children + collects plain text. */
function wordCountFromPortableText(body: unknown): number {
  if (!Array.isArray(body)) return 0;
  let text = "";
  for (const block of body) {
    if (!block || typeof block !== "object") continue;
    const b = block as { _type?: string; children?: unknown[] };
    if (b._type === "block" && Array.isArray(b.children)) {
      for (const child of b.children) {
        if (
          child &&
          typeof child === "object" &&
          typeof (child as { text?: unknown }).text === "string"
        ) {
          text += " " + (child as { text: string }).text;
        }
      }
    }
  }
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readingTimeFor(post: {
  readingTime: number | null;
  body?: unknown;
}): number {
  if (post.readingTime && post.readingTime > 0) return post.readingTime;
  if (!post.body) return 3;
  const words = wordCountFromPortableText(post.body);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** CDN URL for a card hero image. Width-tuned for the card grid. */
export function blogCardImageUrl(image: CmsImage | null): string | null {
  if (!image?.asset) return null;
  return urlForImage(image).width(800).height(500).fit("crop").auto("format").url();
}

/** Bigger CDN URL for the article hero / OG image fallback. */
export function blogHeroImageUrl(image: CmsImage | null): string | null {
  if (!image?.asset) return null;
  return urlForImage(image).width(1600).auto("format").url();
}

/** Author portrait — square crop, modest width. */
export function authorImageUrl(image: CmsImage | null): string | null {
  if (!image?.asset) return null;
  return urlForImage(image).width(160).height(160).fit("crop").auto("format").url();
}

// ────────────────────────────────────────────────────────────────────────
// Fetchers
// ────────────────────────────────────────────────────────────────────────

export async function getAllBlogPosts(): Promise<BlogPostCard[]> {
  try {
    const docs = await sanityClient.fetch<BlogPostCard[]>(
      allBlogPostsQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["blog"] } }
    );
    return docs ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPostsByCategory(
  category: BlogCategory
): Promise<BlogPostCard[]> {
  try {
    const docs = await sanityClient.fetch<BlogPostCard[]>(
      blogPostsByCategoryQuery,
      { category },
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: ["blog", `blog:${category}`],
        },
      }
    );
    return docs ?? [];
  } catch {
    return [];
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const rows = await sanityClient.fetch<{ slug: string }[]>(
      allBlogSlugsQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["blog"] } }
    );
    return rows?.map((r) => r.slug) ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostFull | null> {
  try {
    const doc = await sanityClient.fetch<BlogPostFull | null>(
      blogPostBySlugQuery,
      { slug },
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: ["blog", `blog:slug:${slug}`],
        },
      }
    );
    return doc ?? null;
  } catch {
    return null;
  }
}

export async function getAutoRelatedBlogPosts(
  category: BlogCategory,
  excludeSlug: string
): Promise<BlogPostCard[]> {
  try {
    const docs = await sanityClient.fetch<BlogPostCard[]>(
      autoRelatedBlogPostsQuery,
      { category, excludeSlug },
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["blog"] } }
    );
    return docs ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPostsForPillar(
  pillar: PillarSlug,
  limit = 3
): Promise<BlogPostCard[]> {
  try {
    const docs = await sanityClient.fetch<BlogPostCard[]>(
      blogPostsForPillarQuery,
      { pillar, limit },
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: ["blog", `blog:pillar:${pillar}`],
        },
      }
    );
    return docs ?? [];
  } catch {
    return [];
  }
}

export async function getAuthorBySlug(
  slug: string
): Promise<(AuthorFull & { posts: BlogPostCard[] }) | null> {
  try {
    const doc = await sanityClient.fetch<
      (AuthorFull & { posts: BlogPostCard[] }) | null
    >(
      authorBySlugQuery,
      { slug },
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: ["blog", "author", `author:${slug}`],
        },
      }
    );
    return doc ?? null;
  } catch {
    return null;
  }
}

export async function getAllAuthorSlugs(): Promise<string[]> {
  try {
    const rows = await sanityClient.fetch<{ slug: string }[]>(
      allAuthorSlugsQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["author"] } }
    );
    return rows?.map((r) => r.slug) ?? [];
  } catch {
    return [];
  }
}
