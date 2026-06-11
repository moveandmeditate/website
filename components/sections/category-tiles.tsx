"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { TILES, type Tile } from "@/lib/content";

type TileCardProps = {
  tile: Tile;
  /** Marquee duplicate row — hide from a11y tree + keyboard. */
  ariaHidden?: boolean;
  /** Layout variant. Marquee = fixed-width tiles in a horizontal track.
   *  Stack = full-width tile stretched to the container. */
  variant: "marquee" | "stack";
};

function TileCard({ tile, ariaHidden, variant }: TileCardProps) {
  const wrapperClass =
    variant === "marquee"
      ? "shrink-0 px-1 first:pl-0"
      : "w-full";

  const anchorWidth =
    variant === "marquee"
      ? "w-[78vw] sm:w-[420px] md:w-[460px]"
      : "w-full";

  return (
    <li className={wrapperClass} aria-hidden={ariaHidden ? "true" : undefined}>
      <a
        href={tile.href}
        tabIndex={ariaHidden ? -1 : 0}
        draggable={false}
        className={`group relative block h-[280px] md:h-[320px] ${anchorWidth} overflow-hidden focus-visible:outline-2 focus-visible:outline-ink bg-bg-2`}
      >
        <MediaFrame
          src={tile.image.src}
          alt={ariaHidden ? "" : tile.image.alt}
          className="absolute inset-0"
          sizes={
            variant === "marquee"
              ? "(min-width: 768px) 460px, 78vw"
              : "100vw"
          }
          watermark={false}
        />
        <div
          className={
            variant === "stack"
              ? "absolute inset-0 bg-gradient-to-r from-[var(--bg-2)]/95 via-[var(--bg-2)]/40 to-transparent"
              : "absolute inset-0 bg-gradient-to-r from-[var(--bg-2)] via-[var(--bg-2)]/55 to-transparent"
          }
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-9">
          <div>
            <p className="text-eyebrow text-muted">{tile.eyebrow}</p>
            <h3 className="font-serif text-[2rem] md:text-[2.4rem] font-normal tracking-[0.16em] mt-1 text-ink relative pb-3">
              {tile.title}
              <span className="absolute left-0 bottom-0 h-px w-8 bg-ink" aria-hidden />
            </h3>
            <ul className="mt-5 space-y-1 text-[12px] tracking-[0.22em] text-ink-2 font-medium">
              {tile.tags.map((t) => (
                <li key={t}>{t}.</li>
              ))}
            </ul>
          </div>

          <span className="self-start text-ink text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight className="size-6" aria-hidden />
          </span>
        </div>
      </a>
    </li>
  );
}

/** Approx pixel width of one tile (incl. the 4px `px-1` gutter). Used for
 *  the keyboard / arrow-click step amount. */
const TILE_STEP_PX = 468;
/** Auto-scroll speed in px/frame. ~24 px/s at 60 fps — same languid pace as
 *  the previous CSS marquee (60 s / full lap). */
const AUTO_SCROLL_PX_PER_FRAME = 0.4;

