import { Star } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { TESTIMONIALS, type Pillar } from "@/lib/content";

export function PillarTestimonial({ pillar }: { pillar: Pillar }) {
  const t = TESTIMONIALS.find((x) => x.id === pillar.testimonialId);
  if (!t) return null;

  return (
    <section
      aria-labelledby="pillar-testi-heading"
      className="bg-bg-3"
    >
      <div className="container-page py-16 lg:py-24">
        <p id="pillar-testi-heading" className="text-eyebrow text-ink">
          WHAT PEOPLE FEEL
        </p>

        <figure className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end">
          <blockquote className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.35] text-ink max-w-[40ch]">
            <span className="text-gold-dk mr-2" aria-hidden>“</span>
            {t.quote}
            <span className="text-gold-dk ml-1" aria-hidden>”</span>
          </blockquote>

          <figcaption className="flex items-center gap-3">
            <MediaFrame
              src={t.avatar.src}
              alt=""
              className="size-14 rounded-full border border-line-2 shrink-0"
              sizes="56px"
              watermark={false}
            />
            <div>
              <div className="text-[12px] tracking-[0.18em] font-semibold text-ink uppercase">
                {t.name}
              </div>
              <div className="text-[10.5px] tracking-[0.18em] text-muted mt-0.5 uppercase">
                {t.context}
              </div>
              <div className="mt-2 flex gap-0.5" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-3 fill-gold stroke-gold" aria-hidden />
                ))}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
