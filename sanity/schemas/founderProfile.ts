import { defineField, defineType } from "sanity";

/**
 * Founder profile. Singleton — only one document of this type should
 * exist. Fields match the static `FOUNDER` object in `lib/content.ts`
 * 1:1 so the adapter is trivial and the rendering component doesn't
 * have to branch on shape.
 *
 * Stats are kept in CMS too so Amisha can update the "1000+ transformed
 * lives" counter without a code push as the numbers grow.
 */
export const founderProfileSchema = defineType({
  name: "founderProfile",
  title: "Founder profile",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: "Small uppercase tag above the title, e.g. 'FOUNDER'.",
      type: "string",
      initialValue: "FOUNDER",
    }),
    defineField({
      name: "title",
      title: "Title",
      description:
        "Section heading. Use a newline (\\n) to control where the line breaks visually.",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Bio paragraphs",
      description: "Each item renders as a paragraph.",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "signature",
      title: "Signature",
      description: "Hand-style signature line, e.g. 'Amisha'.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "signatureLabel",
      title: "Signature label",
      description:
        "Subdued role line under the signature, e.g. 'FOUNDER · MOVE & MEDITATE'.",
      type: "string",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      description:
        "4 little stat cards next to the bio. Pick an icon, set the big number, and a short label.",
      type: "array",
      of: [
        defineField({
          name: "stat",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Users", value: "users" },
                  { title: "Calendar", value: "cal" },
                  { title: "Globe", value: "globe" },
                  { title: "Heart", value: "heart" },
                ],
                layout: "radio",
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "number", subtitle: "label" },
          },
        }),
      ],
      validation: (r) => r.length(4).error("Exactly 4 stats expected."),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Founder profile" }),
  },
});
