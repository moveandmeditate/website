import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import {
  blogCardImageUrl,
  readingTimeFor,
  type BlogPostCard,
} from "@/sanity/lib/blog";

const CATEGORY_LABELS: Record<BlogPostCard["category"], string> = {
  dance: "DANCE",
  yoga: "YOGA",
  weddings: "WEDDINGS",
  corporate: "CORPORATE",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPostCard }) {
  const cover = blogCardImageUrl(post.heroImage);
  const reading = readingTimeFor(post);

  return (
    <article className="group flex flex-col bg-bg-3 overflow-hidden">
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[16/10] block overflow-hidden bg-bg-2"
      >
        {cover ? (
          <MediaFrame
            src={cover}
            alt={post.heroImage?.alt || post.title}
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            watermark={false}
          />
        ) : null}
        <div className="absolute top-3 left-3 z-10 inline-flex items-center bg-bg/90 px-2.5 py-1 text-[10px] tracking-[0.22em] text-ink font-medium">
          {CATEGORY_LABELS[post.category]}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="text-section-title text-[1.15rem] lg:text-[1.25rem] leading-tight">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-gold-dk transition-colors"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-[13px] leading-[1.65] text-ink-2 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          <div className="text-[10.5px] tracking-[0.18em] text-muted uppercase">
            {formatDate(post.publishedAt)} · {reading} min read
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-[11px] tracking-[0.22em] font-medium text-ink hover:text-gold-dk transition-colors"
            aria-label={`Read ${post.title}`}
          >
            READ
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
