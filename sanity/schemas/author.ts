import { defineField, defineType } from "sanity";

/**
 * Blog author. Initially a singleton (just Amisha) but defined as a
 * regular document type so the system gracefully supports a second
 * author (guest practitioner, co-instructor) later without a schema
 * migration.
 *
 * Drives the E-E-A-T author block at the bottom of every article and
 * the canonical Person JSON-LD on the article page.
 */
export const authorSchema = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL fragment under `/author/`. Use kebab-case.",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role / tagline",
      description:
        "Short professional descriptor shown under the name, e.g. 'Founder · Move & Meditate'.",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Short bio (for article footer)",
      description: "1-3 sentences. Shown in the post's author card.",
      type: "text",
      rows: 4,
      validation: (r) => r.required().max(420),
    }),
    defineField({
      name: "longBio",
      title: "Long bio (for /author profile page)",
      description: "Full bio for the author profile route. Optional.",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "photo",
      title: "Photo",
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
      name: "credentials",
      title: "Credentials",
      description:
        "Short tags rendered as chips, e.g. 'RYT-500', 'Sound healing certified', '10+ years teaching'.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "social",
      title: "Social links",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
