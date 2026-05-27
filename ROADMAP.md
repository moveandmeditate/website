# Move & Meditate — Roadmap & Audit

> Living document. Any agent (or human) completing an item must flip `- [ ]` → `- [x]` in the same commit that ships the change. Add notes after the checkbox where useful.

Last updated: 2026-05-27

---

## Status legend

- `- [ ]` — pending
- `- [x]` — done (link the commit hash where it landed if possible)
- `- [~]` — partial / in-progress
- `- [-]` — explicitly dropped (write why)

---

## 1. Wiring gaps — things on the page that aren't fully connected

### Header

- [x] Mobile sheet `JOIN WHATSAPP COMMUNITY` button currently scrolls to `#contact` — point it at `CONTACT.whatsappCommunityUrl` instead — _placeholder URL until Amisha confirms the real invite link_
- [ ] Confirm whether `BOOK DISCOVERY CALL` should keep scrolling to the contact form or open a Cal.com / Calendly slot picker
- [x] Decide: keep nav as 5 anchor links (HOME / MOVE / MEDITATE / EVENTS / ABOUT) or add real sub-pages — _Phase 2 ships 4 sub-pages: `/dance` `/yoga` `/weddings` `/corporate`. Nav now uses these routes. HOME/EVENTS/ABOUT dropped from nav per client; logo returns to `/`._

### Hero

- [~] `WATCH OUR STORY` → real YouTube / Vimeo URL or in-page video modal — _link is now hidden when `HERO.watchStory.href` is empty/placeholder. Set a real URL in `lib/content.ts` to re-enable. Modal player still TBD._

### Events section

