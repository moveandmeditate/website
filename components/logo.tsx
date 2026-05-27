import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Pixel size on the square axis. Both width and height match `size`. */
  size?: number;
  title?: string;
  style?: React.CSSProperties;
  /** When true, wrap the mark in a circular cream cap (legacy header look). */
  badge?: boolean;
};

/**
 * Move & Meditate brand mark — inline SVG redraw of the client's logo
 * (mountains forming an M, sun dot above, brushstroke horizon below).
 *
 * Why not the raw SVG asset? The client-supplied SVG is a 2.9 MB
 * bitmap-traced mesh that SVGO can't slim. This redraw is ~500 bytes,
 * scales infinitely, and inherits color from `currentColor` so we can
 * theme it on dark surfaces (footer, photo overlays) without touching
 * the file.
 *
 * Tweak the `stroke-width` only — geometry is calibrated to the original.
 */
export function Logo({
  className,
  size = 64,
  title = "Move & Meditate",
  style,
  badge = false,
}: LogoProps) {
  const Svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      style={badge ? undefined : style}
      className={cn(
        "shrink-0 select-none text-[#465E2A]",
        badge ? undefined : className
      )}
    >
      <title>{title}</title>
      {/* Sun dot */}
      <circle cx="100" cy="48" r="6" fill="currentColor" />
      {/* Left mountain (left peak rising, falling into the inner V) */}
      <path
        d="M 28 158 C 38 140, 58 88, 78 66 C 88 55, 96 70, 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right mountain (mirror) */}
      <path
        d="M 172 158 C 162 140, 142 88, 122 66 C 112 55, 104 70, 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Horizon brushstroke */}
      <path
        d="M 50 170 C 78 184, 122 184, 150 170"
        fill="none"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
    </svg>
  );

  if (!badge) return Svg;

  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid place-items-center rounded-full bg-bg shrink-0 overflow-hidden",
        className
      )}
      style={{ width: size, height: size, ...style }}
    >
      <span style={{ width: "82%", height: "82%" }} className="grid place-items-center">
        {Svg}
      </span>
    </span>
  );
}
