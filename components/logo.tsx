import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Pixel size on the square axis. The PNG keeps its own aspect ratio. */
  size?: number;
  title?: string;
  style?: React.CSSProperties;
};

/**
 * Move & Meditate logo — renders the real brand asset.
 * Source: `public/mam-logo.png` (copied from `inspirations/mam_logo.png`).
 *
 * Kept as a tiny wrapper around <Image /> so we can swap to SVG later
 * (after vectorising) without touching every consumer.
 */
export function Logo({
  className,
  size = 64,
  title = "Move & Meditate",
  style,
}: LogoProps) {
  return (
    <Image
      src="/mam-logo.png"
      width={size}
      height={size}
      alt={title}
      style={style}
      priority
      className={cn("shrink-0 select-none object-contain", className)}
    />
  );
}
