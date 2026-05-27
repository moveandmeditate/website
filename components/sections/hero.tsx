import { Play } from "lucide-react";
import { Logo } from "@/components/logo";
import { MediaFrame } from "@/components/media-frame";
import { HERO, type HeroSlide } from "@/lib/content";

const SLIDE_COUNT = HERO.slides.length;
const CYCLE_SECONDS = SLIDE_COUNT * 5; // 5s per slide → 25s total for 5 slides

/** Renders the stacked slides with staggered crossfade delays. */
function HeroCarousel({
  slides,
  startIndex,
  side,
}: {
  slides: HeroSlide[];
  startIndex: number;
  side: "left" | "right";
}) {
  return (
    <div className={side === "left" ? "absolute inset-y-0 left-0 hidden md:block md:w-[38%] lg:w-[36%]" : "absolute inset-y-0 right-0 hidden md:block md:w-[38%] lg:w-[36%]"}>
      {slides.map((slide, i) => {
        // Offset each side so left and right rarely show the same image at once
        const slotIndex = (i + startIndex) % SLIDE_COUNT;
        const delay = (slotIndex * CYCLE_SECONDS) / SLIDE_COUNT;
        return (
          <MediaFrame
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            className="hero-slide absolute inset-0"
            sizes="(min-width: 768px) 38vw, 0px"
            priority={slotIndex === 0}
            watermark={false}
            data-first={slotIndex === 0 ? "true" : undefined}
            style={
              {
                ["--delay" as string]: `${delay}s`,
                ["--hero-cycle" as string]: `${CYCLE_SECONDS}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export function Hero() {
  const slides = HERO.slides;
  const mobileSlide = slides[0];

  return (
    <section
      id="top"
      data-section
      aria-label="Move and Meditate"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[var(--bg)] via-[var(--bg-2)] to-[var(--bg-3)]"
    >
      {/* Side image carousels: hidden on mobile, visible from md up */}
      <div className="pointer-events-none absolute inset-0">
        <HeroCarousel slides={slides} startIndex={0} side="left" />
        <HeroCarousel
          slides={slides}
          startIndex={Math.floor(SLIDE_COUNT / 2)}
          side="right"
        />
        {/* Fade the inner edges of the side images into the center on md+ */}
        <div className="absolute inset-y-0 left-[26%] right-[58%] hidden md:block bg-gradient-to-r from-transparent to-[var(--bg)]" />
        <div className="absolute inset-y-0 right-[26%] left-[58%] hidden md:block bg-gradient-to-l from-transparent to-[var(--bg)]" />
      </div>

      {/* Mobile-only single background impression */}
      <div className="absolute inset-0 md:hidden">
        <MediaFrame
          src={mobileSlide.src}
          alt=""
          className="absolute inset-0 opacity-30"
          sizes="100vw"
          priority
          watermark={false}
        />
      </div>

      <div className="container-page relative z-10 flex min-h-[88svh] md:min-h-[760px] flex-col items-center justify-center pt-28 pb-24 text-center hero-stack">
        <Logo
          size={84}
          className="text-ink mb-5 hero-item"
          style={{ ["--d" as string]: "0.05s" } as React.CSSProperties}
        />

        <h1 className="font-serif text-ink leading-none">
          <span
            className="block text-[clamp(3rem,9vw,5.25rem)] tracking-[0.18em] hero-item"
            style={{ textIndent: "0.18em", ["--d" as string]: "0.15s" } as React.CSSProperties}
          >
            {HERO.word1}
          </span>
          <span
            className="my-3 flex items-center justify-center gap-4 text-[15px] italic tracking-[0.4em] text-ink-2 font-normal hero-item"
            style={{ ["--d" as string]: "0.25s" } as React.CSSProperties}
          >
            <span className="h-px w-[clamp(36px,6vw,72px)] bg-ink" aria-hidden />
            <span>{HERO.conjunction}</span>
            <span className="h-px w-[clamp(36px,6vw,72px)] bg-ink" aria-hidden />
          </span>
          <span
            className="block text-[clamp(3.5rem,11vw,6.5rem)] tracking-[0.16em] hero-item"
            style={{ textIndent: "0.16em", ["--d" as string]: "0.35s" } as React.CSSProperties}
          >
            {HERO.word2}
          </span>
        </h1>

        <p
          className="mt-7 text-[12px] tracking-[0.32em] text-ink-2 font-medium hero-item"
          style={{ ["--d" as string]: "0.5s" } as React.CSSProperties}
        >
          {HERO.tagline}
        </p>
        <p
          className="mt-2 text-[11px] tracking-[0.28em] text-muted-foreground hero-item"
          style={{ ["--d" as string]: "0.6s" } as React.CSSProperties}
        >
          {HERO.subTagline}
        </p>

        <div
          className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 hero-item"
          style={{ ["--d" as string]: "0.7s" } as React.CSSProperties}
        >
          <a
            href={HERO.primaryCta.href}
            className="inline-flex h-12 items-center justify-center bg-ink text-bg text-[11px] tracking-[0.24em] px-7 font-medium transition-colors hover:bg-ink-2"
          >
            {HERO.primaryCta.label}
          </a>
          <a
            href={HERO.secondaryCta.href}
            className="inline-flex h-12 items-center justify-center border border-ink text-ink text-[11px] tracking-[0.24em] px-7 font-medium transition-colors hover:bg-ink hover:text-bg"
          >
            {HERO.secondaryCta.label}
          </a>
        </div>

        <a
          href={HERO.watchStory.href}
          className="mt-7 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] text-ink-2 font-medium hover:text-ink transition-colors hero-item"
          style={{ ["--d" as string]: "0.8s" } as React.CSSProperties}
        >
          <span className="grid size-9 place-items-center rounded-full border border-ink">
            <Play className="size-3 fill-ink text-ink" aria-hidden />
          </span>
          {HERO.watchStory.label}
        </a>
      </div>
    </section>
  );
}
