# Move & Meditate — Roadmap & Audit

> Living document. Any agent (or human) completing an item must flip `- [ ]` → `- [x]` in the same commit that ships the change. Add notes after the checkbox where useful.

Last updated: 2026-06-04

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

- [x] `JOIN WHATSAPP COMMUNITY` button — real invite URL set in `CONTACT.whatsappCommunityUrl` (client-confirmed)
- [ ] Direct WhatsApp chat link (`https://wa.me/<phone>?text=...`) — add once phone is confirmed
- [x] Email link `contact@moveandmeditate.in` — wired in `CONTACT.email`; SPF / DKIM / DMARC TXT records pending at GoDaddy DNS
- [ ] Optional phone link — confirm + add to `CONTACT.phone`
- [x] Server Action in `lib/contact-action.ts` — wired to Google Apps Script Web App (Workspace `admin@moveandmeditate.in` owner; sends as `contact@` Send-As alias; appends to Google Sheet)
- [x] Auto-reply email to submitter — sent from the same Apps Script (branded HTML + plain-text fallback). Resend not needed; staying on Apps Script keeps the lead pipeline on one billable surface.

### Footer

- [x] MOVE column sub-links (Dance Classes / Folk / Couple Dance / Kids) all point to `#move` — either build real pages or simplify — _Footer restructured: DISCOVER / EXPERIENCES / COMPANY / LEGAL columns. Each link now points at its actual destination (pillar pages, real anchors, legal routes). `aria-current` highlights the route the visitor is currently on._
- [x] MEDITATE column sub-links — _Same fix; see above._
- [x] WEDDINGS column sub-links — _Same fix; see above._
- [ ] Newsletter input has no handler — wire to Resend Audiences / Mailerlite / Beehiiv (see §2.C)
- [ ] Real social URLs in `CONTACT.socials` (Instagram / Facebook / YouTube)

### Legal pages