- [ ] Each `BOOK NOW` card link → real District listing URL per event (today they all point to `#contact`)
- [ ] `VIEW ALL →` link → either drop or point to a future `/events` page once events grow past 4
- [ ] Event titles + dates currently hard-coded in `lib/content.ts` — migrate to Sanity CMS (see §2)
- [ ] JSON-LD `startDate` field is `undefined` (search rich-cards won't render) — set real ISO dates per event

### Category tiles (marquee)

- [x] Every tile arrow currently links to `#contact` — point each to its own deeper anchor or service page when those exist — _Move/Meditate/Weddings/Corporate now link to their pillar pages. Retreats keeps `/#contact` per client._

### Experiences grid

- [ ] `VIEW ALL EXPERIENCES →` is `href="#"` — drop link or build `/experiences` page
- [x] Per-service detail pages — _Phase 2: `/dance` `/yoga` `/weddings` `/corporate` shipped. Per-experience sub-pages (breathwork, sound healing, etc.) still optional later work._

### Founder

- [ ] Replace AI-generated portrait with Amisha's real photo
- [ ] Stat numbers (1000+ lives / 500+ events / 50+ cities / 10+ years) — confirm or correct
- [ ] Bio copy awaits Amisha's sign-off

### Testimonials

- [ ] Replace placeholder quotes with real client testimonials (with consent)
- [ ] Replace AI avatars with real photos OR drop the avatar circles entirely

### Contact section

- [ ] `JOIN WHATSAPP COMMUNITY` button — confirm + set real invite URL in `CONTACT.whatsappCommunityUrl`
- [ ] Direct WhatsApp chat link (`https://wa.me/<phone>?text=...`) — add once phone is confirmed
- [ ] Email link `hello@moveandmeditate.in` — confirm final inbox + set up SPF / DKIM / DMARC
- [ ] Optional phone link — confirm + add to `CONTACT.phone`
- [ ] Server Action stub in `lib/contact-action.ts` — wire to a real handler (see §2.A)
- [ ] Auto-reply email to submitter (Resend template)

### Footer

- [x] MOVE column sub-links (Dance Classes / Folk / Couple Dance / Kids) all point to `#move` — either build real pages or simplify — _Footer restructured: DISCOVER / EXPERIENCES / COMPANY / LEGAL columns. Each link now points at its actual destination (pillar pages, real anchors, legal routes). `aria-current` highlights the route the visitor is currently on._
- [x] MEDITATE column sub-links — _Same fix; see above._
- [x] WEDDINGS column sub-links — _Same fix; see above._
- [ ] Newsletter input has no handler — wire to Resend Audiences / Mailerlite / Beehiiv (see §2.C)
- [ ] Real social URLs in `CONTACT.socials` (Instagram / Facebook / YouTube)

### Legal pages

- [ ] Grievance Officer name + email + address (DPDP Act §8(7) mandatory) in `app/(legal)/privacy-policy/page.tsx`
- [ ] Business registration details when Amisha registers a legal entity
- [ ] Lawyer review of all three legal templates before launch

---

## 2. Missing features — business-analyst layer

### A. Core booking + monetisation

- [ ] **District integration via CMS** — events in Sanity carry a `bookingUrl` field; `BOOK NOW` links straight to her District listing. No payment infra on this site.
- [ ] **Cal.com / Calendly embed for the discovery call** — header CTA opens a slot picker instead of a scroll target
- [ ] Decide on pricing visibility (list prices vs enquiry-only)
- [ ] Razorpay fallback for direct selling — only if District / Insider falls short

### B. Content management (Sanity)

- [x] Scaffold Sanity Studio embedded at `/studio` route
- [x] Schemas: `event`, `testimonial`, `founderProfile`, `siteSettings`, `brand`
- [x] Migrate events from `lib/content.ts` to Sanity (CMS-first + static fallback)
- [x] Migrate testimonials to Sanity (landing grid + per-pillar)
- [x] Migrate founder bio + stats to Sanity (4 stats with icon/number/label)
- [x] Migrate trusted-by brands to Sanity (`brand` collection, logo upload + render-enum fallback)
- [x] Webhook handler at `/api/revalidate` using Next 16 `updateTag` + secret signature verification
- [ ] **CONFIG (manual, not code):** add Sanity env vars in Vercel dashboard (Settings → Environment Variables):
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=sis92gxt`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `NEXT_PUBLIC_SANITY_API_VERSION=2024-12-01`
  - `SANITY_API_READ_TOKEN=<viewer token from manage UI>`
  - `SANITY_REVALIDATE_SECRET=<long random string, paste same in Sanity webhook>`
- [ ] **CONFIG:** add Sanity CORS origin for prod URL (sanity.io/manage → API → CORS origins) with Allow credentials
- [ ] **CONFIG:** create Sanity GROQ webhook (manage UI → API → Webhooks) pointing at `https://<prod-url>/api/revalidate` with filter `_type in ["event","testimonial","founderProfile","siteSettings","brand"]`, projection `{ _type, _id }`, secret matches `SANITY_REVALIDATE_SECRET`
- [ ] Register prod Studio as canonical (Studio → "Register this studio" prompt on first prod visit)
- [ ] **Future:** migrate `PILLARS` (dance/yoga/weddings/corporate) to a Sanity `pillar` schema so offerings + how-it-works + FAQ + gallery + CTA can be edited without a code push (today these live in `lib/content.ts`)
- [ ] **Future:** migrate `EXPERIENCES` 6-card grid to a Sanity `experience` collection
- [ ] **Future:** clean up duplicate singleton docs left over from early Studio testing (write one-off cleanup script with an Editor-scope token, then revoke the token)
- [ ] **One-time CMS → static fallback sync** (deferred): once Amisha has finished populating CMS with real content, run a `pnpm sync-cms` script that pulls all docs from Sanity and writes them to `lib/cms-snapshot.generated.ts`. Update the adapters in `sanity/lib/site-data.ts` + `sanity/lib/events.ts` to prefer that snapshot over the hardcoded static fallbacks in `lib/content.ts`. Commit the generated file. Goal: if Sanity ever has an outage, the static fallback shows real recent content instead of placeholder seed data. Skip for now — the current adapters degrade gracefully and Sanity uptime is high. Build the script when there's real content worth preserving as a fallback.

### C. Inbound + lead capture

- [ ] Contact form → Google Apps Script + Sheet (free) OR Resend transactional API
- [ ] Auto-reply email to the submitter
- [ ] Newsletter subscribe (footer) → Resend Audiences / Mailerlite / Beehiiv free tier
- [ ] WhatsApp community real invite URL
- [ ] Click-to-WhatsApp 1:1 chat link

### D. Trust + social proof

- [ ] Google Business Profile claim + verify (if she has a physical studio)
- [ ] Real client testimonials + consent
- [ ] Replace typographic brand wordmarks with licensed press-kit SVGs OR remove brands that don't have permission
- [ ] Press / media kit page (only when first press feature lands)
- [ ] Photo + video gallery (sangeet showreel, class moments) — lightbox or grid

### E. Schedule + recurring classes

- [ ] Class schedule page — weekly grid (day × time)
- [ ] `.ics` calendar feed so clients can subscribe

### F. Discoverability + SEO

- [ ] Blog (`/blog`) powered by Sanity — topics: breathwork science, sangeet planning, corporate wellness ROI
- [ ] FAQ page
- [ ] City pages (`/bangalore`, `/online`) if she serves multiple regions
- [ ] Hindi locale via `next-intl` (`en` + `hi`)
- [ ] Rich snippets — Event schema with real dates, Course schema, FAQ schema
- [ ] Real domain `moveandmeditate.in` + DNS records. Full migration checklist documented in **AGENTS.md → Domain migration** (Vercel domain add, `SITE.url` update, GA4 stream URL, Sanity CORS + webhook URL, Studio re-register, contact email switch, DMARC/SPF/DKIM, GSC + Bing sitemap submission). Miss any step → partial-cutover bug.

### G. Analytics + observability

- [ ] Vercel Web Analytics (free, GDPR-friendly)
- [ ] Vercel Speed Insights
- [ ] Form conversion tracking (submits, drop-off)
- [ ] Sentry free tier for error monitoring

### H. Polish + compliance

- [ ] DMARC / SPF / DKIM on outbound email
- [ ] Apple icon + full PWA manifest
- [x] Cookie consent banner — gated GA4 via useSyncExternalStore
- [x] Bug: cookie banner flashes for a frame on every load after Accept. Fixed via inline pre-hydration probe in `<head>` that stamps `.mam-consent-set` on `<html>` when a decision exists in localStorage; CSS hides the banner element via `display: none` so it never paints during the hydration window.
- [ ] axe DevTools accessibility audit pass
- [ ] Lighthouse audit — target ≥95 on every category
- [ ] Color contrast check on `--color-gold` (`#a08968` on `--color-bg` `#f6f1ea` is borderline)

### I. Future / nice-to-have

- [ ] Member portal — Auth.js + Sanity once class packs sell direct
- [ ] Mobile PWA — installable home-screen app
- [ ] Affiliate / referral program

---

## 3. Phased delivery

### Phase A — Wire the basics (~1 day, no new infra)

- [x] Fix mobile WhatsApp button bug
- [ ] Hook contact form to Google Apps Script + Sheet
- [ ] Set real domain + email + DNS
- [ ] Real WhatsApp invite + social URLs
- [ ] Real founder + testimonial photos (or remove until ready)

### Phase B — CMS + bookings (~2-3 days)

- [ ] Embed Sanity Studio at `/studio`
- [ ] Migrate events, testimonials, founder to Sanity
- [ ] District `bookingUrl` per event drives the `BOOK NOW` link
- [ ] Sanity → Vercel revalidation webhook

### Phase C — Growth surface (~1 week)

- [ ] Blog scaffold + first 3 posts
- [ ] Vercel Analytics + Speed Insights
- [ ] Newsletter wiring (Resend Audiences)
- [ ] Cal.com embed for discovery call

### Phase D — Polish + scale (ongoing)

- [ ] Lighthouse + axe audits
- [ ] Hindi locale
- [ ] Class schedule page
- [ ] GBP integration

---

## 4. Client deliverables

- [x] Send `client-deliverables/Move-and-Meditate-Client-Questions.pdf` to Amisha — 23-page branded questionnaire covering every open decision (domain, nav, hero, events, tiles, founder, testimonials, contact, legal, mobile, analytics). Edit `questionnaire.html` if scope shifts; see `client-deliverables/README.md` for regen steps.

## 5. Already shipped (reference)

For posterity, here's what's done as of the initial build. **Do not re-do.**

- [x] Next.js 16 + Tailwind v4 + shadcn/ui scaffold
- [x] Brand palette, fonts (Cormorant Garamond + Jost), tokens
- [x] Sticky header with anchor nav + mobile Sheet
- [x] Hero (two-image static, dancer + meditator, CSS entry animation)
- [x] Upcoming Events under hero (4 cards, hard-coded for now)
- [x] Trusted By strip (typographic recreations)
- [x] Category Tiles as infinite marquee (5 pillars, pause-on-hover)
- [x] Experiences grid (6 services)
- [x] Founder section (portrait + 2x2 stats)
- [x] Testimonials (4 cards)
- [x] Contact section + RHF + Zod form (Server Action stub)
- [x] Footer (4 columns + newsletter + socials + legal links)
- [x] Legal pages — Privacy / Terms / Refund (DPDP Act 2023 templates)
- [x] SEO infra — metadata, sitemap, robots, OG image route, JSON-LD
- [x] 18 Higgsfield Nano Banana Pro 2 images (5 hero candidates, 5 tiles, 4 events, 4 avatars, founder, contact bg)
- [x] `AGENTS.md` + `README.md`
