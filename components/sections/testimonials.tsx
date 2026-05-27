import { Star } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      data-section
      aria-labelledby="testimonials-heading"
      className="bg-bg"
    >
      <div className="container-page py-16 lg:py-20">
        <div className="mb-8">
          <p className="text-eyebrow text-ink">WHAT PEOPLE FEEL</p>
          <h2 id="testimonials-heading" className="sr-only">
            Testimonials
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.id}
              className="bg-bg-3 p-6 relative min-h-[180px] flex flex-col"
            >
              <div
                className="flex items-center gap-0.5 text-gold mb-3"
                aria-label="5 out of 5 stars"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-3.5 fill-gold stroke-gold" aria-hidden />
                ))}
              </div>
              <p className="text-[13px] leading-[1.7] text-ink-2 flex-1 pr-12">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <div className="text-[11px] tracking-[0.18em] font-semibold text-ink uppercase">
                    {t.name}
                  </div>
                  <div className="text-[10px] tracking-[0.18em] text-muted mt-0.5 uppercase">
                    {t.context}
                  </div>
                </div>
                <MediaFrame
                  src={t.avatar.src}
                  alt=""
                  className="size-11 rounded-full border border-line-2 shrink-0"
                  sizes="44px"
                  watermark={false}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
