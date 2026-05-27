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

/** Singleton site settings. */
export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"] | order(_updatedAt desc) [0] {
    _id, email, phone, whatsappCommunity, instagram, youtube, facebook,
    calBookingUrl, tagline
  }
`);
