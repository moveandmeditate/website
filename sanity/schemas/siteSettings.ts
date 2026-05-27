import { defineField, defineType } from "sanity";

/**
 * Site-wide settings: contact info, social URLs, hero copy. Singleton.
 * Keeps the "tweak the WhatsApp link, change the homepage tagline"
 * workflow in CMS rather than requiring a code push.
 */
export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Public contact email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Contact phone",
      description: "International format, e.g. +91 98765 43210.",
      type: "string",
    }),
    defineField({
      name: "whatsappCommunity",
      title: "WhatsApp community invite URL",
      type: "url",
      validation: (r) =>
        r.uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
      validation: (r) =>
        r.uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      type: "url",
      validation: (r) =>
        r.uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
      validation: (r) =>
        r.uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({
      name: "calBookingUrl",
      title: "Discovery-call booking URL",
      description: "Cal.com / Calendly link. Used by the 'Book Discovery Call' button.",
      type: "url",
      validation: (r) =>
        r.uri({ scheme: ["https"], allowRelative: false }),
    }),
    defineField({
      name: "tagline",
      title: "Hero tagline",
      description:
        "Short pull-quote under the hero wordmark. Overrides the static fallback if set.",
      type: "string",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
