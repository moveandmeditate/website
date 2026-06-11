import {
  Compass,
  Globe,
  Heart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { WHY_US, type WhyUsHighlight } from "@/lib/content";

const ICONS: Record<WhyUsHighlight["icon"], LucideIcon> = {
  compass: Compass,
  globe: Globe,
  heart: Heart,
  spark: Sparkles,
};

export function WhyUs() {
  const [lead, secondary, tertiary] = WHY_US.collage;
  return (
    <section
      id="why-us"
      data-section
      aria-labelledby="why-us-heading"
      className="bg-bg-2"
    >
      <div className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Asymmetric collage — one lead photo, two stacked thumbnails.
              Stays simple but reads as "studio life from multiple angles",
              not stock-y. */}
          <div className="grid grid-cols-5 grid-rows-2 gap-3 lg:gap-4 min-h-[420px]">
            <div className="col-span-3 row-span-2 relative overflow-hidden bg-bg-3">
              <MediaFrame
                src={lead.src}
                alt={lead.alt}
                className="absolute inset-0"
                sizes="(min-width: 1024px) 30vw, 60vw"
                watermark={false}
              />
            </div>
            <div className="col-span-2 row-span-1 relative overflow-hidden bg-bg-3">
              <MediaFrame
                src={secondary.src}
                alt={secondary.alt}
                className="absolute inset-0"
                sizes="(min-width: 1024px) 20vw, 40vw"
                watermark={false}
              />
            </div>
            <div className="col-span-2 row-span-1 relative overflow-hidden bg-bg-3">
              <MediaFrame
                src={tertiary.src}
                alt={tertiary.alt}
                className="absolute inset-0"
                sizes="(min-width: 1024px) 20vw, 40vw"
                watermark={false}
              />
            </div>
          </div>

          <div>
            <p className="text-eyebrow text-muted">{WHY_US.eyebrow}</p>
            <h2
              id="why-us-heading"
              className="mt-3 text-section-title text-[clamp(1.85rem,3.8vw,2.4rem)] max-w-[20ch]"
            >
              {WHY_US.title}
            </h2>
            {WHY_US.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-5 text-[13px] leading-[1.9] text-ink-2 max-w-[48ch]"
              >
                {p}
              </p>
            ))}

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
              {WHY_US.highlights.map((h) => {
                const Icon = ICONS[h.icon];
                return (
                  <li key={h.id} className="flex items-start gap-3">
                    <span className="grid size-9 place-items-center rounded-full border border-line-2 bg-bg shrink-0">
                      <Icon className="size-4 stroke-[1.6] text-gold-dk" aria-hidden />
                    </span>
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-ink">
                        {h.label}
                      </div>
                      <p className="mt-1 text-[12px] leading-[1.7] text-muted">
                        {h.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
