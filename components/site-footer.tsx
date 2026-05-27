"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/social-icons";
import { CONTACT, FOOTER, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Subset of `EffectiveContact` the footer actually needs. Kept loose
 *  so callers don't have to import the full Sanity-aware type. */
export type FooterContact = {
  email: string;
  whatsappCommunityUrl: string;
  socials: { instagram: string; youtube: string; facebook: string };
};

/** Returns the pathname portion of an href so `/dance` matches both `/dance`
 *  and `/dance#offerings`. Pure anchors and non-routes pass through. */
function pathnameOf(href: string): string {
  if (!href.startsWith("/")) return href;
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? href : href.slice(0, hashIndex) || "/";
}

export function SiteFooter({
  contact = CONTACT,
}: {
  contact?: FooterContact;
} = {}) {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const socials = [
    {
      label: "Instagram",
      href: contact.socials.instagram,
      Icon: InstagramIcon,
    },
    {
      label: "Facebook",
      href: contact.socials.facebook,
      Icon: FacebookIcon,
    },
    { label: "YouTube", href: contact.socials.youtube, Icon: YoutubeIcon },
    {
      label: "WhatsApp Community",
      href: contact.whatsappCommunityUrl,
      Icon: WhatsAppIcon,
    },
  ] as const;

  return (
    <footer className="bg-bg border-t border-line">
      {/* RIBBON — wordmark + tagline, separates the page body from the footer body */}
      <div className="container-page py-10 lg:py-12 border-b border-line">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <h2 className="font-serif text-[clamp(2.25rem,5vw,3.4rem)] leading-none tracking-[0.06em] text-ink">
            {FOOTER.ribbon.wordmark}
          </h2>
          <p className="text-[12.5px] tracking-[0.32em] uppercase text-muted">
            {FOOTER.ribbon.tagline}
          </p>
        </div>
      </div>

      {/* BRAND + LINK COLUMNS */}
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 max-w-sm">
            <Link href="/" aria-label={`${SITE.name} home`} className="inline-block">
              <Logo size={68} />
            </Link>
            <p className="mt-5 text-[12.5px] leading-[1.85] text-muted">
              {FOOTER.brandBlurb}
            </p>
            <ul className="mt-6 flex items-center gap-3" aria-label="Social channels">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-9 place-items-center rounded-full bg-bg-3 text-ink hover:bg-ink hover:text-bg transition-colors"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns: 4 of them sit in the remaining 8 cols on lg+ */}
          {FOOTER.columns.map((col) => (
            <nav
              key={col.heading}
              aria-label={col.heading}
              className="lg:col-span-2"
            >
              <h3 className="text-[11px] tracking-[0.22em] font-semibold uppercase text-ink mb-4">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5 text-[12px] text-ink-2">
                {col.links.map((l) => {
                  const linkPath = pathnameOf(l.href);
                  const isActive =
                    l.href.startsWith("/") && pathname === linkPath;
                  return (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "hover:text-gold-dk transition-colors",
                          isActive && "text-gold-dk font-medium"
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        {/* STUDIO INFO CARD — sits below the columns, full width */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 pt-10 border-t border-line">
          <h2 className="lg:col-span-4 text-eyebrow text-muted">
            {FOOTER.studio.heading}
          </h2>

          <div className="flex items-start gap-3">
            <MapPin className="size-4 mt-0.5 text-gold-dk shrink-0" aria-hidden />
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-muted">Studio</p>
              <p className="text-[13px] text-ink-2 mt-1 leading-[1.6]">
                {FOOTER.studio.address}
              </p>
              <p className="text-[11px] text-muted mt-1 italic">
                {FOOTER.studio.onlineNote}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="size-4 mt-0.5 text-gold-dk shrink-0" aria-hidden />
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-muted">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-[13px] text-ink-2 mt-1 leading-[1.6] hover:text-gold-dk transition-colors block"
              >
                {contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MessageCircle className="size-4 mt-0.5 text-gold-dk shrink-0" aria-hidden />
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-muted">WhatsApp</p>
              <a
                href={contact.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-ink-2 mt-1 leading-[1.6] hover:text-gold-dk transition-colors block"
              >
                Join the community
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="size-4 mt-0.5 text-gold-dk shrink-0" aria-hidden />
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-muted">Hours</p>
              <p className="text-[13px] text-ink-2 mt-1 leading-[1.6]">
                {FOOTER.studio.hours}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="border-t border-line">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted">
          <p>
            © {year} {SITE.name}. Made with care in Bangalore.
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <Link href="/privacy-policy" className="hover:text-ink transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-ink transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-ink transition-colors">
                Refunds
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
