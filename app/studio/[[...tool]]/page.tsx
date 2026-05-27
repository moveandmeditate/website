/**
 * Embedded Sanity Studio.
 *
 * The optional catch-all `[[...tool]]` segment lets the Studio handle
 * its own client-side routing (desk, vision, presentation, etc.).
 *
 * `"use client"` is required: the entire Studio is a client React app
 * (it uses React contexts, dnd-kit, etc. that don't run on the server).
 * Static `metadata`/`viewport` exports live in the sibling layout.tsx
 * since Client Components can't export them.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
