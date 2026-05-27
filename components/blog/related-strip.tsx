import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPostCard } from "@/sanity/lib/blog";

export function RelatedStrip({ posts }: { posts: BlogPostCard[] }) {
  if (!posts?.length) return null;
  return (
    <section
      aria-labelledby="related-heading"
      className="mt-16 border-t border-line-2 pt-10"
    >
      <p className="text-eyebrow text-muted">From the blog</p>
      <h2
        id="related-heading"
        className="mt-2 text-section-title text-[1.65rem] lg:text-[1.9rem]"
      >
        Related reads
      </h2>
      <ul className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((p) => (
          <li key={p._id}>
            <BlogCard post={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
