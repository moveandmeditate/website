# AGENTS.md — Move & Meditate

Working rules for any AI agent (Claude, Copilot, Cursor, Codex, etc.) editing this repo. Read this before touching files.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## What this is

A single-page marketing + booking site for **Amisha**, a Bangalore-based dance + yoga practitioner running events, weddings, corporate retreats, and online classes. Brand wordmark is "MOVE & MEDITATE". In supporting copy: **MOVE = Dance**, **MEDITATE = Yoga**.

Public surfaces:
- `/` — landing page
- `/privacy-policy`, `/terms-and-conditions`, `/refund-policy` — legal (DPDP Act 2023 compliant)
- `/sitemap.xml`, `/robots.txt` — generated

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 App Router | Turbopack, Server Components default, Cache Components available |
| UI lib | React 19 | |
| Lang | TypeScript 5 (strict) | `pnpm typecheck` runs `tsc --noEmit` |
| Styling | Tailwind CSS v4 | `@theme inline` in `app/globals.css` — **no `tailwind.config.ts`** |
| Components | shadcn/ui (Base UI primitives, style `base-nova`) | Base UI uses `render` prop, NOT `asChild` |
| Icons | `lucide-react@1` for generic icons + hand-rolled SVG for brand glyphs | Lucide 1.x dropped brand icons (Instagram/Facebook/etc) for trademark reasons. See `components/social-icons.tsx`. |
| Motion | `motion` (rebranded Framer Motion) | All motion gated by `useReducedMotion`. Wrappers in `components/motion/*`. |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers` | Server Actions via `next/server` |
| Deploy | Vercel | |

## Commands

```bash
pnpm dev          # dev server (Turbopack)
pnpm build        # production build
pnpm start        # serve production build
pnpm lint         # eslint
pnpm typecheck    # strict tsc --noEmit
```

## Project structure

```
app/
  (legal)/                  # Route group for /privacy-policy, /terms..., /refund-policy
  layout.tsx                # Root layout: fonts (Jost + Cormorant Garamond), metadata, skip link
  page.tsx                  # Landing page composition
  globals.css               # Tailwind v4 @theme + custom CSS vars
  sitemap.ts, robots.ts     # Generated metadata files
components/
  sections/                 # One file per major page section
  motion/                   # FadeUp + Stagger primitives — use these everywhere
  ui/                       # shadcn primitives (do not edit by hand)
  logo.tsx                  # SVG emblem (mountain-M, EST. 2026)
  brand-mark.tsx            # Typographic recreation of trusted-by wordmarks
  social-icons.tsx          # Hand-rolled Instagram/Facebook/YouTube/WhatsApp glyphs
  media-frame.tsx           # next/image with placeholder fallback while assets ship
  contact-form.tsx          # Client form, RHF + Zod
  site-header.tsx, site-footer.tsx, legal-prose.tsx
lib/
  content.ts                # SINGLE SOURCE OF TRUTH for all copy + structured data
  contact-schema.ts         # Zod schema
  contact-action.ts         # Server Action stub (wire to Resend/etc later)
  seo.ts                    # JSON-LD builders
  utils.ts                  # cn() helper
public/
  images/                   # Higgsfield-generated photography (TODO)
inspirations/               # Source materials from client — do not edit
```

## Design system

Brand palette (all defined in `app/globals.css`):

| Token | Hex | Use |
|---|---|---|
| `bg` | `#f6f1ea` | Page background |
| `bg-2` | `#efe8de` | Subtle stripe |
| `bg-3` | `#eae2d4` | Cards, founder section |
| `ink` | `#1a1a1a` | Primary text, primary buttons |
| `ink-2` | `#2b2b2b` | Body copy |
| `muted` | `#6b6358` | Captions, eyebrow text |
| `line` / `line-2` | `#d9d1c2` / `#c8bfac` | Borders + dividers |
| `gold` / `gold-dk` | `#a08968` / `#7d6a4f` | Accent (stat numbers, hover) |

Fonts:
- `var(--font-serif)` → **Cormorant Garamond** — section titles, hero wordmark, signature
- `var(--font-sans)` → **Jost** — body, UI, eyebrow labels (always tracked +0.16–0.24em)

Typography rules:
- Eyebrow labels: `text-eyebrow` utility (11px / +0.16em / uppercase / weight 500)
- Section titles: `text-section-title` utility + serif
- Always Title Case for hero + section titles, ALL-CAPS for buttons + eyebrows

## Section order (DO NOT REORDER without client OK)

`Header → Hero → Upcoming Events → Trusted By → Category Tiles → Experiences → Founder → Testimonials → Contact → Footer`

Events + Trusted By sit **directly under the hero** by explicit client request. Don't move them back to the bottom.

## Navigation

