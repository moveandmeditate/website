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
  allTestimonialsQuery,
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
} from "@/lib/content";

const ONE_HOUR = 60 * 60;

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
      { next: { revalidate: ONE_HOUR, tags: ["siteSettings"] } }
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
      { next: { revalidate: ONE_HOUR, tags: ["founderProfile"] } }
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
      { next: { revalidate: ONE_HOUR, tags: ["testimonials"] } }
    );
    if (!docs?.length) return TESTIMONIALS;
    return docs.map(toTestimonial);
  } catch {
    return TESTIMONIALS;
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
          revalidate: ONE_HOUR,
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
