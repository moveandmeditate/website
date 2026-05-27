import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import type { Pillar } from "@/lib/content";

/**
 * Pillar landing hero. Two-column on lg+, stacks on mobile.
 * Left: eyebrow + serif title + tagline + primary CTA.
 * Right: single hero image with a soft fade into the page background.
 */
export function PillarHero({ pillar }: { pillar: Pillar }) {
  return (
    <section
      data-section
      aria-labelledby="pillar-heading"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[var(--bg)] via-[var(--bg-2)] to-[var(--bg-3)]"
    >
      <div className="container-page grid lg:grid-cols-[1.05fr_1fr] items-center gap-10 lg:gap-12 pt-28 pb-16 md:pt-32 md:pb-20 lg:min-h-[78vh]">
        <div className="hero-item" style={{ ["--d" as string]: "0.05s" } as React.CSSProperties}>
          <p className="text-eyebrow text-muted">{pillar.eyebrow}</p>
          <h1
            id="pillar-heading"
            className="font-serif text-ink mt-3 text-[clamp(3rem,8vw,5.5rem)] tracking-[0.06em] leading-[1.02]"
          >
            {pillar.title}
          </h1>
          <p className="mt-5 max-w-[42ch] text-[14px] tracking-[0.04em] italic text-ink-2">
            {pillar.tagline}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex h-12 items-center justify-center bg-ink text-bg text-[11px] tracking-[0.24em] px-7 font-medium hover:bg-ink-2 transition-colors"
            >
              BOOK DISCOVERY CALL
            </Link>
            <Link
              href="#offerings"
              className="inline-flex h-12 items-center justify-center border border-ink text-ink text-[11px] tracking-[0.24em] px-7 font-medium hover:bg-ink hover:text-bg transition-colors gap-2"
            >
              SEE OFFERINGS <ArrowRight className="size-3" aria-hidden />
            </Link>
          </div>
        </div>

        <div
          className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[520px] hero-item"
          style={{ ["--d" as string]: "0.2s" } as React.CSSProperties}
        >
          <MediaFrame
            src={pillar.heroImage.src}
            alt={pillar.heroImage.alt}
            className="absolute inset-0"
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority
            watermark={false}
          />
          <div className="absolute inset-y-0 left-0 hidden lg:block w-1/5 bg-gradient-to-r from-[var(--bg-2)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