5 anchors only: `HOME, MOVE, MEDITATE, EVENTS, ABOUT`. CTA: `BOOK DISCOVERY CALL → #contact`. Mobile menu also exposes `JOIN WHATSAPP COMMUNITY → #contact`.

## Anchor scrolling

Sticky header offsets via `--header-h` CSS variable, written at runtime by `site-header.tsx` (`ResizeObserver` watches its height). Each `<section id="…">` gets `scroll-margin-top: calc(var(--header-h) + 1rem)` automatically (see `globals.css` base layer). If you add a new section, give it an `id` and the offset applies for free.

## Motion

- Use `<FadeUp>` for headings + copy reveals
- Use `<Stagger>` + `<StaggerItem>` for grids (events, tiles, experiences, testimonials, stats)
- Hero uses local `motion.span` with `initial/animate` so the wordmark animates on mount, not on scroll
- ALL motion respects `prefers-reduced-motion` via `useReducedMotion()`
- Never add motion that obscures content or auto-plays for >1s

## Images (Higgsfield Nano Banana Pro 2)

15 generations planned. Prompts + alt text live alongside their content entries in `lib/content.ts` (`src` paths are `/images/<slot>.webp`). Until the batch lands, `<MediaFrame>` shows a warm gradient placeholder with optional brand watermark.

When real assets arrive:
1. Drop them at the `src` paths listed in `lib/content.ts`
2. Switch the `placeholder` prop on the consuming `<MediaFrame>` to `false` (or just remove the prop — default is `true`)
3. Run `pnpm build` to make sure next/image picks up the file dimensions

Generation count breakdown lives in `inspirations/` README (or this repo's main plan file). Estimated budget: ~$1.50–$3.00 for the full batch.

## Content edits

- All copy is in `lib/content.ts` — do not hard-code strings in component files
- Items pending real client data are flagged with `TODO:` comments. Don't ship without resolving them.
- Founder name is **Amisha**. Don't introduce other names.

## Accessibility minimums

- Every interactive element keyboard-reachable + has visible focus (`:focus-visible` ring is in globals.css)
- All icons inside buttons/links get `aria-hidden` + a textual label
- Form fields use `<Label htmlFor>` + `aria-invalid` + `aria-live` for errors
- Decorative images use `alt=""`. Content images use a descriptive `alt`.
- Honor `prefers-reduced-motion` (handled by the motion wrappers)

## Forms

`components/contact-form.tsx` validates with the Zod schema in `lib/contact-schema.ts` and posts to the Server Action in `lib/contact-action.ts`. The action is currently a logging stub — wire it to Resend / Web3Forms / a CRM webhook before launch. Honeypot field `website` must remain.

## Legal pages

All three legal pages use `<LegalProse>` from `components/legal-prose.tsx`. Edit copy directly in each route's `page.tsx`. Templates are DPDP Act 2023 + IT Rules 2021 aware but **must be reviewed by Amisha (and ideally a lawyer) before launch**. Placeholders are marked.

## Roadmap — `ROADMAP.md`

The full audit + phased plan lives in [`ROADMAP.md`](./ROADMAP.md) at repo root. It tracks:
- **Wiring gaps** — things already on the page but not fully connected (placeholder URLs, stubbed handlers, etc.)
- **Missing features** — business-analyst layer (CMS, bookings, analytics, blog, etc.)
- **Phased delivery** — Phase A wiring, Phase B CMS, Phase C growth, Phase D polish

**MANDATORY when you ship any item from the roadmap:**
1. Flip the matching `- [ ]` to `- [x]` in `ROADMAP.md` in the **same commit** that lands the change.
2. Add a one-line note after the checkbox if useful (commit hash, follow-up, etc.).
3. If you discover a new gap during the work, add a new `- [ ]` line to the right section.
4. If you decide to drop an item, change it to `- [-]` with a one-line reason.

If you complete an item that wasn't on the roadmap, ADD it (as already done) instead of silently shipping. The roadmap is the single source of truth for "what's left".

## Commit conventions

- Use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`).
- Keep messages short and precise.
- If the change was authored entirely by an AI agent, append a single line: `Assisted by AI`. Otherwise no AI attribution.
- Don't mention Claude / Anthropic / any AI vendor in commit bodies or PR descriptions.

## Things NOT to do

- Don't add a `tailwind.config.ts` — Tailwind v4 reads from `@theme` in CSS.
- Don't use `asChild` on shadcn primitives — they're Base UI, use `render`.
- Don't import brand icons from `lucide-react` — they don't exist there.
- Don't reorder the landing-page sections without client confirmation.
- Don't hard-code copy into JSX — put it in `lib/content.ts`.
- Don't introduce dark mode unless requested. Brand is warm-cream light only.
