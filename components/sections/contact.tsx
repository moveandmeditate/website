import { Mail, MessageCircle } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { ContactForm } from "@/components/contact-form";
import { CONTACT, CONTACT_SECTION } from "@/lib/content";

export function Contact() {
  return (
    <section
      id="contact"
      data-section
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-bg-3"
    >
      <MediaFrame
        src={CONTACT_SECTION.background.src}
        alt=""
        className="absolute inset-0 opacity-25"
        sizes="100vw"
        watermark={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-3)] via-[var(--bg-3)]/85 to-[var(--bg-3)]/30" />

      <div className="container-page relative z-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-eyebrow text-muted">{CONTACT_SECTION.eyebrow}</p>
          <h2
            id="contact-heading"
            className="mt-3 text-section-title text-[clamp(2rem,4.2vw,2.75rem)] whitespace-pre-line max-w-[16ch]"
          >
            {CONTACT_SECTION.title}
          </h2>
          <p className="mt-5 text-[13px] leading-[1.8] text-ink-2 max-w-[42ch]">
            {CONTACT_SECTION.body}
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={CONTACT_SECTION.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-ink text-bg text-[11px] tracking-[0.22em] font-medium px-6 h-12 hover:bg-ink-2 transition-colors w-full sm:w-auto"
            >
              <MessageCircle className="size-4" aria-hidden />
              {CONTACT_SECTION.cta.label}
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 text-[13px] text-ink-2 hover:text-ink transition-colors"
            >
              <span className="grid size-9 place-items-center rounded-full border border-line-2 bg-bg">
                <Mail className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block text-[10px] tracking-[0.22em] uppercase text-muted">
                  {CONTACT_SECTION.emailLabel}
                </span>
                <span className="block font-medium">{CONTACT.email}</span>
              </span>
            </a>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
