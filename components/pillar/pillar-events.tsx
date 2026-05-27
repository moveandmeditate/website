import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { eventsForPillar, type PillarSlug } from "@/lib/content";

/**
 * Pillar events strip.
 * Filters the shared EVENTS list by the current pillar's slug.
 * Renders nothing when no events match — keeps the page tight.
 *
 * Migration TODO (Sanity): replace `eventsForPillar()` with a GROQ fetch keyed
 * by pillar tag once the CMS lands.
 */
export function PillarEvents({ pillar }: { pillar: PillarSlug }) {
  const events = eventsForPillar(pillar, 3);
  if (events.length === 0) return null;

  return (
    <section
      aria-labelledby="pillar-events-heading"
      className="bg-bg"
    >
      <div className="container-page py-14 lg:py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-eyebrow text-muted">UPCOMING</p>
            <h2
              id="pillar-events-heading"
              className="text-section-title text-[clamp(1.6rem,3vw,2rem)] mt-2"
            >
              Events &amp; workshops
            </h2>
          </div>
          <Link
            href="/#events"
            className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.24em] font-medium border-b border-ink pb-1 hover:text-gold-dk hover:border-gold-dk transition-colors"
          >
            VIEW ALL <ArrowRight className="size-3" aria-hidden />
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((evt) => (
            <li
              key={evt.id}
              className="group relative min-h-[120px] sm:h-36 overflow-hidden bg-bg-3"
            >
              <MediaFrame
                src={evt.image.src}
                alt={evt.image.alt}
                className="absolute inset-0"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                watermark={false}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-3)] via-[var(--bg-3)]/85 to-transparent" />
              <div className="relative z-10 flex items-start gap-3 sm:gap-4 p-3 sm:p-4 h-full">
                <div className="flex flex-col items-center justify-center w-11 shrink-0 bg-bg/85 border border-line-2 px-1 py-1.5 text-center">
                  <span className="font-serif text-[1.25rem] leading-none font-medium text-ink">
                    {evt.day}
                  </span>
                  <span className="mt-0.5 text-[9px] tracking-[0.18em] font-medium text-muted">
                    {evt.month}
                  </span>
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-2 sm:justify-between sm:h-full">
                  <div>
                    <h3 className="text-[11px] font-semibold tracking-[0.16em] text-ink uppercase leading-snug">
                      {evt.title}
                    </h3>
                    <p className="text-[11px] text-muted mt-1">{evt.location}</p>
                  </div>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1 text-[10px] tracking-[0.22em] font-semibold text-ink hover:text-gold-dk transition-colors"
                  >
                    BOOK NOW
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
