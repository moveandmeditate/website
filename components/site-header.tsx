"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { CONTACT, NAV_ITEMS, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

// useLayoutEffect on the server warns about "no-op". Swap for useEffect during
// SSR so we don't get the dev-tools warning; the visual difference is one
// extra frame of indicator positioning on hydration which the user won't see.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Resolve the link href for `BOOK DISCOVERY CALL`. On `/` we scroll to the
 *  contact anchor. On any sub-page we route home with the same anchor so the
 *  user lands on the form regardless of where they are. */
function bookHref(pathname: string) {
  return pathname === "/" ? "#contact" : "/#contact";
}

type IndicatorState = { x: number; w: number; visible: boolean };

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement | null>>(new Map());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Start hidden so the indicator fades + slides into position on first paint
  // instead of popping in at x=0.
  const [indicator, setIndicator] = useState<IndicatorState>({ x: 0, w: 0, visible: false });
  const pathname = usePathname();
  const discoveryHref = bookHref(pathname);

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

  // Slide the underline indicator under the active nav link.
  useIsoLayoutEffect(() => {
    const measure = () => {
      const activeItem = NAV_ITEMS.find((item) => item.href === pathname);
      const nav = navRef.current;
      if (!activeItem || !nav) {
        setIndicator((s) => ({ ...s, visible: false }));
        return;
      }
      const link = linkRefs.current.get(activeItem.href);
      if (!link) {
        setIndicator((s) => ({ ...s, visible: false }));
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setIndicator({
        x: linkRect.left - navRect.left,
        w: linkRect.width,
        visible: true,
      });
    };
    measure();
    // Re-measure on resize so the indicator stays under the link when the
    // viewport rewraps. Fonts can also reflow on load — re-measure after a
    // microtask to catch that case.
    const id = window.setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300",
        scrolled
          ? "bg-bg/95 backdrop-blur-md shadow-[0_1px_0_var(--line),0_8px_24px_-12px_rgba(26,26,26,0.12)]"
          : "bg-transparent"
      )}
    >
      <div className="container-page flex items-center gap-4 py-3 lg:py-4">
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="flex items-center gap-3"
        >
          <Logo size={48} className="text-ink lg:hidden" />
          <Logo size={56} className="text-ink hidden lg:block" />
        </Link>

        <nav
          ref={navRef}
          aria-label="Primary"
          className="hidden lg:flex flex-1 justify-center gap-9 relative"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  linkRefs.current.set(item.href, el);
                }}
                className={cn(
                  "relative text-[11px] font-medium tracking-[0.22em] transition-colors py-2",
                  isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          {/* Single underline that slides between active nav items. The width
             + translateX animate together so the line "morphs" from one link
             to the next on route change. */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 h-px bg-ink will-change-transform transition-[transform,width,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              indicator.visible ? "opacity-100" : "opacity-0"
            )}
            style={{
              width: indicator.w,
              transform: `translateX(${indicator.x}px)`,
            }}
          />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={discoveryHref}
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
                  <Logo size={36} className="text-ink" />
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
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center bg-ink text-bg tracking-[0.18em] text-[11px] font-medium hover:bg-ink-2 transition-colors"
                >
                  BOOK DISCOVERY CALL
                </Link>
                <a
                  href={CONTACT.whatsappCommunityUrl}
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
