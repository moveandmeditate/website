import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Info, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";
import { MediaFrame } from "@/components/media-frame";
import { urlForImage } from "@/sanity/lib/image";
import type { CmsImage } from "@/sanity/lib/blog";

type LinkMark = { _type: "link"; href: string };
type InternalLinkMark = { _type: "internalLink"; path: string };

type FigureBlock = CmsImage & { _type: "figure" };

type CalloutBlock = {
  _type: "callout";
  tone: "note" | "tip" | "warning";
  body: unknown; // nested PortableText
};

type CtaCardBlock = {
  _type: "ctaCard";
  heading: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
};

const CALLOUT_TONE: Record<
  CalloutBlock["tone"],
  { label: string; Icon: typeof Info; bg: string; border: string; iconColor: string }
> = {
  note: {
    label: "Note",
    Icon: Info,
    bg: "bg-bg-3",
    border: "border-line-2",
    iconColor: "text-ink-2",
  },
  tip: {
    label: "Try this",
    Icon: Lightbulb,
    bg: "bg-bg-3",
    border: "border-gold/60",
    iconColor: "text-gold-dk",
  },
  warning: {
    label: "Heads up",
    Icon: AlertTriangle,
    bg: "bg-bg-2",
    border: "border-ink/20",
    iconColor: "text-ink",
  },
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-[15.5px] leading-[1.85] text-ink-2">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-3 text-section-title text-[1.65rem] lg:text-[1.85rem] tracking-[0.02em] text-ink scroll-mt-[var(--header-h)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-2 text-section-title text-[1.25rem] lg:text-[1.4rem] text-ink scroll-mt-[var(--header-h)]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-7 mb-2 text-[1.05rem] font-semibold text-ink">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-7 mb-7 border-l-2 border-gold pl-5 italic font-serif text-[1.15rem] leading-[1.6] text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 mb-3 list-disc pl-6 space-y-2 text-[15.5px] leading-[1.8] text-ink-2 marker:text-gold-dk">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 mb-3 list-decimal pl-6 space-y-2 text-[15.5px] leading-[1.8] text-ink-2 marker:text-gold-dk marker:font-medium">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-bg-3 text-ink rounded-sm px-1.5 py-0.5 text-[0.9em] font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = (value as LinkMark | undefined)?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="underline decoration-line-2 underline-offset-2 hover:text-gold-dk hover:decoration-gold-dk transition-colors"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const path = (value as InternalLinkMark | undefined)?.path ?? "/";
      return (
        <Link
          href={path}
          className="underline decoration-line-2 underline-offset-2 hover:text-gold-dk hover:decoration-gold-dk transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    figure: ({ value }) => {
      const img = value as FigureBlock;
      if (!img?.asset) return null;
      const src = urlForImage(img).width(1400).auto("format").url();
      const aspect =
        img.asset.metadata?.dimensions?.width &&
        img.asset.metadata?.dimensions?.height
          ? img.asset.metadata.dimensions.width /
            img.asset.metadata.dimensions.height
          : 16 / 9;
      return (
        <figure className="my-10">
          <div
            className="relative w-full bg-bg-2 overflow-hidden"
            style={{ aspectRatio: aspect }}
          >
            <MediaFrame
              src={src}
              alt={img.alt || ""}
              className="absolute inset-0"
              sizes="(min-width: 1024px) 720px, 100vw"
              watermark={false}
            />
          </div>
          {img.caption ? (
            <figcaption className="mt-3 text-[12.5px] text-muted text-center italic">
              {img.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    callout: ({ value }) => {
      const cv = value as CalloutBlock;
      const tone = CALLOUT_TONE[cv.tone] ?? CALLOUT_TONE.note;
      const Icon = tone.Icon;
      return (
        <aside
          role="note"
          aria-label={tone.label}
          className={`my-7 flex gap-3 border-l-2 ${tone.border} ${tone.bg} px-5 py-4`}
        >
          <Icon className={`size-5 shrink-0 mt-1 ${tone.iconColor}`} aria-hidden />
          <div className="flex-1">
            <div className="text-[10.5px] tracking-[0.22em] font-medium uppercase text-muted">
              {tone.label}
            </div>
            <div className="mt-1 text-[14.5px] leading-[1.7] text-ink-2">
              {/* Nested PortableText for callout body — only normal blocks
                  + inline marks. Reusing components keeps tone consistent. */}
              <PortableText
                value={cv.body as never}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="[&:not(:first-child)]:mt-3">{children}</p>
                    ),
                  },
                  marks: components.marks,
                }}
              />
            </div>
          </div>
        </aside>
      );
    },
    ctaCard: ({ value }) => {
      const cv = value as CtaCardBlock;
      const external = /^https?:\/\//.test(cv.ctaHref);
      return (
        <aside className="my-10 bg-ink text-bg p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h4 className="text-section-title text-[1.4rem] text-bg">
              {cv.heading}
            </h4>
            {cv.body ? (
              <p className="mt-2 text-[13.5px] leading-[1.7] text-bg/85 max-w-[52ch]">
                {cv.body}
              </p>
            ) : null}
          </div>
          {external ? (
            <a
              href={cv.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start lg:self-auto inline-flex items-center gap-2 bg-bg text-ink px-5 h-11 text-[11px] tracking-[0.22em] font-medium hover:bg-bg-2 transition-colors"
            >
              {cv.ctaLabel}
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          ) : (
            <Link
              href={cv.ctaHref}
              className="self-start lg:self-auto inline-flex items-center gap-2 bg-bg text-ink px-5 h-11 text-[11px] tracking-[0.22em] font-medium hover:bg-bg-2 transition-colors"
            >
              {cv.ctaLabel}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          )}
        </aside>
      );
    },
  },
};

export function BlogPortableText({ value }: { value: unknown }) {
  return <PortableText value={value as never} components={components} />;
}
