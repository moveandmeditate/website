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
 * Move & Meditate brand mark — transparent PNG provided by the client.
 * Lives at `public/mam-logo.png`. Renders via `next/image` so it picks up
 * automatic AVIF/WebP conversion + responsive `srcSet` at the requested size.
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
      priority
      style={style}
      className={cn("shrink-0 select-none object-contain", className)}
    />
  );
}
