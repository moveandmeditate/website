import { defineField, defineType } from "sanity";

/**
 * Event document. Mirrors the static `EVENTS[]` shape currently in
 * `lib/content.ts` so the wire format is identical when we swap the
 * upcoming-events section over to a GROQ fetch.
 *
 * `pillars` references the 4 pillar slugs ('dance' | 'yoga' | 'weddings'
 * | 'corporate') so the per-pillar PillarEvents component can filter by
 * membership without an extra join.
 */
export const eventSchema = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startsAt",
      title: "Starts at",
      description:
        "Used for sorting + JSON-LD structured data. Even if the public copy says 'October 5 — Saturday', set a real ISO date here.",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dateLabel",
      title: "Date label (display)",
      description:
        "Human-readable form shown in the card, e.g. 'OCTOBER 5 · SAT' or 'NOV 12 · 7 PM'.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      description: "1–2 sentences shown under the title on the card.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "image",
      title: "Image",
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: "pillars",
      title: "Pillars",
      description:
        "Tag with one or more pillars so the per-pillar pages can show this event.",
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
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      initialValue: "RESERVE A SPOT",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA href",
      description:
        "External booking link, or '#contact' to scroll to the contact form.",
      type: "string",
      initialValue: "#contact",
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
      title: "Start date, soonest first",
      name: "startsAtAsc",
      by: [{ field: "startsAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "dateLabel",
      media: "image",
    },
  },
});
