import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { TILES, type Tile } from "@/lib/content";

const MARQUEE_DURATION = "60s"; // slow drift; pauses on hover via CSS

function TileCard({
  tile,
  ariaHidden,
}: {
  tile: Tile;
  ariaHidden?: boolean;
}) {
  return (
    <li
      className="shrink-0 px-1 first:pl-0"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      <a
        href={tile.href}
        tabIndex={ariaHidden ? -1 : 0}
        className="group relative block h-[280px] md:h-[320px] w-[78vw] sm:w-[420px] md:w-[460px] overflow-hidden focus-visible:outline-2 focus-visible:outline-ink bg-bg-2"
        aria-label={ariaHidden ? undefined : `${tile.title} — ${tile.eyebrow}`}
      >
        <MediaFrame
          src={tile.image.src}
          alt={ariaHidden ? "" : tile.image.alt}
          className="absolute inset-0"
          sizes="(min-width: 768px) 460px, 78vw"
          watermark={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-2)] via-[var(--bg-2)]/55 to-transparent" />

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
  // Duplicate the tile list so the -50% translate lines up seamlessly.
  const sets = [TILES, TILES] as const;

  return (
    <section
      aria-label="Our pillars"
      className="bg-bg-2 py-1"
    >
      {/* Anchor targets for the #move and #meditate nav links live on the section,
         not on the moving tiles, so smooth-scroll lands correctly. */}
      <span id="move" data-section className="block scroll-mt-[var(--header-h)]" aria-hidden />
      <span id="meditate" data-section className="block scroll-mt-[var(--header-h)]" aria-hidden />

      <div
        className="marquee-mask group"
        style={{ ["--marquee-duration" as string]: MARQUEE_DURATION } as React.CSSProperties}
      >
        <ul className="marquee-track">
          {sets.map((set, setIdx) =>
            set.map((tile) => (
              <TileCard
                key={`${setIdx}-${tile.id}`}
                tile={tile}
                ariaHidden={setIdx > 0}
              />
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
