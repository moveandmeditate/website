import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MediaFrame } from "@/components/media-frame";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPortableText } from "@/components/blog/portable-text";

import {
  authorImageUrl,
  getAllAuthorSlugs,
  getAuthorBySlug,
} from "@/sanity/lib/blog";
import { getEffectiveContact } from "@/sanity/lib/site-data";
import { SITE } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return {};
  const title = `${author.name} · ${SITE.name}`;
  const description =
    author.bio ||
    `Posts by ${author.name}${author.role ? `, ${author.role}` : ""}.`;
  const url = `${SITE.url}/author/${author.slug}`;
  const ogImage = authorImageUrl(author.photo);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      siteName: SITE.name,
      title,
      description,
      locale: "en_IN",
      images: ogImage
        ? [{ url: ogImage, alt: author.photo?.alt || author.name }]
        : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const [author, contact] = await Promise.all([
    getAuthorBySlug(slug),
    getEffectiveContact(),
  ]);
  if (!author) notFound();

  const portrait = authorImageUrl(author.photo);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/author/${author.slug}#person`,
    name: author.name,
    description: author.bio ?? undefined,
    url: `${SITE.url}/author/${author.slug}`,
    image: portrait ?? undefined,
    jobTitle: author.role ?? undefined,
    sameAs: [
      author.social?.instagram,
      author.social?.youtube,
      author.social?.linkedin,
    ].filter(Boolean) as string[] | undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader contact={contact} />
      <main id="main">
        <section
          aria-labelledby="author-heading"
          className="bg-bg-2 border-b border-line-2"
        >
          <div className="container-page max-w-3xl py-16 lg:py-24 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-7 sm:gap-10 items-start">
            {portrait ? (
              <div className="relative size-32 sm:size-40 rounded-full overflow-hidden bg-bg-3 border border-line-2 shrink-0">
                <MediaFrame
                  src={portrait}
                  alt={author.photo?.alt || author.name}
                  className="absolute inset-0"
                  sizes="160px"
                  watermark={false}
                />
              </div>
            ) : null}
            <div>
              <p className="text-eyebrow text-muted">WRITTEN BY</p>
              <h1
                id="author-heading"
                className="mt-3 text-section-title text-[clamp(2rem,4vw,2.8rem)]"
              >
                {author.name}
              </h1>
              {author.role ? (
                <p className="mt-1 text-[12px] tracking-[0.18em] font-medium uppercase text-muted">
                  {author.role}
                </p>
              ) : null}
              {author.bio ? (
                <p className="mt-5 text-[15px] leading-[1.8] text-ink-2 max-w-[58ch]">
                  {author.bio}
                </p>
              ) : null}
              {author.credentials?.length ? (
                <ul aria-label="Credentials" className="mt-5 flex flex-wrap gap-1.5">
                  {author.credentials.map((c) => (
                    <li
                      key={c}
                      className="text-[10.5px] tracking-[0.16em] uppercase bg-bg border border-line-2 text-ink-2 px-2.5 py-1 rounded-sm"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>

        {Array.isArray(author.longBio) && author.longBio.length > 0 ? (
          <section className="bg-bg">
            <div className="container-page max-w-3xl py-12 lg:py-16">
              <BlogPortableText value={author.longBio} />
            </div>
          </section>
        ) : null}

        <section
          aria-labelledby="author-posts-heading"
          className="bg-bg border-t border-line-2"
        >
          <div className="container-page max-w-5xl py-12 lg:py-20">
            <p className="text-eyebrow text-muted">ARTICLES BY {author.name.toUpperCase()}</p>
            <h2
              id="author-posts-heading"
              className="mt-2 text-section-title text-[clamp(1.6rem,3vw,2rem)]"
            >
              Recent writing
            </h2>
            {author.posts.length === 0 ? (
              <p className="mt-6 text-[14px] text-ink-2">
                No posts yet. Check back soon.
              </p>
            ) : (
              <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {author.posts.map((p) => (
                  <li key={p._id}>
                    <BlogCard post={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooter contact={contact} />
    </>
  );
}
