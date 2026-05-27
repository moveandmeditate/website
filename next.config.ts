import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity asset CDN — every CMS-uploaded image (founder portrait,
    // event hero, testimonial avatar, brand logo) lands here. Without
    // this allow-list `next/image` refuses external sources and falls
    // back to plain <img>, losing optimisation + the `sizes` pipeline.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        // Force the service worker to be served as fresh JS every time.
        // Without these headers Chrome aggressively caches /sw.js, so
        // a SW update wouldn't reach installed PWAs without manual
        // re-registration. Mirrors the recipe in Next.js's PWA guide.
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
