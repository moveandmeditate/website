import type { Metadata } from "next";
import { CONTACT, FOUNDER, PILLARS, SITE, type PillarSlug } from "@/lib/content";
import type { BlogPostFull } from "@/sanity/lib/blog";
import { blogHeroImageUrl } from "@/sanity/lib/blog";

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}#org`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.svg`,
        founder: { "@id": `${SITE.url}#founder` },
        sameAs: [
          CONTACT.socials.instagram,
          CONTACT.socials.youtube,
          CONTACT.socials.facebook,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: CONTACT.email,
            contactType: "customer support",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}#founder`,
        name: SITE.founderName,
        jobTitle: "Founder, Dance & Yoga Practitioner",
        worksFor: { "@id": `${SITE.url}#org` },
        description: FOUNDER.paragraphs.join(" "),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}#site`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}#org` },
        inLanguage: "en-IN",
      },
      // Event JSON-LD intentionally omitted. Events live in Sanity now
      // and are time-sensitive — emitting Event schema without real
      // `startDate` ISO values is worse than emitting nothing (Google
      // de-prioritises malformed Event markup). Re-add as an async
      // generator that pulls live events with real dates once the CMS
      // has a populated calendar with `startsAt` set on each doc.
    ],
  };
}

/**
 * JSON-LD `Service` for a single pillar page.
 * Lets Google understand each /dance /yoga /weddings /corporate page as a
 * distinct service offered by the same Organization.
 */
export function pillarJsonLd(slug: PillarSlug) {
  const p = PILLARS[slug];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/${p.slug}#service`,
    name: `${p.title} · ${SITE.name}`,
    serviceType: p.title,
    description: p.seoDescription,
    areaServed: { "@type": "Country", name: "IN" },
    provider: { "@id": `${SITE.url}#org` },
    url: `${SITE.url}/${p.slug}`,
    image: `${SITE.url}${p.heroImage.src}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${p.title} offerings`,
      itemListElement: p.offerings.map((o, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: o.title,
        description: o.blurb,
      })),
    },
  };
}

/**
 * FAQPage JSON-LD for a pillar route. Lets Google render the "People also
 * ask" rich-result snippet directly under the listing.
 */
export function pillarFaqJsonLd(slug: PillarSlug) {
  const p = PILLARS[slug];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/${p.slug}#faq`,
    mainEntity: p.faq.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };
}

/** Per-pillar `metadata` export used by the page.tsx files. */
export function pillarMetadata(slug: PillarSlug): Metadata {
  const p = PILLARS[slug];
  const url = `${SITE.url}/${p.slug}`;
  return {
    title: `${p.title} · ${SITE.name}`,
    description: p.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: `${p.title} · ${SITE.name}`,
      description: p.seoDescription,
      images: [{ url: p.heroImage.src, alt: p.heroImage.alt }],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} · ${SITE.name}`,
      description: p.seoDescription,
      images: [p.heroImage.src],
    },
  };
}

// ──────────────────────────────────────────────────────────────────────
// Blog helpers
// ──────────────────────────────────────────────────────────────────────

/** Build the metadata object for a single blog post. */
export function blogPostMetadata(post: BlogPostFull): Metadata {
  const url = `${SITE.url}/blog/${post.slug}`;
  const title = post.seo?.title || `${post.title} · ${SITE.name}`;
  const description = post.seo?.description || post.excerpt;
  const ogImageSrc =
    blogHeroImageUrl(post.seo?.ogImage ?? null) ||
    blogHeroImageUrl(post.heroImage);

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(post.seo?.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "article",
      url,
      siteName: SITE.name,
      title,
      description,
      locale: "en_IN",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags ?? undefined,
      images: ogImageSrc
        ? [
            {
              url: ogImageSrc,
              alt: post.heroImage?.alt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageSrc ? [ogImageSrc] : undefined,
    },
  };
}

/** BlogPosting + BreadcrumbList JSON-LD. Optionally FAQPage when faq
 *  is non-empty — caller wraps in @graph or emits as separate scripts. */
export function blogPostJsonLd(post: BlogPostFull, opts: { wordCount?: number } = {}) {
  const url = `${SITE.url}/blog/${post.slug}`;
  const heroSrc = blogHeroImageUrl(post.heroImage);
  const graph: object[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.excerpt,
      url,
      mainEntityOfPage: url,
      image: heroSrc ? [heroSrc] : undefined,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: post.author
        ? {
            "@type": "Person",
            "@id": `${SITE.url}/author/${post.author.slug}#person`,
            name: post.author.name,
            url: `${SITE.url}/author/${post.author.slug}`,
          }
        : { "@id": `${SITE.url}#org` },
      publisher: { "@id": `${SITE.url}#org` },
      articleSection: post.category,
      keywords: post.tags?.join(", "),
      wordCount: opts.wordCount,
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((qa) => ({
        "@type": "Question",
        name: qa.question,
        acceptedAnswer: { "@type": "Answer", text: qa.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}


