import { defineField, defineType } from "sanity";

/**
 * Trusted-by brand. Collection — Amisha adds one doc per partner/client
 * brand to surface in the "Trusted by" strip on the landing page.
 *
 * Render strategy (in priority order):
 *   1. `logo` image → renders as <img> (CDN-served via urlForImage)
 *   2. `render` enum → uses one of the hand-typed wordmarks in
 *      `components/brand-mark.tsx` (Google rainbow, Adobe red, etc.)
 *   3. Falls back to the plain `name` as text
 *
 * Editor flow: upload a transparent-bg PNG/SVG of the brand logo for
 * the cleanest output. The render enum is mostly a legacy bridge until
 * licensed press-kit logos are uploaded.
 */
export const brandSchema = defineType({
  name: "brand",
  title: "Trusted-by brand",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "logo",
      title: "Logo (transparent background)",
      description:
        "Upload a clean logo with transparent background. PNG or SVG preferred.",
      type: "image",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "render",
      title: "Typographic render (fallback)",
      description:
        "Used only when no logo is uploaded. Matches one of the hand-styled wordmarks in code.",
      type: "string",
      options: {
        list: [
          { title: "Google", value: "google" },
          { title: "Infosys", value: "infosys" },
          { title: "McKinsey & Company", value: "mckinsey" },
          { title: "WeWork", value: "wework" },
          { title: "Puma", value: "puma" },
          { title: "Adobe", value: "adobe" },
          { title: "Deloitte", value: "deloitte" },
        ],
      },
    }),
    defineField({
      name: "websiteUrl",
      title: "Website URL (optional)",
      type: "url",
      validation: (r) =>
        r.uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      description: "Lower numbers appear first. Leave blank to sort by name.",
      type: "number",
    }),
    defineField({
      name: "published",
      title: "Published",
      description:
        "Toggle off to hide from the site without deleting the document.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrderAsc",
      by: [
        { field: "displayOrder", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "render",
      media: "logo",
    },
  },
});
