"use client";

import { useEffect } from "react";

/**
 * Single source of truth for the "scroll to contact" behaviour.
 *
 * Mounted once inside the (home-only) Contact section, it intercepts clicks
 * for every in-page contact link — header CTA, mobile sticky bar + menu sheet,
 * Upcoming Events "view all", the Retreats tile, footer "Contact"/"Retreats" —
 * so they all scroll consistently and never leave a stale or doubled
 * (`#contact#contact`) hash.
 *
 * It runs in the CAPTURE phase and calls `stopImmediatePropagation` so Next's
 * `<Link>` never also client-routes (its bubble-phase handler would otherwise
 * fight this scroll).
 *
 * Desktop lands the tinted section's top at the navbar's bottom edge (two-
 * column heading | form layout). Mobile stacks heading above form, so it
 * scrolls to the form fields. Links inside the mobile menu sheet close it
 * first (the sheet locks body scroll), then scroll once the lock releases.
 *
 * Only active on the home page, where `#contact` (and this component) exists.
 */
export function ContactScroll() {
  useEffect(() => {
    const scrollToContact = () => {
      const section = document.getElementById("contact");
      if (!section) return;
      const headerH =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
          10
        ) || 72;
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      let top: number;
      if (isDesktop) {
        top = window.scrollY + section.getBoundingClientRect().top - headerH;
      } else {
        const form = section.querySelector<HTMLElement>("form") ?? section;
        top = window.scrollY + form.getBoundingClientRect().top - headerH - 16;
      }
      window.scrollTo({ top, behavior: "smooth" });
      if (location.hash !== "#contact") {
        history.replaceState(null, "", "/#contact");
      }
    };

    const onClick = (e: MouseEvent) => {
      // Let modifier / middle clicks (open-in-new-tab etc.) behave natively.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const el = e.target as Element | null;
      const link = el?.closest?.(
        'a[href$="#contact"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;
      if (!document.getElementById("contact")) return;

      // We fully own this click: stop the browser default and Next's <Link>
      // bubble handler so it doesn't also route + scroll.
      e.preventDefault();
      e.stopImmediatePropagation();

      if (link.closest('[role="dialog"]')) {
        // Inside the mobile menu sheet: close it (Escape — its own
        // close-on-click was stopped above), then scroll once its body
        // scroll-lock (overflow:hidden) actually releases.
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
        );
        const start = Date.now();
        const whenUnlocked = () => {
          const unlocked =
            !document.querySelector('[role="dialog"]') &&
            getComputedStyle(document.body).overflow !== "hidden";
          if (unlocked) {
            requestAnimationFrame(() => requestAnimationFrame(scrollToContact));
          } else if (Date.now() - start < 2000) {
            setTimeout(whenUnlocked, 30);
          } else {
            scrollToContact(); // fallback
          }
        };
        setTimeout(whenUnlocked, 30);
        return;
      }

      scrollToContact();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
