# Move & Meditate

Marketing + booking site for **Amisha** — dance, yoga, breathwork, sound healing, weddings, corporate retreats and online sessions.

Movement is medicine. Stillness is power.

## Stack

- Next.js 16 (App Router, Turbopack, Server Components)
- React 19 + TypeScript 5 (strict)
- Tailwind CSS v4 (`@theme` in `app/globals.css` — no separate config)
- shadcn/ui (Base UI primitives, style `base-nova`)
- `motion` for reveals + micro-interactions (respects `prefers-reduced-motion`)
- `react-hook-form` + `zod` for the contact form
- Hand-rolled SVG logo + social brand icons (lucide v1 dropped brand glyphs)

## Quickstart

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm build        # production build
pnpm start        # serve production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
```

## Routes

| Path | Purpose |
|---|---|
| `/` | Landing page (hero → events → trusted → tiles → experiences → founder → testimonials → contact) |
| `/privacy-policy` | DPDP Act 2023 compliant template (review before launch) |
| `/terms-and-conditions` | Service terms |
| `/refund-policy` | Cancellation + refund rules |
| `/sitemap.xml`, `/robots.txt` | Auto-generated |

## Content

All copy + data lives in [`lib/content.ts`](./lib/content.ts). Item flagged `TODO:` are placeholders awaiting real client input — see the AGENTS.md punch-list.

## Images

Photography is generated via Higgsfield Nano Banana Pro 2 in a separate task (~15 images, ~$1.50–$3.00 budget). Until the batch lands, `<MediaFrame>` renders a warm placeholder with the brand watermark. See [`AGENTS.md`](./AGENTS.md) for the swap-in workflow.

## Agent rules

Read [`AGENTS.md`](./AGENTS.md) before letting any AI agent edit this repo. It captures the breaking patterns in this stack (Base UI's `render`, Tailwind v4 `@theme inline`, lucide v1 brand-icon removal, etc.) plus the design system and section-order rules.

## Deploy

Optimised for Vercel. No env vars required for the landing page; wire the contact-form Server Action to Resend (or similar) before launch — see `lib/contact-action.ts`.
