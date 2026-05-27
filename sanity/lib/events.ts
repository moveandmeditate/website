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
import {
  upcomingEventsQuery,
  eventsForPillarQuery,
} from "@/sanity/lib/queries";
import {
  EVENTS as STATIC_EVENTS,
  type EventItem,
  type PillarSlug,
} from "@/lib/content";

type SanityImage = {
  src: string | null;
  alt: string | null;
  lqip?: string | null;
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

  // Sanity returns `asset->url` directly via the IMAGE_FRAGMENT in the
  // query. For Phase 1 we use the URL as-is — no on-the-fly width
  // transforms. Easy to swap to `urlForImage(...).width(800).url()` once
  // we want responsive variants per breakpoint.
  return {
    id: doc._id,
    day,
    month,
    title: doc.title,
    location: doc.location,
    href: doc.ctaHref || "#contact",
    image: {
      src: doc.image?.src ?? "",
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
        next: { revalidate: 60 * 60, tags: ["events"] },
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
      { next: { revalidate: 60 * 60, tags: ["events", `events:${pillar}`] } }
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
