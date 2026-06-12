import Link from "next/link";
import {
  Music2,
  Flower2,
  Wind,
  Hand,
  Briefcase,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { EXPERIENCES, type Experience } from "@/lib/content";

const ICONS: Record<Experience["icon"], LucideIcon> = {
  dance: Music2,
  yoga: Flower2,
  breath: Wind,
  bowl: Hand,
  case: Briefcase,
  school: GraduationCap,
};

export function Experiences() {
  return (
    <section
      aria-labelledby="experiences-heading"
      className="bg-bg"
    >
      <div className="container-page py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-12 items-start">
        <div>
          <p className="text-eyebrow text-muted">WHAT WE OFFER</p>
          <h2
            id="experiences-heading"
            className="text-section-title text-[clamp(1.85rem,4vw,2.5rem)] mt-3 max-w-[14ch]"
          >
            Experiences that elevate
          </h2>
          <p className="mt-5 max-w-[28ch] text-[13px] leading-[1.85] text-muted">
            Holistic experiences designed to move your body, calm your mind and elevate your everyday life.
          </p>
          <p className="mt-4 max-w-[32ch] text-[11px] tracking-[0.18em] uppercase text-ink-2 font-medium">
            Offline in Bangalore · Online sessions worldwide
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:border-l lg:border-line">
          {EXPERIENCES.map((exp) => {
            const Icon = ICONS[exp.icon];
            return (
              <li
                key={exp.id}
                className="border-b lg:border-b-0 lg:border-r border-line"
              >
                <Link
                  href={exp.href}
                  className="group block h-full p-5 lg:px-5 lg:py-6 text-center transition-colors hover:bg-bg-2 focus-visible:bg-bg-2 focus-visible:outline-none"
                >
                  <div className="h-16 flex items-center justify-center mb-4">
                    <Icon className="size-9 stroke-[1.4] text-ink" aria-hidden />
                  </div>
                  <h3 className="text-[12px] font-semibold tracking-[0.22em] uppercase text-ink mb-3 group-hover:text-gold-dk group-focus-visible:text-gold-dk transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-[12px] leading-[1.7] text-muted">{exp.body}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
