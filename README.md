# Move & Meditate

Marketing + lead-capture website for **Amisha**, a Bangalore-based dance + yoga practitioner. Built with Next.js 16, Tailwind v4 and shadcn/ui. Deployed on Vercel.

Live: **moveandmeditate.in** *(domain swap pending)*
Source of truth for working rules: [`AGENTS.md`](./AGENTS.md)
Outstanding work + phased plan: [`ROADMAP.md`](./ROADMAP.md)

## Quickstart

```bash
pnpm install
cp .env.example .env.local   # then fill the two keys below

pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm typecheck    # strict tsc --noEmit
pnpm lint         # eslint
```

Node 20+ and pnpm 9+ required.

## Required environment variables

| Key | Source | Used for |
|---|---|---|
| `CONTACT_WEBHOOK_URL` | Google Apps Script Web App `/exec` URL | Contact-form submissions → Sheet + email |
| `CONTACT_WEBHOOK_SECRET` | Random string matching `SHARED_SECRET` in the Apps Script | Webhook auth |

Set both in **Vercel → Project Settings → Environment Variables** for production. Local dev reads from `.env.local` (already gitignored).

GA4 Measurement ID (`G-7SGRQR3LE1`) is hardcoded in `app/layout.tsx` since it's a public identifier.

## Routes (13 static)

- `/` — landing overview
- `/dance` `/yoga` `/weddings` `/corporate` — pillar marketing pages
- `/privacy-policy` `/terms-and-conditions` `/refund-policy`
- `/sitemap.xml` `/robots.txt` `/opengraph-image`
- `/icon.png` `/apple-icon.png`

All pre-rendered at build time. No dynamic routes, no Cache Components yet.

## Stack

- **Next.js 16** App Router (Turbopack, Server Components default)
- **React 19**, **TypeScript 5** strict
- **Tailwind CSS v4** (CSS-first `@theme`, no `tailwind.config.ts`)
- **shadcn/ui** on Base UI primitives
- **motion** for the nav-underline slide
- **react-hook-form + zod** for the contact form (Server Action)
- **@next/third-parties** for Google Analytics 4
- **Vercel** hosting · **Google Apps Script + Sheet** for lead capture

## Project layout

```
app/                  routes + layouts + global CSS + sitemap/robots/OG
components/sections/  landing-page sections
components/pillar/    pillar-page composition + section parts
components/ui/        shadcn primitives (do not edit by hand)
lib/                  content.ts (single source of truth), schemas, SEO helpers
public/images/        Higgsfield-generated WebP photography
public/mam-logo.png   client-supplied brand mark
```

Read `AGENTS.md` for the full design system, conventions, and rules before editing.

## Deploy

Auto-deploy is wired:

- **GitHub:** `moveandmeditate/website` (public, Hobby plan friendly)
- **Vercel:** project on the `move-and-meditate-s-projects` team
- Push to `main` → production deploy
- Push to any other branch / open a PR → preview URL

Env vars must be set in the Vercel project before the first build, otherwise the contact form returns a friendly fallback error.

## Contributing

This is a client repo. Don't push to `main` without coordinating. Use Conventional Commits. See `AGENTS.md` for the full checklist (commit format, AI attribution rules, accessibility minimums).

## License

Proprietary. © Move & Meditate. All rights reserved.
