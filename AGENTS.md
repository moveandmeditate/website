# AGENTS.md — Move & Meditate

Working rules for any AI agent (Claude Code, Codex, Copilot, Cursor, Aider, etc.) touching this repo. Read this before any edit.

> Cross-tool standard. Claude reads this. No separate `CLAUDE.md` needed.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## What this is

A marketing + lead-capture website for **Amisha**, a Bangalore-based dance + yoga practitioner. The site is split across one overview landing page and four "marketing pillar" sub-pages — each pillar maps to a real revenue line.

Brand language clarification — when supporting copy refers to **MOVE**, that means **Dance**. **MEDITATE** = **Yoga + adjacent stillness practices**. The "MOVE & MEDITATE" wordmark stays as the brand identity in headers/hero.

### Live surfaces

- `/` — landing page with hero, events, trusted-by, category tiles, experiences grid, founder, testimonials, contact
- `/dance` `/yoga` `/weddings` `/corporate` — pillar marketing pages (deep sell, FAQ, how-it-works)
- `/privacy-policy` `/terms-and-conditions` `/refund-policy` — DPDP Act 2023 compliant
- `/sitemap.xml` `/robots.txt` `/opengraph-image` — generated

13 static routes total. No dynamic routes. Fully prerendered.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 App Router | Turbopack, Server Components default. All pages currently static — no Cache Components yet. |
| UI lib | React 19 | |
| Lang | TypeScript 5 (strict) | `pnpm typecheck` runs `tsc --noEmit` |
| Styling | Tailwind CSS v4 | `@theme inline` in `app/globals.css` — **no `tailwind.config.ts`** |
| Components | shadcn/ui on Base UI primitives (style `base-nova`) | Base UI uses `render` prop, NOT `asChild` |
| Icons | `lucide-react@1` generic icons + hand-rolled brand SVGs | Lucide 1.x dropped brand glyphs. See `components/social-icons.tsx`. |
| Motion | `motion` (rebranded Framer Motion) | Used sparingly. Nav indicator uses `layoutId` slide. Hero entry uses CSS keyframes (not Motion — Motion's `whileInView` was unreliable for above-the-fold). |
| Forms | `react-hook-form` + `zod` + `@hookform/resolvers` | Server Actions in `lib/contact-action.ts` |
| Analytics | `@next/third-parties` Google Analytics 4 | ID `G-7SGRQR3LE1`, gated to production builds only |
| Deploy | Vercel | Connected to `moveandmeditate/website` on GitHub, auto-deploy on push to `main`. Public repo (Hobby plan requires public for non-owner pushes). |

## Commands

```bash
pnpm dev          # dev server (Turbopack), no GA pings
pnpm build        # production build
pnpm start        # serve production build
pnpm lint         # eslint
pnpm typecheck    # strict tsc --noEmit
```

## Project structure

```
app/
  (marketing)/
    page.tsx                   # landing /
    dance/page.tsx             # /dance       — pillar page
    yoga/page.tsx              # /yoga
    weddings/page.tsx          # /weddings
    corporate/page.tsx         # /corporate
  (legal)/
    layout.tsx                 # shared prose wrapper
    privacy-policy/page.tsx
    terms-and-conditions/page.tsx
    refund-policy/page.tsx
  layout.tsx                   # root: fonts, metadata, skip-link, GA4 in prod
  globals.css                  # Tailwind v4 @theme + CSS custom props
  icon.png  apple-icon.png     # browser tab + iOS home-screen favicons
  sitemap.ts  robots.ts        # generated route metadata
  opengraph-image.tsx          # 1200×630 OG image via next/og

components/
  sections/                    # landing-page sections
    hero.tsx
    upcoming-events.tsx
    trusted-by.tsx
    category-tiles.tsx         # infinite marquee on desktop, vertical stack on mobile
    experiences.tsx
    founder.tsx
    testimonials.tsx
    contact.tsx
  pillar/                      # shared pillar-page composition
    pillar-page.tsx            # the whole composition; routes import this
    pillar-hero.tsx
    pillar-intro.tsx
    offerings-grid.tsx
    pillar-how-it-works.tsx    # 3-step strip
    gallery-strip.tsx
    pillar-testimonial.tsx
    pillar-events.tsx          # filtered by pillar, Dance + Yoga only
    pillar-faq.tsx             # accordion, paired with FAQPage JSON-LD
    pillar-cta.tsx             # final CTA banner per pillar
  motion/                      # FadeUp + Stagger primitives (kept for future use)
  ui/                          # shadcn primitives — do not edit by hand
  contact-form.tsx             # client form, RHF + Zod
  media-frame.tsx              # next/image wrapper with placeholder fallback
  logo.tsx                     # renders /mam-logo.png via next/image
  brand-mark.tsx               # trusted-by wordmark recreations
  social-icons.tsx             # hand-rolled Instagram/Facebook/YouTube/WhatsApp SVGs
  legal-prose.tsx              # styled prose wrapper for legal pages
  site-header.tsx              # sticky, usePathname-driven active state, motion layoutId underline
  site-footer.tsx              # 4-row footer: ribbon → brand+columns → studio card → bottom

lib/
  content.ts                   # SINGLE SOURCE OF TRUTH — every string + every link target
  contact-schema.ts            # Zod schema (phone required)
  contact-action.ts            # Server Action POSTing to Google Apps Script webhook
  seo.ts                       # JSON-LD builders + per-pillar metadata helper
  utils.ts                     # cn() helper

public/
  mam-logo.png                 # client-supplied transparent logo
  images/                      # 21 Higgsfield-generated WebP photos
```

## Routing model

Sub-pages are real routes, **not anchors**. Nav uses `next/link` + `usePathname()` to drive the `aria-current` state. The header's underline indicator is a `<motion.span layoutId="nav-indicator">` that lives inside the active link — Motion's FLIP handles the slide between routes automatically.

`BOOK DISCOVERY CALL` resolves via `bookHref(pathname)`: returns `#contact` on `/`, `/#contact` on sub-pages so the click always lands on the form.

Scroll offset for ANY `[id]` anchor target is `calc(var(--header-h) + 2rem)` (set in `globals.css` on both `html { scroll-padding-top }` and `[id] { scroll-margin-top }`). `--header-h` is written at runtime by `site-header.tsx` based on its measured height (ResizeObserver).

## Design system

Brand tokens live in `app/globals.css`:

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

Fonts (via `next/font`):
- `var(--font-serif)` → **Cormorant Garamond** — section titles, hero wordmark, signature
- `var(--font-sans)` → **Jost** — body, UI, eyebrow labels (always tracked +0.16–0.24em)

Typography utilities:
- `.text-eyebrow` (11px / +0.16em / uppercase / weight 500)
- `.text-section-title` (serif, weight 400, slight tracking)

Always Title Case for hero + section titles, ALL-CAPS for buttons + eyebrows.

## Section order — landing page (DO NOT REORDER without client OK)

`Header → Hero → Upcoming Events → Trusted By → Category Tiles → Experiences → Founder → Testimonials → Contact → Footer`

Events + Trusted By sit directly under the hero by explicit client request.

## Section order — pillar pages (`PillarPage` composition)

`Header → PillarHero → PillarIntro → OfferingsGrid → PillarHowItWorks → GalleryStrip → PillarTestimonial → [PillarEvents on Dance+Yoga only] → PillarFaq → PillarCta → Footer`

## Content model

Every string + every link lives in `lib/content.ts`. Major exports:

- `SITE` — brand basics
- `CONTACT` — email, phone, WhatsApp URLs, socials
- `NAV_ITEMS` — top-nav routes (HOME / DANCE / YOGA / WEDDINGS / CORPORATE)
- `HERO` — landing hero copy + images
- `EVENTS` — typed event array with `pillars: PillarSlug[]` tag for filtering
- `eventsForPillar(slug, limit)` — helper used by `<PillarEvents/>`
- `TRUSTED_BRANDS` — typographic-recreation wordmark list
- `TILES` — landing-page pillar tiles
- `EXPERIENCES` — 6-icon services grid
- `FOUNDER` — Amisha intro, signature, stats
- `TESTIMONIALS` — reviews (id-keyed)
- `CONTACT_SECTION` — landing contact copy
- `INTERESTS` — form select options
- `FOOTER` — 4-column nav, ribbon, studio info card
- `PILLARS` — per-pillar deep content (hero, intro, offerings, how-it-works, gallery, testimonial id, FAQ, CTA, SEO description)

**Hard rule**: components consume `content.ts`; never hardcode copy in JSX. Items pending client input are flagged with `TODO:` comments.

## Motion + animation

- Hero entry uses CSS keyframes via `.hero-item` + `--d` CSS var (Motion's `whileInView` was unreliable for above-the-fold content — confirmed by browser testing).
- Other section animations stripped to static rendering for the same reason (events, founder stats, testimonials, experiences, contact).
- Header nav underline uses Motion's `<motion.span layoutId="nav-indicator">` for FLIP-driven slide between route changes. Wrapped in `<LayoutGroup id="primary-nav">`.
- Category tiles use a CSS-keyframe marquee (`@keyframes marquee-x`), pause-on-hover via CSS only.
- All motion respects `prefers-reduced-motion`.

## Images

21 WebP images live in `public/images/` — generated via the `higgsfield-generate` skill (Nano Banana Pro 2) during the Phase 1 + Phase 2 builds. Mix of hero shots, tiles, event cards, testimonial avatars, founder portrait, contact background.

When real client photos arrive, drop them in at the same paths and the site picks them up automatically.

Use `<MediaFrame src=... alt=... watermark={false} sizes="..." />` everywhere photos render. It wraps `next/image` and falls back to a brand-toned placeholder when an asset is missing.

## Forms + leads

`components/contact-form.tsx` validates with `lib/contact-schema.ts` and posts to `lib/contact-action.ts`. The Server Action forwards JSON to a **Google Apps Script Web App** that appends to a Sheet, emails Amisha, and auto-replies the submitter.

### Required env vars (Vercel → Project → Settings → Environment Variables)

```
CONTACT_WEBHOOK_URL              # the Apps Script .../exec URL
CONTACT_WEBHOOK_SECRET           # matches SHARED_SECRET inside the Apps Script

NEXT_PUBLIC_SANITY_PROJECT_ID    # sis92gxt (public)
NEXT_PUBLIC_SANITY_DATASET       # production
NEXT_PUBLIC_SANITY_API_VERSION   # 2024-12-01 (pin deliberately)
SANITY_API_READ_TOKEN            # viewer-scoped token (server-only)
SANITY_REVALIDATE_SECRET         # matches the Sanity webhook secret
```

Local dev: copy `.env.example` → `.env.local` (gitignored) and fill the same keys.

Phone number is **required** on the schema. Honeypot field `website` must remain.

## CMS — Sanity Studio

Sanity is embedded at **`/studio`** (catch-all route `app/studio/[[...tool]]/page.tsx`). Sign in with the Sanity account email used to create the project (`moveandmeditate.infra@gmail.com`).

Studio config lives at `sanity.config.ts`. Schemas live in `sanity/schemas/`:
- `siteSettings` — singleton (contact info, social URLs, hero tagline)
- `founderProfile` — singleton (bio, headline, photo)
- `event` — collection (upcoming events / workshops)
- `testimonial` — collection (per-pillar quotes)

Reads:
- `sanity/lib/client.ts` — public read client (CDN-cached, published-only perspective)
- `sanity/lib/queries.ts` — GROQ queries with `defineQuery`
- `sanity/lib/events.ts` — fetch wrapper with cache tags + **static fallback**: if the dataset is empty, falls back to the legacy `EVENTS[]` in `lib/content.ts` so the site never shows an empty section during the migration

Cache invalidation: `app/api/revalidate/route.ts` is a webhook target. Sanity → Next.js. Configure a GROQ webhook in Sanity manage UI pointing at `/api/revalidate` with the same secret as `SANITY_REVALIDATE_SECRET`.

When adding a new schema:
1. Add the schema file in `sanity/schemas/`
2. Register in `sanity/schemas/index.ts`
3. Add a GROQ query in `sanity/lib/queries.ts`
4. Add a fetch wrapper with `next: { tags: [...] }` so the webhook can invalidate
5. Add the new `_type` → tag mapping in `app/api/revalidate/route.ts`

## Analytics

Google Analytics 4 (`G-7SGRQR3LE1`) wired via `@next/third-parties/google` in `app/layout.tsx`. Only loads when `process.env.NODE_ENV === 'production'` — Vercel preview + production both qualify, local dev does not.

## Legal pages

All three under `app/(legal)/`. Use `<LegalProse>` from `components/legal-prose.tsx` for consistent reading width + serif headings. Privacy policy carries `id="grievance"` on the Grievance Officer section because the footer deep-links to it.

Templates are DPDP Act 2023 + IT Rules 2021 aware **but must be reviewed by Amisha (and ideally a lawyer) before launch**. Placeholders flagged with `TODO:`.

## Accessibility minimums

- One `<h1>` per page (the pillar title, or the hero wordmark on `/`)
- Section landmarks via `<section aria-labelledby>`
- All icons inside buttons/links get `aria-hidden` + a textual label
- Form fields use `<Label htmlFor>` + `aria-invalid` + inline error with `role="alert"` + `aria-live`
- Skip-to-content link at top of `<body>`
- Active route in nav + footer gets `aria-current="page"`
- Decorative images use `alt=""`. Content images use a descriptive `alt`.
- `prefers-reduced-motion` honored across the site

## Roadmap — `ROADMAP.md`

The full audit + phased plan lives in [`ROADMAP.md`](./ROADMAP.md). It tracks:
- **Wiring gaps** — things already on the page but not fully connected
- **Missing features** — business-analyst layer (CMS, bookings, blog, etc.)
- **Phased delivery** — Phase A wiring, Phase B CMS, Phase C growth, Phase D polish

**Mandatory when you ship any roadmap item:**
1. Flip the matching `- [ ]` to `- [x]` in `ROADMAP.md` in the **same commit** that lands the change.
2. Add a one-line note after the checkbox if useful (commit hash, follow-up, etc.).
3. If you discover a new gap, add a new `- [ ]` line.
4. Dropped items → change to `- [-]` with a one-line reason.

## Commit conventions

- Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`, `revert:`).
- Short, precise messages. Body explains the why.
- If the change was authored entirely by an AI agent, append a single line: `Assisted by AI`. Otherwise no AI attribution.
- Don't mention Claude / Anthropic / any AI vendor in commits or PRs.
- Don't bypass hooks (`--no-verify`, `--no-gpg-sign`) unless the user explicitly asks.

## Things NOT to do

- Don't add a `tailwind.config.ts` — Tailwind v4 reads from `@theme` in CSS.
- Don't use `asChild` on shadcn primitives — they're Base UI, use `render`.
- Don't import brand icons from `lucide-react` — they don't exist there.
- Don't reorder landing-page or pillar sections without client confirmation.
- Don't hard-code copy into JSX — put it in `lib/content.ts`.
- Don't introduce dark mode unless asked. Brand is warm-cream light only.
- Don't add `'use client'` unless the file actually needs browser APIs / state. Server Components are the default.
- Don't add Motion `whileInView` on critical above-the-fold content. Use CSS keyframes (see hero pattern) instead.
- Don't ship a placeholder href (`href="#"`). Either drop the link or wire it.
