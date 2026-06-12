/**
 * Site-data fetchers that merge CMS values with the static fallbacks in
 * `lib/content.ts`. CMS-first; static fills any gap. The returned shapes
 * exactly match the existing static types so renderers don't have to
 * branch on "is this from CMS or content.ts".
 *
 * Every fetch is wrapped in try/catch — a transient Sanity outage must
 * never break a build or take down the site. Cache tags align with the
 * /api/revalidate webhook so editor changes propagate fast.
 */
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  allBrandsQuery,
  allTestimonialsQuery,
  allVideoTestimonialsQuery,
  founderProfileQuery,
  siteSettingsQuery,
  testimonialForPillarQuery,
} from "@/sanity/lib/queries";
import {
  CONTACT,
  FOUNDER,
  type PillarSlug,
  type Testimonial,
  TESTIMONIALS,
  TRUSTED_BRANDS,
  type Brand,
  VIDEO_TESTIMONIALS,
  type VideoTestimonial,
} from "@/lib/content";

// In dev we want CMS edits to show up on the next page refresh so we
// can iterate without restarting the server or clearing .next/cache.
//
// In prod we lean heavily on the Sanity webhook (see
// /api/revalidate) for invalidation — when an editor publishes a
// change, the affected tag is busted within ~5s. So the time-based
// TTL is only a safety net for the (rare) case the webhook fails to
// deliver. 24h is long enough to save almost all Sanity API hits
// while still self-healing if the webhook silently drops a publish.
//
// Site settings, founder profile, testimonials and brands rarely
// change once populated; using a longer TTL here is safer than
// repeating the events.ts 1h pattern.
const REVALIDATE_SECONDS =
  process.env.NODE_ENV === "development" ? 5 : 24 * 60 * 60;

type SanityImageField = {
  alt: string | null;
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string | null;
      dimensions?: { width: number; height: number } | null;
    };
  } | null;
  hotspot?: { x: number; y: number; height: number; width: number } | null;
  crop?: { top: number; left: number; bottom: number; right: number } | null;
};

// `Founder` shape is locally derived from the static const so we don't
// have to keep two types in sync. `as Founder` cast is safe because the
// adapter below populates every field.
export type Founder = typeof FOUNDER;

// ────────────────────────────────────────────────────────────────────────
// Effective contact (site settings)
// ────────────────────────────────────────────────────────────────────────

type SanitySiteSettings = {
  _id: string;
  email: string | null;
  phone: string | null;
  whatsappCommunity: string | null;
  instagram: string | null;
  youtube: string | null;
  facebook: string | null;
  calBookingUrl: string | null;
  tagline: string | null;
};

export type EffectiveContact = typeof CONTACT & {
  /** Discovery-call booking URL (Cal.com / Calendly). Optional. */
  calBookingUrl?: string;
  /** Optional CMS-driven hero tagline override. */
  tagline?: string;
};

export async function getEffectiveContact(): Promise<EffectiveContact> {
  try {
    const doc = await sanityClient.fetch<SanitySiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["siteSettings"] } }
    );
    if (!doc) return CONTACT;

    return {
      ...CONTACT,
      // Only override when the CMS field is non-empty — empty fields in
      // Studio are common during editor onboarding and must not blank
      // out the static fallback.
      email: doc.email || CONTACT.email,
      phone: doc.phone || CONTACT.phone,
      whatsappCommunityUrl:
        doc.whatsappCommunity || CONTACT.whatsappCommunityUrl,
      socials: {
        instagram: doc.instagram || CONTACT.socials.instagram,
        youtube: doc.youtube || CONTACT.socials.youtube,
        facebook: doc.facebook || CONTACT.socials.facebook,
      },
      ...(doc.calBookingUrl ? { calBookingUrl: doc.calBookingUrl } : {}),
      ...(doc.tagline ? { tagline: doc.tagline } : {}),
    };
  } catch {
    return CONTACT;
  }
}

// ────────────────────────────────────────────────────────────────────────
// Effective founder
// ────────────────────────────────────────────────────────────────────────

type SanityFounderStat = {
  icon: "users" | "cal" | "globe" | "heart";
  number: string;
  label: string;
};

type SanityFounder = {
  _id: string;
  eyebrow: string | null;
  title: string;
  paragraphs: string[];
  signature: string;
  signatureLabel: string | null;
  portrait: SanityImageField | null;
  stats: SanityFounderStat[] | null;
};

export async function getEffectiveFounder(): Promise<Founder> {
  try {
    const doc = await sanityClient.fetch<SanityFounder | null>(
      founderProfileQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["founderProfile"] } }
    );
    if (!doc) return FOUNDER;

    // CDN-optimised portrait URL — width 720 gives a sharp render at
    // the section's max layout width (~620px @ 1440).
    const portraitSrc = doc.portrait?.asset
      ? urlForImage(doc.portrait).width(720).auto("format").url()
      : FOUNDER.portrait.src;

    // Stats must have exactly 4 entries (the renderer assumes that).
    // If CMS returns fewer/more, fall back to the static set rather
    // than ship a half-empty row.
    const validStats =
      doc.stats?.length === 4 ? doc.stats : null;

    return {
      ...FOUNDER,
      eyebrow: doc.eyebrow || FOUNDER.eyebrow,
      title: doc.title || FOUNDER.title,
      paragraphs: doc.paragraphs?.length ? doc.paragraphs : FOUNDER.paragraphs,
      signature: doc.signature || FOUNDER.signature,
      signatureLabel: doc.signatureLabel || FOUNDER.signatureLabel,
      portrait: {
        src: portraitSrc,
        alt: doc.portrait?.alt || FOUNDER.portrait.alt,
      },
      stats: (validStats ?? FOUNDER.stats) as Founder["stats"],
    };
  } catch {
    return FOUNDER;
  }
}

