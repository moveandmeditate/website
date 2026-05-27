/**
 * Bridge between Sanity's event documents and the `EventItem` shape that
 * the React components already consume. Lets us migrate to CMS without
 * touching the renderer.
 *
 * Fallback strategy: if Sanity returns zero documents (dataset empty
 * during the rollout window), we surface the static `EVENTS` array from
 * `lib/content.ts` so the site never shows an empty section.
 */
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  upcomingEventsQuery,
  eventsForPillarQuery,
} from "@/sanity/lib/queries";
import {
  EVENTS as STATIC_EVENTS,
  type EventItem,
  type PillarSlug,
} from "@/lib/content";

// Short TTL in dev so CMS edits show on the next refresh without
// nuking .next/cache. 1-hour prod TTL is the safety net behind the
// webhook (which invalidates instantly on publish).
const REVALIDATE_SECONDS =
  process.env.NODE_ENV === "development" ? 5 : 60 * 60;

type SanityImage = {
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

type SanityEvent = {
  _id: string;
  title: string;
  slug: string | null;
  startsAt: string;
  dateLabel: string;
  location: string;
  blurb: string;
  image: SanityImage | null;
  pillars: string[] | null;
  ctaLabel: string | null;
  ctaHref: string | null;
};

function toEventItem(doc: SanityEvent): EventItem {
  // Derive `day` + `month` from the canonical ISO date so editors only
  // have to set one field. `dateLabel` is reserved for the longer
  // human-friendly string we might show elsewhere.
  const d = new Date(doc.startsAt);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase();

  // CDN-optimised image URL — width 800 fits the largest layout slot
  // (single column on mobile) and Next/Image's `sizes` then picks the
  // right variant per breakpoint. `auto('format')` ships WebP/AVIF.
  const imageSrc = doc.image?.asset
    ? urlForImage(doc.image).width(800).auto("format").url()
    : "";

  return {
    id: doc._id,
    day,
    month,
    title: doc.title,
    location: doc.location,
    href: doc.ctaHref || "#contact",
    image: {
      src: imageSrc,
      alt: doc.image?.alt ?? doc.title,
    },
    pillars: (doc.pillars ?? []) as PillarSlug[],
  };
}

export async function getUpcomingEvents(): Promise<EventItem[]> {
  try {
    const docs = await sanityClient.fetch<SanityEvent[]>(
      upcomingEventsQuery,
      {},
      {
        // Cache aggressively — events change daily at most. The webhook
        // at /api/revalidate flushes this tag on any write.
        next: { revalidate: REVALIDATE_SECONDS, tags: ["events"] },
      }
    );
    if (!docs || docs.length === 0) return STATIC_EVENTS;
    return docs.map(toEventItem);
  } catch {
    // Network / auth blip — never break the page, fall back to static.
    return STATIC_EVENTS;
  }
}

export async function getEventsForPillar(
  pillar: PillarSlug,
  limit = 3
): Promise<EventItem[]> {
  try {
    const docs = await sanityClient.fetch<SanityEvent[]>(
      eventsForPillarQuery,
      { pillar, limit },
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["events", `events:${pillar}`] } }
    );
    if (!docs || docs.length === 0) {
      return STATIC_EVENTS.filter((e) => e.pillars.includes(pillar)).slice(
        0,
        limit
      );
    }
    return docs.map(toEventItem);
  } catch {
    return STATIC_EVENTS.filter((e) => e.pillars.includes(pillar)).slice(
      0,
      limit
    );
  }
}
