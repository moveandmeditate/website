import { defineField, defineType } from "sanity";

/**
 * Testimonial document. Currently rendered in three places:
 *  - landing /  (Testimonials section, all)
 *  - /dance, /yoga (one filtered testimonial per pillar)
 *  - /weddings, /corporate (filtered too)
 *
 * The optional `pillars` tag lets pillar pages pick a matching quote;
 * untagged testimonials fall back to landing-only.
 */
export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonial",
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
      description: "Short role/context line, e.g. 'YOGA · 6 MONTHS'.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required().min(40).max(400),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "pillars",
      title: "Pillars (optional)",
      description:
        "Tag with pillars where this testimonial should appear. Leave empty for landing-page only.",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Dance", value: "dance" },
              { title: "Yoga", value: "yoga" },
              { title: "Weddings", value: "weddings" },
              { title: "Corporate", value: "corporate" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description:
        "Featured testimonials appear higher in the landing-page grid.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "context",
      media: "avatar",
    },
  },
});