- [x] Data-concerns contact in `app/(legal)/privacy-policy/page.tsx` (sole-prop site is below the SDF threshold, so a formally appointed Grievance Officer isn't legally mandatory — contact info reads from CMS Site settings and points at Amisha + Bangalore + the published email).
- [x] Business registration details — handled by client
- [x] Lawyer review of all three legal templates before launch — handled by client

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
- [x] Webhook handler at `/api/revalidate` using `revalidateTag(tag, { expire: 0 })` (Next 16's documented webhook-invalidation pattern) + HMAC signature verification via `parseBody` from `next-sanity/webhook`
- [x] **CONFIG:** Sanity env vars added in Vercel dashboard (all 5 keys, Production + Preview)
- [x] **CONFIG:** Sanity CORS origin set for prod URL + Vercel preview alias with Allow credentials
- [x] **CONFIG:** Sanity GROQ webhook live, pointing at `/api/revalidate` with the right filter + projection + signature secret. End-to-end tested: editor publish in Studio → site updates within ~5s.
- [ ] Register prod Studio as canonical once the real domain is wired (Studio → "Register this studio" prompt on first visit)
- [ ] **Future:** migrate `PILLARS` (dance/yoga/weddings/corporate) to a Sanity `pillar` schema so offerings + how-it-works + FAQ + gallery + CTA can be edited without a code push (today these live in `lib/content.ts`)
- [ ] **Future:** migrate `EXPERIENCES` 6-card grid to a Sanity `experience` collection
- [ ] **Future:** clean up duplicate singleton docs left over from early Studio testing (write one-off cleanup script with an Editor-scope token, then revoke the token)
- [ ] **One-time CMS → static fallback sync** (deferred): once Amisha has finished populating CMS with real content, run a `pnpm sync-cms` script that pulls all docs from Sanity and writes them to `lib/cms-snapshot.generated.ts`. Update the adapters in `sanity/lib/site-data.ts` + `sanity/lib/events.ts` to prefer that snapshot over the hardcoded static fallbacks in `lib/content.ts`. Commit the generated file. Goal: if Sanity ever has an outage, the static fallback shows real recent content instead of placeholder seed data. Skip for now — the current adapters degrade gracefully and Sanity uptime is high. Build the script when there's real content worth preserving as a fallback.

### C. Inbound + lead capture

- [x] Contact form → Google Apps Script + Sheet (production live). Architecture documented in **AGENTS.md → Lead pipeline**.
- [x] Auto-reply email to the submitter — branded HTML, from `contact@moveandmeditate.in` via Send-As alias.
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
- [x] Real domain `moveandmeditate.in` + DNS records — NIXI serverHold cleared; domain live. Full migration steps in **AGENTS.md → Domain migration**.

### G. Analytics + observability

- [ ] Vercel Web Analytics (free, GDPR-friendly)
- [x] Vercel Speed Insights — `<SpeedInsights/>` mounted in root layout (production-only RUM CWV)
- [ ] Form conversion tracking (submits, drop-off)
- [ ] Sentry free tier for error monitoring

### H. Polish + compliance

- [x] DMARC / SPF / DKIM TXT records at GoDaddy DNS — added; outbound mail from `contact@moveandmeditate.in` authenticated.
- [x] PWA manifest + iOS apple-touch-icon + Android install prompt — Studio at `/studio` is now installable from any modern mobile browser. See AGENTS.md → Studio PWA section.
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
- [x] Hook contact form to Google Apps Script + Sheet (production live; see **AGENTS.md → Lead pipeline**)
- [x] Set real domain + email + DNS — `moveandmeditate.in` live; Workspace email live (`contact@moveandmeditate.in`); SPF / DKIM / DMARC TXT records in place
- [ ] Real WhatsApp invite + social URLs
- [ ] Real founder + testimonial photos (or remove until ready)

### Phase B — CMS + bookings (~2-3 days)

- [x] Embed Sanity Studio at `/studio`
- [x] Migrate events, testimonials, founder, site settings, brands to Sanity
- [x] Sanity → Vercel revalidation webhook live (`revalidateTag(tag, { expire: 0 })`)
- [ ] District `bookingUrl` per event drives the `BOOK NOW` link (today CMS holds a generic `ctaHref`; switch to District-specific URLs when she opens that account)

### Phase C — Growth surface (~1 week)

- [x] Blog scaffold — schemas, routes, Portable Text renderer, FAQ accordion, related strip, pillar CTA card, author profile, RSS feed, sitemap inclusion, BlogPosting + BreadcrumbList + FAQPage JSON-LD, pillar BlogStrip integration, webhook tag map. See **`docs/BLOG-SEO-PLAN.md`** for the 10-article content plan + keyword strategy.
- [x] Seed the 10 cornerstone articles via `pnpm seed:blog` (idempotent; reads `content/blog/*`)
- [~] Vercel Analytics + Speed Insights — Speed Insights live; Web Analytics still optional
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
- [x] Legal pages — Privacy + Terms (DPDP Act 2023 + IT Rules 2021 aware, sole-prop framing, CMS-backed email, liability disclaimer for in-person classes). No Refund Policy — site does not process payments.
- [x] SEO infra — metadata, sitemap, robots, OG image route, JSON-LD
- [x] 18 Higgsfield Nano Banana Pro 2 images (5 hero candidates, 5 tiles, 4 events, 4 avatars, founder, contact bg)
- [x] `AGENTS.md` + `README.md`
- [x] Pillar pages (`/dance` `/yoga` `/weddings` `/corporate`) — hero, intro, offerings, how-it-works, gallery, testimonial, events (dance/yoga only), FAQ, CTA, per-page SEO metadata + JSON-LD
- [x] Sticky mobile CTA bar + custom 404 + loading skeleton
- [x] Cookie consent banner (GA4 consent-gated, useSyncExternalStore, pre-hydration flash fix)
- [x] Sanity CMS — 5 schemas, embedded Studio, GROQ + image transforms, async server components with CMS-first/static-fallback adapters, signature-verified webhook with `revalidateTag(tag, { expire: 0 })`
- [x] Blog system — `blogPost` + `author` schemas, `/blog`, `/blog/[slug]`, `/author/[slug]`, RSS, JSON-LD, pillar BlogStrip, footer "Writing" column, seed pipeline (`pnpm seed:blog`)
- [x] AI surfaces — `/llms.txt` (llmstxt.org convention), RSS 2.0 feed at `/blog/rss.xml`
- [x] Studio PWA — installable from any modern mobile browser, scoped to `/studio`
- [x] Lead pipeline — Google Apps Script web app (admin@moveandmeditate.in), Send-As alias `contact@moveandmeditate.in`, branded HTML notifications + auto-reply, Sheet append, honeypot + shared-secret guards
- [x] JSON-LD `</script>` XSS guard via `jsonLdHtml()` helper — applied at every `dangerouslySetInnerHTML` JSON-LD emit site
- [x] Sanity read client authenticated (Viewer token) — fixes author profile resolving
