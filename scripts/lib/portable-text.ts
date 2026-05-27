/**
 * Tiny Portable Text authoring helpers.
 *
 * Goal: let article files in `content/blog/*.ts` read like prose
 * instead of nested JSON. Each function returns a Portable Text block
 * (or block-like) object that Sanity stores as-is.
 *
 * Example:
 *
 *   body: [
 *     p("Bangalore's yoga scene is..."),
 *     h2("The Bangalore yoga ecosystem"),
 *     p("Walk down 100ft Road and..."),
 *     bullet([
 *       "Hatha — slow, foundational",
 *       "Vinyasa — breath-led flow",
 *     ]),
 *     calloutTip([p("Try this before your first class: ...")]),
 *     ctaCard({
 *       heading: "Ready to roll out a mat?",
 *       body: "I run small-group classes in Indiranagar each week.",
 *       ctaLabel: "EXPLORE YOGA",
 *       ctaHref: "/yoga",
 *     }),
 *   ]
 *
 * For inline links inside a paragraph, use `richP([...])` with `txt`,
 * `link`, `internalLink`, and `strong` helpers.
 */
import { randomUUID } from "node:crypto";

const uid = () => randomUUID().replace(/-/g, "").slice(0, 12);

// ─── Inline spans / marks ────────────────────────────────────────────

export type Span = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

export type RichChild = Span;

export type MarkDef = { _type: string; _key: string } & Record<string, unknown>;

/** Plain inline text. */
export function txt(text: string, marks: string[] = []): RichChild {
  return { _type: "span", _key: uid(), text, marks };
}

/** Bold inline span. */
export function strong(text: string): RichChild {
  return txt(text, ["strong"]);
}

/** Italic inline span. */
export function em(text: string): RichChild {
  return txt(text, ["em"]);
}

/** Inline code span. */
export function code(text: string): RichChild {
  return txt(text, ["code"]);
}

/** External link — opens in new tab via the renderer. */
export function link(text: string, href: string): {
  span: RichChild;
  mark: MarkDef;
} {
  const key = uid();
  return {
    span: { _type: "span", _key: uid(), text, marks: [key] },
    mark: { _type: "link", _key: key, href },
  };
}

/** Internal link — site-relative path. */
export function internalLink(
  text: string,
  path: string
): { span: RichChild; mark: MarkDef } {
  const key = uid();
  return {
    span: { _type: "span", _key: uid(), text, marks: [key] },
    mark: { _type: "internalLink", _key: key, path },
  };
}

// ─── Block builders ──────────────────────────────────────────────────

type Block = {
  _type: "block";
  _key: string;
  style: string;
  markDefs: MarkDef[];
  children: RichChild[];
  listItem?: "bullet" | "number";
  level?: number;
};

function block(
  style: string,
  children: RichChild[],
  markDefs: MarkDef[] = [],
  listItem?: "bullet" | "number"
): Block {
  return {
    _type: "block",
    _key: uid(),
    style,
    markDefs,
    children,
    ...(listItem ? { listItem, level: 1 } : {}),
  };
}

/** Plain paragraph from a string. */
export function p(text: string): Block {
  return block("normal", [txt(text)]);
}

/** Rich paragraph from a sequence of inline children.
 *  Mix `txt`, `strong`, `em`, `link(...).span`, `internalLink(...).span`.
 *  Pass any `link(...).mark` / `internalLink(...).mark` separately via
 *  the second argument so they're attached to the block's `markDefs`. */
export function richP(children: RichChild[], markDefs: MarkDef[] = []): Block {
  return block("normal", children, markDefs);
}

/** Heading 2. */
export function h2(text: string): Block {
  return block("h2", [txt(text)]);
}

/** Heading 3. */
export function h3(text: string): Block {
  return block("h3", [txt(text)]);
}

/** Heading 4. */
export function h4(text: string): Block {
  return block("h4", [txt(text)]);
}

/** Blockquote (single paragraph). */
export function quote(text: string): Block {
  return block("blockquote", [txt(text)]);
}

/** Bullet list — pass an array of strings (or arrays of inline children). */
export function bullet(items: (string | RichChild[])[]): Block[] {
  return items.map((item) =>
    typeof item === "string"
      ? block("normal", [txt(item)], [], "bullet")
      : block("normal", item, [], "bullet")
  );
}

/** Numbered list. */
export function numbered(items: (string | RichChild[])[]): Block[] {
  return items.map((item) =>
    typeof item === "string"
      ? block("normal", [txt(item)], [], "number")
      : block("normal", item, [], "number")
  );
}

// ─── Custom block types ──────────────────────────────────────────────

type CalloutBlock = {
  _type: "callout";
  _key: string;
  tone: "note" | "tip" | "warning";
  body: Block[];
};

function callout(tone: CalloutBlock["tone"], body: Block[]): CalloutBlock {
  return { _type: "callout", _key: uid(), tone, body };
}

export const calloutNote = (body: Block[]) => callout("note", body);
export const calloutTip = (body: Block[]) => callout("tip", body);
export const calloutWarning = (body: Block[]) => callout("warning", body);

type CtaCardBlock = {
  _type: "ctaCard";
  _key: string;
  heading: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
};

export function ctaCard(props: Omit<CtaCardBlock, "_type" | "_key">): CtaCardBlock {
  return { _type: "ctaCard", _key: uid(), ...props };
}

// ─── Type union for the body array ───────────────────────────────────

export type PortableTextBlock = Block | CalloutBlock | CtaCardBlock;
