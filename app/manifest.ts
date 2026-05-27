import type { MetadataRoute } from "next";

/**
 * Web App Manifest — drives the install-to-home-screen experience.
 *
 * Scoped to `/studio` deliberately so the installed PWA opens straight
 * into the CMS (Sanity Studio) rather than the marketing landing page.
 * Amisha taps the home-screen icon → fullscreen Studio, no browser
 * chrome, ready to publish from her phone.
 *
 * Visiting `/` or any marketing route from outside the PWA still works
 * as a normal browser tab — the manifest just controls how the
 * installed app behaves.
 *
 * iOS Safari supports a subset (no auto-install prompt, but
 * Add-to-Home-Screen reads `name`, `theme_color`, and the apple-touch
 * icon at `app/apple-icon.png`). Android Chrome reads the full
 * manifest + offers an auto install prompt once the service worker is
 * registered (see `public/sw.js`).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Move & Meditate Studio",
    short_name: "M&M Studio",
    description:
      "Manage events, testimonials, founder bio and site settings for Move & Meditate.",
    start_url: "/studio",
    scope: "/studio",
    display: "standalone",
    orientation: "portrait",
    // Brand bg / ink — matches `--bg` and `--ink` in globals.css so the
    // splash screen blends with the Studio shell.
    background_color: "#f6f1ea",
    theme_color: "#1a1a1a",
    icons: [
      {
        src: "/studio-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/studio-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Maskable variants — Android adaptive icons crop into safe-zone
      // mask shapes. Re-using the same square asset works because the
      // M&M wordmark is centered with padding.
      {
        src: "/studio-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/studio-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["productivity", "business"],
  };
}
