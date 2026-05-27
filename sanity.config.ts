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
import {
  isSingletonType,
  SINGLETON_TYPE_LIST,
  structure,
} from "@/sanity/desk-structure";

export default defineConfig({
  name: "default",
  title: "Move & Meditate",
  projectId,
  dataset,
  basePath: "/studio",
  schema: { types: schemaTypes },
  plugins: [
    // Document desk with our custom structure — singletons appear as
    // single docs (no list, no create) so editors can't make dupes.
    structureTool({ structure }),
    // GROQ playground for ad-hoc queries. Safe to keep — viewer-only
    // tokens still apply to query results, and the studio itself is
    // authenticated.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Strip duplicate/delete actions from singletons so the only thing
    // an editor can do is publish/edit the canonical document.
    actions: (input, context) => {
      if (!isSingletonType(context.schemaType)) return input;
      return input.filter(
        ({ action }) =>
          action !== "duplicate" &&
          action !== "delete" &&
          action !== "unpublish"
      );
    },
    // Remove singletons from the global "Create" menu (the "+" button
    // in the top-left and in the keyboard-shortcut palette).
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter(
            (template) => !SINGLETON_TYPE_LIST.includes(template.templateId)
          )
        : prev,
  },
});
