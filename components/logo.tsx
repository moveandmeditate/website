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
 * Move & Meditate logo — renders the real brand asset inside a circular
 * cream cap so it sits cleanly on any background (cream, photo, footer).
 * Source: `public/mam-logo.png` (copied from `inspirations/mam_logo.png`).
 */
export function Logo({
  className,
  size = 64,
  title = "Move & Meditate",
  style,
}: LogoProps) {
  return (
    <span
      aria-label={title}
      role="img"
      className={cn(
        "inline-grid place-items-center rounded-full bg-bg shrink-0 select-none overflow-hidden",
        className
      )}
      style={{ width: size, height: size, ...style }}
    >
      <Image
        src="/mam-logo.png"
        width={size}
        height={size}
        alt=""
        priority
        className="object-contain"
        style={{ width: "82%", height: "82%" }}
      />
    </span>
  );
}
