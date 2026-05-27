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
};

export default nextConfig;
