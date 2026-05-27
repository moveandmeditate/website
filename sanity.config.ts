/**
 * Sanity Studio configuration. Loaded by:
 *  - the embedded Studio at /studio (via `app/studio/[[...tool]]/page.tsx`)
 *  - the `sanity` CLI (deploys, dataset operations) — via sanity.cli.ts
 *
 * Single-workspace setup. If we ever need staging vs production with
 * different datasets, swap `defineConfig` for an array of configs and
 * give each one its own `basePath`.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Move & Meditate",
  projectId,
  dataset,
  basePath: "/studio",
  schema: { types: schemaTypes },
  plugins: [
    // Document desk (default left-hand tree).
    structureTool(),
    // GROQ playground for ad-hoc queries. Safe to keep — viewer-only
    // tokens still apply to query results, and the studio itself is
    // authenticated.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
