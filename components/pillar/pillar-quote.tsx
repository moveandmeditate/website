import type { Pillar } from "@/lib/content";

/**
 * Quiet contemplative band for a pillar's Sanskrit verse. Only rendered when
 * the pillar defines `quote` (currently Yoga — Bhagavad Gītā 6.19).
 *
 * Rendered as a dark "pause" band: the surrounding pillar sections are all
 * cream, so the ink background makes the verse read as a distinct meditative
 * moment (and cleanly separates it from the offerings section below, which
 * shares the cream tone).
 */
export function PillarQuote({
  quote,
}: {
  quote: NonNullable<Pillar["quote"]>;
}) {
  return (
    <section
      aria-label="Sanskrit verse"
      className="bg-ink text-bg"
    >
      <div className="container-page py-20 lg:py-28">
        <figure className="mx-auto max-w-2xl text-center">
          <p
            lang="sa"
            className="font-serif text-bg leading-[1.7] whitespace-pre-line text-[clamp(1.5rem,3.4vw,2.3rem)]"
          >
            {quote.sanskrit}
          </p>
          <p className="mt-5 text-[12px] tracking-[0.18em] italic text-bg/55">
            {quote.transliteration}
          </p>
          <blockquote className="mt-8 font-serif italic text-bg/85 leading-[1.5] text-[clamp(1.15rem,2.4vw,1.5rem)]">
            “{quote.translation}”
          </blockquote>
          <figcaption className="mt-8 text-eyebrow text-[var(--gold)]">
            {quote.source}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
