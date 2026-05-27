/**
 * Studio route layout.
 *
 * Responsibilities:
 *   1. Re-export `metadata` + `viewport` from `next-sanity/studio` so
 *      the Studio shell gets `robots: noindex` and the right viewport
 *      defaults (Server Components can export these; the page itself
 *      is a Client Component so it can't).
 *   2. Augment the metadata with PWA-install affordances scoped to
 *      this route — Apple touch icon, web app capability flags, and a
 *      title for the home-screen icon label.
 *   3. Mount `<StudioPwaSupport />` which registers the service
 *      worker, captures the Android install prompt, and shows an iOS
 *      "Add to Home Screen" instruction strip.
 */
import type { Metadata, Viewport } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";

import { StudioPwaSupport } from "@/components/studio/pwa-support";
import "../../globals.css";

// Brand-colored splash + status bar so the installed Studio feels
// like a real app, not a browser tab.
const STUDIO_THEME_COLOR = "#1a1a1a";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Move & Meditate Studio",
  applicationName: "M&M Studio",
  appleWebApp: {
    capable: true,
    title: "M&M Studio",
    statusBarStyle: "black-translucent",
  },
  // Apple touch icon already exists at `app/apple-icon.png` (180x180)
  // and is auto-discovered by Next.js — no need to spell it out here.
};

// Mirrors the defaults from `next-sanity/studio`'s exported viewport
// (width=device-width, initialScale=1, viewportFit=cover) but typed
// strictly against Next.js's `Viewport` so we can also stamp the brand
// theme color without TS complaining about loose union types upstream.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: STUDIO_THEME_COLOR,
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StudioPwaSupport />
      {children}
    </>
  );
}
