import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INVITE_HOST } from "@/lib/content";

/** Compact "invite Amisha" band — sits between Founder and WhyUs on the
 *  home page. Surfaces the speaking / judging / guest-artist invitations
 *  that don't fit the dance/yoga/wedding/corporate funnels but are still
 *  a real source of bookings. */
export function InviteHost() {
  return (
    <section
      id="invite"
      data-section
      aria-labelledby="invite-heading"
      className="bg-ink text-bg"
    >
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
          <div>
            <p className="text-eyebrow text-bg/70">{INVITE_HOST.eyebrow}</p>
            <h2
              id="invite-heading"
              className="mt-3 font-serif text-[clamp(1.65rem,3.2vw,2.1rem)] leading-[1.15] max-w-[24ch]"
            >
              {INVITE_HOST.title}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
              {INVITE_HOST.badges.map((b) => (
                <li
                  key={b}
                  className="border border-bg/40 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-bg/80"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-[13.5px] leading-[1.85] text-bg/85 max-w-[44ch]">
              {INVITE_HOST.body}
            </p>
            <Link
              href={INVITE_HOST.cta.href}
              className="inline-flex items-center gap-2 self-start bg-bg text-ink h-12 px-6 text-[11px] tracking-[0.22em] font-medium hover:bg-bg-2 transition-colors"
            >
              {INVITE_HOST.cta.label}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
