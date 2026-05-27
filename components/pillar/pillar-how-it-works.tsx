import type { Pillar } from "@/lib/content";

/**
 * 3-step process strip per pillar. Vertical on mobile, 3-column horizontal
 * from md+. Numbers float without per-cell borders so the line work doesn't
 * collide at column gaps.
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

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
          {pillar.howItWorks.steps.map((step) => (
            <li key={step.number} className="flex flex-col">
              <span
                aria-hidden
                className="font-serif text-[1.85rem] leading-none tracking-[0.16em] text-gold-dk"
              >
                {step.number}
              </span>
              <span
                aria-hidden
                className="mt-3 mb-5 block h-px w-10 bg-line-2"
              />
              <h3 className="font-serif text-[1.35rem] leading-tight tracking-[0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.8] text-ink-2 max-w-[42ch]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
