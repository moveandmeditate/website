import { BlogCard } from "@/components/blog/blog-card";
import { getBlogPostsForPillar } from "@/sanity/lib/blog";
import type { PillarSlug } from "@/lib/content";

/**
 * "From the blog" strip rendered at the foot of each pillar page.
 * Hidden entirely when no relevant posts exist — no empty grid.
 */
export async function BlogStrip({ pillar }: { pillar: PillarSlug }) {
  const posts = await getBlogPostsForPillar(pillar, 3);
  if (posts.length === 0) return null;
  return (
    <section
      aria-labelledby="pillar-blog-strip-heading"
      className="bg-bg"
    >
      <div className="container-page py-14 lg:py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-eyebrow text-muted">FROM THE BLOG</p>
            <h2
              id="pillar-blog-strip-heading"
              className="text-section-title text-[clamp(1.6rem,3vw,2rem)] mt-2"
            >
              Read more
            </h2>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((p) => (
            <li key={p._id}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
