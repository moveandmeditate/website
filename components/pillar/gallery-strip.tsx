import { MediaFrame } from "@/components/media-frame";
import type { Pillar } from "@/lib/content";

/**
 * Editorial gallery strip. Desktop: 4-column grid with gentle hover scale.
 * Mobile: horizontal scroll-snap so the row keeps its proportions on phones.
 */
export function GalleryStrip({ pillar }: { pillar: Pillar }) {
  return (
    <section aria-labelledby="gallery-heading" className="bg-bg">
      <div className="container-page py-14 lg:py-20">
        <div className="mb-8">
          <p className="text-eyebrow text-muted">IN PRACTICE</p>
          <h2
            id="gallery-heading"
            className="text-section-title text-[clamp(1.65rem,3vw,2.1rem)] mt-2"
          >
            A glimpse from the studio
          </h2>
        </div>

        <ul
          className="
            flex gap-3 overflow-x-auto snap-x snap-mandatory
            md:grid md:grid-cols-4 md:overflow-visible md:snap-none
            [scrollbar-width:none] [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {pillar.gallery.map((img, i) => (
            <li
              key={`${img.src}-${i}`}
              className="
                relative shrink-0 snap-start w-[78%] sm:w-[55%]
                md:w-auto md:shrink h-72 md:h-80 overflow-hidden bg-bg-3
              "
            >
              <MediaFrame
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 transition-transform duration-500 hover:scale-[1.03]"
                sizes="(min-width: 768px) 25vw, 78vw"
                watermark={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
