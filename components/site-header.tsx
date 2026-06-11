"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/social-icons";
import { CONTACT, NAV_ITEMS, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

// Hrefs from NAV_ITEMS that should also appear OUTSIDE the hamburger on
// mobile so weddings + corporate (high-intent commercial pages) are one tap
// away even before the user opens the sheet menu.
const MOBILE_PINNED_HREFS = new Set<string>(["/weddings", "/corporate"]);

/** Subset of `EffectiveContact` the header uses. `calBookingUrl` is the
 *  optional Cal.com / Calendly link — when set, the Book Discovery CTA
 *  links there directly (opens external) instead of scrolling to the
 *  in-page contact form. */
export type HeaderContact = {
  whatsappCommunityUrl: string;
  calBookingUrl?: string;
};

/** Resolve the link href for `BOOK DISCOVERY CALL`. If the CMS has a
 *  `calBookingUrl` set, prefer it (highest-intent action). Otherwise
 *  scroll to the contact anchor on the home page. */
function bookHref(pathname: string, calBookingUrl?: string) {
  if (calBookingUrl) return calBookingUrl;
  // Absolute (not bare `#contact`): deterministic resolution. On the home
  // page the click handler scrolls programmatically, because a same-hash
  // Link is a no-op when the URL already ends in `#contact` (and Next can
  // double it to `#contact#contact`).
  return "/#contact";
}

export function SiteHeader({
  contact = CONTACT,
}: {
  contact?: HeaderContact;
} = {}) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const discoveryHref = bookHref(pathname, contact.calBookingUrl);
  // External booking links open in a new tab; internal anchor scrolls in
  // place. Use this flag below to set `target`/`rel` only when needed.
  const discoveryIsExternal = Boolean(contact.calBookingUrl);
  const reducedMotion = useReducedMotion();

  // Sync the rendered header height to --header-h so scroll-margin-top is accurate.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--header-h", `${Math.round(h)}px`);
    };
    setVar();

    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  // Subtle backdrop after a small scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      id="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 border-b",
        scrolled
          ? // White-ish tint so the bar reads elevated against the page cream
            // (`bg-bg` is the same colour as the page body, so any tone of it
            // disappears). Layered blur + soft drop shadow give the floating
            // feel without breaking the editorial palette.
            "bg-white/75 backdrop-blur-xl border-line/70 shadow-[0_8px_24px_-12px_rgba(26,26,26,0.18)]"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container-page flex items-center gap-3 lg:gap-4 py-3 lg:py-4">
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="flex items-center gap-3 shrink-0"
        >
          <Logo size={48} className="lg:hidden" />
          <Logo size={56} className="hidden lg:block" />
        </Link>

        {/* Mobile-only pinned nav. Surfaces the highest-intent commercial
            pages (weddings + corporate) outside the hamburger so they're
            one tap away. Desktop has the full nav below. */}
        <nav
          aria-label="Mobile primary"
          className="flex lg:hidden items-center gap-3 sm:gap-4 ml-1"
        >
          {NAV_ITEMS.filter((i) => MOBILE_PINNED_HREFS.has(i.href)).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-[10px] font-medium tracking-[0.18em] transition-colors",
                  isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <nav aria-label="Primary" className="hidden lg:flex flex-1 justify-center gap-7 xl:gap-9">
          <LayoutGroup id="primary-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-[11px] font-medium tracking-[0.22em] transition-colors py-2",
                    isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      aria-hidden
                      className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px bg-ink"
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32, mass: 0.6 }
                      }
                    />
                  )}
                </Link>
              );
            })}
          </LayoutGroup>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={contact.whatsappCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join WhatsApp community"
            className="inline-flex size-10 items-center justify-center border border-ink text-ink hover:bg-ink hover:text-bg transition-colors"
          >
            <WhatsAppIcon className="size-[18px]" aria-hidden />
          </a>
          <Link
            href={discoveryHref}
            target={discoveryIsExternal ? "_blank" : undefined}
            rel={discoveryIsExternal ? "noopener noreferrer" : undefined}
            className="hidden md:inline-flex h-10 items-center px-5 rounded-none bg-ink text-bg tracking-[0.18em] text-[11px] font-medium hover:bg-ink-2 transition-colors"
          >
            BOOK DISCOVERY CALL
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="lg:hidden inline-flex size-10 items-center justify-center text-ink hover:bg-bg-2 transition-colors"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] max-w-sm bg-bg border-line p-0"
            >
              <SheetHeader className="border-b border-line px-6 py-5 flex flex-row items-center justify-between">
                <SheetTitle className="flex items-center gap-2 text-ink">
                  <Logo size={36} />
                  <span className="font-serif text-lg tracking-wider">
                    Move &amp; Meditate
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-6">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "py-3 text-sm font-medium tracking-[0.22em] text-ink hover:text-gold-dk transition-colors",
                        isActive && "text-gold-dk"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="px-6 pb-8 border-t border-line pt-6 flex flex-col gap-3">
                <Link
                  href={discoveryHref}
                  target={discoveryIsExternal ? "_blank" : undefined}
                  rel={discoveryIsExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center bg-ink text-bg tracking-[0.18em] text-[11px] font-medium hover:bg-ink-2 transition-colors"
                >
                  BOOK DISCOVERY CALL
                </Link>
                <a
                  href={contact.whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center border border-ink text-ink tracking-[0.18em] text-[11px] font-medium hover:bg-ink hover:text-bg transition-colors"
                >
                  JOIN WHATSAPP COMMUNITY
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
