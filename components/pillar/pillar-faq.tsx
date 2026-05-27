"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/lib/content";

/**
 * Accessible FAQ accordion. One item open at a time. Uses semantic <button>
 * with `aria-expanded` so screen readers + keyboards work out of the box.
 *
 * Copy is SEO-tuned (long-tail question phrasing, ~40-60 word answers) and
 * also surfaced as FAQPage JSON-LD at the route level so Google can render
 * rich-result snippets.
 */
export function PillarFaq({ pillar }: { pillar: Pillar }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="pillar-faq-heading"
      className="bg-bg-2"
    >
      <div className="container-page py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-eyebrow text-muted">QUESTIONS</p>
          <h2
            id="pillar-faq-heading"
            className="text-section-title text-[clamp(1.85rem,3.6vw,2.4rem)] mt-2"
          >
            Frequently asked
          </h2>
          <p className="mt-4 text-[13px] leading-[1.8] text-muted max-w-[28ch]">
            Quick answers to the things most people ask before they book.
          </p>
        </div>

        <ul className="border-t border-line-2 divide-y divide-line-2">
          {pillar.faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={item.question} className="py-1">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 text-left py-5 group"
                >
                  <span className="font-serif text-[1.15rem] leading-snug tracking-[0.01em] text-ink">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-ink-2 transition-transform duration-300 mt-1",
                      isOpen && "rotate-180 text-gold-dk"
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  hidden={!isOpen}
                  className="pb-6 pr-10 text-[13px] leading-[1.85] text-ink-2 max-w-[60ch]"
                >
                  {item.answer}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
