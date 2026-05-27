"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";

const STORAGE_KEY = "mam:consent:v1";
const VALUES = { accepted: "accepted", declined: "declined" } as const;
type ConsentState = (typeof VALUES)[keyof typeof VALUES] | null;

function readConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === VALUES.accepted || v === VALUES.declined) return v;
    return null;
  } catch {
    return null;
  }
}

function writeConsent(value: NonNullable<ConsentState>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    // Notify any other subscribers (e.g. multi-tab) immediately. The
    // native `storage` event only fires across tabs, so dispatch a
    // custom event for same-tab subscribers like our hook below.
    window.dispatchEvent(new Event("mam:consent"));
  } catch {
    // ignore: incognito mode / quota errors
  }
}

/** Subscribe to changes in our consent localStorage key. Called by
 *  `useSyncExternalStore` — gets a `notify` callback to re-render. */
function subscribeConsent(notify: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener("storage", notify);
  window.addEventListener("mam:consent", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("mam:consent", notify);
  };
}

/**
 * GDPR / India DPDP Act cookie consent gate for analytics.
 *
 * - Renders nothing on the server (consent state lives in localStorage).
 * - First visit shows a small bottom-left card.
 * - "Accept" stores consent + loads the GA4 snippet via @next/third-parties.
 * - "Decline" stores the choice + GA never loads.
 * - Choice persists until manually cleared.
 *
 * Uses `useSyncExternalStore` instead of `useState + useEffect` so the
 * mount-detection happens without triggering a synchronous re-render
 * inside an effect (which React 19 flags as a perf footgun).
 */
export function CookieConsent({ gaId }: { gaId: string }) {
  const pathname = usePathname();

  // Hydration-safe: server snapshot is `null` (we have no localStorage
  // there), client snapshot reads from localStorage. React handles the
  // post-hydration update for us — no `mounted` flag needed.
  const consent = useSyncExternalStore<ConsentState>(
    subscribeConsent,
    readConsent,
    () => null
  );

  // Local state mirrors localStorage so the click handlers can update
  // both at once without an awaited read. Kept separate from the
  // external-store subscription so cross-tab writes still propagate.
  const [localConsent, setLocalConsent] = useState<ConsentState>(null);
  const effective = localConsent ?? consent;

  // Skip on the embedded Studio — analytics there would pollute reports
  // with admin sessions, and a marketing banner doesn't belong on a CMS.
  if (pathname.startsWith("/studio")) return null;

  const decide = (next: NonNullable<ConsentState>) => {
    writeConsent(next);
    setLocalConsent(next);
  };

  return (
    <>
      {/* Only inject GA4 once consent is granted */}
      {effective === VALUES.accepted && <GoogleAnalytics gaId={gaId} />}

      {effective === null && (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-body"
          // `data-consent-banner` is the hook the pre-hydration probe
          // script (in app/layout.tsx) uses to keep this off-screen
          // when a decision already exists in localStorage.
          data-consent-banner
          className="fixed bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm z-50 bg-bg border border-line-2 shadow-[0_12px_32px_-12px_rgba(26,26,26,0.18)]"
        >
          <div className="p-5">
            <p
              id="cookie-consent-title"
              className="text-eyebrow text-muted"
            >
              A note on cookies
            </p>
            <p
              id="cookie-consent-body"
              className="mt-2 text-[12.5px] leading-[1.7] text-ink-2"
            >
              We use a single privacy-friendly analytics tool (Google
              Analytics) to understand how the site is used. No data is sold,
              no ads are served. Accept to help us improve, or decline and
              we&apos;ll never load it.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => decide(VALUES.accepted)}
                className="inline-flex h-10 items-center justify-center bg-ink text-bg text-[11px] tracking-[0.22em] font-medium px-5 hover:bg-ink-2 transition-colors"
              >
                ACCEPT
              </button>
              <button
                type="button"
                onClick={() => decide(VALUES.declined)}
                className="inline-flex h-10 items-center justify-center border border-ink text-ink text-[11px] tracking-[0.22em] font-medium px-5 hover:bg-ink hover:text-bg transition-colors"
              >
                DECLINE
              </button>
            </div>
            <p className="mt-3 text-[10.5px] text-muted">
              Read our{" "}
              <Link
                href="/privacy-policy"
                className="underline decoration-line-2 underline-offset-2 hover:text-gold-dk"
              >
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}
