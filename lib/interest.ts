import { INTERESTS } from "@/lib/content";

/**
 * Maps a URL `?interest=<slug>` value (set by CTAs across the site) to
 * the matching `INTERESTS` dropdown label, plus a soft starter line for
 * the contact-form message box.
 *
 * Used by:
 *  - CTAs that build a contact href via `contactHref(slug)`
 *  - `<ContactForm>` which reads the param + pre-fills the form
 *
 * Unknown / missing slugs return null → the form falls back to its
 * empty default (no preselect, no starter).
 */

export type InterestSlug =
  | "dance"
  | "yoga"
  | "breathwork"
  | "weddings"
  | "couple-dance"
  | "corporate"
  | "online"
  | "retreats";

type InterestLabel = (typeof INTERESTS)[number];

type InterestPrefill = {
  interest: InterestLabel;
  /** Soft starter for the message box. Editable by the user. */
  message: string;
};

const SLUG_TO_PREFILL: Record<InterestSlug, InterestPrefill> = {
  dance: {
    interest: "Dance Classes",
    message: "Hi Amisha, I'm interested in dance classes — ",
  },
  yoga: {
    interest: "Yoga Classes",
    message: "Hi Amisha, I'm interested in yoga classes — ",
  },
  breathwork: {
    interest: "Breathwork & Sound Healing",
    message: "Hi Amisha, I'm interested in breathwork / sound healing — ",
  },
  weddings: {
    interest: "Wedding / Sangeet Choreography",
    message:
      "Hi Amisha, we're planning a wedding and would love help with choreography — ",
  },
  "couple-dance": {
    interest: "Couple Dance",
    message:
      "Hi Amisha, we'd love a couple dance choreographed for our wedding — ",
  },
  corporate: {
    interest: "Corporate Wellness",
    message: "Hi, I'm exploring corporate wellness for our team — ",
  },
  online: {
    interest: "Online Sessions",
    message: "Hi Amisha, I'm interested in online sessions — ",
  },
  retreats: {
    interest: "Retreats",
    message: "Hi Amisha, I'm interested in a retreat — ",
  },
};

/** Resolve a raw param value to a prefill, or null if unrecognised. */
export function resolveInterestPrefill(
  raw: string | null | undefined
): InterestPrefill | null {
  if (!raw) return null;
  const slug = raw.toLowerCase().trim() as InterestSlug;
  return SLUG_TO_PREFILL[slug] ?? null;
}

/**
 * Build a contact href carrying the interest context.
 * `contactHref("dance")` → "/?interest=dance#contact"
 *
 * Always points at the home page's contact section, since the form
 * lives there. Safe to call from any route.
 */
export function contactHref(slug: InterestSlug): string {
  return `/?interest=${slug}#contact`;
}

/**
 * Derive an interest slug from a pathname, for the global nav + mobile
 * CTA buttons. `/dance` → "dance", `/yoga#offerings` → "yoga", etc.
 * Returns null for routes with no clear interest mapping (home, blog
 * index, legal) so callers fall back to a generic `/#contact`.
 */
export function interestSlugForPath(pathname: string): InterestSlug | null {
  if (pathname.startsWith("/dance")) return "dance";
  if (pathname.startsWith("/yoga")) return "yoga";
  if (pathname.startsWith("/weddings")) return "weddings";
  if (pathname.startsWith("/corporate")) return "corporate";
  return null;
}
