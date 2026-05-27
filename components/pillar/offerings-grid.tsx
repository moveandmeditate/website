import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Pillar } from "@/lib/content";

export function OfferingsGrid({ pillar }: { pillar: Pillar }) {
  return (
    <section
      id="offerings"
      data-section
      aria-labelledby="offerings-heading"
      className="bg-bg-2"
    >
      <div className="container-page py-16 lg:py-24">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-eyebrow text-muted">OFFERINGS</p>
            <h2
              id="offerings-heading"
              className="text-section-title text-[clamp(1.85rem,3.4vw,2.4rem)] mt-2"
            >
              How we work together
            </h2>
          </div>
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.24em] font-medium border-b border-ink pb-1 hover:text-gold-dk hover:border-gold-dk transition-colors"
          >
            ENQUIRE
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillar.offerings.map((offer) => (
            <li
              key={offer.title}
              className="group relative bg-bg p-6 border border-line-2 flex flex-col h-full"
            >
              <h3 className="font-serif text-[1.4rem] leading-tight tracking-[0.02em] text-ink pb-3 relative">
                {offer.title}
                <span className="absolute left-0 bottom-0 h-px w-8 bg-ink" aria-hidden />
              </h3>
              <p className="mt-4 text-[12.5px] leading-[1.7] text-ink-2 flex-1">
                {offer.blurb}
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 text-[10px] tracking-[0.22em] font-semibold text-ink hover:text-gold-dk transition-colors"
              >
                {offer.ctaLabel ?? "ENQUIRE"}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
