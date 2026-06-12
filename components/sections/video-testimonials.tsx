"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VideoTestimonial } from "@/lib/content";

type Props = { items: VideoTestimonial[] };

/** Vertical 9:16 video testimonials. Capped at 4 by the data fetcher; we
 *  treat anything past that as defensive trimming here too. Each card is
 *  a single <video> with a custom play/mute overlay — no third-party
 *  player needed, no extra hydration cost. */
export function VideoTestimonials({ items }: Props) {
  const trimmed = items.slice(0, 4);
  if (trimmed.length === 0) return null;
  return (
    <section
      id="video-testimonials"
      data-section
      aria-labelledby="video-testimonials-heading"
      className="bg-bg"
    >
      <div className="container-page py-14 lg:py-20">
        <div className="mb-8 lg:mb-10">
          <p className="text-eyebrow text-muted">IN THEIR OWN WORDS</p>
          <h2
            id="video-testimonials-heading"
            className="mt-3 text-section-title text-[clamp(1.6rem,3vw,2.1rem)] max-w-[22ch]"
          >
            Video notes from the studio.
          </h2>
        </div>

        <ul
          className={cn(
            "grid grid-cols-2 gap-3 sm:gap-4",
            trimmed.length === 1 && "sm:grid-cols-1 max-w-[260px]",
            trimmed.length === 2 && "sm:grid-cols-2",
            trimmed.length === 3 && "sm:grid-cols-3",
            trimmed.length === 4 && "sm:grid-cols-4"
          )}
        >
          {trimmed.map((t) => (
            <li key={t.id}>
              <VideoCard item={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function VideoCard({ item }: { item: VideoTestimonial }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
  };
  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <figure className="group relative overflow-hidden bg-bg-3 aspect-[9/16]">
      <video
        ref={ref}
        src={item.videoUrl}
        poster={item.poster.src || undefined}
        muted={muted}
        playsInline
        preload="metadata"
        controlsList="nodownload"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        aria-label={`Video testimonial from ${item.name}`}
      />

      {/* Fallback poster img when the <video> can't paint a frame yet —
          Sanity-resolved URLs go through next/image so we still get a
          tiny LQIP feel without paying for the optimisation pipeline. */}
      {!playing && item.poster.src && (
        <Image
          src={item.poster.src}
          alt={item.poster.alt}
          fill
          sizes="(min-width: 1024px) 280px, 50vw"
          className="object-cover pointer-events-none"
          unoptimized
        />
      )}

      {/* Gradient ↔ name plate at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-3 sm:p-4">
        <figcaption className="text-bg">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase">
            {item.name}
          </div>
          <div className="mt-0.5 text-[10px] tracking-[0.22em] uppercase text-bg/75">
            {item.context}
          </div>
        </figcaption>
      </div>

      {/* Center play / pause button */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause video" : "Play video"}
        className={cn(
          "absolute inset-0 m-auto grid size-14 place-items-center rounded-full bg-bg/90 text-ink transition-opacity",
          playing
            ? "opacity-0 group-hover:opacity-100"
            : "opacity-100"
        )}
      >
        {playing ? (
          <Pause className="size-5" aria-hidden />
        ) : (
          <Play className="size-5 translate-x-[1px]" aria-hidden />
        )}
      </button>

      {/* Mute toggle pinned top-right */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-bg/85 text-ink hover:bg-bg transition-colors"
      >
        {muted ? (
          <VolumeX className="size-3.5" aria-hidden />
        ) : (
          <Volume2 className="size-3.5" aria-hidden />
        )}
      </button>
    </figure>
  );
}
