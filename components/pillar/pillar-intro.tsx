import { Check } from "lucide-react";
import type { Pillar } from "@/lib/content";

export function PillarIntro({ pillar }: { pillar: Pillar }) {
  const { title, paragraphs, bullets } = pillar.intro;
  return (
    <section aria-labelledby="pillar-intro-heading" className="bg-bg">
      <div className="container-page py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-eyebrow text-muted">WHAT THIS IS</p>
          <h2
            id="pillar-intro-heading"
            className="text-section-title text-[clamp(1.85rem,3.6vw,2.4rem)] mt-3 max-w-[20ch]"
          >
            {title}
          </h2>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="mt-5 text-[13px] leading-[1.9] text-ink-2 max-w-[58ch]"
            >
              {p}
            </p>
          ))}
        </div>

        <ul className="border-t border-line-2 pt-5 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-10 space-y-4">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-1 flex size-5 shrink-0 items-center justify-center border border-line-2 bg-bg">
                <Check className="size-3 text-gold-dk" aria-hidden />
              </span>
              <span className="text-[13px] leading-[1.7] text-ink-2">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
