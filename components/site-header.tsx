"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { CONTACT, NAV_ITEMS, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Resolve the link href for `BOOK DISCOVERY CALL`. On `/` we scroll to the
 *  contact anchor. On any sub-page we route home with the same anchor so the
 *  user lands on the form regardless of where they are. */
function bookHref(pathname: string) {
  return pathname === "/" ? "#contact" : "/#contact";
}

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
          ? "bg-bg/85 backdrop-blur shadow-[0_1px_0_var(--line)]"
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

        <nav aria-label="Primary" className="hidden lg:flex flex-1 justify-center gap-9">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[11px] font-medium tracking-[0.22em] text-ink-2 transition-colors hover:text-ink",
                  "py-2"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    "pointer-events-none absolute -bottom-0.5 left-0 right-0 h-px bg-ink transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
              </Link>
            );
          })}
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
