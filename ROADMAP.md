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
- [ ] Decide: keep nav as 5 anchor links (HOME / MOVE / MEDITATE / EVENTS / ABOUT) or add real sub-pages

### Hero

- [~] `WATCH OUR STORY` → real YouTube / Vimeo URL or in-page video modal — _link is now hidden when `HERO.watchStory.href` is empty/placeholder. Set a real URL in `lib/content.ts` to re-enable. Modal player still TBD._

### Events section

- [ ] Each `BOOK NOW` card link → real District listing URL per event (today they all point to `#contact`)
- [ ] `VIEW ALL →` link → either drop or point to a future `/events` page once events grow past 4
- [ ] Event titles + dates currently hard-coded in `lib/content.ts` — migrate to Sanity CMS (see §2)
- [ ] JSON-LD `startDate` field is `undefined` (search rich-cards won't render) — set real ISO dates per event

### Category tiles (marquee)

- [ ] Every tile arrow currently links to `#contact` — point each to its own deeper anchor or service page when those exist

### Experiences grid

- [ ] `VIEW ALL EXPERIENCES →` is `href="#"` — drop link or build `/experiences` page
- [ ] Per-service detail pages (`/dance`, `/yoga`, `/breathwork` etc.) — optional Phase D work

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

- [ ] MOVE column sub-links (Dance Classes / Folk / Couple Dance / Kids) all point to `#move` — either build real pages or simplify
- [ ] MEDITATE column sub-links — same situation as above
- [ ] WEDDINGS column sub-links — same
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

- [ ] Scaffold Sanity Studio embedded at `/studio` route
- [ ] Schemas: `event`, `testimonial`, `experience`, `tile`, `founderProfile`, `siteSettings`, `blogPost`
- [ ] Migrate events from `lib/content.ts` to Sanity, fetch via GROQ in `app/page.tsx`
- [ ] Migrate testimonials to Sanity
- [ ] Migrate founder bio + stats to Sanity
- [ ] Optional: tiles + experiences too
- [ ] Webhook from Sanity → Vercel revalidate route so edits show within seconds

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
- [ ] Real domain `moveandmeditate.in` + DNS records

### G. Analytics + observability

- [ ] Vercel Web Analytics (free, GDPR-friendly)
- [ ] Vercel Speed Insights
- [ ] Form conversion tracking (submits, drop-off)
- [ ] Sentry free tier for error monitoring

### H. Polish + compliance

- [ ] DMARC / SPF / DKIM on outbound email
- [ ] Apple icon + full PWA manifest
- [ ] Cookie consent banner — only once analytics / pixels ship
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
