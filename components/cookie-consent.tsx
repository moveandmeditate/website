"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

function writeConsent(value: ConsentState) {
  if (typeof window === "undefined" || value === null) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore: incognito mode / quota errors
  }
}

/**
 * GDPR / India DPDP Act cookie consent gate for analytics.
 *
 * - Renders nothing on the server (consent state lives in localStorage).
 * - First visit shows a small bottom-left card.
 * - "Accept" stores consent + loads the GA4 snippet via @next/third-parties.
 * - "Decline" stores the choice + GA never loads.
 * - Choice persists until manually cleared.
 */
export function CookieConsent({ gaId }: { gaId: string }) {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    setMounted(true);
    setConsent(readConsent());
  }, []);

  // Don't paint on the server so we never flash the banner on the first SSR
  // pass (otherwise the gate is mounted, then immediately hidden during
  // hydration — distracting).
  if (!mounted) return null;

  const decide = (next: NonNullable<ConsentState>) => {
    writeConsent(next);
    setConsent(next);
  };

  return (
    <>
      {/* Only inject GA4 once consent is granted */}
      {consent === VALUES.accepted && <GoogleAnalytics gaId={gaId} />}

      {consent === null && (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-body"
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
