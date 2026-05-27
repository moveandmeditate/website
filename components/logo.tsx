import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: number;
  withEstablished?: boolean;
  title?: string;
  style?: React.CSSProperties;
};

/**
 * Move & Meditate stamp emblem.
 * Recreated as a clean SVG from inspirations/logo.jpeg — circular badge with an
 * M-shaped mountain glyph, a dot for the sun, and a horizon brushstroke.
 */
export function Logo({
  className,
  size = 64,
  withEstablished = false,
  title = "Move & Meditate",
  style,
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
      style={style}
    >
      <title>{title}</title>
      {/* Outer + inner circles */}
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1.5" />

      {/* Dots flanking the established label slot */}
      <circle cx="22" cy="100" r="2.4" fill="currentColor" />
      <circle cx="178" cy="100" r="2.4" fill="currentColor" />

      {/* Top text on a curve: MOVE & MEDITATE */}
      <defs>
        <path
          id="logo-top-arc"
          d="M 38 100 A 62 62 0 0 1 162 100"
          fill="none"
        />
        <path
          id="logo-bottom-arc"
          d="M 50 110 A 50 50 0 0 0 150 110"
          fill="none"
        />
      </defs>
      <text
        fontFamily="var(--font-serif), Georgia, serif"
        fontSize="14"
        letterSpacing="3.2"
        fill="currentColor"
      >
        <textPath href="#logo-top-arc" startOffset="50%" textAnchor="middle">
          MOVE &amp; MEDITATE
        </textPath>
      </text>

      {withEstablished && (
        <text
          fontFamily="var(--font-serif), Georgia, serif"
          fontSize="10"
          letterSpacing="3.5"
          fill="currentColor"
        >
          <textPath href="#logo-bottom-arc" startOffset="50%" textAnchor="middle">
            EST. 2026
          </textPath>
        </text>
      )}

      {/* M-mountain glyph with sun dot */}
      <circle cx="100" cy="78" r="3" fill="currentColor" />
      <path
        d="M 70 132 L 90 92 L 100 108 L 110 92 L 130 132"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="round"
      />

      {/* Horizon brushstroke */}
      <path
        d="M 68 142 C 80 148 120 148 132 142"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
