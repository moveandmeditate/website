"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = { question: string; answer: string };

/**
 * FAQ accordion for blog articles. Client component because the open
 * state lives in React. Designed for keyboard a11y — each row is a
 * button, `aria-expanded` toggles, focus styles via global :focus-visible.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items?.length) return null;

  return (
    <section
      aria-labelledby="blog-faq-heading"
      className="mt-14 border-t border-line-2 pt-10"
    >
      <p className="text-eyebrow text-muted">FAQ</p>
      <h2
        id="blog-faq-heading"
        className="mt-2 text-section-title text-[1.65rem] lg:text-[1.9rem]"
      >
        Common questions
      </h2>
      <ul className="mt-6 divide-y divide-line-2 border-y border-line-2">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <li key={`${i}-${item.question}`}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : i)}
                className="w-full flex items-start justify-between gap-4 py-4 text-left"
              >
                <span className="text-[15px] font-medium text-ink">
                  {item.question}
                </span>
                <ChevronDown
                  className={`size-4 shrink-0 mt-1 text-ink-2 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
              {open ? (
                <div
                  role="region"
                  aria-label={item.question}
                  className="pb-5 pr-7 text-[14.5px] leading-[1.8] text-ink-2"
                >
                  {item.answer}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
