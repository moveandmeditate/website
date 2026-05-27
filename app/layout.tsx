import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsent } from "@/components/cookie-consent";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { SITE } from "@/lib/content";
import { getEffectiveContact } from "@/sanity/lib/site-data";
import "./globals.css";

// GA4 Measurement ID. Public identifier (visible in the page HTML), so no env
// var needed. Loaded only in production builds to keep dev sessions out of
// the analytics reports.
const GA_MEASUREMENT_ID = "G-7SGRQR3LE1";
const isProd = process.env.NODE_ENV === "production";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.founderName }],
  creator: SITE.founderName,
  keywords: [...SITE.keywords],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_IN",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  // Next.js auto-detects app/icon.png and app/apple-icon.png — no need to set
  // these explicitly. Kept the section out so the route-level files win.
};

export const viewport: Viewport = {
  themeColor: "#f6f1ea",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Fetch CMS contact once at the layout level. Cached + tag-revalidated
  // (see /api/revalidate). MobileCtaBar reads this so the WhatsApp link
  // can be edited from Studio without a code push.
  const contact = await getEffectiveContact();

  return (
    <html
      lang="en"
      className={`${jost.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Pre-hydration consent probe. Runs synchronously before any body
          markup paints, reads the consent value from localStorage, and
          stamps a class on <html> if a decision has already been made.
          CSS in globals.css uses that class to hide the consent banner
          so we don't get a one-frame flash on every page load.
          Wrapped in try/catch because localStorage can throw in
          private-browsing modes / quota-exceeded states.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var c=localStorage.getItem('mam:consent:v1');if(c==='accepted'||c==='declined')document.documentElement.classList.add('mam-consent-set');}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-dvh bg-bg text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg focus:font-medium"
        >
          Skip to content
        </a>
        {children}
        <MobileCtaBar contact={contact} />
        {/* CookieConsent is the gate for GA4 — it only injects the
           analytics snippet once the visitor accepts. Skipped entirely
           in dev so local sessions never pollute the GA property. */}
        {isProd && <CookieConsent gaId={GA_MEASUREMENT_ID} />}
        {/* Vercel Speed Insights — measures real-user Core Web Vitals
           (LCP, INP, CLS, FCP, TTFB) on production traffic. No PII is
           collected per Vercel docs, so it's mounted outside the
           cookie-consent gate. Auto-noops in dev + on preview
           deployments. */}
        {isProd && <SpeedInsights />}
      </body>
    </html>
  );
}
