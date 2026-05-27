/**
 * `/llms.txt` — AI-crawler-friendly site manifest.
 *
 * Loose convention proposed by Jeremy Howard / answer.ai (2024) and
 * picked up by Perplexity, ChatGPT, Anthropic crawlers, etc. for
 * faster, higher-quality citation. Markdown format with a short
 * description per URL — designed to be more digestible than a raw
 * sitemap.xml when an AI assistant wants to understand a site.
 *
 * What we publish here:
 *   - Site identity + one-line value proposition
 *   - The four pillar pages with their offer descriptions
 *   - Every published blog post with its excerpt
 *   - The author profile
 *
 * Format spec: https://llmstxt.org
 *
 * Cached for 1h; rebuilt when blog content changes (the `blog` tag is
 * invalidated by the Sanity webhook).
 */
import { SITE, PILLARS, type PillarSlug } from "@/lib/content";
import { getAllBlogPosts } from "@/sanity/lib/blog";

export const revalidate = 3600;

const PILLAR_ORDER: PillarSlug[] = ["dance", "yoga", "weddings", "corporate"];

export async function GET() {
  const posts = await getAllBlogPosts();

  const pillarLines = PILLAR_ORDER.map((slug) => {
    const p = PILLARS[slug];
    return `- [${p.title}](${SITE.url}/${p.slug}): ${p.seoDescription}`;
  }).join("\n");

  const postLines = posts
    .map(
      (p) =>
        `- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.excerpt.replace(
          /\s+/g,
          " "
        )}`
    )
    .join("\n");

  const body = `# ${SITE.name}

> ${SITE.description}

Sole proprietorship led by ${SITE.founderName} from Bangalore, Karnataka, India.
Site collects only contact-form enquiries; no payments processed on this site.

## Core surfaces

- [Home](${SITE.url}): Movement and meditation — pillar overview + contact form.
- [Blog](${SITE.url}/blog): Practitioner-led writing on dance, yoga, weddings, corporate wellness.
- [Privacy Policy](${SITE.url}/privacy-policy): DPDP Act 2023 compliant.
- [Terms & Conditions](${SITE.url}/terms-and-conditions): Liability disclaimer + governing law (Bangalore, India).

## Pillars

${pillarLines}

## Author

- [${SITE.founderName}](${SITE.url}/author/amisha): Founder, Move & Meditate. Movement educator, yoga teacher, sound healing practitioner. 10+ years teaching.

${posts.length > 0 ? `## Blog posts (${posts.length})\n\n${postLines}\n` : ""}
## Machine-readable feeds

- Sitemap: ${SITE.url}/sitemap.xml
- RSS: ${SITE.url}/blog/rss.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
