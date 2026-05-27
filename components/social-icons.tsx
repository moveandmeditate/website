import type { SVGProps } from "react";

/**
 * Hand-rolled social brand icons. `lucide-react@1` removed brand glyphs for
 * trademark reasons, so we ship our own minimal versions to avoid a second icon
 * dependency. All icons inherit `currentColor`.
 */

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5H16l.5-3h-3V8.5c0-.85.3-1.5 1.5-1.5H17V4.2A19 19 0 0 0 14.5 4C12 4 10.5 5.4 10.5 8v2.5H8v3h2.5V21h3z" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 8.4a2.6 2.6 0 0 0-1.8-1.8C18.6 6.2 12 6.2 12 6.2s-6.6 0-8.2.4A2.6 2.6 0 0 0 2 8.4 27 27 0 0 0 1.6 12 27 27 0 0 0 2 15.6a2.6 2.6 0 0 0 1.8 1.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4a2.6 2.6 0 0 0 1.8-1.8 27 27 0 0 0 .4-3.6 27 27 0 0 0-.4-3.6ZM10 15V9l5.2 3Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.5 3.5A11 11 0 0 0 3.7 18l-1.2 4.4 4.5-1.2A11 11 0 1 0 20.5 3.5Zm-8.5 17a8.8 8.8 0 0 1-4.5-1.2l-.3-.2-2.7.7.7-2.6-.2-.3a8.8 8.8 0 1 1 7 3.6Zm4.8-6.6c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.7 4.4 3.8 2.6 1.1 2.6.7 3.1.7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}
