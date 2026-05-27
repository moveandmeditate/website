import Image from "next/image";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

type MediaFrameProps = React.HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** When true, render a brand-toned placeholder block instead of the real asset. */
  placeholder?: boolean;
  rounded?: boolean;
  watermark?: boolean;
  fit?: "cover" | "contain";
};

/**
 * Frame that either renders next/image when the real asset is available,
 * or shows a brand-toned placeholder so layout never collapses.
 * Image generation (Higgsfield Nano Banana Pro 2) is a separate task —
 * components ship layout-ready; we drop files into /public/images later.
 */
export function MediaFrame({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  placeholder = false,
  rounded = false,
  watermark = true,
  fit = "cover",
  ...rest
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-bg-3",
        rounded && "rounded-md",
        className
      )}
      role={placeholder ? "img" : undefined}
      aria-label={placeholder ? alt : undefined}
      {...rest}
    >
      {placeholder ? (
        <div className="absolute inset-0 grid place-items-center">
          {/* soft warm gradient texture */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,_var(--bg-2),_var(--bg-3))]" />
          {watermark && (
            <>
              <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(135deg,_var(--ink)_0_1px,_transparent_1px_8px)]" />
              <Logo className="relative text-ink/15" size={96} />
            </>
          )}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            fit === "cover" ? "object-cover" : "object-contain",
            imageClassName
          )}
        />
      )}
    </div>
  );
}
