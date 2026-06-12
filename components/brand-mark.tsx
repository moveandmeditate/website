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
  /** Tailwind height class override for the rendered logo. Defaults to
   *  `h-7`. Used per-brand to even out the optical weight of marks that
   *  read smaller / larger than the shared default at the same height. */
  logoHeightClass?: string;
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
/**
 * Shared sizing scale. Every wordmark renders into a fixed 32px-tall slot
 * so the grid lines up visually no matter how many letters the brand has.
 *
 *  - `PRIMARY`   — single-line wordmarks. Same body height across all
 *    cases; weight + letter-spacing are the only visual differentiators.
 *  - `STACK_TOP` / `STACK_SUB` — two-line marks. The sub-line carries the
 *    "& Co" / "Pvt Ltd" / "Technology" extension at a uniform small cap.
 *
 * Keep the per-case overrides cosmetic only (font, case, italic, colour).
 * Resist re-introducing per-case `text-[Npx]` — that's what threw the row
 * off in the first place.
 */
const SLOT = "shrink-0 select-none flex items-center justify-center h-8 leading-none";
const PRIMARY = "text-[16px]";
const STACK_TOP = "text-[13px] font-bold leading-[1.05]";
const STACK_SUB =
  "block mt-0.5 text-[9px] tracking-[0.28em] text-muted font-medium uppercase";

export function BrandMark({ brand, className }: BrandMarkProps) {
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
          "shrink-0 select-none",
          brand.logoHeightClass ?? "h-8",
          "w-auto object-contain max-w-[180px]",
          className
        )}
        // Logos are tiny + already CDN-cached; skip Next/Image
        // optimisation pipeline to avoid double-processing.
        unoptimized
      />
    );
  }

  switch (brand.render) {
    case "kpmg":
      return (
        <span
          className={cn(SLOT, PRIMARY, "font-sans font-extrabold tracking-[0.06em]", className)}
          style={{ color: "#00338D" }}
          aria-label={brand.name}
        >
          KPMG
        </span>
      );
    case "pwc":
      return (
        <span
          className={cn(SLOT, PRIMARY, "font-sans font-extrabold tracking-tight lowercase text-ink-2", className)}
          aria-label={brand.name}
        >
          pwc
        </span>
      );
    case "dxc":
      return (
        <span
          className={cn(SLOT, "font-sans text-ink-2 flex-row gap-1.5", className)}
          aria-label={brand.name}
        >
          <span className={cn(PRIMARY, "font-bold tracking-[0.04em]")}>DXC</span>
          <span className="text-[9px] tracking-[0.28em] uppercase text-muted font-medium">
            Technology
          </span>
        </span>
      );
    case "ralphlauren":
      return (
        <span
          className={cn(SLOT, "font-serif text-ink-2 flex-col gap-[1px] tracking-[0.28em] uppercase", className)}
          aria-label={brand.name}
        >
          <span className="text-[11px] leading-none">Ralph</span>
          <span className="text-[11px] leading-none">Lauren</span>
        </span>
      );
    case "divyasree":
      return (
        <span
          className={cn(SLOT, PRIMARY, "font-serif italic font-medium tracking-tight text-ink-2", className)}
          aria-label={brand.name}
        >
          Divyasree
        </span>
      );
    case "mgoindia":
      return (
        <span
          className={cn(SLOT, "text-ink-2 flex-col text-center", className)}
          aria-label={brand.name}
        >
          <span className={cn(STACK_TOP, "font-sans tracking-[0.04em]")}>MGO</span>
          <span className={STACK_SUB}>India</span>
        </span>
      );
    case "smallworld":
      return (
        <span
          className={cn(SLOT, PRIMARY, "font-serif italic font-medium tracking-tight text-ink-2", className)}
          aria-label={brand.name}
        >
          Small&nbsp;World
        </span>
      );
    case "khoyeraaste":
      return (
        <span
          className={cn(SLOT, PRIMARY, "font-serif font-medium tracking-[0.08em] uppercase text-ink-2", className)}
          aria-label={brand.name}
        >
          Khoye Raaste
        </span>
      );
    case "mello":
      return (
        <span
          className={cn(SLOT, PRIMARY, "font-sans font-bold tracking-tight lowercase text-ink-2", className)}
          aria-label={brand.name}
        >
          mello
        </span>
      );
    case "dmentors":
      return (
        <span
          className={cn(SLOT, "text-ink-2 flex-col text-center", className)}
          aria-label={brand.name}
        >
          <span className={cn(STACK_TOP, "font-sans tracking-[0.12em] uppercase")}>Dmentors</span>
          <span className={STACK_SUB}>Dance Academy</span>
        </span>
      );
    case "sukoonqawalli":
      return (
        <span
          className={cn(SLOT, "text-ink-2 flex-col text-center", className)}
          aria-label={brand.name}
        >
          <span className={cn(STACK_TOP, "font-serif italic tracking-[0.02em]")}>
            Sukoon&nbsp;Wali
          </span>
          <span className={STACK_SUB}>Qawwali</span>
        </span>
      );
    case "vagdevi":
      return (
        <span
          className={cn(SLOT, "text-ink-2 flex-col text-center", className)}
          aria-label={brand.name}
        >
          <span className={cn(STACK_TOP, "font-serif tracking-[0.08em] uppercase")}>
            Vagdevi Vilas
          </span>
          <span className={STACK_SUB}>School</span>
        </span>
      );
    case "vmsentertainments":
      return (
        <span
          className={cn(SLOT, "text-ink-2 flex-col text-center", className)}
          aria-label={brand.name}
        >
          <span className={cn(STACK_TOP, "font-sans font-extrabold tracking-[0.18em]")}>VMS</span>
          <span className={STACK_SUB}>Entertainments</span>
        </span>
      );
    case "knspartners":
      return (
        <span
          className={cn(SLOT, "text-ink-2 flex-col text-center", className)}
          aria-label={brand.name}
        >
          <span className={cn(STACK_TOP, "font-serif tracking-[0.12em] uppercase")}>K&amp;S</span>
          <span className={STACK_SUB}>Partners</span>
        </span>
      );
    case "godigit":
      return (
        <span
          className={cn(SLOT, PRIMARY, "font-sans font-bold tracking-tight text-ink-2", className)}
          aria-label={brand.name}
        >
          go
          <span className="ml-0.5 italic font-extrabold">digit</span>
        </span>
      );
    case "colt":
      return (
        <span
          className={cn(SLOT, "text-ink-2 flex-col text-center", className)}
          aria-label={brand.name}
        >
          <span className={cn(STACK_TOP, "font-sans font-extrabold tracking-[0.04em] uppercase")}>
            Colt
          </span>
          <span className={STACK_SUB}>Technologies</span>
        </span>
      );
    case "plain":
    default:
      // No render enum + no logo image — fall back to plain text so
      // editors who create a brand with only `name` still see something.
      return (
        <span
          className={cn(SLOT, PRIMARY, "font-sans font-medium tracking-wide text-ink-2", className)}
          aria-label={brand.name}
        >
          {brand.name}
        </span>
      );
  }
}
