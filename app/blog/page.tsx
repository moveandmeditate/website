import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterServer } from "@/components/site-footer-server";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllBlogPosts } from "@/sanity/lib/blog";
import { SITE } from "@/lib/content";
import { getEffectiveContact } from "@/sanity/lib/site-data";

// Document <title>: bare. Root layout template appends `· ${SITE.name}`.
const PAGE_TITLE = "Blog";
// OG/Twitter title: branded (NOT run through the template).
const TITLE = `Blog · ${SITE.name}`;
const DESCRIPTION = `Honest, practitioner-led writing from ${SITE.founderName} on dance, yoga, breathwork, wedding choreography and corporate wellness.`;
const URL = `${SITE.url}/blog`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    url: URL,
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const CATEGORY_FILTERS: { value: "all" | "dance" | "yoga" | "weddings" | "corporate"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "dance", label: "Dance" },
  { value: "yoga", label: "Yoga" },
  { value: "weddings", label: "Weddings" },
  { value: "corporate", label: "Corporate" },
];

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const [posts, contact] = await Promise.all([
    getAllBlogPosts(),
    getEffectiveContact(),
  ]);

  const active = (CATEGORY_FILTERS.find((f) => f.value === category)?.value ?? "all") as
    | "all"
    | "dance"
    | "yoga"
    | "weddings"
    | "corporate";

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <SiteHeader contact={contact} />
      <main id="main" className="pt-[var(--header-h)]">
        {/* Header */}
        <section
          aria-labelledby="blog-heading"
          className="bg-bg-2 border-b border-line-2"
        >
          <div className="container-page py-20 lg:py-28">
            <p className="text-eyebrow text-muted">WRITING</p>
            <h1
              id="blog-heading"
              className="mt-3 text-section-title text-[clamp(1.8rem,5vw,3.5rem)] max-w-[20ch] break-words"
            >
              Notes on movement, stillness and practice.
            </h1>
            <p className="mt-5 text-[14.5px] leading-[1.8] text-ink-2 max-w-[56ch]">
              {DESCRIPTION}
            </p>
          </div>
        </section>

        {/* Category filter */}
        <section className="bg-bg border-b border-line-2">
          <div className="container-page py-5 lg:py-6">
            <nav
              aria-label="Filter by category"
              className="flex flex-wrap items-center gap-1.5"
            >
              {CATEGORY_FILTERS.map((f) => {
                const href =
                  f.value === "all" ? "/blog" : `/blog?category=${f.value}`;
                const isActive = active === f.value;
                return (
                  <Link
                    key={f.value}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-4 h-9 inline-flex items-center text-[11px] tracking-[0.22em] font-medium uppercase border transition-colors ${
                      isActive
                        ? "bg-ink text-bg border-ink"
                        : "bg-bg text-ink-2 border-line-2 hover:bg-bg-3"
                    }`}
                  >
                    {f.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>

        {/* Grid */}
        <section
          aria-labelledby="blog-list-heading"
          className="bg-bg"
        >
          <h2 id="blog-list-heading" className="sr-only">
            Articles
          </h2>
          <div className="container-page py-12 lg:py-20">
            {filtered.length === 0 ? (
              <p className="text-[14px] text-ink-2">
                No articles yet in this category. Check back soon.
              </p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {filtered.map((p) => (
                  <li key={p._id}>
                    <BlogCard post={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooterServer contact={contact} />
    </>
  );
}
