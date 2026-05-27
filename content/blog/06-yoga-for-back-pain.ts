/**
 * Article #6 — Yoga for Back Pain.
 * Primary keyword: yoga for back pain.
 * Research-backed (NCCIH + PubMed citations embedded in body).
 */
import {
  bullet,
  ctaCard,
  calloutNote,
  calloutWarning,
  h2,
  h3,
  internalLink,
  numbered,
  p,
  richP,
  strong,
  txt,
  link,
} from "@/scripts/lib/portable-text";
import type { SeedBlogPost } from "@/scripts/lib/blog-post";

const intro = internalLink(
  "yoga work at Move & Meditate",
  "/yoga"
);

const pubMed = link(
  "evidence summarised by the US National Center for Complementary and Integrative Health (NCCIH)",
  "https://www.nccih.nih.gov/health/providers/digest/yoga-for-health-science"
);

const guideline = link(
  "clinical practice guidelines",
  "https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2023.1273473/full"
);

export const post: SeedBlogPost = {
  slug: "yoga-for-back-pain",
  title: "Yoga for Back Pain: 7 Poses That Actually Help (Research-Backed)",
  excerpt:
    "Most yoga-for-back-pain content recycles the same five poses without context. Here's what the research actually shows, paired with seven specific poses for the four most common back-pain patterns.",
  category: "yoga",
  tags: ["yoga", "back-pain", "beginners", "science-backed", "desk-bodies"],
  publishedAt: "2026-05-28T10:15:00.000Z",
  readingTime: 10,
  relatedPillar: "yoga",
  seo: {
    title:
      "Yoga for Back Pain — 7 Research-Backed Poses · Move & Meditate",
    description:
      "Practitioner-led guide to yoga for back pain: what the research really shows, the 7 most useful poses for the 4 common pain patterns, contraindications, and a 12-minute beginner routine.",
  },
  body: [
    richP(
      [
        txt(
          "Yoga genuinely helps with chronic low back pain. Multiple "
        ),
        guideline.span,
        txt(
          " now list it among the recommended non-drug interventions for non-specific chronic low back pain, and the "
        ),
        pubMed.span,
        txt(
          " concludes the evidence is strongest for low back, neck and tension-headache pain. That said, most online yoga-for-back-pain content recycles the same five poses without context — and the wrong pose for your specific pain pattern can make things worse. This is the version I run through with new students at "
        ),
        intro.span,
        txt(
          ", drawn from a decade of teaching desk-bodied Bangalore practitioners + post-natal mothers + people coming off years of compensation patterns."
        ),
      ],
      [guideline.mark, pubMed.mark, intro.mark]
    ),

    h2("The one-sentence answer"),
    p(
      "Yoga reliably reduces chronic low back pain and improves function in people who practice consistently 2-3 times a week for at least 12 weeks — but only when the poses match the specific pattern of pain, and only when acute injuries have been cleared by a doctor first."
    ),

    h2("What the research actually shows"),
    p(
      "Three honest summaries from the published evidence:"
    ),
    ...bullet([
      [
        strong("Chronic low back pain: "),
        txt(
          "Multiple randomised controlled trials show yoga is at least as effective as physical therapy at reducing pain and disability over 12 weeks. The effect is moderate, not miraculous, and depends entirely on consistency."
        ),
      ],
      [
        strong("Acute back pain (recent injury): "),
        txt(
          "Evidence is weaker. Most studies exclude participants with acute injury or recent surgery. Don't self-treat acute pain with yoga without medical clearance first."
        ),
      ],
      [
        strong("Sciatica + neuropathic pain: "),
        txt(
          "Mixed evidence. Some poses help, some make it worse. This is the strongest case for working with a qualified teacher rather than following a generic routine."
        ),
      ],
    ]),

    h2("The four most common back-pain patterns"),
    p(
      "Almost everyone's back pain falls into one of these four buckets. Identifying yours is the difference between practice that heals and practice that aggravates."
    ),
    h3("Pattern 1 — Lower-back tightness from desk work"),
    p(
      "Pain in the lumbar region, often by the end of a long screen day. Usually associated with weak glutes, tight hip flexors, and a habit of slumping into the chair. The most common pattern in Bangalore tech workers."
    ),
    h3("Pattern 2 — Upper-back + neck pain (postural)"),
    p(
      "Tight trapezius, knot between the shoulder blades, sometimes a headache by evening. Driven by forward-head posture, hours over a laptop, phone-down scrolling."
    ),
    h3("Pattern 3 — Sciatica-style (radiating leg pain)"),
    p(
      "Pain that starts in the lower back and shoots down one leg. Sometimes piriformis-driven (a buttock muscle compressing the nerve), sometimes disc-related. Yoga can help piriformis-driven cases significantly; disc-related cases need careful screening first."
    ),
    h3("Pattern 4 — Post-natal back pain"),
    p(
      "Lower-back + sacroiliac pain after pregnancy, often with diastasis recti (abdominal separation). Needs a specifically post-natal sequence, not generic yoga."
    ),

    calloutWarning([
      richP([strong("Important: ")]),
      p(
        "If you have a slipped disc, recent back surgery, severe sciatica, or pain that wakes you at night — see a doctor before starting yoga. Yoga can be part of the recovery, but the wrong poses early on can extend the injury. None of this article is medical advice."
      ),
    ]),

    h2("The 7 poses that actually help"),
    p(
      "These cover 80% of what a back-pain-focused yoga sequence needs. Hold each for 5-8 slow breaths; repeat the sequence 2-3 times."
    ),
    h3("1. Cat-cow (Marjaryasana / Bitilasana)"),
    p(
      "Spinal mobiliser. Restores movement between vertebrae after long sitting. Best as the warm-up move before any back sequence."
    ),
    richP([strong("Cue: ")]),
    p(
      "Hands under shoulders, knees under hips. Inhale + drop belly, lift gaze (cow). Exhale + round spine, tuck chin (cat). Move slowly with breath. 10-15 cycles."
    ),
    h3("2. Sphinx (Salamba Bhujangasana)"),
    p(
      "Gentle backbend. Strengthens the lower back without compressing the lumbar discs. Safer than full cobra for most beginners."
    ),
    richP([strong("Cue: ")]),
    p(
      "Lie face-down, forearms on the floor parallel to each other, elbows under shoulders. Lift chest, soften shoulders away from ears. Hold 30-60 seconds."
    ),
    h3("3. Child's pose with side stretch (Balasana variation)"),
    p(
      "Decompresses lumbar spine. The side-stretch variation opens the lateral fascia line that often goes neglected."
    ),
    richP([strong("Cue: ")]),
    p(
      "Knees wide, big toes touching, sit back to heels. Arms forward; walk both hands to the right (left side stretches), hold 30 seconds, switch."
    ),
    h3("4. Supine twist (Supta Matsyendrasana)"),
    p(
      "Releases the muscles around the spine + opens the QL (quadratus lumborum) on each side. One of the most effective single poses for desk-driven lower back pain."
    ),
    richP([strong("Cue: ")]),
    p(
      "On your back, draw right knee toward chest. Cross it over to the left, keeping right shoulder grounded. Gaze right. Hold 60 seconds. Switch."
    ),
    h3("5. Supported bridge (Setu Bandhasana with block)"),
    p(
      "Restorative backbend. Decompresses the lower back while gently strengthening glutes. Excellent for post-natal practitioners."
    ),
    richP([strong("Cue: ")]),
    p(
      "Lie on back, knees bent, feet hip-width. Lift hips; slide a yoga block under your sacrum (the flat bony bit at the base of your spine). Rest weight on the block. Hold 60-90 seconds."
    ),
    h3("6. Modified downward-facing dog (Adho Mukha Svanasana — bent knees)"),
    p(
      "Lengthens the entire posterior chain. The modified version (bent knees, heels lifted) is the version most beginners need; the 'classical' straight-leg dog often jams the lumbar spine in tight bodies."
    ),
    richP([strong("Cue: ")]),
    p(
      "Start in tabletop, tuck toes, lift hips. Keep knees bent generously, focus on lengthening spine. Hold 30-45 seconds."
    ),
    h3("7. Legs up the wall (Viparita Karani)"),
    p(
      "Restorative inversion. Reduces lower-back tension, drains lower-limb swelling, regulates nervous system. The recovery pose."
    ),
    richP([strong("Cue: ")]),
    p(
      "Lie on your back, scoot bottom close to a wall, legs straight up the wall. Stay 5-10 minutes."
    ),

    h2("A 12-minute beginner sequence"),
    ...numbered([
      [strong("Cat-cow "), txt("× 10 cycles — 90 seconds.")],
      [strong("Sphinx "), txt("× 2 holds of 45 seconds — 90 seconds.")],
      [
        strong("Child's pose with side stretch "),
        txt("× both sides, 30 seconds each — 60 seconds."),
      ],
      [
        strong("Supine twist "),
        txt("× both sides, 60 seconds each — 2 minutes."),
      ],
      [strong("Supported bridge "), txt("× 90 seconds — 90 seconds.")],
      [
        strong("Modified down dog "),
        txt("× 2 holds of 30 seconds, with a 20-second tabletop in between — 80 seconds."),
      ],
      [strong("Legs up the wall "), txt("× 4 minutes — 4 minutes.")],
    ]),
    p(
      "Practice 4-5 times a week for 12 weeks. Re-measure your pain on a 0-10 scale weekly so you can see the trend."
    ),

    ctaCard({
      heading: "Want guided sequencing instead of generic routines?",
      body: "I run yoga classes in Bangalore + online — including specific back-care + post-natal formats. First conversation is free.",
      ctaLabel: "EXPLORE YOGA",
      ctaHref: "/yoga",
    }),

    h2("What to avoid until your back is stable"),
    ...bullet([
      "Deep forward folds with straight legs (Uttanasana, Paschimottanasana) — they compress lumbar discs in tight backs.",
      "Full backbends (wheel, full bow) — too much load on a vulnerable spine.",
      "Twists you 'force' deeper — gentle twisting is good, forced twisting is not.",
      "Headstand + shoulderstand — cervical-spine load that even healthy backs find risky without years of preparation.",
      "Hot yoga in the early stages — the heat masks pain signals you should be listening to.",
    ]),

    calloutNote([
      p(
        "If a pose increases your pain during the practice, stop. If it increases your pain in the 24 hours after, drop it from your sequence. Your body's feedback in week 2 tells you more than any internet guide can."
      ),
    ]),

    h2("How long until you feel different"),
    p(
      "Be patient. The honest timeline from the research and from real students:"
    ),
    ...bullet([
      [strong("Weeks 1-2: "), txt("Better mobility, slightly less stiffness. Pain may be unchanged.")],
      [strong("Weeks 3-6: "), txt("Pain typically drops 20-30% on average. Sleep often improves first.")],
      [strong("Weeks 7-12: "), txt("Pain reduction stabilises. Function improves more than pain numbers.")],
      [
        strong("Months 4+: "),
        txt(
          "Most consistent practitioners describe the change as 'I notice I'm not noticing my back anymore.' That's the goal."
        ),
      ],
    ]),

    h2("When to see a doctor (not a yoga teacher) first"),
    ...bullet([
      "Pain that wakes you up at night.",
      "Pain accompanied by numbness, weakness, or loss of bladder/bowel control (urgent — this can indicate cauda equina).",
      "Recent significant injury (fall, accident, lifting injury).",
      "Pain that has been unchanged or worsening for more than 6 weeks despite movement.",
      "Pain after age 50 with new onset (worth a baseline scan).",
    ]),

    ctaCard({
      heading: "Want a 1:1 sequence for your specific pattern?",
      body: "Drop me a note describing what kind of back pain you have + when it shows up. I'll suggest a starting sequence — free, no pitch.",
      ctaLabel: "GET IN TOUCH",
      ctaHref: "/#contact",
    }),
  ],
  faq: [
    {
      question: "Is yoga safe for chronic back pain?",
      answer:
        "Generally yes, when the poses match your specific pain pattern and you've had a doctor rule out red flags first (slipped disc, recent surgery, pain that wakes you at night, numbness in legs). Multiple clinical practice guidelines now include yoga as a recommended non-drug intervention for chronic non-specific low back pain. The catch is consistency — research shows benefit requires 2-3 sessions per week for at least 12 weeks.",
    },
    {
      question: "Should I do yoga every day for back pain?",
      answer:
        "Three to five sessions a week works better than seven for most people. Daily can lead to overuse if the poses are repetitive — your back tissues need recovery time too. Vary the practice: alternate gentle back-care sequences with restorative + breathwork days. A complete day off each week is fine and often helpful.",
    },
    {
      question: "Can yoga make my back pain worse?",
      answer:
        "Yes, if you pick the wrong poses for your pattern. Deep forward folds with straight legs and forced twists are the two most common aggravators. Sciatica that's disc-related can be worsened by certain seated poses. If a pose increases pain during practice, stop. If it increases pain in the 24 hours after, drop it from your sequence. Better to work with a teacher who can screen your specific pattern than to follow generic routines.",
    },
    {
      question: "How quickly will yoga help my back pain?",
      answer:
        "Realistically: weeks 1-2 you'll feel more mobile, but pain may be unchanged. Weeks 3-6, pain typically drops 20-30%. Weeks 7-12, pain reduction stabilises and function (what you can comfortably do) improves more than the pain number itself. Past month 4, most consistent practitioners describe the change as 'I notice I'm not noticing my back anymore.'",
    },
    {
      question: "Yoga or physiotherapy for back pain — which is better?",
      answer:
        "Multiple randomised controlled trials show yoga is at least as effective as physical therapy for chronic low back pain over a 12-week window. The right answer depends on the cause: post-injury or post-surgery recoveries benefit from physiotherapy's specific assessment + protocol, then transition to yoga for maintenance. For non-specific chronic back pain, either works; pick the one you'll actually stick with for 12 weeks.",
    },
  ],
};
