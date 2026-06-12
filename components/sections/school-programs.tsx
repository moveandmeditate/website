import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { SCHOOL_PROGRAMS } from "@/lib/content";

/** Half-image / half-copy band promoting school and campus engagements.
 *  Lives just below the InviteHost strip so the "non-funnel" booking
 *  surfaces (judging, hosting, school programmes) cluster together. */
export function SchoolPrograms() {
  return (
    <section
      id="schools"
      data-section
      aria-labelledby="schools-heading"
      className="bg-bg"
    >
      <div className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[5/4] lg:aspect-[6/5] overflow-hidden bg-bg-3 order-2 lg:order-1">
            <MediaFrame
              src={SCHOOL_PROGRAMS.image.src}
              alt={SCHOOL_PROGRAMS.image.alt}
              className="absolute inset-0"
              sizes="(min-width: 1024px) 50vw, 100vw"
              watermark={false}
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-eyebrow text-muted">{SCHOOL_PROGRAMS.eyebrow}</p>
            <h2
              id="schools-heading"
              className="mt-3 text-section-title text-[clamp(1.7rem,3.2vw,2.2rem)] max-w-[22ch]"
            >
              {SCHOOL_PROGRAMS.title}
            </h2>
            {SCHOOL_PROGRAMS.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-4 text-[13px] leading-[1.85] text-ink-2 max-w-[46ch]"
              >
                {p}
              </p>
            ))}

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-[52ch]">
              {SCHOOL_PROGRAMS.offerings.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-3 text-[12.5px] leading-[1.55] text-ink-2"
                >
                  <Check
                    className="mt-[3px] size-4 stroke-[1.6] text-gold-dk shrink-0"
                    aria-hidden
                  />
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            <Link
              href={SCHOOL_PROGRAMS.cta.href}
              className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.24em] font-medium border-b border-ink pb-1 hover:text-gold-dk hover:border-gold-dk transition-colors"
            >
              {SCHOOL_PROGRAMS.cta.label}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
