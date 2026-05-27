import {
  Users,
  CalendarCheck,
  Globe,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { FOUNDER } from "@/lib/content";

const STAT_ICONS: Record<string, LucideIcon> = {
  users: Users,
  cal: CalendarCheck,
  globe: Globe,
  heart: Heart,
};

export function Founder() {
  return (
    <section
      id="founder"
      data-section
      aria-labelledby="founder-heading"
      className="bg-bg-3"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%]">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[480px]">
          <MediaFrame
            src={FOUNDER.portrait.src}
            alt={FOUNDER.portrait.alt}
            className="absolute inset-0"
            sizes="(min-width: 1024px) 40vw, 100vw"
            watermark
          />
          <div className="absolute inset-y-0 right-0 hidden lg:block w-1/4 bg-gradient-to-l from-[var(--bg-3)] to-transparent" />
        </div>

        <div className="container-page lg:px-12 py-14 lg:py-20 grid grid-cols-1 xl:grid-cols-[1.05fr_1fr] gap-10 xl:gap-14 items-center">
          <div>
            <p className="text-eyebrow text-muted">{FOUNDER.eyebrow}</p>
            <h2
              id="founder-heading"
              className="mt-3 text-section-title text-[clamp(1.85rem,3.8vw,2.4rem)] whitespace-pre-line max-w-[18ch]"
            >
              {FOUNDER.title}
            </h2>
            {FOUNDER.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-5 text-[13px] leading-[1.9] text-ink-2 max-w-[40ch]"
              >
                {p}
              </p>
            ))}
            <div className="mt-7">
              <div className="font-serif italic text-[1.6rem] text-ink leading-none">
                {FOUNDER.signature}
              </div>
              <div className="mt-2 text-[10px] tracking-[0.24em] text-muted font-medium">
                {FOUNDER.signatureLabel}
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-2 border-t border-l border-line-2">
            {FOUNDER.stats.map((stat) => {
              const Icon = STAT_ICONS[stat.icon];
              return (
                <li
                  key={stat.label}
                  className="border-b border-r border-line-2 px-4 py-6 text-center"
                >
                  <div className="h-9 flex items-center justify-center mb-3">
                    <Icon className="size-6 stroke-[1.4] text-ink" aria-hidden />
                  </div>
                  <div className="font-serif text-[2rem] leading-none text-gold-dk font-medium">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-[10px] tracking-[0.22em] text-muted font-medium whitespace-pre-line">
                    {stat.label}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
