import type { Metadata } from "next";
import { ArrowUpRight, Briefcase, Compass, Heart, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooterServer } from "@/components/site-footer-server";
import { CAREERS, CONTACT, SITE, type CareerRole } from "@/lib/content";
import { getEffectiveContact } from "@/sanity/lib/site-data";

export const metadata: Metadata = {
  title: "Careers",
  description: `Open roles at ${SITE.name} — videographers, photographers, editors, teachers and planners. Freelance or full-time, Bangalore-based, founder-led culture.`,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `Careers · ${SITE.name}`,
    description:
      "Practitioner-led studio hiring for videographer, photographer, video editor, social media manager, yoga teacher, dance teacher, sound healing teacher and event planner roles.",
    url: "/careers",
    type: "website",
  },
};

const OFFER_ICONS = [Compass, Briefcase, Heart, Sparkles];

/** Human-friendly chips for the `type` enum. We render at most two pills
 *  per role; "both" expands into a Full-time + Freelance pair so the offer
 *  is unambiguous at a glance. */
function typePills(type: CareerRole["type"]): string[] {
  switch (type) {
    case "full-time":
      return ["Full-time"];
    case "freelance":
      return ["Freelance"];
    case "both":
    default:
      return ["Full-time", "Freelance"];
  }
}

const CATEGORY_LABEL: Record<CareerRole["category"], string> = {
  creative: "CREATIVE",
  teaching: "TEACHING",
  operations: "OPERATIONS",
};

/** Build a pre-filled mailto link for the per-role Apply button. The
 *  subject + body are URL-encoded once at runtime so the apostrophes /
 *  spaces survive the click without breaking on quirky mail clients. */
function applyMailto(email: string, role: CareerRole): string {
  const subject = `Application: ${role.title} (${typePills(role.type).join(" / ")})`;
  const body = [
    `Hi Amisha,`,
    ``,
    `I'd like to apply for the ${role.title} role.`,
    ``,
    `A short note about me and links to my work:`,
    ``,
    `— `,
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default async function CareersPage() {
  const contact = await getEffectiveContact();
  const applyEmail = contact.email || CONTACT.email;
  const openHref = `mailto:${applyEmail}?subject=${encodeURIComponent(
    CAREERS.cta.emailSubject
  )}`;

  return (
    <>
      <SiteHeader contact={contact} />
      <main id="main">
        {/* HERO */}
        <section
          aria-labelledby="careers-heading"
          className="bg-bg-2 border-b border-line"
        >
          <div className="container-page py-20 lg:py-28">
            <p className="text-eyebrow text-muted">{CAREERS.eyebrow}</p>
            <h1
              id="careers-heading"
              className="mt-3 font-serif font-normal text-[clamp(2.4rem,5.6vw,3.8rem)] tracking-[0.01em] leading-[1.05] max-w-[18ch]"
            >
              {CAREERS.title}
            </h1>
            <div className="mt-8 max-w-[58ch] space-y-5">
              {CAREERS.intro.map((p, i) => (
                <p key={i} className="text-[14px] leading-[1.85] text-ink-2">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section
          aria-labelledby="careers-offer-heading"
          className="bg-bg"
        >
          <div className="container-page py-14 lg:py-20">
            <h2
              id="careers-offer-heading"
              className="text-eyebrow text-muted mb-8"
            >
              WHAT WE OFFER
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line-2">
              {CAREERS.whatWeOffer.map((item, idx) => {
                const Icon = OFFER_ICONS[idx % OFFER_ICONS.length];
                return (
                  <li
                    key={item.label}
                    className="bg-bg p-6 lg:p-7 flex flex-col gap-3"
                  >
                    <Icon className="size-6 stroke-[1.4] text-gold-dk" aria-hidden />
                    <h3 className="text-[12px] font-semibold tracking-[0.22em] uppercase text-ink">
                      {item.label}
                    </h3>
                    <p className="text-[12.5px] leading-[1.75] text-muted">
                      {item.body}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* OPEN ROLES */}
        <section
          id="open-roles"
          aria-labelledby="open-roles-heading"
          className="bg-bg-2"
        >
          <div className="container-page py-16 lg:py-24">
            <div className="max-w-[58ch]">
              <p className="text-eyebrow text-muted">OPEN ROLES</p>
              <h2
                id="open-roles-heading"
                className="mt-3 text-section-title text-[clamp(1.85rem,3.8vw,2.4rem)] max-w-[20ch]"
              >
                {CAREERS.rolesTitle}
              </h2>
              <p className="mt-5 text-[13px] leading-[1.85] text-ink-2">
                {CAREERS.rolesBody}
              </p>
            </div>

            <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CAREERS.roles.map((role) => (
                <li key={role.id}>
                  <article className="group h-full bg-bg p-6 lg:p-7 border border-line-2 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-[1.35rem] leading-tight tracking-[0.01em] text-ink">
                        {role.title}
                      </h3>
                      <span className="text-[9px] tracking-[0.28em] uppercase text-muted font-medium shrink-0 pt-1">
                        {CATEGORY_LABEL[role.category]}
                      </span>
                    </div>

                    <ul className="flex flex-wrap gap-2">
                      {typePills(role.type).map((p) => (
                        <li
                          key={p}
                          className="text-[10px] tracking-[0.2em] uppercase font-medium border border-line-2 px-2.5 py-1 text-ink-2"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>

                    <p className="text-[12.5px] leading-[1.75] text-muted flex-1">
                      {role.blurb}
                    </p>

                    <a
                      href={applyMailto(applyEmail, role)}
                      className="mt-auto inline-flex items-center gap-2 self-start text-[10px] tracking-[0.24em] font-semibold uppercase text-ink hover:text-gold-dk transition-colors border-b border-ink hover:border-gold-dk pb-1"
                    >
                      Apply for {role.title}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* OPEN APPLICATION CTA */}
        <section
          aria-labelledby="careers-open-heading"
          className="bg-ink text-bg"
        >
          <div className="container-page py-14 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
              <div>
                <p className="text-eyebrow text-bg/60">OPEN APPLICATION</p>
                <h2
                  id="careers-open-heading"
                  className="mt-3 font-serif text-[clamp(1.7rem,3.2vw,2.1rem)] leading-[1.15] max-w-[22ch]"
                >
                  {CAREERS.cta.title}
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[13.5px] leading-[1.85] text-bg/85 max-w-[46ch]">
                  {CAREERS.cta.subtitle}
                </p>
                <a
                  href={openHref}
                  className="inline-flex items-center gap-2 self-start bg-bg text-ink h-12 px-6 text-[11px] tracking-[0.22em] font-medium hover:bg-bg-2 transition-colors"
                >
                  {CAREERS.cta.ctaLabel}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooterServer contact={contact} />
    </>
  );
}
