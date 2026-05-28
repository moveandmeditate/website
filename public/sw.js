/**
 * Minimal Service Worker for Move & Meditate Studio PWA.
 *
 * Purpose: satisfy Chrome's PWA install criteria. Chrome won't fire
 * `beforeinstallprompt` on Android without a registered service
 * worker that has a `fetch` handler — even an inert one.
 *
 * We deliberately do NOT add offline caching here. Sanity Studio is a
 * client-heavy React app that talks to api.sanity.io for every read +
 * write; caching it offline would be misleading (you can't edit
 * content without a network connection anyway).
 *
 * No precaching. No runtime caching. Just install + activate fast +
 * pass all fetches straight through to the network. Replace with
 * Serwist / Workbox later if real offline support is ever needed.
 */

self.addEventListener("install", () => {
  // Skip waiting so a new SW replaces the old one on the next reload
  // instead of needing a full tab close. Safe because we cache nothing.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take over any pages that were loaded before this SW was active.
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // Pass-through. The handler merely being registered (even with an
  // empty body) is what Chrome's install-prompt heuristics look for.
  // We never call `event.respondWith()`, so the browser fetch stack
  // handles every request normally.
});
