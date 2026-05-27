import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MediaFrame } from "@/components/media-frame";
import { AuthorCard } from "@/components/blog/author-card";
import { BlogPortableText } from "@/components/blog/portable-text";
import { FaqAccordion } from "@/components/blog/faq-accordion";
import { BlogPillarCta } from "@/components/blog/pillar-cta";
import { RelatedStrip } from "@/components/blog/related-strip";

import {
  blogHeroImageUrl,
  getAllBlogSlugs,
  getAutoRelatedBlogPosts,
  getBlogPostBySlug,
  readingTimeFor,
} from "@/sanity/lib/blog";
import { getEffectiveContact } from "@/sanity/lib/site-data";
import { blogPostJsonLd, blogPostMetadata } from "@/lib/seo";

const CATEGORY_LABELS: Record<string, string> = {
  dance: "DANCE",
  yoga: "YOGA",
  weddings: "WEDDINGS",
  corporate: "CORPORATE",
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return blogPostMetadata(post);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const [contact, autoRelated] = await Promise.all([
    getEffectiveContact(),
    getAutoRelatedBlogPosts(post.category, post.slug),
  ]);

  const heroUrl = blogHeroImageUrl(post.heroImage);
  const reading = readingTimeFor(post);
  const related = post.manualRelated?.length
    ? post.manualRelated.slice(0, 3)
    : autoRelated;
  const pillar = post.relatedPillar ?? post.category;
  const jsonLd = blogPostJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD goes straight into the doc head; safe to use
        // dangerouslySetInnerHTML because we control the input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader contact={contact} />
      <main id="main">
        <article>
          {/* Breadcrumb + meta */}
          <header className="bg-bg-2 border-b border-line-2">
            <div className="container-page max-w-3xl py-10 lg:py-14">
              <nav
                aria-label="Breadcrumb"
                className="text-[11px] tracking-[0.22em] uppercase text-muted"
              >
                <Link href="/" className="hover:text-ink transition-colors">
                  Home
                </Link>
                <span aria-hidden className="mx-2">/</span>
                <Link href="/blog" className="hover:text-ink transition-colors">
                  Blog
                </Link>
                <span aria-hidden className="mx-2">/</span>
                <span className="text-ink-2">
                  {CATEGORY_LABELS[post.category] ?? post.category}
                </span>
              </nav>
              <p className="mt-6 text-eyebrow text-muted">
                {CATEGORY_LABELS[post.category] ?? post.category}
              </p>
              <h1 className="mt-3 text-section-title text-[clamp(2rem,4.4vw,3.2rem)] leading-tight">
                {post.title}
              </h1>
              <p className="mt-5 text-[15px] leading-[1.75] text-ink-2 max-w-[58ch]">
                {post.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <AuthorCard
                  author={
                    post.author
                      ? {
                          _id: post.author._id,
                          name: post.author.name,
                          slug: post.author.slug,
                          role: post.author.role ?? null,
                          photo: post.author.photo,
                          bio: null,
                          credentials: null,
                        }
                      : null
                  }
                  variant="inline"
                />
                <div className="text-[11px] tracking-[0.18em] text-muted uppercase">
                  {formatDate(post.publishedAt)} · {reading} min read
                </div>
              </div>
              {post.updatedAt && post.updatedAt !== post.publishedAt ? (
                <p className="mt-3 text-[11px] tracking-[0.18em] text-muted uppercase">
                  Last reviewed {formatDate(post.updatedAt)}
                </p>
              ) : null}
            </div>
          </header>

          {/* Hero image */}
          {heroUrl ? (
            <div className="bg-bg">
              <div className="container-page max-w-4xl pt-8 lg:pt-12">
                <figure className="relative w-full aspect-[16/9] bg-bg-2 overflow-hidden">
                  <MediaFrame
                    src={heroUrl}
                    alt={post.heroImage?.alt || post.title}
                    className="absolute inset-0"
                    sizes="(min-width: 1024px) 880px, 100vw"
                    watermark={false}
                  />
                </figure>
              </div>
            </div>
          ) : null}

          {/* Body */}
          <div className="bg-bg">
            <div className="container-page max-w-3xl py-10 lg:py-16">
              <BlogPortableText value={post.body} />

              {post.faq?.length ? (
                <FaqAccordion items={post.faq} />
              ) : null}

              <BlogPillarCta pillar={pillar} />

              <AuthorCard
                author={
                  post.author
                    ? {
                        _id: post.author._id,
                        name: post.author.name,
                        slug: post.author.slug,
                        role: post.author.role ?? null,
                        photo: post.author.photo,
                        bio: post.author.bio,
                        credentials: post.author.credentials,
                      }
                    : null
                }
                variant="card"
              />

              <RelatedStrip posts={related} />

              <div className="mt-12 pt-10 border-t border-line-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] font-medium text-ink hover:text-gold-dk transition-colors"
                >
                  <ArrowLeft className="size-3.5" aria-hidden />
                  ALL ARTICLES
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter contact={contact} />
    </>
  );
}
