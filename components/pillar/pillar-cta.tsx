import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { WhatsAppIcon } from "@/components/social-icons";
import { type Pillar } from "@/lib/content";
import type { EffectiveContact } from "@/sanity/lib/site-data";

export function PillarCta({
  pillar,
  contact,
}: {
  pillar: Pillar;
  contact: EffectiveContact;
}) {
  // Prefer the CMS-set Cal.com / Calendly link when present. Falls back
  // to the in-page contact form at /#contact otherwise.
  const bookHref = contact.calBookingUrl || "/#contact";
  const bookIsExternal = Boolean(contact.calBookingUrl);
  return (
    <section
      aria-labelledby="pillar-cta-heading"
      className="relative isolate overflow-hidden bg-bg-3"
    >
      <MediaFrame
        src="/images/contact-bg.webp"
        alt=""
        className="absolute inset-0 opacity-25"
        sizes="100vw"
        watermark={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-3)] via-[var(--bg-3)]/85 to-[var(--bg-3)]/40" />

      <div className="container-page relative z-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_auto] items-center gap-8">
        <div>
          <p className="text-eyebrow text-muted">READY?</p>
          <h2
            id="pillar-cta-heading"
            className="mt-3 text-section-title text-[clamp(1.85rem,4vw,2.6rem)] max-w-[22ch]"
          >
            {pillar.cta.title}
          </h2>
          <p className="mt-4 text-[13px] leading-[1.8] text-ink-2 max-w-[52ch]">
            {pillar.cta.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
          <Link
            href={bookHref}
            target={bookIsExternal ? "_blank" : undefined}
            rel={bookIsExternal ? "noopener noreferrer" : undefined}
            className="inline-flex h-12 items-center justify-center bg-ink text-bg text-[11px] tracking-[0.24em] px-7 font-medium hover:bg-ink-2 transition-colors"
          >
            BOOK DISCOVERY CALL
          </Link>
          <a
            href={contact.whatsappCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center border border-ink text-ink text-[11px] tracking-[0.22em] px-7 font-medium hover:bg-ink hover:text-bg transition-colors gap-2"
          >
            <WhatsAppIcon className="size-4" aria-hidden />
            CHAT ON WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
