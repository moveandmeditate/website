import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import type { Pillar, PillarDeepSection } from "@/lib/content";

/** Renders the optional deep-section strips between a pillar's intro and
 *  its offerings grid. Each strip is half image, half copy, with the side
 *  alternating per index unless an explicit `imageSide` is set. The strip
 *  ids back the `/pillar#anchor` deep links used by the home Experiences
 *  tiles, so a click on "Breathwork" from the home page lands here. */
export function PillarDeepSections({ pillar }: { pillar: Pillar }) {
  const sections = pillar.deepSections;
  if (!sections || sections.length === 0) return null;
  return (
    <div className="bg-bg">
      {sections.map((section, idx) => (
        <DeepSection key={section.id} section={section} index={idx} />
      ))}
    </div>
  );
}

function DeepSection({
  section,
  index,
}: {
  section: PillarDeepSection;
  index: number;
}) {
  const imageOnLeft =
    section.imageSide === "left" || (section.imageSide === undefined && index % 2 === 0);
  // Tone the band background lightly so consecutive sections separate without
  // ever feeling like a "wall of slides".
  const band = index % 2 === 0 ? "bg-bg" : "bg-bg-2";
  return (
    <section
      id={section.id}
      data-section
      aria-labelledby={`${section.id}-heading`}
      className={`${band} scroll-mt-[var(--header-h)]`}
    >
      <div className="container-page py-14 lg:py-20">
        <div
          className={`grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-14 items-center ${
            imageOnLeft ? "" : "lg:[&>*:first-child]:order-2"
          }`}
        >
          <div className="relative aspect-[5/4] lg:aspect-[6/5] overflow-hidden bg-bg-3">
            <MediaFrame
              src={section.image.src}
              alt={section.image.alt}
              className="absolute inset-0"
              sizes="(min-width: 1024px) 50vw, 100vw"
              watermark={false}
            />
          </div>
          <div>
            <p className="text-eyebrow text-muted">{section.eyebrow}</p>
            <h2
              id={`${section.id}-heading`}
              className="mt-3 text-section-title text-[clamp(1.6rem,3vw,2.1rem)] max-w-[22ch]"
            >
              {section.title}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-4 text-[13px] leading-[1.9] text-ink-2 max-w-[46ch]"
              >
                {p}
              </p>
            ))}
            {section.bullets.length > 0 && (
              <ul className="mt-6 space-y-2.5 max-w-[46ch]">
                {section.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[12.5px] leading-[1.6] text-ink-2"
                  >
                    <Check
                      className="mt-[3px] size-4 stroke-[1.6] text-gold-dk shrink-0"
                      aria-hidden
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.cta && (
              <Link
                href={section.cta.href}
                className="mt-7 inline-flex items-center gap-2 text-[11px] tracking-[0.24em] font-medium border-b border-ink pb-1 hover:text-gold-dk hover:border-gold-dk transition-colors"
              >
                {section.cta.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
