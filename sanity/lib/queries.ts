/**
 * Centralised GROQ queries. Keeping them in one file makes it easy to:
 *  - audit the surface area of CMS reads in one place
 *  - add `defineQuery` typegen later without chasing strings across files
 *  - reuse query fragments (e.g. image projections) across consumers
 */
import { defineQuery } from "next-sanity";

/**
 * Image projection — keeps the full image object (asset ref, hotspot,
 * crop) so the `@sanity/image-url` builder can derive CDN transforms.
 * Resolving `asset->url` directly in GROQ defeats those transforms, so
 * we explicitly DON'T do that here.
 */
const IMAGE_FRAGMENT = /* groq */ `
  ...,
  "alt": coalesce(alt, ""),
  asset->{
    _id,
    url,
    metadata { lqip, dimensions { width, height } }
  }
`;

/**
 * Upcoming + future events, sorted soonest first. Filters out anything
 * past today and anything explicitly unpublished. The `pillars` array is
 * always present (validated as required in the schema).
 */
export const upcomingEventsQuery = defineQuery(`
  *[
    _type == "event"
    && published == true
    && startsAt >= now()
  ] | order(startsAt asc) {
    _id,
    title,
    "slug": slug.current,
    startsAt,
    dateLabel,
    location,
    blurb,
    image{ ${IMAGE_FRAGMENT} },
    pillars,
    ctaLabel,
    ctaHref
  }
`);

/**
 * Events filtered to a specific pillar — used by /dance and /yoga
 * sub-pages to show "What's coming up in dance" / etc.
 */
export const eventsForPillarQuery = defineQuery(`
  *[
    _type == "event"
    && published == true
    && startsAt >= now()
    && $pillar in pillars
  ] | order(startsAt asc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    startsAt,
    dateLabel,
    location,
    blurb,
    image{ ${IMAGE_FRAGMENT} },
    pillars,
    ctaLabel,
    ctaHref
  }
`);

/** Testimonials for the landing-page grid. Featured first, then newest. */
export const allTestimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(featured desc, _createdAt desc) {
    _id,
    name,
    context,
    quote,
    pillars,
    featured,
    avatar{ ${IMAGE_FRAGMENT} }
  }
`);

/**
 * Vertical video testimonials. Published-only, sorted by displayOrder then
 * name. The renderer caps the visible list at 4 — anything further down
 * the order is discarded client-side.
 */
export const allVideoTestimonialsQuery = defineQuery(`
  *[
    _type == "videoTestimonial"
    && published == true
  ] | order(coalesce(displayOrder, 9999) asc, name asc) {
    _id,
    name,
    context,
    videoUrl,
    poster{ ${IMAGE_FRAGMENT} }
  }
`);

/** Pillar-specific testimonial. Returns first match, or null. */
export const testimonialForPillarQuery = defineQuery(`
  *[
    _type == "testimonial"
    && $pillar in pillars
  ] | order(_createdAt desc) [0] {
    _id, name, context, quote, pillars,
    avatar{ ${IMAGE_FRAGMENT} }
  }
`);

/** Singleton founder profile. */
export const founderProfileQuery = defineQuery(`
  *[_type == "founderProfile"] | order(_updatedAt desc) [0] {
    _id,
    eyebrow,
    title,
    paragraphs,
    signature,
    signatureLabel,
    portrait{ ${IMAGE_FRAGMENT} },
    stats[]{ icon, number, label }
  }
`);

/** Trusted-by brands. Published-only, sorted by displayOrder then name. */
export const allBrandsQuery = defineQuery(`
  *[
    _type == "brand"
    && published == true
  ] | order(coalesce(displayOrder, 9999) asc, name asc) {
    _id,
    name,
    render,
    websiteUrl,
    logo{ ${IMAGE_FRAGMENT} }
  }
`);

/** Singleton site settings. */
export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"] | order(_updatedAt desc) [0] {
    _id, email, phone, whatsappCommunity, instagram, youtube, facebook,
    calBookingUrl, tagline
  }
`);

// ────────────────────────────────────────────────────────────────────────
// Blog
// ────────────────────────────────────────────────────────────────────────

/** Reusable card projection — kept lean so list endpoints don't pay
 *  to ship the full body. */
const BLOG_CARD_FRAGMENT = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  tags,
  publishedAt,
  updatedAt,
  readingTime,
  heroImage{ ${IMAGE_FRAGMENT} },
  author->{
    _id,
    name,
    "slug": slug.current,
    role,
    photo{ ${IMAGE_FRAGMENT} }
  }
`;

/** All published blog posts (index, paginated client-side or by query). */
export const allBlogPostsQuery = defineQuery(`
  *[_type == "blogPost" && published == true]
    | order(publishedAt desc) {
    ${BLOG_CARD_FRAGMENT}
  }
`);

/** Filter by category for the category-tabbed index. */
export const blogPostsByCategoryQuery = defineQuery(`
  *[_type == "blogPost" && published == true && category == $category]
    | order(publishedAt desc) {
    ${BLOG_CARD_FRAGMENT}
  }
`);

/** Slug list for `generateStaticParams`. */
export const allBlogSlugsQuery = defineQuery(`
  *[_type == "blogPost" && published == true && defined(slug.current)] {
    "slug": slug.current
  }
`);

/** Single post by slug. Body is included; references to author + related
 *  posts are projected as their card payloads. */
export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug && published == true] [0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    publishedAt,
    updatedAt,
    readingTime,
    relatedPillar,
    heroImage{ ${IMAGE_FRAGMENT} },
    body[]{
      ...,
      _type == "figure" => { ${IMAGE_FRAGMENT} },
      markDefs[]{ ... }
    },
    faq[]{ question, answer },
    seo{
      title,
      description,
      ogImage{ ${IMAGE_FRAGMENT} },
      noindex
    },
    author->{
      _id,
      name,
      "slug": slug.current,
      role,
      bio,
      credentials,
      social,
      photo{ ${IMAGE_FRAGMENT} }
    },
    "manualRelated": relatedPosts[]->{ ${BLOG_CARD_FRAGMENT} }
  }
`);

/** Auto-related fallback: same category, exclude self, prefer
 *  most-recent. Caller swaps in `manualRelated` from the post when
 *  present. */
export const autoRelatedBlogPostsQuery = defineQuery(`
  *[_type == "blogPost"
    && published == true
    && category == $category
    && slug.current != $excludeSlug
  ] | order(publishedAt desc) [0...3] {
    ${BLOG_CARD_FRAGMENT}
  }
`);

/** Posts attached to a pillar via `relatedPillar` OR matching category.
 *  Used by the pillar pages' "From the blog" strip. */
export const blogPostsForPillarQuery = defineQuery(`
  *[_type == "blogPost"
    && published == true
    && (relatedPillar == $pillar || category == $pillar)
  ] | order(publishedAt desc) [0...$limit] {
    ${BLOG_CARD_FRAGMENT}
  }
`);

/** Author profile by slug, plus their published posts. */
export const authorBySlugQuery = defineQuery(`
  *[_type == "author" && slug.current == $slug] [0] {
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    longBio,
    credentials,
    social,
    photo{ ${IMAGE_FRAGMENT} },
    "posts": *[_type == "blogPost"
      && published == true
      && references(^._id)
    ] | order(publishedAt desc) {
      ${BLOG_CARD_FRAGMENT}
    }
  }
`);

/** Slug list for /author/[slug] generateStaticParams. */
export const allAuthorSlugsQuery = defineQuery(`
  *[_type == "author" && defined(slug.current)] {
    "slug": slug.current
  }
`);
