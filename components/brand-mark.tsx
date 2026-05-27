import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Brand } from "@/lib/content";

type BrandMarkBrand = {
  name: string;
  /** Optional typographic render enum. Required on the static `Brand`
   *  type but optional here so CMS-only docs (logo image, no enum)
   *  also work. */
  render?: Brand["render"];
  /** Optional CMS-uploaded logo URL. When set, wins over the `render`
   *  enum so editors can swap in licensed press-kit assets without a
   *  code change. */
  logoSrc?: string;
  logoAlt?: string;
};

type BrandMarkProps = {
  brand: BrandMarkBrand;
  className?: string;
};

/**
 * Trusted-by brand wordmark / logo renderer.
 *
 * Priority:
 *   1. `brand.logoSrc` (CMS-uploaded image) → render as <Image>
 *   2. `brand.render` enum → hand-styled wordmark with the brand's
 *      classic colour cue (Google rainbow, Adobe red, Deloitte green dot)
 *   3. Plain text name fallback (no render enum, no logo)
 */
export function BrandMark({ brand, className }: BrandMarkProps) {
  const base = "shrink-0 select-none";

  // CMS-uploaded logo wins — editors can replace any hand-typed
  // wordmark by uploading a licensed asset in Studio.
  if (brand.logoSrc) {
    return (
      <Image
        src={brand.logoSrc}
        alt={brand.logoAlt || brand.name}
        title={brand.name}
        width={220}
        height={48}
        className={cn(
          base,
          "h-7 w-auto object-contain max-w-[140px]",
          className
        )}
        // Logos are tiny + already CDN-cached; skip Next/Image
        // optimisation pipeline to avoid double-processing.
        unoptimized
      />
    );
  }

  switch (brand.render) {
    case "google":
      return (
        <span className={cn(base, "font-sans font-medium text-[22px] tracking-tight", className)} aria-label={brand.name}>
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#DB4437" }}>o</span>
          <span style={{ color: "#F4B400" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#0F9D58" }}>l</span>
          <span style={{ color: "#DB4437" }}>e</span>
        </span>
      );
    case "infosys":
      return (
        <span className={cn(base, "font-sans font-semibold text-[19px]", className)} style={{ color: "#007CC3" }} aria-label={brand.name}>
          Infosys
        </span>
      );
    case "mckinsey":
      return (
        <span className={cn(base, "font-sans font-semibold leading-[1.05] text-[12px] text-center text-ink-2", className)} aria-label={brand.name}>
          McKinsey<br />&amp; Company
        </span>
      );
    case "wework":
      return (
        <span className={cn(base, "font-sans font-bold text-[18px] tracking-tight text-ink-2", className)} aria-label={brand.name}>
          wework
        </span>
      );
    case "puma":
      return (
        <span className={cn(base, "font-sans italic font-extrabold text-[20px] tracking-wider text-ink-2", className)} aria-label={brand.name}>
          PUMA
        </span>
      );
    case "adobe":
      return (
        <span className={cn(base, "font-sans font-extrabold text-[20px]", className)} style={{ color: "#FA0F00" }} aria-label={brand.name}>
          Adobe
        </span>
      );
    case "deloitte":
      return (
        <span className={cn(base, "font-sans font-bold text-[19px] text-ink-2", className)} aria-label={brand.name}>
          Deloitte<span style={{ color: "#86BC25" }}>.</span>
        </span>
      );
    default:
      // No render enum + no logo image — fall back to plain text so
      // editors who create a brand with only `name` still see something.
      return (
        <span
          className={cn(
            base,
            "font-sans font-medium text-[15px] tracking-wide text-ink-2",
            className
          )}
          aria-label={brand.name}
        >
          {brand.name}
        </span>
      );
  }
}