function DesktopMarquee() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const hoveredRef = useRef(false);
  const [showArrows, setShowArrows] = useState(false);

  // Auto-scroll loop. Pauses while the user is hovering (so the prev/next
  // buttons feel responsive) and seamlessly wraps when scrollLeft hits the
  // half-way mark — the second TILE copy below lines up exactly with the
  // first, so the user never sees the seam.
  //
  // We keep an internal float `offset` because `scrollLeft` rounds writes
  // to integer pixels; a 0.4 px-per-frame increment would otherwise be
  // truncated to zero and the marquee would never start. Each frame we add
  // the float delta, then floor it onto the actual `scrollLeft`.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let raf = 0;
    let offset = scroller.scrollLeft;
    let lastObservedScrollLeft = scroller.scrollLeft;

    const tick = () => {
      // Re-sync `offset` whenever an external scroll (arrow click, user
      // wheel) has moved the scrollLeft away from our last write. This
      // prevents the loop from snapping back to its own internal value.
      if (Math.abs(scroller.scrollLeft - lastObservedScrollLeft) > 1) {
        offset = scroller.scrollLeft;
      }

      if (!hoveredRef.current) {
        const half = scroller.scrollWidth / 2;
        if (half > 0) {
          offset += AUTO_SCROLL_PX_PER_FRAME;
          if (offset >= half) offset -= half;
          scroller.scrollLeft = offset;
          lastObservedScrollLeft = scroller.scrollLeft;
        }
      } else {
        lastObservedScrollLeft = scroller.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const step = (dir: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: dir * TILE_STEP_PX, behavior: "smooth" });
  };

  // Duplicate the tile list so the wrap-around in the rAF loop is seamless.
  const sets = [TILES, TILES] as const;

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => {
        hoveredRef.current = true;
        setShowArrows(true);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        setShowArrows(false);
      }}
      onFocusCapture={() => {
        hoveredRef.current = true;
        setShowArrows(true);
      }}
      onBlurCapture={(e) => {
        // Only collapse when focus is moving OUTSIDE the carousel.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          hoveredRef.current = false;
          setShowArrows(false);
        }
      }}
    >
      <ul
        ref={scrollerRef}
        aria-label="Pillars"
        // No `scroll-smooth` or `snap-x` here:
        //  - `scroll-smooth` would treat every rAF `scrollLeft +=` as a
        //    queued tween, so the scroller never actually advances.
        //  - `snap-x` snaps the scrollLeft back to the nearest card after
        //    every tiny rAF step, so the marquee can't drift smoothly.
        // Arrow clicks call `scrollBy({behavior:"smooth"})` explicitly when
        // a smooth animation is wanted.
        className="relative z-0 flex overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {sets.map((set, setIdx) =>
          set.map((tile) => (
            <TileCard
              key={`${setIdx}-${tile.id}`}
              tile={tile}
              variant="marquee"
              ariaHidden={setIdx > 0}
            />
          ))
        )}
      </ul>

      {/* Manual step controls. Sit ABOVE the tile cards (z-20) so the click
          lands on the button, not the underlying link. The transparent
          gutter container catches no events (`pointer-events-none`) so the
          mouseleave on the parent still fires correctly when the cursor
          drifts off the marquee. Buttons themselves re-enable pointer
          events. */}
      <div
        aria-hidden={!showArrows}
        className={`pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 transition-opacity duration-200 ${
          showArrows ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => step(-1)}
          tabIndex={showArrows ? 0 : -1}
          aria-label="Previous pillar"
          className={`pointer-events-auto grid size-11 place-items-center rounded-full bg-bg/95 text-ink border border-line shadow-[0_8px_20px_-10px_rgba(26,26,26,0.4)] hover:bg-ink hover:text-bg transition-colors ${
            showArrows ? "" : "pointer-events-none"
          }`}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          tabIndex={showArrows ? 0 : -1}
          aria-label="Next pillar"
          className={`pointer-events-auto grid size-11 place-items-center rounded-full bg-bg/95 text-ink border border-line shadow-[0_8px_20px_-10px_rgba(26,26,26,0.4)] hover:bg-ink hover:text-bg transition-colors ${
            showArrows ? "" : "pointer-events-none"
          }`}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export function CategoryTiles() {
  return (
    <section aria-label="Our pillars" className="bg-bg-2 py-1">
      {/* Anchor targets for the #move and #meditate nav links live on the section,
         not on the moving tiles, so smooth-scroll lands correctly. */}
      <span id="move" data-section className="block scroll-mt-[var(--header-h)]" aria-hidden />
      <span id="meditate" data-section className="block scroll-mt-[var(--header-h)]" aria-hidden />

      {/* Mobile: simple vertical stack — easier to read + no offscreen text */}
      <ul className="flex flex-col gap-1 md:hidden">
        {TILES.map((tile) => (
          <TileCard key={tile.id} tile={tile} variant="stack" />
        ))}
      </ul>

      <DesktopMarquee />
    </section>
  );
}
