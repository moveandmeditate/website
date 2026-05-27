import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { TILES, type Tile } from "@/lib/content";

const MARQUEE_DURATION = "60s"; // slow drift; pauses on hover via CSS

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
        className={`group relative block h-[280px] md:h-[320px] ${anchorWidth} overflow-hidden focus-visible:outline-2 focus-visible:outline-ink bg-bg-2`}
        aria-label={ariaHidden ? undefined : `${tile.title} — ${tile.eyebrow}`}
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

export function CategoryTiles() {
  // Duplicate the tile list so the marquee -50% translate lines up seamlessly.
  const marqueeSets = [TILES, TILES] as const;

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

      {/* md+ : seamless infinite marquee, pause on hover.
         NOTE: do NOT add `group` to this wrapper. Pause-on-hover is handled
         by CSS (`marquee-mask:hover .marquee-track`), and a stray `group`
         scope here makes every tile's `group-hover:` arrow respond to a
         hover on ANY tile. Per-tile `group` lives on each <a>. */}
      <div
        className="hidden md:block marquee-mask"
        style={{ ["--marquee-duration" as string]: MARQUEE_DURATION } as React.CSSProperties}
      >
        <ul className="marquee-track">
          {marqueeSets.map((set, setIdx) =>
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
      </div>
    </section>
  );
}
