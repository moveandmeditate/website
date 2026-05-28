"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/social-icons";
import { CONTACT } from "@/lib/content";

/** Subset of `EffectiveContact` the mobile bar uses. Defaulted to the
 *  static CONTACT so the bar still renders if a caller forgets the prop. */
export type MobileCtaContact = {
  whatsappCommunityUrl: string;
};

/**
 * Sticky bottom CTA bar shown on mobile / tablet only.
 * - Two thumb-zone buttons: Book Discovery Call · WhatsApp Community
 * - Slides in once the user has scrolled past the hero (so it doesn't
 *   compete with the in-hero CTAs above-the-fold)
 * - Auto-hides on the contact section itself (`/#contact`) so it doesn't
 *   sit on top of the form
 * - Auto-hides on legal pages (where conversion isn't the goal)
 */
export function MobileCtaBar({
  contact = CONTACT,
}: {
  contact?: MobileCtaContact;
} = {}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [nearContact, setNearContact] = useState(false);

  const onLegalPage =
    pathname.startsWith("/privacy-policy") ||
    pathname.startsWith("/terms-and-conditions");
  // Studio is the embedded CMS — full-bleed editing surface, no marketing
  // chrome should leak into it.
  const onStudio = pathname.startsWith("/studio");

  useEffect(() => {
    if (onLegalPage || onStudio) return;
    const onScroll = () => {
      setVisible(window.scrollY > 320);
      const contact = document.getElementById("contact");
      if (!contact) {
        setNearContact(false);
        return;
      }
      const rect = contact.getBoundingClientRect();
      // Hide when contact section enters the lower half of the viewport
      setNearContact(rect.top < window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, onLegalPage, onStudio]);

  if (onLegalPage || onStudio) return null;

  // Absolute href (not a bare `#contact`) so resolution is deterministic.
  // On the home page we scroll programmatically in `onBookClick` — a bare
  // hash Link is a no-op when the URL already ends in `#contact` (and Next's
  // router can even double it to `#contact#contact`), so the button would
  // silently fail to re-scroll to the form.
  const bookHref = "/#contact";
  const onBookClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return; // off-home: let it navigate to /#contact
    // Scroll to the form itself (not the section heading) so the fields are
    // in view, offset by the fixed header so the first input isn't hidden.
    const el =
      document.querySelector<HTMLElement>("#contact form") ??
      document.getElementById("contact");
    if (!el) return;
    e.preventDefault();
    const headerH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
        10
      ) || 72;
    const top = window.scrollY + el.getBoundingClientRect().top - headerH - 16;
    window.scrollTo({ top, behavior: "smooth" });
    if (location.hash !== "#contact") history.replaceState(null, "", "/#contact");
  };
  const show = visible && !nearContact;

  return (
    <div
      aria-hidden={!show}
      className={`
        fixed inset-x-0 bottom-0 z-40 md:hidden
        transition-[transform,opacity] duration-300 ease-out
        ${show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
      `}
    >
      {/* Soft scrim behind the bar so it lifts off the page content */}
      <div className="absolute inset-x-0 bottom-0 h-[calc(100%+24px)] bg-gradient-to-t from-bg via-bg/85 to-bg/0 pointer-events-none" />

      <div className="relative px-3 pb-3 pt-2 grid grid-cols-2 gap-2">
        <Link
          href={bookHref}
          onClick={onBookClick}
          className="inline-flex h-12 items-center justify-center gap-2 bg-ink text-bg text-[11px] tracking-[0.22em] font-medium hover:bg-ink-2 transition-colors shadow-[0_4px_18px_-6px_rgba(26,26,26,0.35)]"
        >
          <Phone className="size-4" aria-hidden />
          BOOK CALL
        </Link>
        <a
          href={contact.whatsappCommunityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 bg-bg text-ink text-[11px] tracking-[0.22em] font-medium border border-ink hover:bg-ink hover:text-bg transition-colors shadow-[0_4px_18px_-6px_rgba(26,26,26,0.25)]"
        >
          <WhatsAppIcon className="size-4" aria-hidden />
          WHATSAPP
        </a>
      </div>
    </div>
  );
}
