/**
 * RSS 2.0 feed for the blog. Mounts at `/blog/rss.xml`.
 *
 * Helps:
 *  - AI crawlers (Perplexity, ChatGPT) discover and re-index content
 *    faster than sitemap-only feeds
 *  - Power-users + journalists who still subscribe to RSS
 *  - Newsletter platforms (Beehiiv, Substack) can auto-import via feed
 *
 * Only emits **published** posts. Last 30 to keep payload reasonable.
 * Cache the rendered XML so we don't refetch from Sanity on every hit.
 */
import { getAllBlogPosts, blogHeroImageUrl } from "@/sanity/lib/blog";
import { SITE } from "@/lib/content";

// 1-hour TTL. Must be a numeric literal for Next.js's static-analysis
// pass; can't reference a variable here. The Sanity webhook invalidates
// the `blog` tag on publish, so the TTL is just a safety net.
export const revalidate = 3600;

function escape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

export async function GET() {
  const posts = (await getAllBlogPosts()).slice(0, 30);
  const lastBuildDate =
    posts[0]?.publishedAt ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = `${SITE.url}/blog/${post.slug}`;
      const enclosure = blogHeroImageUrl(post.heroImage);
      const authorName = post.author?.name ?? SITE.founderName;
      return `
    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.publishedAt)}</pubDate>
      <description>${escape(post.excerpt)}</description>
      <dc:creator>${escape(authorName)}</dc:creator>
      <category>${escape(post.category)}</category>${
        enclosure
          ? `\n      <enclosure url="${enclosure}" type="image/webp" />`
          : ""
      }
    </item>`;
    })
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE.name)} — Blog</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escape(
      `Honest, practitioner-led writing from ${SITE.founderName} on dance, yoga, breathwork, wedding choreography and corporate wellness.`
    )}</description>
    <language>en-IN</language>
    <lastBuildDate>${rfc822(lastBuildDate)}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=3600, stale-while-revalidate=86400`,
    },
  });
}
