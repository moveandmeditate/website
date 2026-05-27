import { cn } from "@/lib/utils";
import type { Brand } from "@/lib/content";

type BrandMarkProps = {
  brand: Brand;
  className?: string;
};

/**
 * Typographic recreation of the trusted-by brand wordmarks.
 * Render-style is keyed off `brand.render`, with each variant matching the
 * brand's classic colour cue (Google rainbow, Adobe red, Deloitte green dot).
 *
 * NOTE: replace with licensed SVG logos once the client provides press-kit assets.
 */
export function BrandMark({ brand, className }: BrandMarkProps) {
  const base = "shrink-0 select-none";

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
  }
}
