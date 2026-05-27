import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Blog post. Cornerstone content for SEO + GEO.
 *
 * Field-design notes:
 *   - `body` is Portable Text. Custom block + mark types let editors
 *     embed images, callouts, code (rare but useful for breath-cadence
 *     diagrams), CTA cards, and internal links to pillar pages.
 *   - `faq` drives an accordion at the foot of the post AND emits
 *     FAQPage JSON-LD when present. Empty array = section hidden.
 *   - `relatedPillar` lets editors anchor a post to its conversion
 *     pillar; the article footer renders a CTA card pointing there.
 *   - `seo` overrides are optional; the renderer falls back to title +
 *     excerpt + heroImage when fields are blank.
 *   - `category` is a hard enum (not a reference) so we never end up
 *     with a thin /blog/category/ archive for a category nobody used.
 */
export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description:
        "The full headline. Used as the H1, the OG title, and the blog-card title.",
      type: "string",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL fragment under `/blog/`. Keep short + keyword-led.",
      type: "slug",
      options: { source: "title", maxLength: 90 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "60-160 chars. Used as the meta description and the card teaser. Lead with the value, not the headline.",
      type: "text",
      rows: 3,
      validation: (r) =>
        r
          .required()
          .min(60)
          .max(180)
          .error("Excerpt should be 60-180 characters."),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image (optional)",
      description:
        "Landscape, ~1600x900. Optional — the article renders cleanly without one, and Amisha can add or replace this later. Used as the OG share image when present.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          description: "Required when the image is set; helps screen readers and SEO.",
          type: "string",
          validation: (r) =>
            r.custom((value, ctx) => {
              const parent = (ctx.parent ?? {}) as { asset?: unknown };
              if (parent.asset && !value) return "Alt text is required when an image is uploaded.";
              return true;
            }),
        }),
        defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description:
        "Single-select. Drives the category badge + the blog index filter.",
      type: "string",
      options: {
        list: [
          { title: "Dance", value: "dance" },
          { title: "Yoga", value: "yoga" },
          { title: "Weddings", value: "weddings" },
          { title: "Corporate", value: "corporate" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description:
        "Free-form tags. Use kebab-case. Examples: 'beginners', 'bangalore', 'science-backed'.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      description: "Sort + dateline. Set to the day the post first goes live.",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated at (optional)",
      description:
        "Set when you've meaningfully revised the post. Drives the 'last reviewed' line + freshness signal in JSON-LD.",
      type: "datetime",
    }),
    defineField({
      name: "readingTime",
      title: "Reading time (minutes, override)",
      description:
        "Leave blank to auto-calculate from body word count (~225 wpm).",
      type: "number",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        // Standard text block — headings + inline marks.
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              // External link with sane defaults — opens in new tab,
              // automatically gets rel=noopener noreferrer.
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (r) =>
                      r.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
              // Internal link to another blog post or pillar page.
              {
                name: "internalLink",
                type: "object",
                title: "Internal link",
                fields: [
                  {
                    name: "path",
                    title: "Path",
                    description:
                      "Site-internal path. Examples: '/yoga', '/dance#offerings', '/blog/what-is-yoga-nidra'.",
                    type: "string",
                    validation: (r) => r.required(),
                  },
                ],
              },
            ],
          },
        }),
        // Inline image with caption + alt.
        defineArrayMember({
          name: "figure",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (r) => r.required(),
            },
            { name: "caption", title: "Caption", type: "string" },
          ],
        }),
        // Callout block — for "Note", "Warning", "Try this" cues.
        defineArrayMember({
          name: "callout",
          type: "object",
          title: "Callout",
          fields: [
            {
              name: "tone",
              title: "Tone",
              type: "string",
              options: {
                list: [
                  { title: "Note", value: "note" },
                  { title: "Tip", value: "tip" },
                  { title: "Warning", value: "warning" },
                ],
                layout: "radio",
              },
              initialValue: "note",
              validation: (r) => r.required(),
            },
            {
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }] }],
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { tone: "tone", body: "body" },
            prepare({ tone }) {
              return { title: `Callout · ${tone}` };
            },
          },
        }),
        // CTA card — used at strategic moments in the post to drop a
        // pillar-link or contact CTA without breaking the prose rhythm.
        defineArrayMember({
          name: "ctaCard",
          type: "object",
          title: "CTA card",
          fields: [
            { name: "heading", title: "Heading", type: "string", validation: (r) => r.required() },
            { name: "body", title: "Body", type: "text", rows: 2 },
            { name: "ctaLabel", title: "CTA label", type: "string", validation: (r) => r.required() },
            {
              name: "ctaHref",
              title: "CTA href",
              type: "string",
              description: "Internal path. Examples: '/yoga', '/#contact'.",
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { title: "heading", subtitle: "ctaLabel" },
          },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      description:
        "Optional. When present, renders an accordion at the post's foot AND emits FAQPage JSON-LD.",
      type: "array",
      of: [
        defineArrayMember({
          name: "faqItem",
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string", validation: (r) => r.required() },
            { name: "answer", title: "Answer", type: "text", rows: 3, validation: (r) => r.required() },
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
    defineField({
      name: "relatedPillar",
      title: "Related pillar",
      description:
        "Optional. Renders a 'Read more about <pillar>' CTA card after the article body. Defaults to `category` if blank.",
      type: "string",
      options: {
        list: [
          { title: "Dance", value: "dance" },
          { title: "Yoga", value: "yoga" },
          { title: "Weddings", value: "weddings" },
          { title: "Corporate", value: "corporate" },
        ],
      },
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts (manual override)",
      description:
        "Optional. Up to 3 posts to surface in the 'Related articles' strip. Leave empty to auto-pick by shared category + tag.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "seo",
      title: "SEO overrides",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "title", title: "Title override", type: "string" },
        { name: "description", title: "Description override", type: "string" },
        {
          name: "ogImage",
          title: "OG image override",
          type: "image",
          fields: [
            { name: "alt", title: "Alt", type: "string" },
          ],
        },
        {
          name: "noindex",
          title: "Hide from search engines (noindex)",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: "published",
      title: "Published",
      description:
        "Toggle off to keep the post indefinitely in draft. Sanity's draft system also exists; this flag is for the rendering layer.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Published — newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published — oldest first",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "heroImage",
    },
  },
});
