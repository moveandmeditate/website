import { defineField, defineType } from "sanity";

/**
 * Founder profile. Singleton — only one document of this type should
 * exist (we enforce that softly via desk-structure; hard-block in a
 * future iteration if Amisha keeps creating dupes).
 *
 * Fields match the static FOUNDER object in `lib/content.ts`.
 */
export const founderProfileSchema = defineType({
  name: "founderProfile",
  title: "Founder profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      description: "e.g. 'Founder · Move & Meditate'.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      description: "Short pull-quote in the founder section.",
      type: "string",
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: "bio",
      title: "Bio paragraphs",
      description: "Longform bio. Each item renders as a paragraph.",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "credentials",
      title: "Credentials / chips",
      description:
        "Short labels rendered as small chips, e.g. 'RYT-500', 'Sound Healing Certified'.",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
