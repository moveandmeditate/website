/**
 * Studio route layout. Lives at this level so the embedded Studio gets
 * the right `viewport`, `metadata` (robots: noindex), and a clean React
 * subtree without inheriting marketing chrome.
 *
 * The page itself is a Client Component (the Studio is a 100% client-
 * side React app), but `metadata`/`viewport` can only be exported from
 * Server Components — hence this layout split.
 */
import "../../globals.css";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
