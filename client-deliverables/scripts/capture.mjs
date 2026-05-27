// One-off script — captures branded screenshots of the running dev site
// for the client questionnaire PDF. Uses puppeteer-core against the
// system Chrome install so we don't pull a full Playwright/Chromium download.
//
// Run from repo root with the dev server already on http://localhost:3000:
//
//   pnpm dlx puppeteer-core@latest --version >/dev/null   # ensures cache
//   node client-deliverables/scripts/capture.mjs
//
// Outputs PNGs into client-deliverables/screenshots/.

import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3000";
const OUT = resolve(
  process.env.OUT_DIR ||
    "/Volumes/Work/amisha/move-and-meditate/client-deliverables/screenshots"
);

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

async function captureDesktop(name, prepare) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60_000 });
  // Disable smooth scroll for deterministic positioning
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  if (prepare) await prepare(page);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  await page.close();
  console.log("  →", name);
}

async function captureMobile(name, prepare) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60_000 });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  if (prepare) await prepare(page);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  await page.close();
  console.log("  →", name);
}

const scrollTo = (sel, offset = -100) => async (page) => {
  await page.evaluate(
    (s, off) => {
      const el = document.querySelector(s);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY + off;
        window.scrollTo(0, y);
      }
    },
    sel,
    offset
  );
};

console.log("Capturing desktop sections (1440×900):");
await captureDesktop("desktop-01-hero-and-nav");
await captureDesktop("desktop-02-events", scrollTo("#events"));
await captureDesktop("desktop-03-trusted-by", scrollTo('[aria-labelledby="trusted-heading"]'));
await captureDesktop("desktop-04-tiles", scrollTo("#move"));
await captureDesktop("desktop-05-experiences", scrollTo("#experiences-heading"));
await captureDesktop("desktop-06-founder", scrollTo("#founder"));
await captureDesktop("desktop-07-testimonials", scrollTo("#testimonials"));
await captureDesktop("desktop-08-contact", scrollTo("#contact"));
await captureDesktop("desktop-09-footer", async (page) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
});

console.log("Capturing mobile views (390×844):");
await captureMobile("mobile-01-hero");
await captureMobile("mobile-02-nav-open", async (page) => {
  // open the hamburger Sheet
  await page.evaluate(() => {
    const btn = document.querySelector('[data-slot="sheet-trigger"]');
    btn?.click();
  });
  await new Promise((r) => setTimeout(r, 600));
});
await captureMobile("mobile-03-tiles-stack", scrollTo("#move", -20));
await captureMobile("mobile-04-contact", scrollTo("#contact"));

await browser.close();
console.log("\nDone. Files in client-deliverables/screenshots/.");
