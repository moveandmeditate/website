/**
 * Article #8 — Yoga for Sleep.
 * Primary keyword: yoga for sleep.
 */
import {
  bullet,
  ctaCard,
  calloutTip,
  h2,
  h3,
  internalLink,
  link,
  numbered,
  p,
  richP,
  strong,
  txt,
} from "@/scripts/lib/portable-text";
import type { SeedBlogPost } from "@/scripts/lib/blog-post";

const intro = internalLink(
  "yoga + restorative practices I teach",
  "/yoga"
);

const nccih = link(
  "yoga has been shown helpful for sleep in multiple studies (NCCIH)",
  "https://www.nccih.nih.gov/health/providers/digest/yoga-for-health-science"
);

export const post: SeedBlogPost = {
  slug: "yoga-for-sleep",
  title: "Yoga for Better Sleep: A 30-Day Beginner Plan",
  excerpt:
    "Yoga for sleep isn't about night-time stretching. It's about training your nervous system to downshift. Here's the 30-day plan that consistently works for the students I teach.",
  category: "yoga",
  tags: ["yoga", "sleep", "yoga-nidra", "beginners", "30-day-plan"],
  publishedAt: "2026-05-28T10:45:00.000Z",
  readingTime: 8,
  relatedPillar: "yoga",
  seo: {
    title:
      "Yoga for Better Sleep — 30-Day Beginner Plan · Move & Meditate",
    description:
      "Practitioner-led 30-day plan to use yoga for better sleep. Week-by-week structure, the 12-minute bedtime sequence, yoga nidra introduction, and the science of why it works.",
  },
  body: [
    richP(
      [
        txt(
          "Almost six in ten Indian yoga practitioners cite sleep + mindfulness as their primary motivation, and research from "
        ),
        nccih.span,
        txt(
          " backs them up: yoga's effect on sleep is one of its most consistently studied benefits. The catch — most people try yoga for sleep wrong. They do an energising morning class, expect to sleep better that night, and stop after a week when nothing's changed. The version that actually works is structured around bedtime, builds over weeks, and centres a single practice (yoga nidra) most beginners haven't heard of. This is the plan I run with students at "
        ),
        intro.span,
        txt("."),
      ],
      [nccih.mark, intro.mark]
    ),

    h2("The yoga-sleep evidence in one sentence"),
    p(
      "Across multiple randomised controlled trials, consistent yoga practice (2-4 sessions per week, 8+ weeks) measurably improves sleep latency (how fast you fall asleep), sleep quality, and night-time wakings — with the effect strongest when the practice includes yoga nidra or restorative + breathwork components."
    ),

    h2("What's keeping you awake — the three patterns"),
    p(
      "Most adult sleep problems fall into one of three patterns. Identifying yours is the difference between a practice that works and one that doesn't."
    ),
    h3("Pattern 1 — Overstimulation"),
    p(
      "You can't fall asleep because your brain is still running on caffeine + screen light + the day's residue. Sleep latency (time to fall asleep) > 30 minutes regularly. Most common pattern in tech + creative workers."
    ),
    h3("Pattern 2 — Anxiety loop"),
    p(
      "You fall asleep okay, but wake at 3-4 a.m. with a mind that won't stop. Often associated with stress at work or unprocessed emotional load. Very responsive to yoga nidra + breathwork."
    ),
    h3("Pattern 3 — Physical tension"),
    p(
      "You sleep but wake feeling unrested. Often tight hips, neck, shoulders. Body never properly downshifted. Responds best to restorative + bedtime yin sequences."
    ),

    h2("The 30-day plan"),
    h3("Week 1 — Three calming poses + body scan"),
    p(
      "Goal: introduce the body to the idea of slowing down before sleep."
    ),
    p(
      "Daily 8-minute bedtime routine:"
    ),
    ...numbered([
      "Child's pose — 2 minutes.",
      "Supine twist — 90 seconds each side.",
      "Legs up the wall — 3 minutes.",
      "Lying body scan in bed — 2 minutes.",
    ]),
    p(
      "Do this every night for 7 days. Don't add anything yet. Don't measure anything. Just create the habit."
    ),

    h3("Week 2 — Adding 4-7-8 breathwork"),
    p(
      "Goal: drop sleep latency using a breathing technique that demonstrably activates parasympathetic dominance."
    ),
    p(
      "Same bedtime routine + 4-7-8 breathing in bed:"
    ),
    ...numbered([
      "Inhale through nose for 4 counts.",
      "Hold for 7 counts.",
      "Exhale through mouth for 8 counts (slow, audible whoosh).",
      "Repeat 4 cycles. Stop. Sleep.",
    ]),
    p(
      "This single technique has the best research base for reducing time-to-sleep in non-clinical populations."
    ),

    h3("Week 3 — Yoga nidra weekly reset"),
    p(
      "Goal: introduce the practice that consistently outperforms ‘sleep more' as a daytime energy strategy."
    ),
    p(
      "Continue the daily routine. Add one 25-minute guided yoga nidra session per week (find one on YouTube or Insight Timer; search ‘25-minute yoga nidra for sleep')."
    ),
    p(
      "Lie down somewhere quiet, headphones in, let it work. Don't try to ‘do' anything."
    ),

    h3("Week 4 — Locking in the habit"),
    p(
      "Goal: make the practice automatic — independent of motivation."
    ),
    p(
      "Same routine, but now measure: keep a one-line sleep diary. Just ‘slept okay / not great / well' and roughly how many hours. By end of week 4, you'll see a pattern in the diary that matches what your body feels."
    ),

    calloutTip([
      p(
        "Don't try to do yoga + read + journal + skincare + meditation all before bed. Pick ONE thing. The 8-12 minute yoga sequence is the high-leverage one because it does the breathing, body-tension release, and pre-sleep ritual all in a single block."
      ),
    ]),

    h2("The 12-minute bedtime sequence"),
    p(
      "Once you're past week 4, here's the long-form version of the routine that's stuck for most of my students:"
    ),
    ...numbered([
      [strong("Child's pose with arms forward "), txt("— 90 seconds. Slow breath into the back of the body.")],
      [strong("Cat-cow "), txt("— 10 slow cycles, exaggerated breath.")],
      [strong("Supine twist "), txt("— 90 seconds each side.")],
      [
        strong("Reclined butterfly "),
        txt(
          "(soles of feet together, knees out, support knees with cushions) — 2 minutes."
        ),
      ],
      [strong("Legs up the wall "), txt("— 4 minutes.")],
      [strong("Savasana "), txt("— 2 minutes. Optionally with 4-7-8 breathing.")],
    ]),

    ctaCard({
      heading: "Want to learn yoga nidra properly?",
      body: "I run guided yoga nidra sessions in Bangalore + online. 30 minutes that often does the work of 90 minutes of additional sleep.",
      ctaLabel: "EXPLORE YOGA",
      ctaHref: "/yoga",
    }),

    h2("What to avoid before bed"),
    ...bullet([
      "Energising yoga (vinyasa, ashtanga, power yoga) within 3 hours of bedtime. Use it earlier in the day, not at night.",
      "Backbends close to sleep — they're stimulating, not calming.",
      "Screens during the bedtime routine. Defeats the purpose.",
      "Trying to force yourself to ‘relax.' Counter-productive. Just do the sequence; relaxation is the side-effect.",
    ]),

    h2("Bedtime habits that pair with the yoga"),
    ...bullet([
      "Stop caffeine after 2pm. (Caffeine half-life is ~5 hours.)",
      "Dim ambient lighting from 90 minutes before bed.",
      "Keep the bedroom cooler than the rest of the house.",
      "Same sleep time every day — yes, weekends too. Your circadian rhythm doesn't care about Saturdays.",
      "Phone out of the bedroom. Use an alarm clock if you need one.",
    ]),

    h2("What to do when sleep doesn't improve"),
    p(
      "Most students see clear improvement by week 3-4. If you've followed the plan consistently and sleep still hasn't shifted:"
    ),
    ...bullet([
      "Audit caffeine + alcohol intake honestly. Either masks sleep problems.",
      "Consider sleep apnea — especially if you snore + wake feeling unrested. Worth a doctor visit.",
      "Stress-as-cause may need more than yoga — therapy, a job change, a relationship conversation.",
      "Hormonal shifts (peri-menopause, post-natal, thyroid) often need medical input first.",
      "If sleep problems persist beyond 6 weeks of consistent practice, see a sleep specialist. Yoga complements treatment beautifully but is not a substitute for diagnosis.",
    ]),

    ctaCard({
      heading: "Want a personalised 30-day plan?",
      body: "Tell me which of the three sleep patterns is yours. I'll suggest the right starting practice + a check-in week 2.",
      ctaLabel: "GET IN TOUCH",
      ctaHref: "/#contact",
    }),
  ],
  faq: [
    {
      question: "Should I do yoga right before bed?",
      answer:
        "Gentle, calming yoga — yes. The 12-minute bedtime sequence above is built for it. Avoid energising styles (vinyasa, ashtanga, power yoga) within 3 hours of bedtime — they activate the sympathetic nervous system and make sleep harder. Backbends also tend to be stimulating; save them for the morning practice.",
    },
    {
      question: "Yoga nidra vs sleep — which actually rests you more?",
      answer:
        "They're different. Sleep cycles through stages — yoga nidra holds you in a state close to early Stage-2 sleep but with continued mild awareness. Research from sleep labs has shown yoga nidra produces measurable restoration effects, with several practitioners reporting a 30-minute session feels like 1-2 hours of light sleep in restoration terms. It doesn't replace sleep, but it complements it powerfully — particularly when sleep has been short or poor.",
    },
    {
      question: "How long until yoga helps me sleep better?",
      answer:
        "Most students see sleep latency (time to fall asleep) drop within 1-2 weeks of consistent practice. Sleep quality and night-time wakings typically improve over weeks 3-4. The biggest shift — feeling rested on waking, even after the same hours of sleep — usually arrives between weeks 4-8. If nothing has shifted by week 6, look beyond yoga: caffeine, alcohol, untreated stress, or undiagnosed sleep apnea are common causes.",
    },
    {
      question: "Can yoga cure insomnia?",
      answer:
        "‘Cure' is the wrong word. Yoga is consistently effective for stress-driven insomnia and the kind of sleep problems that come from an over-active nervous system. It's less effective alone for clinical insomnia, sleep apnea, restless leg syndrome, or hormonally-driven sleep disruption. For those, see a sleep specialist; yoga complements treatment beautifully but doesn't replace diagnosis.",
    },
    {
      question: "Is 4-7-8 breathing safe?",
      answer:
        "For most healthy adults, yes. It's a slow, controlled technique with no extreme breath retention. Avoid it (or modify) if you have very low blood pressure, are pregnant, or have severe respiratory illness. If you feel dizzy during practice, stop — that's usually a sign the cycle is too long for you. Start with 3 cycles, build to 4.",
    },
  ],
};
