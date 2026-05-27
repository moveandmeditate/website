"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/social-icons";
import { CONTACT, FOOTER, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const SOCIALS = [
  { label: "Instagram", href: CONTACT.socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: CONTACT.socials.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: CONTACT.socials.youtube, Icon: YoutubeIcon },
  { label: "WhatsApp Community", href: CONTACT.whatsappCommunityUrl, Icon: WhatsAppIcon },
] as const;

/** Returns the pathname portion of a href so we can match `/dance` against
 *  `/dance#offerings` for active state. Falls back to the whole href when it's
 *  a pure anchor or doesn't start with `/`. */
function pathnameOf(href: string): string {
  if (!href.startsWith("/")) return href;
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? href : href.slice(0, hashIndex) || "/";
}

export function SiteFooter() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-line">
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 pb-10 border-b border-line">
          <div className="col-span-2 lg:col-span-2">
            <Logo size={56} className="text-ink mb-4" withEstablished />
            <p className="text-[12px] leading-[1.7] text-muted max-w-[28ch]">
              {FOOTER.brandBlurb}
            </p>
            <ul className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
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

          {FOOTER.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-[11px] tracking-[0.22em] font-semibold uppercase text-ink mb-4">
                {col.heading}
              </h2>
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-[11px] text-muted">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <Link href="/privacy-policy" className="hover:text-ink transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-ink transition-colors">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-ink transition-colors">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
