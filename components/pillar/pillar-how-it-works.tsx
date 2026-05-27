import type { Pillar } from "@/lib/content";

/**
 * 3-step process strip per pillar — gives the visitor a clear "what happens
 * next" so the marketing copy converts to an action. Vertical on mobile,
 * 3-column horizontal from md+.
 */
export function PillarHowItWorks({ pillar }: { pillar: Pillar }) {
  return (
    <section
      aria-labelledby="pillar-process-heading"
      className="bg-bg"
    >
      <div className="container-page py-16 lg:py-24">
        <div className="mb-10 lg:mb-12 max-w-[44ch]">
          <p className="text-eyebrow text-muted">HOW IT WORKS</p>
          <h2
            id="pillar-process-heading"
            className="text-section-title text-[clamp(1.85rem,3.4vw,2.4rem)] mt-2"
          >
            {pillar.howItWorks.title}
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {pillar.howItWorks.steps.map((step, i) => (
            <li
              key={step.number}
              className="relative border-t border-line-2 pt-6 md:pl-0"
            >
              <span
                className="absolute -top-3 left-0 bg-bg pr-3 font-serif text-[1.05rem] tracking-[0.16em] text-gold-dk"
                aria-hidden
              >
                {step.number}
              </span>
              <h3 className="font-serif text-[1.35rem] leading-tight tracking-[0.02em] text-ink mt-1">
                {step.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.8] text-ink-2 max-w-[42ch]">
                {step.body}
              </p>
              {i < pillar.howItWorks.steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden md:block absolute top-0 right-[-1rem] lg:right-[-1.5rem] h-px w-8 bg-line-2 translate-y-[1px]"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
