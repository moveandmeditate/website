/**
 * Article #5 — Couple Dance Lessons for Weddings.
 * Primary keyword: couple dance lessons.
 */
import {
  bullet,
  ctaCard,
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
  "couple choreography I do at Move & Meditate",
  "/weddings"
);

export const post: SeedBlogPost = {
  slug: "couple-dance-lessons-wedding",
  title: "Couple Dance Lessons for Weddings: A 12-Week Prep Plan",
  excerpt:
    "Couple dances either land beautifully or flop visibly. Here's the 12-week prep plan, song selection rules, and the under-discussed factors (heels, family pressure, stage fright) that decide which way it goes.",
  category: "weddings",
  tags: ["weddings", "couple-dance", "choreography", "sangeet"],
  publishedAt: "2026-05-28T10:00:00.000Z",
  readingTime: 9,
  relatedPillar: "weddings",
  seo: {
    title:
      "Couple Dance Lessons for Weddings — 12-Week Plan · Move & Meditate",
    description:
      "Planning a couple dance for your sangeet or reception? Practitioner-led 12-week timeline, song selection by tempo + memory, day-of wardrobe traps, and stage-fright fixes.",
  },
  body: [
    richP(
      [
        txt(
          "Couple dances are the highest-stakes 90 seconds at most weddings. Done well, they're the moment everyone talks about for years. Done badly — under-rehearsed, picked from the wrong song, forgotten three steps in — they're the moment everyone politely avoids mentioning. The difference comes down to four things, in this order: choosing the right song, giving yourselves a real 12-week runway, drilling the riskiest 16 counts more than you think you need to, and the wardrobe decisions you don't realise you've already made. This is what I run with couples in "
        ),
        intro.span,
        txt("."),
      ],
      [intro.mark]
    ),

    h2("Three honest truths about couple dances"),
    h3("Truth #1 — Most couples under-rehearse"),
    p(
      "The standard pattern: book the choreographer 4-6 weeks out, rehearse twice a week for two weeks, hit a wall in week 3, miss two rehearsals to wedding logistics, panic-rehearse for the final five days. The performance is fine — but 'fine' isn't what you're going for."
    ),
    h3("Truth #2 — Some couples over-rehearse and freeze"),
    p(
      "The opposite failure: 16 weeks of practice, the dance becomes mechanical, the couple loses the joy, the performance feels rehearsed-tense rather than lived-in. The sweet spot is 10-12 weeks at a sane cadence."
    ),
    h3("Truth #3 — Confidence on stage isn't a personality trait"),
    p(
      "I've worked with introverts who lit up the stage and extroverts who froze. The variable is preparation specificity. Couples who've rehearsed at performance tempo + in performance shoes + on a similar floor + with the actual playback equipment perform confidently. Everyone else gets one of the five performance failure modes."
    ),

    h2("Song selection — the four rules that matter"),
    ...numbered([
      [
        strong("Pick a tempo your bodies actually like. "),
        txt(
          "Test by playing the song in your living room and dancing freely for 30 seconds. If neither of you moves, the song is wrong — no matter how meaningful the lyrics."
        ),
      ],
      [
        strong("Match the song to the relationship's actual memory. "),
        txt(
          "A song from your first date will carry energy that even brilliant choreography can't manufacture."
        ),
      ],
      [
        strong("Pick a song with at least one obvious dramatic moment. "),
        txt(
          "The crowd needs a beat-drop, a chorus lift, a slow-then-fast shift — something to react to. Songs that are uniformly mid-tempo make for choreography that's hard to react to."
        ),
      ],
      [
        strong("Avoid songs longer than 4 minutes. "),
        txt(
          "Edit to 2:30-3:30. The crowd's attention drops off at 3:45 reliably, however good the dance."
        ),
      ],
    ]),

    h2("Choreography styles for couple dances"),
    h3("Classical fusion"),
    p(
      "Indian classical (Bharatanatyam or Kathak) blended with simple contemporary partner work. Elegant, photographable, less reliant on raw dance ability. Great for couples where one partner has a classical background."
    ),
    h3("Bollywood"),
    p(
      "The default. Familiar, accessible, family-friendly. Pick a song from the last 10 years for nostalgic resonance; older songs for cross-generation reach."
    ),
    h3("Slow ballroom + contemporary"),
    p(
      "The most romantic option. Easier on knees and stamina; harder on technique (every wrong frame shows). Perfect for first-dance moments at the reception rather than the high-energy sangeet."
    ),
    h3("Folk fusion"),
    p(
      "Bhangra, garba, or regional folk choreography. High-energy, low-precision-requirement, room-engaging. Best for the second half of a sangeet set."
    ),
    h3("Mash-up"),
    p(
      "Three short cuts across genres — slow start, mid-tempo middle, high-energy finish. Hardest to choreograph well; biggest payoff when it lands. Needs a senior choreographer."
    ),

    h2("The 12-week timeline week-by-week"),
    ...numbered([
      [
        strong("Week 12 — Pick song + choreographer. "),
        txt("Decide format. Sign on a choreographer if outsourcing."),
      ],
      [
        strong("Week 11 — Listen-only week. "),
        txt(
          "Play the song daily, on commutes, during meals. Internalise the beat structure before learning steps."
        ),
      ],
      [
        strong("Weeks 10-9 — Choreography blocking. "),
        txt(
          "Learn the steps slowly. Don't run at performance speed yet. One 60-min session per week."
        ),
      ],
      [
        strong("Weeks 8-6 — Drill the structure. "),
        txt(
          "Add tempo. Two sessions a week. By end of week 6 you should be able to run the full dance, beat-perfect, without prompting."
        ),
      ],
      [
        strong("Weeks 5-4 — Drill the risky bits. "),
        txt(
          "Identify the 8-16 counts most likely to break under pressure (usually a turn, a lift, or a partner-switch). Drill 5×."
        ),
      ],
      [
        strong("Week 3 — Film yourselves. "),
        txt(
          "Phone on a tripod, full run, watch it back. You'll see exactly which counts need fixing — the camera tells the truth your bodies can't."
        ),
      ],
      [
        strong("Week 2 — Costume + footwear rehearsal. "),
        txt(
          "Run the dance in your actual outfit. Test heels (you'll likely change your mind). Test the floor."
        ),
      ],
      [
        strong("Week 1 — Full dress + cue rehearsal. "),
        txt(
          "On venue floor if possible. With actual sound system. Solve every cue mistake now, not on the night."
        ),
      ],
      [
        strong("Day-of — Warm up, hydrate, eat smart. "),
        txt(
          "30-min light warm-up, no heavy food in the 90 minutes before, water but no sugary drinks."
        ),
      ],
    ]),

    calloutTip([
      p(
        "Film yourselves at week 3 and again at week 6. The two videos are the clearest possible feedback loop — better than any choreographer's notes, because you'll catch the small posture habits that make the difference between looking 'in love and dancing' and looking 'concentrating hard on the next step.'"
      ),
    ]),

    h2("The wardrobe trap (especially the heel question)"),
    p(
      "Half the brides I work with insist on the highest heels for the couple dance and reverse the decision two days before the wedding. The reason: dancing in 3.5-inch heels for 3 minutes is a fundamentally different skill from walking in them for 5 minutes. Without rehearsal in the actual footwear, the dance becomes a series of careful balance corrections — and the camera reads that as tension, not romance."
    ),
    p(
      "Two-rule answer: either commit to heels and rehearse in them from week 4 onwards, or switch to a 1-inch block heel + ornate ghungroo set. Both look elegant in photos. Only one keeps the dance free."
    ),

    ctaCard({
      heading: "Want a custom 12-week plan?",
      body: "I run couple choreography for couples across India + destination weddings. Single song or full sangeet sets — first call is free.",
      ctaLabel: "EXPLORE WEDDINGS",
      ctaHref: "/weddings",
    }),

    h2("Working with family — when to include them"),
    p(
      "Most couples I talk to are torn between 'just the two of us' and 'parents + siblings as part of the dance.' Both are valid. The rule that works:"
    ),
    ...bullet([
      "Just-the-two-of-us → the most intimate, most romantic. Best at a reception first-dance, less ideal as a sangeet opener where you're competing with high-energy group sets.",
      "Family cameo (parents join for the last 16 counts) → broadens the moment without diluting it. Strong sangeet choice.",
      "Full family ensemble → can feel chaotic if not choreographed tightly. If you go this route, the couple needs a clear 30-second moment in the middle that's only theirs.",
    ]),

    h2("Stage fright — three tactical fixes"),
    ...numbered([
      [
        strong("Rehearse with people watching. "),
        txt(
          "Have a friend sit in for two rehearsals in weeks 3-4. Watching eyes are a skill — practise it."
        ),
      ],
      [
        strong("Use the breath. "),
        txt(
          "60 seconds of 4-7-8 breathing in the green room before stage time genuinely drops cortisol and resets the nervous system. Free, fast, scientifically backed."
        ),
      ],
      [
        strong("Lock your eyes on each other for the opening 8 counts. "),
        txt(
          "Not the audience. The intimacy of looking at your partner first is what kills self-consciousness fastest."
        ),
      ],
    ]),

    h2("Day-of logistics — the four-hour window"),
    ...bullet([
      "Eat lunch by 1pm if performing at 7pm. Heavy meals close to performance = sluggish.",
      "30 minutes of physical warm-up in the green room (joint mobility + light cardio + 60 seconds of breathwork).",
      "Carry a backup USB with the music + email it to the DJ separately. Wi-Fi fails.",
      "Have one designated friend with a printed cue sheet, who is NOT the bride, groom, or parent. That person manages the run-up.",
    ]),

    h2("When NOT to choreograph a couple dance"),
    p(
      "Three situations where the right answer is 'skip it':"
    ),
    ...bullet([
      "Neither of you wants to be on stage. Forcing it produces tense performances that everyone (including you) remembers.",
      "You have less than 4 weeks of real rehearsal time. Better to do something simple + heartfelt (a freestyle slow dance) than a half-rehearsed choreographed number.",
      "Either of you has a recent injury. Yes, even minor ones. Couple dances put unique load on the partner who's catching the spin or supporting the lean.",
    ]),

    ctaCard({
      heading: "Have a wedding date but no plan yet?",
      body: "Tell me when, where, and what song you keep coming back to. I'll come back with a realistic 12-week (or shorter) plan in 24 hours.",
      ctaLabel: "GET IN TOUCH",
      ctaHref: "/#contact",
    }),
  ],
  faq: [
    {
      question: "How many weeks do we need to learn a couple dance for our wedding?",
      answer:
        "10-12 weeks for a clean, lived-in performance with 2 rehearsals per week. 6-8 weeks is the bare minimum for a simple choreographed sequence. Less than 4 weeks of real rehearsal time, I'd recommend skipping a structured choreographed number and doing a heartfelt simple-step routine or freestyle slow dance instead.",
    },
    {
      question: "What's the best song for a couple dance?",
      answer:
        "Pick by four rules in order: a tempo your bodies actually like (test by playing it at home), a song with personal memory (first date, first dance, anniversary), at least one obvious dramatic moment for the crowd to react to (a beat-drop or chorus lift), and a length you can edit to 2:30-3:30. Lyrics matter less than the body-energy of the track.",
    },
    {
      question: "Should we hire a choreographer or learn from YouTube?",
      answer:
        "YouTube works if both of you have prior dance experience and a 10-week runway. A choreographer is worth it if either of you is a first-time performer, if you want the dance to look properly choreographed (rather than recorded-then-copied), or if you want feedback on the parts your camera can't show you. Cost-wise, a Bangalore choreographer for a single couple dance with 4-6 weeks of prep is ₹30,000-₹80,000.",
    },
    {
      question: "How do I handle stage fright before a couple dance?",
      answer:
        "Three tactical fixes that work: rehearse with watching eyes in weeks 3-4 (not just choreographer + partner), do 60 seconds of 4-7-8 breathwork in the green room before stage time (genuinely drops cortisol), and lock your eyes on your partner for the opening 8 counts rather than scanning the audience. Intimacy with your partner kills self-consciousness fastest.",
    },
    {
      question: "Can I wear heels for my couple dance?",
      answer:
        "Yes — IF you've rehearsed in them from week 4 onwards. Dancing in 3.5-inch heels for 3 minutes is a fundamentally different skill from walking in them, and the choreography needs to be blocked around the balance corrections heels add. The compromise that satisfies most brides: switch to a 1-1.5 inch block heel with an ornate ghungroo set — looks elegant in photos, keeps the dance free.",
    },
  ],
};
