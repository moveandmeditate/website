/**
 * Article #9 — What Is Yoga Nidra.
 * Primary keyword: yoga nidra.
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
  "yoga nidra sessions I run at Move & Meditate",
  "/yoga"
);

const sleepStudy = link(
  "early randomised sleep-lab investigation (PMC, 2023)",
  "https://pmc.ncbi.nlm.nih.gov/articles/PMC9973252/"
);

const cognitiveStudy = link(
  "improved sleep, cognitive processing and memory task accuracy with yoga nidra in novices (PubMed, 2023)",
  "https://pubmed.ncbi.nlm.nih.gov/38091317/"
);

export const post: SeedBlogPost = {
  slug: "what-is-yoga-nidra",
  title: "What Is Yoga Nidra? A Complete Beginner's Guide",
  excerpt:
    "Yoga nidra is the most under-marketed practice in yoga — and the most reliably effective for sleep, stress and recovery. Here's what it is, how it works, and how to start.",
  category: "yoga",
  tags: ["yoga", "yoga-nidra", "sleep", "stress", "beginners", "science-backed"],
  publishedAt: "2026-05-28T11:00:00.000Z",
  readingTime: 9,
  relatedPillar: "yoga",
  seo: {
    title:
      "What Is Yoga Nidra? Complete Beginner's Guide · Move & Meditate",
    description:
      "Yoga nidra explained: a one-sentence definition, how it differs from meditation and sleep, the 8-stage classical sequence, the science, and how to start with your first 10 minutes.",
  },
  body: [
    richP(
      [
        txt(
          "Yoga nidra is one of the most under-marketed practices in yoga, and probably the most reliably effective for sleep, stress recovery, and deep rest. A single 30-minute session can leave practitioners feeling as restored as several hours of light sleep — backed up by a "
        ),
        sleepStudy.span,
        txt(
          ". This is the practice I introduce earliest to most new students at "
        ),
        intro.span,
        txt(
          ", because it asks for nothing — no flexibility, no strength, no quiet mind — and gives more back per minute than almost any other tool in the yoga toolkit."
        ),
      ],
      [sleepStudy.mark, intro.mark]
    ),

    h2("The one-sentence definition"),
    p(
      "Yoga nidra is a guided, lying-down practice that systematically drops the body into a state of deep physical rest while keeping the mind in a soft, present awareness — somewhere between waking and sleep."
    ),

    h2("How yoga nidra differs from meditation and sleep"),
    p(
      "Three states often get confused. Knowing the difference helps you pick the right tool for the right moment."
    ),
    h3("Meditation"),
    p(
      "Sitting up (usually). Mind alert + focused. Body neutral. Trains attention and the ability to observe thoughts without being moved by them. Best done in short, regular doses."
    ),
    h3("Sleep"),
    p(
      "Lying down. Consciousness offline. Cycles through stages (N1-N3, REM). Restorative, essential, but not under your control once started."
    ),
    h3("Yoga nidra"),
    p(
      "Lying down. Body deeply relaxed. Mind in a soft, drifting awareness — still ‘there' but not following thoughts in the usual way. Like the moment between sleep stages, held deliberately. Restorative in a way that sleep is, and trainable in a way that meditation is."
    ),

    h2("What the science actually shows"),
    p(
      "Three honest summaries of the evidence base as of 2026:"
    ),
    ...bullet([
      [
        strong("Sleep: "),
        txt(
          "Multiple RCTs show yoga nidra improves sleep quality and reduces insomnia symptoms in healthy adults and in clinical populations."
        ),
      ],
      [
        strong("Stress + anxiety: "),
        txt(
          "Beneficial effects on perceived stress and anxiety scores in healthy adults across multiple studies. Effect is larger than 'control breathing' interventions."
        ),
      ],
      [
        strong("Cognitive function: "),
        txt(
          "A 2023 study showed improved sleep, cognitive processing and memory task accuracy in novice yoga nidra practitioners after 2 weeks of practice. The full citation is the PubMed paper linked below the article."
        ),
      ],
    ]),
    richP(
      [
        txt("More detail: "),
        cognitiveStudy.span,
        txt("."),
      ],
      [cognitiveStudy.mark]
    ),

    h2("The 8-stage classical sequence"),
    p(
      "Most modern yoga nidra recordings follow a sequence developed by Swami Satyananda Saraswati at the Bihar School of Yoga in the 1960s — itself drawn from older tantric traditions. The classical sequence has 8 stages:"
    ),
    ...numbered([
      [
        strong("Settling. "),
        txt(
          "Lying down (corpse pose / savasana), eyes closed, supported wherever the body needs it. 2-3 minutes of breath observation."
        ),
      ],
      [
        strong("Sankalpa (intention). "),
        txt(
          "A short positive resolve, planted in the mind in present tense — ‘I am at peace,' ‘I am healing,' etc. Set once at the start."
        ),
      ],
      [
        strong("Rotation of consciousness. "),
        txt(
          "The teacher names body parts in rapid sequence; you simply notice each as named. The signature technique."
        ),
      ],
      [
        strong("Breath awareness. "),
        txt(
          "Counting breaths backwards (27, 26, 25...). Gentle, not strict."
        ),
      ],
      [
        strong("Opposites. "),
        txt(
          "Pairs of sensation are introduced — heat / cold, heavy / light. Trains awareness to hold without reaction."
        ),
      ],
      [
        strong("Visualisation. "),
        txt(
          "Guided imagery — a mountain, an ocean, a temple. Different teachers use different image sets."
        ),
      ],
      [
        strong("Sankalpa repeat. "),
        txt("The intention from stage 2 is brought back briefly."),
      ],
      [
        strong("Externalisation. "),
        txt(
          "Gradual return — sound becomes audible, body movements small, eyes open last."
        ),
      ],
    ]),

    h2("What a session feels like"),
    p(
      "Honest description of a first 25-minute session:"
    ),
    ...bullet([
      "First 5 minutes: feels like resting. Mind still chattering.",
      "Minutes 5-10: as the teacher guides through the body rotation, attention starts dropping into the body. Chatter softens.",
      "Minutes 10-18: the deepest part. You may drift in and out of something that isn't quite sleep but isn't quite waking. Time stops behaving normally.",
      "Minutes 18-22: visualisation often produces unexpectedly vivid imagery.",
      "Final 3 minutes: gradual return. Most people open their eyes feeling unusually heavy + unusually clear at the same time.",
    ]),
    p(
      "Falling asleep during yoga nidra is common in early sessions. Not a failure — your body needed it. After a few weeks, you'll find it easier to stay in the awake-but-aware state."
    ),

    h2("Who benefits"),
    ...bullet([
      "Anyone with sleep difficulties — particularly the ‘can't fall asleep' and ‘wake at 3am' patterns.",
      "Working professionals running on adrenaline. Yoga nidra is the most efficient stress-clear available.",
      "New parents. Three short sessions a week recover what intermittent sleep cannot.",
      "Anxiety + PTSD — under therapeutic supervision, yoga nidra has been studied as a complementary tool.",
      "Pre-surgical and post-treatment recovery — used in some hospital settings now.",
      "Anyone who's tried meditation and found it hard. Yoga nidra is meditation's gentler cousin."
    ]),

    calloutTip([
      p(
        "Practice in the afternoon (~3-4pm) rather than at bedtime when you're starting out. Practicing right before sleep often just means you fall asleep early and don't learn the awake-but-aware state. After you've practised for a few weeks, you can use it at bedtime to drop into sleep faster."
      ),
    ]),

    ctaCard({
      heading: "Want to be guided through it live?",
      body: "I run yoga nidra sessions in Bangalore + online weekly. First session free for new students — the easiest way to know if the practice is for you.",
      ctaLabel: "EXPLORE YOGA",
      ctaHref: "/yoga",
    }),

    h2("How to start — your first 10-minute session"),
    p(
      "Don't try to wing it. Yoga nidra needs guidance — the teacher's voice is doing the work that keeps your mind tethered while the body lets go. Three good ways to start:"
    ),
    ...numbered([
      [
        strong("YouTube. "),
        txt(
          "Search ‘10-minute yoga nidra' or ‘yoga nidra for beginners.' Try 3-4 different teachers in your first month; voice matters more than you'd guess."
        ),
      ],
      [
        strong("Insight Timer (free app). "),
        txt(
          "Filter by length + teacher reviews. The free tier has hundreds of guided yoga nidra recordings."
        ),
      ],
      [
        strong("Live with a teacher. "),
        txt(
          "Once you've experimented with recordings, a live class adds something — the sense of practising in a held space."
        ),
      ],
    ]),
    p(
      "Set-up: lie flat on your back, eyes closed, somewhere you won't be interrupted. Use a thin pillow under the knees + a folded blanket over the body. Headphones improve the experience meaningfully. Don't try to control your breath or your thoughts — just follow the voice."
    ),

    h2("Yoga nidra vs hypnotherapy vs body scan"),
    h3("Body scan (MBSR / Vipassana lineage)"),
    p(
      "Closely related but typically shorter (20-30 minutes max), more attention-focused, less intentional drift into deep states. Often done seated as well as lying."
    ),
    h3("Hypnotherapy"),
    p(
      "Targeted clinical intervention. Uses some similar dropping-in techniques but aims at a specific therapeutic outcome (smoking cessation, phobia work). Conducted by trained clinicians."
    ),
    h3("Yoga nidra"),
    p(
      "Open-ended restoration practice. No specific therapeutic target. Designed for repeated, regular use. The most generally applicable of the three."
    ),

    h2("Common mistakes beginners make"),
    ...bullet([
      "Trying to ‘stay awake' for the whole 25 minutes. If you sleep, you slept. Try again tomorrow.",
      "Practising lying in bed at sleep time before you've learned the practice. Set yourself up for awake-but-aware first.",
      "Picking a teacher with a voice that grates. Voice matters. Try several.",
      "Expecting transformation after one session. Most benefits compound over 4-8 weeks of regular practice.",
      "Skipping the sankalpa stage. The intention isn't woo — it's a documented part of the practice's efficacy.",
    ]),

    ctaCard({
      heading: "Want a guided session this week?",
      body: "Drop me a note. I'll send my favourite free 25-minute recording + a note on what to listen for the first time.",
      ctaLabel: "GET IN TOUCH",
      ctaHref: "/#contact",
    }),
  ],
  faq: [
    {
      question: "Does yoga nidra work for sleep?",
      answer:
        "Yes — yoga nidra has been studied in randomised sleep-lab investigations and has shown improvements in sleep latency, sleep quality, and reductions in insomnia symptoms in both healthy adults and clinical populations. The most reliable protocol: 2-3 sessions per week, 25-30 minutes each, for at least 4 weeks before judging the effect. Yoga nidra also pairs well with sleep — a 25-minute afternoon session reliably reduces the ‘need' for a long late-night sleep on stressful days.",
    },
    {
      question: "Can I learn yoga nidra at home?",
      answer:
        "Yes — yoga nidra is well-suited to home practice with a recording. Lie flat on your back, eyes closed, in a quiet space with a thin pillow under the knees. Search YouTube or Insight Timer for ‘10-minute yoga nidra' to start. Headphones improve the experience meaningfully. After a few weeks of guided recordings, you can also attend live classes, but the practice doesn't require in-person teaching the way some other yoga forms do.",
    },
    {
      question: "Is yoga nidra the same as meditation?",
      answer:
        "No. Meditation is usually seated, alert, attention-focused; it trains the ability to observe thoughts without being moved by them. Yoga nidra is lying down, with the body deeply relaxed and the mind in a soft drifting awareness somewhere between waking and sleep. Both are valuable; they target different states. Many practitioners find yoga nidra easier to start with than seated meditation, especially when stressed or sleep-deprived.",
    },
    {
      question: "What if I fall asleep during yoga nidra?",
      answer:
        "Completely normal, especially in early sessions — your body needed the rest. Falling asleep isn't a failure. After 2-4 weeks of practice you'll find it easier to stay in the awake-but-aware state without dropping into actual sleep. If you keep falling asleep weeks in, try practising at 3-4pm instead of bedtime, or sit semi-reclined rather than fully flat.",
    },
    {
      question: "Is yoga nidra safe for everyone?",
      answer:
        "Generally yes. Safe for pregnant women, post-natal mothers, older adults, and people with most chronic conditions. The two cases where it should be approached carefully: severe PTSD or trauma where lying still with eyes closed can be triggering (best done with a trauma-informed teacher), and very low blood pressure (some practitioners feel light-headed sitting up afterwards — sit slowly). Not a substitute for treatment of any clinical condition.",
    },
  ],
};