// ────────────────────────────────────────────────────────────────────────
// Effective testimonials
// ────────────────────────────────────────────────────────────────────────

type SanityTestimonial = {
  _id: string;
  name: string;
  context: string;
  quote: string;
  pillars: string[] | null;
  featured: boolean | null;
  avatar: SanityImageField | null;
};

function toTestimonial(doc: SanityTestimonial): Testimonial {
  const avatarSrc = doc.avatar?.asset
    ? urlForImage(doc.avatar)
        .width(160)
        .height(160)
        .fit("crop")
        .auto("format")
        .url()
    : "";
  return {
    id: doc._id,
    name: doc.name,
    context: doc.context,
    quote: doc.quote,
    avatar: { src: avatarSrc, alt: doc.avatar?.alt || doc.name },
  };
}

export async function getEffectiveTestimonials(): Promise<Testimonial[]> {
  try {
    const docs = await sanityClient.fetch<SanityTestimonial[]>(
      allTestimonialsQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["testimonials"] } }
    );
    if (!docs?.length) return TESTIMONIALS;
    return docs.map(toTestimonial);
  } catch {
    return TESTIMONIALS;
  }
}

// ────────────────────────────────────────────────────────────────────────
// Effective trusted-by brands
// ────────────────────────────────────────────────────────────────────────

type SanityBrand = {
  _id: string;
  name: string;
  render: Brand["render"] | null;
  websiteUrl: string | null;
  logo: SanityImageField | null;
};

/** Extended brand shape: `render` is optional (CMS docs may only carry
 *  a logo image), plus an optional CDN-resolved logo URL + external
 *  website link. The static fallback satisfies this type because its
 *  required `render` is a superset of the optional one here. */
export type EffectiveBrand = {
  name: string;
  render?: Brand["render"];
  logoSrc?: string;
  logoAlt?: string;
  websiteUrl?: string;
  /** Optical-weight override carried through from the static fallback so
   *  Lenovo / Bosch don't shrink back to `h-7` once the CMS list lands. */
  logoHeightClass?: string;
};

export async function getEffectiveBrands(): Promise<EffectiveBrand[]> {
  try {
    const docs = await sanityClient.fetch<SanityBrand[]>(
      allBrandsQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["brands"] } }
    );
    if (!docs?.length) return TRUSTED_BRANDS;
    return docs.map<EffectiveBrand>((doc) => {
      const logoSrc = doc.logo?.asset
        ? urlForImage(doc.logo).width(220).auto("format").url()
        : undefined;
      return {
        name: doc.name,
        ...(doc.render ? { render: doc.render } : {}),
        ...(logoSrc ? { logoSrc, logoAlt: doc.logo?.alt || doc.name } : {}),
        ...(doc.websiteUrl ? { websiteUrl: doc.websiteUrl } : {}),
      };
    });
  } catch {
    return TRUSTED_BRANDS;
  }
}

/**
 * Pillar-aware testimonial picker. Strategy:
 *   1. CMS testimonial tagged with this pillar → use it
 *   2. Fall back to the static `testimonialId` mapped on the Pillar
 *
 * Returns `null` only if both strategies miss — caller hides the section.
 */
export async function getEffectiveTestimonialForPillar(
  slug: PillarSlug,
  fallbackId: string
): Promise<Testimonial | null> {
  try {
    const doc = await sanityClient.fetch<SanityTestimonial | null>(
      testimonialForPillarQuery,
      { pillar: slug },
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: ["testimonials", `testimonials:${slug}`],
        },
      }
    );
    if (doc) return toTestimonial(doc);
  } catch {
    // fall through to static
  }
  return TESTIMONIALS.find((t) => t.id === fallbackId) ?? null;
}

// ────────────────────────────────────────────────────────────────────────
// Effective video testimonials
// ────────────────────────────────────────────────────────────────────────

type SanityVideoTestimonial = {
  _id: string;
  name: string;
  context: string;
  videoUrl: string;
  poster: SanityImageField | null;
};

/** Hard cap mirrored from the section renderer — keeps the cap in one
 *  place and lets the GROQ query stay simple. */
const VIDEO_TESTIMONIAL_LIMIT = 4;

export async function getEffectiveVideoTestimonials(): Promise<
  VideoTestimonial[]
> {
  try {
    const docs = await sanityClient.fetch<SanityVideoTestimonial[]>(
      allVideoTestimonialsQuery,
      {},
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: ["videoTestimonials"],
        },
      }
    );
    if (!docs?.length) return VIDEO_TESTIMONIALS.slice(0, VIDEO_TESTIMONIAL_LIMIT);
    return docs.slice(0, VIDEO_TESTIMONIAL_LIMIT).map<VideoTestimonial>((doc) => ({
      id: doc._id,
      name: doc.name,
      context: doc.context,
      videoUrl: doc.videoUrl,
      poster: {
        src: doc.poster?.asset
          ? urlForImage(doc.poster).width(720).auto("format").url()
          : "",
        alt: doc.poster?.alt || `${doc.name} testimonial poster`,
      },
    }));
  } catch {
    return VIDEO_TESTIMONIALS.slice(0, VIDEO_TESTIMONIAL_LIMIT);
  }
}
