import type { StructureBuilder } from "sanity/structure";

/**
 * Custom desk structure.
 *
 * Singletons (siteSettings, founderProfile) appear as a single editable
 * document — no list view, no "+" button — so editors can't create
 * duplicates. Collections (event, testimonial) keep the default list +
 * create flow.
 *
 * Each singleton is stored under a fixed document ID (the type name)
 * which the helper below pins via `documentId()`.
 */
const SINGLETON_TYPES = new Set(["siteSettings", "founderProfile"]);

const SINGLETON_ORDER = ["siteSettings", "founderProfile"] as const;

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Singletons first — one fixed doc each.
      ...SINGLETON_ORDER.map((typeName) =>
        S.listItem()
          .title(
            typeName === "siteSettings" ? "Site settings" : "Founder profile"
          )
          .id(typeName)
          .child(
            S.document().schemaType(typeName).documentId(typeName)
          )
      ),
      S.divider(),
      // Collections — default list + create flow.
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("brand").title("Trusted-by brands"),
      S.divider(),
      S.documentTypeListItem("blogPost").title("Blog posts"),
      S.documentTypeListItem("author").title("Authors"),
    ]);

/** Used by `document.actions` in sanity.config.ts to strip create/delete
 *  actions from singleton document types. */
export function isSingletonType(typeName?: string): boolean {
  return typeName ? SINGLETON_TYPES.has(typeName) : false;
}

/** Same set, exposed as a list for `document.newDocumentOptions` to
 *  filter the global "Create" menu. */
export const SINGLETON_TYPE_LIST = Array.from(SINGLETON_TYPES);
