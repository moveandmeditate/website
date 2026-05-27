/**
 * Article #3 — Corporate Wellness Programs in India.
 * Primary keyword: corporate wellness Bangalore.
 */
import {
  bullet,
  ctaCard,
  calloutNote,
  calloutTip,
  h2,
  h3,
  internalLink,
  numbered,
  p,
  richP,
  strong,
  txt,
} from "@/scripts/lib/portable-text";
import type { SeedBlogPost } from "@/scripts/lib/blog-post";

const intro = internalLink(
  "Move & Meditate's corporate wellness work",
  "/corporate"
);

export const post: SeedBlogPost = {
  slug: "corporate-wellness-programs-india",
  title:
    "Corporate Wellness Programs in India (2026): A Decision-Maker's Guide",
  excerpt:
    "Mental health, hybrid burnout, manager training, nutrition — Indian HR teams have moved past 'lunch yoga' in 2026. An honest guide to formats, pricing, ROI metrics and vendor selection.",
  category: "corporate",
  tags: ["corporate", "wellness", "hr", "india", "bangalore", "2026"],
  publishedAt: "2026-05-28T09:30:00.000Z",
  readingTime: 11,
  relatedPillar: "corporate",
  seo: {
    title:
      "Corporate Wellness Programs in India (2026) — HR Buyer's Guide · Move & Meditate",
    description:
      "Picking a corporate wellness vendor in India? Practitioner-led guide for HR + L&D — program formats, 2026 pricing, ROI metrics that actually matter, and 8 questions to ask before you sign.",
  },
  body: [
    richP(
      [
        txt(
          "Corporate wellness in India in 2026 looks nothing like it did in 2020. The 'lunch-time yoga' programmes that defined the first wave have given way to integrated mental-health stacks, hybrid-burnout workshops, manager-training on team energy, structured cafeteria nutrition, and 24x7 confidential helplines. The buyers have changed too — HR + L&D leaders are now expected to defend wellness spend with engagement and attrition metrics, not just photo galleries. This guide is for the person who has to pick a vendor and explain the choice to their CFO. I run "
        ),
        intro.span,
        txt(
          ", and what's below is a vendor-agnostic framework I'd give to a friend tasked with this for the first time."
        ),
      ],
      [intro.mark]
    ),

    h2("Why Indian companies are buying wellness in 2026"),
    p(
      "Three structural pressures, all hitting at once."
    ),
    h3("Mental health is no longer optional"),
    p(
      "Indian HR data through 2025 made it unambiguous: untreated stress, anxiety and burnout drive the majority of voluntary attrition in knowledge-work teams. The most credible wellness programmes now include a confidential stepped-care path (self-help resources → confidential helpline → therapy → psychiatry → crisis support) rather than only group movement classes."
    ),
    h3("Hybrid work created new failure modes"),
    p(
      "Indian companies in 2026 are mostly hybrid. The failure modes aren't 'productivity' — they're meeting fatigue, blurred work-home boundaries, manager isolation, and energy crashes around 3-4pm. Wellness work that doesn't speak to these specifically is fluff."
    ),
    h3("CFOs are asking 'show the numbers'"),
    p(
      "Wellness budgets in 2026 routinely come with a request for engagement scores, attrition deltas, eNPS shifts, or absenteeism numbers. A vendor that can't articulate which metric they'd move is the vendor you're going to struggle to renew."
    ),

    h2("Program formats — what each is good at"),
    h3("One-off workshops (60-120 minutes)"),
    p(
      "Single-session formats — a breathwork-and-stress workshop, a movement-for-desk-bodies session, a sound-bath evening. Cheap, easy to run, brilliant for big team events or kickoffs. Limitation: no behaviour change. Treat as a 'taste' not as a programme."
    ),
    h3("Weekly drop-in classes (8-12 week series)"),
    p(
      "Recurring yoga / dance / movement classes available to the whole org. Builds a small but loyal practising group. Best when paired with a manager-driven nudge ('block calendars for class week') so it doesn't quietly die at week 4."
    ),
    h3("Multi-month structured series"),
    p(
      "12-24 week programmes with progression — week 1 to 12 has a deliberate arc (foundations → consistency → integration). Higher commitment, deeper outcomes. The format that actually moves the metrics."
    ),
    h3("Quarterly offsites + retreats"),
    p(
      "Two-day off-campus immersions. Expensive per head, but creates the deepest behaviour shifts because participants have time to unplug. Pair with monthly follow-up sessions to lock in the change."
    ),
    h3("Online-only stack"),
    p(
      "Live online classes + on-demand library + 1-2 monthly events. Best for distributed teams or for companies with multi-city offices. Lower friction, lower retention; needs a strong internal champion."
    ),

    h2("Pricing — what's reasonable in 2026"),
    p(
      "Indian corporate wellness pricing varies wildly. Honest ranges from the visible end of the market in 2026:"
    ),
    ...bullet([
      [
        strong("One-off workshop (60-90 min, up to 30 people): "),
        txt("₹15,000-₹40,000."),
      ],
      [
        strong("Weekly drop-in class (8-week series, up to 25 per session): "),
        txt("₹40,000-₹1,20,000 for the series."),
      ],
      [
        strong("Multi-month structured series (12+ weeks): "),
        txt(
          "₹1,50,000-₹6,00,000 depending on cohort size and format mix."
        ),
      ],
      [
        strong("Quarterly retreat / offsite (2 days, residential): "),
        txt(
          "₹4,000-₹12,000 per participant in fees, plus venue + travel."
        ),
      ],
      [
        strong("Mental-health helpline (24x7, per-employee yearly): "),
        txt("₹400-₹1,500 per employee per year."),
      ],
      [
        strong("Therapy session vouchers (per session): "),
        txt("₹1,500-₹3,500."),
      ],
    ]),

    calloutTip([
      p(
        "Smart structure for a 200-person Bangalore tech team in 2026: 24x7 confidential helpline as the always-on base, one quarterly half-day workshop as the visible cultural marker, and weekly drop-in classes during high-stress months (Jan close, mid-year reviews, Q4 launches). Budgets to ₹6-12 lakh annually, holds attrition more reliably than a single big offsite."
      ),
    ]),

    h2("ROI metrics that actually matter (and the ones that don't)"),
    p(
      "Most wellness vendors will show you photo-rich case studies. CFOs don't fund photo galleries. The metrics that hold up in renewal conversations:"
    ),
    h3("Lead indicators (move first)"),
    ...bullet([
      "Self-reported stress score (validated PSS-10 or similar) — re-measured every quarter.",
      "Sleep quality (PSQI or simple 1-10) — re-measured every quarter.",
      "Programme attendance rate — sustained 30%+ engagement is good for a non-mandatory format.",
      "Manager feedback on team energy — easy to collect, surprisingly diagnostic.",
    ]),
    h3("Lag indicators (move next)"),
    ...bullet([
      "Voluntary attrition rate, year-on-year, segmented by team.",
      "eNPS (employee Net Promoter Score) — single most common board-friendly metric.",
      "Absenteeism / unplanned leave rate.",
      "Manager-1:1 engagement scores in your existing pulse survey.",
    ]),
    h3("Metrics that don't hold up"),
    ...bullet([
      "Programme participant count alone (high once, drops fast).",
      "Social-media reach / Instagram tags from sessions.",
      "Self-reported satisfaction in the moment ('did you enjoy the workshop?').",
      "Health-cost claims data in the first year (too noisy, too lagged).",
    ]),

    ctaCard({
      heading: "Want a programme that's actually measurable?",
      body: "Move & Meditate has run 500+ sessions for Bangalore tech, fintech and consulting teams. Happy to walk through what's worked and what hasn't — free 20-minute consult, no slides.",
      ctaLabel: "EXPLORE CORPORATE",
      ctaHref: "/corporate",
    }),

    h2("Vendor checklist — 8 questions before you sign"),
    ...numbered([
      [
        strong("Who actually teaches the sessions? "),
        txt(
          "Ask for the named individuals + their training. Wellness vendors who route through a junior pool are a yellow flag — your team will feel the inconsistency in week 3."
        ),
      ],
      [
        strong("What's your no-show / cancellation policy? "),
        txt(
          "Real programmes have published rules. Vague answers point to vague delivery."
        ),
      ],
      [
        strong("How do you handle a participant who raises a serious mental-health concern in session? "),
        txt(
          "Should be a written escalation path. If the answer is 'we just listen', they're not equipped — and you don't want that risk on your programme."
        ),
      ],
      [
        strong("What's your measurement plan? "),
        txt(
          "If they can't name specific metrics, they have no plan. If they name PSS-10, eNPS, PSQI or attrition — keep talking."
        ),
      ],
      [
        strong("Can we see two contactable references from a similar-stage company? "),
        txt(
          "Not a brand wall on the website. Real references you can call."
        ),
      ],
      [
        strong("How do you adapt for hybrid teams? "),
        txt(
          "If the answer is 'we record sessions', that's not adaptation. Real hybrid programmes have asynchronous companion content + dedicated remote-only office hours."
        ),
      ],
      [
        strong("What does your insurance + indemnity cover? "),
        txt(
          "If a participant injures themselves in a movement session, who's liable? A real vendor has an answer."
        ),
      ],
      [
        strong("What's the exit/renewal protocol? "),
        txt(
          "Annual contracts that auto-renew without a review meeting are a red flag. Look for vendors who insist on a quarterly check-in with you."
        ),
      ],
    ]),

    h2("Case sketch — a Bangalore tech team's 12-week experiment"),
    p(
      "Anonymised composite of two real engagements:"
    ),
    h3("Context"),
    p(
      "180-person product team in Bangalore, hybrid (3 days in-office), reporting 'meeting fatigue' and a 3-month spike in mid-week sick leave. Existing wellness: subsidised gym, an unused mental-health app, occasional yoga workshops on Fridays."
    ),
    h3("The 12-week intervention"),
    ...bullet([
      "Week 0 baseline: short PSS-10 + sleep + meeting-load survey, 78% response rate.",
      "Weeks 1-12: twice-weekly 30-minute breath-and-movement drop-ins, timed to high-load days (Tuesday + Thursday).",
      "Weeks 1-12: manager training (60 min × 4 sessions) on protecting team energy, meeting hygiene, recovery rituals.",
      "Week 6 + week 12: re-measure the baseline survey.",
    ]),
    h3("What moved"),
    ...bullet([
      "Self-reported stress (PSS-10): -18% by week 12.",
      "Average meetings per person per day: -1.3 (manager-training effect).",
      "Sick-leave rate: -22% in months 2-3 vs the previous quarter.",
      "Attendance held at 41% of eligible population across the 24 sessions — high for non-mandatory.",
    ]),
    h3("What didn't"),
    ...bullet([
      "eNPS didn't budge in 12 weeks — too short a window, took the full 6-month follow-on to shift.",
      "Senior managers (director+) attended <10% — the format wasn't designed for them. A separate quarterly senior cohort fixed this in round two.",
    ]),

    h2("Hybrid + distributed teams — what works"),
    p(
      "If half your team is remote, build the programme around them, not as an afterthought. The thing that fails most often: making live in-person the canonical session and offering a 'recording for remote folks.' That's a second-class experience and remote employees notice immediately."
    ),
    ...bullet([
      "Run sessions live online, then mirror them in-person at major office hubs. Same teacher, same time slot.",
      "Provide an on-demand library (8-12 short practices) for the days people miss live.",
      "Carve out a dedicated remote-only office hour each month for participants to talk to the teacher 1:1.",
      "Tie attendance to the existing engagement-survey calendar so you can measure delta clearly.",
    ]),

    h2("Common mistakes HR makes when buying wellness"),
    ...bullet([
      "Booking based on the slickest sales deck. Slickness ≠ delivery.",
      "Buying a single one-off workshop and expecting behaviour change. That's like booking one yoga class and expecting flexibility.",
      "Skipping the measurement step because 'wellness is hard to measure.' It isn't — pick three lead indicators and re-survey quarterly.",
      "Forcing attendance. Compulsory wellness is an oxymoron. The best programmes recruit through social proof.",
      "Ignoring middle managers. They're the single biggest determinant of whether your programme stays alive beyond month two.",
    ]),

    calloutNote([
      p(
        "If you remember one thing from this article: wellness without a manager-training component is wellness that quietly dies in week 5. Your line managers either protect time for it or they don't. Build that into the programme from week one."
      ),
    ]),

    h2("How long until you see the numbers move"),
    p(
      "Realistic timelines, based on engagements that actually measured: stress + sleep scores shift in 8-12 weeks. Attendance + manager feedback shift inside 4 weeks. Attrition and eNPS need 6-12 months to read cleanly. Set those expectations with your leadership upfront — anyone promising you a 6-week attrition turnaround is overselling."
    ),

    ctaCard({
      heading: "Designing a programme this quarter?",
      body: "I'll happily review your draft, share what's worked for teams your size, and tell you if you don't actually need me. 20 minutes, no slides.",
      ctaLabel: "GET IN TOUCH",
      ctaHref: "/#contact",
    }),
  ],
  faq: [
    {
      question: "How much does a corporate wellness program cost in India in 2026?",
      answer:
        "Pricing ranges widely. A one-off workshop runs ₹15,000-₹40,000. An 8-week weekly-class series is ₹40,000-₹1,20,000. A multi-month structured programme (12+ weeks) is ₹1.5-6 lakh depending on cohort size. Quarterly offsites are ₹4,000-₹12,000 per participant plus venue. Always-on services like a 24x7 helpline are ₹400-₹1,500 per employee per year. For a 200-person team, a good annual mix tends to land around ₹6-12 lakh.",
    },
    {
      question: "Do corporate wellness programs actually reduce attrition?",
      answer:
        "Yes — but only when measured over a 6-12 month window and only when paired with manager training. A standalone wellness perk rarely shifts attrition; an integrated stack (always-on mental-health support + recurring movement programme + manager training on team energy) does. The clearest signals appear in eNPS, voluntary attrition rate, and absenteeism — usually starting to read by month 4-6.",
    },
    {
      question: "What's the smallest team size that justifies a wellness program?",
      answer:
        "Around 30-50 people, if you're realistic about formats. Below that, individual interventions (1:1 coaching, paid therapy vouchers, a few quarterly workshops) tend to outperform structured programmes. Above 50 you get enough attendance to make a recurring drop-in class viable; above 150 you get enough signal in the metrics to justify multi-month interventions.",
    },
    {
      question: "Online vs in-person corporate wellness — which works better in 2026?",
      answer:
        "Both work; the right answer depends on team distribution. For single-office Bangalore teams, in-person sessions outperform on retention. For multi-city or remote-first teams, online-first programmes win — but only if they're designed online-first (live + on-demand + dedicated remote office hours), not 'we'll record the in-person session for you.' Hybrid programmes that mirror live sessions across formats are now the most common 2026 default.",
    },
    {
      question: "How do we measure whether the program is working?",
      answer:
        "Pick three lead indicators (stress, sleep, attendance) and re-measure quarterly. Pair with one lag indicator (eNPS or attrition) measured semi-annually. Avoid 'participant satisfaction in the moment' as your main metric — it's high after every session and tells you nothing about behaviour change. Validated short surveys (PSS-10 for stress, PSQI for sleep) take five minutes per participant and create a defensible measurement story for your CFO.",
    },
  ],
};
