"use client";

import { useEffect, useState } from "react";

/**
 * Studio PWA glue. Mounted once inside `app/studio/[[...tool]]/layout.tsx`.
 *
 * Responsibilities:
 *   1. Register the minimal service worker (`/sw.js`) so Chrome's
 *      install-prompt heuristics fire on Android. iOS doesn't use SW
 *      for install, but registering one is still harmless on iOS.
 *   2. Capture the `beforeinstallprompt` event so we can show a
 *      "Install" button on Android Chrome at the moment the browser
 *      considers the page installable.
 *   3. Render an iOS-specific instruction strip (Safari has no install
 *      API — the user must use Share → Add to Home Screen manually).
 *   4. Hide everything when the app is already running as an installed
 *      PWA (`display-mode: standalone`).
 *
 * Rendered as a thin top strip inside Studio; the Studio chrome below
 * is unaffected.
 */

// `beforeinstallprompt` isn't in the standard TS lib yet. Shim the
// minimum surface we use.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const SESSION_DISMISS_KEY = "mam:pwa-install-dismissed:v1";

export function StudioPwaSupport() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Detect environment once on mount.
    const ua = window.navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua));
    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
        // Safari standalone heuristic
        (window.navigator as unknown as { standalone?: boolean })
          .standalone === true
    );

    // Honor a per-session dismissal so we don't nag the editor on
    // every navigation within Studio.
    try {
      setDismissed(
        window.sessionStorage.getItem(SESSION_DISMISS_KEY) === "1"
      );
    } catch {
      // sessionStorage can throw in private modes — assume not dismissed
    }

    // Register service worker for Chrome install criteria. Default
    // scope ('/') because the SW file is served from /sw.js — claiming
    // a wider scope like '/studio' would need a Service-Worker-Allowed
    // response header. The actual install scope is controlled by the
    // manifest's `scope` field (`/studio`), not the SW.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => {
          console.warn("[studio-pwa] SW registration failed", err);
        });
    }

    // Capture install prompt for Android.
    const onBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile.
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        onBeforeInstallPrompt
      );
    };
  }, []);

  if (isStandalone || dismissed) return null;
  if (!deferredPrompt && !isIOS) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
    } catch {
      // ignore — we'll just show again next session
    }
  };

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        // Installed — hide for the rest of the session.
        dismiss();
      }
    } finally {
      // Each `beforeinstallprompt` event can only be used once.
      setDeferredPrompt(null);
    }
  };

  return (
    <div
      role="region"
      aria-label="Install Move & Meditate Studio"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100000,
        background: "#1a1a1a",
        color: "#f6f1ea",
        padding: "10px 16px",
        fontSize: 13,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        boxShadow: "0 6px 16px -8px rgba(0,0,0,0.4)",
      }}
    >
      <span style={{ flex: 1, minWidth: 0 }}>
        {isIOS ? (
          <>
            Install Studio: tap{" "}
            <span aria-label="iOS share icon" role="img">
              ⬆️
            </span>{" "}
            Share, then <strong>Add to Home Screen</strong>.
          </>
        ) : (
          <>Install Move &amp; Meditate Studio for quick access.</>
        )}
      </span>
      <span style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        {!isIOS && deferredPrompt && (
          <button
            type="button"
            onClick={promptInstall}
            style={{
              background: "#f6f1ea",
              color: "#1a1a1a",
              border: 0,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            Install
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install prompt"
          style={{
            background: "transparent",
            color: "#f6f1ea",
            border: 0,
            padding: "6px 10px",
            fontSize: 16,
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </span>
    </div>
  );
}
