import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Page not found",
  description: "We can't find that page — but here are a few good places to head next.",
  robots: { index: false, follow: false },
};

const SUGGESTIONS = [
  { label: "Dance", href: "/dance", note: "Group + private classes, sangeet warm-ups, online" },
  { label: "Yoga", href: "/yoga", note: "Vinyasa, restorative, breathwork, yoga nidra" },
  { label: "Weddings", href: "/weddings", note: "Sangeet choreography + family performances" },
  { label: "Corporate", href: "/corporate", note: "Team workshops, offsites + on-demand library" },
];

export default function NotFound() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-bg px-6 py-24 text-center">
      <Logo size={72} />

      <p className="mt-8 text-eyebrow text-muted">404 · Page not found</p>
      <h1 className="mt-3 font-serif text-[clamp(2.5rem,6vw,4rem)] tracking-[0.04em] leading-[1.05] text-ink max-w-[18ch]">
        This page took a long, quiet breath.
      </h1>
      <p className="mt-5 max-w-[44ch] text-[13px] leading-[1.85] text-ink-2">
        We can&apos;t find the page you were looking for. It may have moved, or
        the link might be off by a character. Head back to the studio entrance,
        or pick a pillar below.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-ink text-bg text-[11px] tracking-[0.24em] px-7 font-medium hover:bg-ink-2 transition-colors"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Return home
      </Link>

      <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {SUGGESTIONS.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="group block bg-bg-2 border border-line-2 p-5 text-left hover:bg-bg-3 transition-colors"
            >
              <div className="font-serif text-[1.35rem] tracking-[0.04em] text-ink">
                {s.label}
              </div>
              <div className="mt-1 text-[12px] leading-[1.7] text-muted">
                {s.note}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
