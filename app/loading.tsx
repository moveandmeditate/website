import { Logo } from "@/components/logo";

/**
 * Root loading skeleton — shown during the brief client-side navigation
 * window when the new route's tree is being streamed. All pages are static
 * so this rarely flashes for long, but it's a graceful fallback that
 * matches the cream brand rather than a blank white screen.
 */
export default function Loading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="min-h-dvh grid place-items-center bg-bg"
    >
      <div className="flex flex-col items-center gap-5">
        <Logo size={56} className="animate-pulse" />
        <p className="text-[11px] tracking-[0.24em] uppercase text-muted">
          One breath…
        </p>
      </div>
    </main>
  );
}
