import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PILLAR_COPY: Record<
  string,
  { eyebrow: string; title: string; subtitle: string; ctaLabel: string; href: string }
> = {
  dance: {
    eyebrow: "MOVE",
    title: "Ready to take your first class?",
    subtitle:
      "Group sessions across Bollywood, contemporary and folk, plus private + wedding prep.",
    ctaLabel: "EXPLORE DANCE",
    href: "/dance",
  },
  yoga: {
    eyebrow: "MEDITATE",
    title: "Find a yoga practice that fits you.",
    subtitle:
      "Vinyasa, restorative, breathwork, sound healing and yoga nidra — in Bangalore or online.",
    ctaLabel: "EXPLORE YOGA",
    href: "/yoga",
  },
  weddings: {
    eyebrow: "OCCASIONS",
    title: "Choreography for your wedding.",
    subtitle:
      "Sangeet sets, couple dances, family routines, full multi-day performances.",
    ctaLabel: "EXPLORE WEDDINGS",
    href: "/weddings",
  },
  corporate: {
    eyebrow: "TEAMS",
    title: "Wellness for your team.",
    subtitle:
      "Workshops, weekly drop-ins and quarterly offsites for Bangalore tech + creative teams.",
    ctaLabel: "EXPLORE CORPORATE",
    href: "/corporate",
  },
};

/** Inline CTA card rendered after the blog post body — points back to
 *  the related pillar so reading momentum converts into a click toward
 *  the conversion surface. */
export function BlogPillarCta({ pillar }: { pillar: string }) {
  const copy = PILLAR_COPY[pillar];
  if (!copy) return null;
  return (
    <aside
      aria-label={`Learn more about ${pillar}`}
      className="mt-14 bg-bg-3 p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-[1.05fr_auto] items-center gap-5 lg:gap-8"
    >
      <div>
        <p className="text-eyebrow text-muted">{copy.eyebrow}</p>
        <h3 className="mt-2 text-section-title text-[1.55rem] lg:text-[1.85rem] text-ink">
          {copy.title}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.7] text-ink-2 max-w-[58ch]">
          {copy.subtitle}
        </p>
      </div>
      <Link
        href={copy.href}
        className="self-start lg:self-auto inline-flex items-center gap-2 bg-ink text-bg text-[11px] tracking-[0.22em] font-medium px-6 h-12 hover:bg-ink-2 transition-colors"
      >
        {copy.ctaLabel}
        <ArrowRight className="size-3.5" aria-hidden />
      </Link>
    </aside>
  );
}
