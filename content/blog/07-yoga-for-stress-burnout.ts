/**
 * Article #7 — Yoga for Stress + Burnout.
 * Primary keyword: yoga for stress.
 */
import {
  bullet,
  ctaCard,
  calloutTip,
  h2,
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
  "yoga + breathwork classes at Move & Meditate",
  "/yoga"
);

const review = link(
  "2020 review of yoga for stress management in healthy adults",
  "https://www.nccih.nih.gov/health/providers/digest/yoga-for-health-science"
);

export const post: SeedBlogPost = {
  slug: "yoga-for-stress-burnout",
  title:
    "Yoga for Stress and Burnout: 5 Practices for Working Professionals",
  excerpt:
    "Bangalore tech burnout isn't a yoga problem — it's a nervous-system problem yoga happens to be unusually good at. Five practices, with the science of what they're actually doing.",
  category: "yoga",
  tags: ["yoga", "stress", "burnout", "professionals", "breathwork"],
  publishedAt: "2026-05-28T10:30:00.000Z",
  readingTime: 9,
  relatedPillar: "yoga",
  seo: {
    title:
      "Yoga for Stress + Burnout — 5 Practices for Working Professionals · Move & Meditate",
    description:
      "Practitioner-led guide to yoga for stress and burnout, written for Bangalore tech + creative professionals. 5 specific practices, the nervous-system science, and how to actually stick to it.",
  },
  body: [
    richP(
      [
        txt(
          "Most stress advice is unhelpful because it tells you to feel less stressed, not to do anything specific. Yoga is useful here because it isn't asking you to manage your feelings — it's giving your nervous system specific inputs that genuinely change its baseline. A "
        ),
        review.span,
        txt(
          " found beneficial effects of yoga on stress measures in all twelve studies reviewed. The "
        ),
        intro.span,
        txt(
          " I run leans heavily into this — most students who come in for ‘back pain' or ‘flexibility' actually stay for stress regulation. This is the version I'd recommend to a friend in Bangalore tech who knows they're heading toward burnout."
        ),
      ],
      [review.mark, intro.mark]
    ),

    h2("Why burnout is a 2026 problem"),
    p(
      "Hybrid work, always-on Slack, the AI-driven productivity squeeze, three-month sprint cycles, manager isolation — the structural factors driving burnout in 2026 Indian tech and creative work are real, well-documented, and not going away. Most wellness advice that says ‘just take a walk' or ‘meditate for 5 minutes' fails because it doesn't account for how depleted the baseline already is."
    ),
    p(
      "What works is a small, repeatable practice that resets the nervous system — not at 6 a.m. before work, when willpower is unreliable, but in the small windows you actually have between meetings, after a hard day, before bed."
    ),

    h2("How yoga affects the nervous system (simplified)"),
    p(
      "The autonomic nervous system has two branches: sympathetic (‘fight or flight') and parasympathetic (‘rest and digest'). Chronic stress means your sympathetic branch is running too hot, too often. The parasympathetic side gets dimmed."
    ),
    p(
      "Yoga's combination of slow breath, gentle movement, conscious posture, and present-moment attention activates parasympathetic dominance. Vagal tone improves. Heart-rate variability goes up. Cortisol drops. These aren't claims — they're consistent measured findings across yoga research."
    ),
    p(
      "Translated to plain English: regular yoga lowers your baseline stress, not just your in-the-moment stress."
    ),

    h2("Practice 1 — 10-minute morning grounding"),
    p(
      "When: First thing, before email."
    ),
    p(
      "Why: Sets parasympathetic tone for the day. Stops the cortisol surge from a notification-checked morning."
    ),
    p(
      "The sequence:"
    ),
    ...numbered([
      "2 minutes sitting quiet, eyes closed, hands on knees.",
      "10 cycles of slow cat-cow on hands and knees.",
      "5 cycles of standing forward fold + slow rise.",
      "1 minute mountain pose (Tadasana) with deep breathing.",
      "2 minutes of box breathing (4-4-4-4).",
    ]),

    h2("Practice 2 — Box breathing between meetings"),
    p(
      "When: 90 seconds between back-to-back meetings."
    ),
    p(
      "Why: Resets the autonomic nervous system fast. Used by Navy SEALs precisely because it works under pressure."
    ),
    p(
      "How: Inhale for 4 counts. Hold for 4. Exhale for 4. Hold empty for 4. Repeat 8 cycles. That's it."
    ),

    calloutTip([
      p(
        "Set a recurring 90-second calendar block before every meeting that follows another meeting. Treat it as non-negotiable. It's the single highest-ROI productivity intervention available to most knowledge workers."
      ),
    ]),

    h2("Practice 3 — Bhramari (humming breath) for anxiety spikes"),
    p(
      "When: When anxiety builds during the day (panicked review, hard email, presentation jitters)."
    ),
    p(
      "Why: Humming creates internal vibration that demonstrably activates the vagus nerve. Effect is immediate."
    ),
    p(
      "How: Inhale through nose. On the long exhale, hum quietly — like a long ‘mmmmm' — for the duration of the exhale. 5-8 cycles. You can do this discreetly at your desk."
    ),

    h2("Practice 4 — Five-pose post-work decompression"),
    p(
      "When: First 15 minutes after closing the laptop, before dinner."
    ),
    p(
      "Why: Marks the transition from work mode to rest mode. Without it, your nervous system stays in work mode through the evening, which is most of why people sleep badly."
    ),
    p(
      "The sequence:"
    ),
    ...numbered([
      "Standing forward fold — 90 seconds, breathing into the back of the body.",
      "Supine twist — 60 seconds each side.",
      "Supported bridge with a yoga block under sacrum — 2 minutes.",
      "Legs up the wall — 5 minutes.",
      "Savasana (lying flat, eyes closed) — 3 minutes.",
    ]),

    h2("Practice 5 — Yoga nidra for the weekly nervous-system reset"),
    p(
      "When: Sunday evening, or once mid-week, 25-40 minutes."
    ),
    p(
      "Why: Yoga nidra reliably drops the body into a state that registers as deep rest — comparable to several hours of light sleep in restoration terms. Independent research increasingly supports the effect on sleep + stress."
    ),
    p(
      "How: Find a 30-minute guided yoga nidra recording (search YouTube or Insight Timer). Lie down somewhere quiet. Let it work."
    ),

    ctaCard({
      heading: "Want me to guide you through it?",
      body: "I run weekly yoga + breathwork sessions in Bangalore and online — designed for people whose nervous systems live in their inboxes.",
      ctaLabel: "EXPLORE YOGA",
      ctaHref: "/yoga",
    }),

    h2("How to actually stick to it"),
    ...numbered([
      [
        strong("Stack the practice onto something you already do. "),
        txt(
          "Box breathing before every meeting. Five-pose decompression as you close your laptop. Yoga nidra Sunday at 8pm. Habits stack onto cues, not onto willpower."
        ),
      ],
      [
        strong("Start with one practice, not all five. "),
        txt(
          "Pick the one that maps to your most reliable stressor. Add the second only after the first is automatic — usually 3-4 weeks."
        ),
      ],
      [
        strong("Track the right metric. "),
        txt(
          "Not minutes practised. How you feel at 5pm on a Wednesday. That's the number that matters."
        ),
      ],
      [
        strong("Don't treat skipped days as failures. "),
        txt(
          "Consistency over weeks beats perfection over days. Two weeks at 70% adherence beats one week at 100% followed by three weeks at zero."
        ),
      ],
    ]),

    h2("When stress is a medical issue, not a yoga issue"),
    p(
      "Yoga is a stress regulator, not a treatment for clinical anxiety, depression, PTSD or panic disorder. If you're experiencing:"
    ),
    ...bullet([
      "Persistent low mood for more than two weeks.",
      "Panic attacks more than once a fortnight.",
      "Sleep disruption that doesn't respond to anything you try.",
      "Suicidal thoughts of any kind.",
    ]),
    p(
      "See a doctor or a clinical psychologist. Yoga can complement treatment beautifully but is not a substitute. The bravest thing you can do is ask for the right help."
    ),

    h2("How long until you feel different"),
    ...bullet([
      [strong("Week 1: "), txt("Mostly placebo effect, plus the relief of doing something.")],
      [strong("Weeks 2-4: "), txt("Sleep typically improves first. People notice they're falling asleep faster.")],
      [
        strong("Weeks 5-8: "),
        txt(
          "Baseline stress drops noticeably. The morning before a hard meeting feels less catastrophic."
        ),
      ],
      [
        strong("Months 3+: "),
        txt(
          "The biggest shift — your reaction to stressors changes. Things that would have triggered a spiral now register as ‘annoying but manageable.'"
        ),
      ],
    ]),

    ctaCard({
      heading: "Want a personalised practice plan?",
      body: "Tell me what your week looks like + what stresses you most. I'll suggest the one practice to start with — free, no pitch.",
      ctaLabel: "GET IN TOUCH",
      ctaHref: "/#contact",
    }),
  ],
  faq: [
    {
      question: "Is yoga better than meditation for stress?",
      answer:
        "They work on different mechanisms. Meditation trains attention, which over time changes how you relate to stressful thoughts. Yoga adds breath and movement, which directly regulate the autonomic nervous system in the moment. For acute stress (between meetings, before a hard call), short yoga + breathwork wins. For long-term resilience, both pair well. Most yoga classes include meditation; you don't have to choose.",
    },
    {
      question: "How often should I do yoga for burnout?",
      answer:
        "Short, frequent practice beats long, occasional practice. Three or four 20-30 minute sessions per week, plus daily 90-second breathwork breaks between meetings, holds up better in real life than two 75-minute weekend classes. The goal is to keep returning to a calm baseline, not to schedule heroic single sessions.",
    },
    {
      question: "Which breathing technique is best for anxiety?",
      answer:
        "For immediate anxiety spikes: Bhramari (humming breath) or 4-7-8 breathing — both activate the vagus nerve quickly. For ongoing stress baseline: box breathing (4-4-4-4) practised twice a day. For longer panic episodes: a 10-minute guided yoga nidra recording. None of these replace professional help if you have a panic disorder; they complement it.",
    },
    {
      question: "Can yoga prevent burnout in tech jobs?",
      answer:
        "It can meaningfully delay it and reduce its severity, but it can't compensate for structural problems like impossible deadlines, toxic managers, or 60-hour weeks. The most useful frame: yoga is preventive medicine for nervous-system depletion. If the structural problems are extreme, fix those first; yoga then helps you recover faster between them.",
    },
    {
      question: "How long until yoga helps with stress?",
      answer:
        "Week 1 is mostly placebo + the relief of doing something. Weeks 2-4, sleep usually improves first. By week 5-8, baseline stress drops noticeably — mornings before hard meetings feel less catastrophic. The biggest change shows up around month three: your reactions to stressors shift. Things that would have triggered a spiral start registering as ‘annoying but manageable.'",
    },
  ],
};
