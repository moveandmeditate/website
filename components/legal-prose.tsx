import { cn } from "@/lib/utils";

/**
 * Reusable wrapper that styles long-form legal content with sensible reading
 * widths, serif headings and consistent vertical rhythm.
 */
export function LegalProse({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-[14px] leading-[1.85] text-ink-2",
        "[&_h1]:font-serif [&_h1]:text-[clamp(2rem,4vw,2.75rem)] [&_h1]:tracking-[0.04em] [&_h1]:text-ink [&_h1]:mb-2",
        "[&_h2]:font-serif [&_h2]:text-[1.5rem] [&_h2]:tracking-[0.04em] [&_h2]:text-ink [&_h2]:mt-12 [&_h2]:mb-3",
        "[&_h3]:font-sans [&_h3]:font-semibold [&_h3]:text-[1rem] [&_h3]:tracking-wide [&_h3]:uppercase [&_h3]:mt-8 [&_h3]:mb-2",
        "[&_p]:my-4",
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ul]:space-y-1.5",
        "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_ol]:space-y-1.5",
        "[&_a]:underline [&_a]:decoration-line-2 [&_a]:underline-offset-2 hover:[&_a]:text-gold-dk",
        "[&_strong]:text-ink [&_strong]:font-semibold",
        className
      )}
    >
      {children}
    </div>
  );
}

export function LastUpdated({ date }: { date: string }) {
  return (
    <p className="text-[11px] tracking-[0.22em] uppercase text-muted mt-4 mb-10">
      Last updated · {date}
    </p>
  );
}
