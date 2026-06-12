import { defineField, defineType } from "sanity";

/**
 * Short vertical-video testimonial (9:16). Up to 4 are rendered above the
 * text testimonials on the landing page; anything beyond the 4th is
 * ignored at the renderer.
 *
 * Hosting model: we accept an EXTERNAL URL only (mp4, Vimeo, Cloudflare
 * Stream, etc.) rather than uploading the file into Sanity itself. Sanity
 * is great for images but charges egress on every video play — even a
 * couple of viral testimonials would blow the budget. A dedicated video
 * host keeps cost predictable and lets us swap CDNs without a schema
 * migration.
 */
export const videoTestimonialSchema = defineType({
  name: "videoTestimonial",
  title: "Video testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "context",
      title: "Context",
      description:
        "Short role/context line, e.g. 'WEDDING COUPLE' or 'YOGA · 6 MONTHS'.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      description:
        "Direct .mp4 link or a Cloudflare Stream / Vimeo manifest. Vertical 9:16 only — anything wider gets letterboxed.",
      type: "url",
      validation: (r) =>
        r
          .required()
          .uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({
      name: "poster",
      title: "Poster image",
      description:
        "Frame shown before the viewer hits play. Vertical 9:16, 1080×1920 ideal.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
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
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "context",
      media: "poster",
    },
  },
});
