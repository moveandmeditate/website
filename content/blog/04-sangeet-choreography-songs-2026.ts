/**
 * Article #4 — Sangeet Choreography + 2026 Songs.
 * Primary keywords: sangeet choreography, sangeet songs 2026.
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
  "wedding choreography work I do at Move & Meditate",
  "/weddings"
);

export const post: SeedBlogPost = {
  slug: "sangeet-choreography-songs-2026",
  title:
    "Sangeet Choreography: An 8-Week Timeline + 2026's Best Song Picks",
  excerpt:
    "Sangeets in 2026 look more like curated reels than stage-shows. An 8-week plan, the songs that are actually landing this season, and the family-coordination tactics that save the night.",
  category: "weddings",
  tags: ["weddings", "sangeet", "choreography", "songs-2026", "couple-dance"],
  publishedAt: "2026-05-28T09:45:00.000Z",
  readingTime: 12,
  relatedPillar: "weddings",
  seo: {
    title:
      "Sangeet Choreography 2026 — 8-Week Timeline + Top Songs · Move & Meditate",
    description:
      "Planning a sangeet? Honest practitioner-led timeline (8 weeks → wedding day), the best 2026 sangeet songs with choreography notes, family-coordination tactics, and the reels-first format shift.",
  },
  body: [
    richP(
      [
        txt(
          "Sangeets in 2026 don't look like sangeets from 2019. The format has shifted from 'one long stage-show with twelve performances back-to-back' to something closer to a curated mixtape — three or four high-energy sets, deliberate room-energy resets, and at least half the choreography designed to shoot well as Instagram reels. The families who pull off a sangeet that people talk about for years are the families who plan eight weeks ahead and don't try to feature everyone in every dance. This is the practical version of "
        ),
        intro.span,
        txt(
          " — the same triage I give couples on our first prep call."
        ),
      ],
      [intro.mark]
    ),

    h2("The 2026 sangeet format shift"),
    p(
      "Until about 2022, the standard sangeet was a chronological show: bride's family does six songs, groom's family does six songs, couple closes with one big number, intermission, surprise mash-up at the end. Long, energetic, exhausting."
    ),
    p(
      "The 2026 default is different. Sets are shorter (3-5 songs each), the audience is treated as part of the energy rather than a passive crowd, and reels are baked in — most couples now budget for a second photographer / phone operator whose only job is to capture stage-level Instagram footage. Practically, this means each performance should be a clean 90-150 seconds, choreographed with a clear hook in the first 20 seconds, and shot from a fixed reels-friendly angle."
    ),

    h2("The 8-week sangeet timeline at a glance"),
    p(
      "Anything tighter than 6 weeks compromises quality. Anything longer than 12 weeks loses momentum. 8 weeks is the sweet spot for a typical family-sized sangeet."
    ),
    ...numbered([
      [
        strong("Week 8 — Lock the format. "),
        txt(
          "Decide number of sets, who's performing in which set, total runtime, and whether you want reels-first choreography. Hire your choreographer this week if you're outsourcing."
        ),
      ],
      [
        strong("Week 7 — Lock the songs. "),
        txt(
          "Final song list with timings. See the section below for 2026 picks. Once locked, do not change."
        ),
      ],
      [
        strong("Week 6 — Cast every performer. "),
        txt(
          "Family members, friends, kids — assign each to a specific set. Anyone joining after week 5 gets a cameo, not a full sequence."
        ),
      ],
      [
        strong("Weeks 5-3 — Block + drill. "),
        txt(
          "Choreography blocking, then weekly rehearsals. Aim for twice a week. Each rehearsal should cover one full set plus 15 minutes on the riskiest transition."
        ),
      ],
      [
        strong("Week 2 — Costume + props lock. "),
        txt(
          "Final fittings, prop choreography (chunnis, dupattas, garlands), shoe testing on the actual venue floor if possible."
        ),
      ],
      [
        strong("Week 1 — Stage rehearsal. "),
        txt(
          "Full dress + sound check at venue if you can get access. At least one cue-to-cue with the DJ."
        ),
      ],
      [
        strong("Day-of — Warm up, hydrate, eat smart. "),
        txt(
          "30 minutes of physical warm-up + breathwork before the performance window. Skip heavy meals 90 minutes before."
        ),
      ],
    ]),

    h2("2026 song picks (with choreography notes)"),
    p(
      "The songs below are the most-requested + best-landing tracks across Bangalore + Mumbai sangeets I've worked or watched in the past nine months. Mix-and-match by set type:"
    ),
    h3("Couple dance — the quiet stunner"),
    ...bullet([
      [
        strong("Teri Ore. "),
        txt(
          "The contemporary go-to. Sweeping melody, easy to choreograph beautifully even with a partner who 'doesn't dance.' Best for the close of the couple set."
        ),
      ],
      [
        strong("Makhna. "),
        txt(
          "Playful, flirtatious, room-energy lifter. Perfect for couples who want swag without slow-dancing."
        ),
      ],
      [
        strong("Kesariya. "),
        txt(
          "Romantic, well-known. Use it if you want every aunty in the room to cry — and to share."
        ),
      ],
      [
        strong("Aaj Ki Raat (Stree 2 revival). "),
        txt(
          "Best surprise pick of the season — has the nostalgia without feeling tired."
        ),
      ],
    ]),
    h3("Bride-squad / group performances"),
    ...bullet([
      [
        strong("Desi Girl. "),
        txt(
          "Untouchable. Fifteen years deep and it still makes every woman in the room rush the stage. Bride-squad anthem."
        ),
      ],
      [
        strong("Naach Punjaban. "),
        txt(
          "High-energy, easy footwork, accommodates beginners. Brilliant for cousins-and-friends sets where skill levels vary."
        ),
      ],
      [
        strong("Kar Gayi Chull. "),
        txt(
          "Evergreen party number. The fallback if you want guaranteed crowd participation."
        ),
      ],
      [
        strong("What Jhumka (Rocky Aur Rani). "),
        txt(
          "Currently the #1 reel-performance track. Shoot-friendly choreography, big payoff move at the chorus."
        ),
      ],
    ]),
    h3("Family + parents sets"),
    ...bullet([
      [
        strong("Gallan Goodiyan. "),
        txt(
          "The legendary cross-generation track. Both families on stage, simple footwork, everyone gets a moment."
        ),
      ],
      [
        strong("Raatan Lambiyan. "),
        txt(
          "Slow-build, emotional, works for parent-child duets without feeling forced."
        ),
      ],
      [
        strong("Mauja Hi Mauja. "),
        txt("Dads-on-stage classic. Pair with a tongue-in-cheek block."),
      ],
    ]),
    h3("Surprise + finale"),
    ...bullet([
      [
        strong("Sajni (Laapataa Ladies). "),
        txt("The 2026 surprise choice. Cinematic, untested at most sangeets — high-payoff if you commit."),
      ],
      [
        strong("Mash-ups (custom). "),
        txt(
          "Ask your choreographer to cut a 2-minute mash-up across 4-5 tracks. The finale's job is to leave the room loud — mash-ups do that reliably."
        ),
      ],
    ]),

    calloutTip([
      p(
        "Pick one Punjabi, one classic Bollywood, one Hindi devotional or contemporary, and one regional / K-pop / Latin micro-track for younger cousins. That four-genre mix keeps the room awake across the entire 30-40 minute performance window."
      ),
    ]),

    h2("Building the cast — who performs in which set"),
    p(
      "The hardest part of sangeet planning isn't choreography — it's politics. Three rules that have saved every sangeet I've worked:"
    ),
    ...numbered([
      [
        strong("Don't feature everyone in everything. "),
        txt(
          "A 12-person bride-squad number with two reluctant uncles in the front row reads as awkward. Two confident performers + ten visible supporters reads as celebration."
        ),
      ],
      [
        strong("Match the song to the cast, not the other way around. "),
        txt(
          "If your dad refuses to do hip-hop, don't pick a hip-hop song and hope. Pick a song his body actually wants to move to."
        ),
      ],
      [
        strong("Build in a 'cameo' slot per family. "),
        txt(
          "Anyone who joins late or doesn't want a full sequence gets a 15-second cameo in the finale. Everyone feels included; nobody slows the show down."
        ),
      ],
    ]),

    ctaCard({
      heading: "Want me to choreograph yours?",
      body: "I run sangeet choreography across Bangalore and travel-ready destinations. 6-12 week packages, family-friendly drill, reels-aware blocking.",
      ctaLabel: "EXPLORE WEDDINGS",
      ctaHref: "/weddings",
    }),

    h2("Costume + venue logistics — plan for what trips you up"),
    p(
      "The things that go wrong on sangeet night are rarely the choreography. They're the costume and floor and sound issues no-one rehearsed for. Tactical checklist:"
    ),
    ...bullet([
      "Heels: half the brides who insist on heels regret it. Block your performance choreography in the actual footwear at week 3, not week 1.",
      "Dupatta + chunni choreography: every set with flowing fabric needs a dedicated rehearsal pass for catches, drapes and re-throws. Don't wing it.",
      "Floor: marble, wood, carpet — all behave differently under your foot. Rehearse on the venue's surface at least once.",
      "Sound: 60% of sangeet 'disasters' are DJ cue mistakes. Provide your DJ with a printed cue sheet AND share the audio files 48 hours ahead.",
      "Lighting: ask your decorator about uplight for the stage. Underlit stages kill reels footage.",
    ]),

    h2("Rehearsal cadence — week by week"),
    p(
      "Two rehearsals a week from week 5 to week 2. One full dress + cue rehearsal in week 1. That's it. More rehearsals than this and people start losing energy; fewer and the transitions break on the night."
    ),
    h3("Weeks 5-4 — Choreography blocking"),
    p(
      "Learn the steps. Slow, repetitive, technique-focused. Don't run anything at performance speed."
    ),
    h3("Weeks 3-2 — Drill at tempo"),
    p(
      "Run sets at full tempo. Identify the riskiest 8-bar transition in each set; drill it 5×."
    ),
    h3("Week 1 — Stage + dress"),
    p(
      "Full costume + cue-to-cue with DJ. The job here is to find the failure modes (a slipping dupatta, a mistimed beat-drop, a forgotten props) and fix them — not to add new choreography."
    ),

    h2("Reels-first choreography — three tactical shifts"),
    ...numbered([
      [
        strong("Hook in the first 8 counts. "),
        txt(
          "Reels watchers swipe in 1-2 seconds. The strongest visual move belongs at the start, not the climax."
        ),
      ],
      [
        strong("Choreograph for one camera angle. "),
        txt(
          "Pick the angle that captures the full cast clearly + face-forward. Block toward it deliberately."
        ),
      ],
      [
        strong("Designate a phone operator. "),
        txt(
          "Don't rely on the professional videographer's reels cuts. Hire a dedicated phone-shooter whose only job is reels-format vertical 1080×1920 footage."
        ),
      ],
    ]),

    h2("Common mistakes families make"),
    ...bullet([
      "Trying to fit 8 performances into 25 minutes. Cut to 4-5; you'll be remembered for them.",
      "Booking the choreographer for 4 weeks and adding songs in week 3. Lock songs in week 7; protect the timeline.",
      "Skipping the day-of physical warm-up. Cold bodies twist ankles.",
      "Heavy meals 90 minutes before the performance. Sluggish bodies + sangeet bhangra = injury risk.",
      "No backup audio file on a USB. Wi-Fi fails. Carry a backup.",
    ]),

    calloutNote([
      p(
        "Most sangeet 'disasters' I've seen weren't choreography failures — they were costume snags, sound cues, or a cousin freezing on stage because nobody rehearsed the cue. The fix is the day-of rehearsal nobody plans for."
      ),
    ]),

    h2("Day-of logistics — the 6-hour window"),
    p(
      "Three rules that save sangeet nights:"
    ),
    ...numbered([
      [
        strong("Eat light by lunch. "),
        txt(
          "Heavy meals after 1pm if you perform at 7pm = sluggish, slow reflexes. Carbs + protein + water."
        ),
      ],
      [
        strong("Warm up 30 minutes before stage time. "),
        txt(
          "Light cardio, joint mobility, a few rounds of breathwork. Cold bodies are injury bodies."
        ),
      ],
      [
        strong("Designate one calm person to manage the run order. "),
        txt(
          "Not the bride, not the groom, not the parents. A friend with a phone and a printed cue sheet."
        ),
      ],
    ]),

    h2("Budget guide — what's reasonable in 2026"),
    p(
      "Choreography costs depend on cast size, song count, prep duration and travel. Honest ranges:"
    ),
    ...bullet([
      [
        strong("Couple dance only (single song, 4-6 weeks): "),
        txt("₹30,000-₹80,000."),
      ],
      [
        strong("Couple + 2-3 group sets (6-8 weeks, Bangalore-local): "),
        txt("₹80,000-₹2,50,000."),
      ],
      [
        strong("Full sangeet (4-6 sets, family + friends, 8-week prep): "),
        txt("₹2,00,000-₹5,00,000."),
      ],
      [
        strong("Destination wedding (with travel + accommodation): "),
        txt(
          "₹5,00,000-₹12,00,000+ depending on number of pre-trips."
        ),
      ],
    ]),

    ctaCard({
      heading: "Planning sangeet for a wedding this year?",
      body: "Drop a note with date, venue and rough song count — I'll come back with a realistic prep window + package within 24 hours.",
      ctaLabel: "GET IN TOUCH",
      ctaHref: "/#contact",
    }),
  ],
  faq: [
    {
      question: "Can we do sangeet choreography in 4 weeks?",
      answer:
        "Yes for a single couple dance with a small group sequence. Not realistically for a full multi-set family sangeet — the cast politics and rehearsal cadence both need 6-8 weeks minimum. If the wedding is closer than that, scale down to fewer, better sequences rather than trying to cram in everything.",
    },
    {
      question: "What are the best sangeet songs for 2026?",
      answer:
        "Couple-dance favourites this season: Teri Ore, Makhna, Kesariya, Aaj Ki Raat (Stree 2 revival). Bride-squad anthems: Desi Girl, What Jhumka, Naach Punjaban, Kar Gayi Chull. Family cross-generation: Gallan Goodiyan, Raatan Lambiyan, Mauja Hi Mauja. The surprise pick of the season is Sajni from Laapataa Ladies.",
    },
    {
      question: "How much does a sangeet choreographer cost in Bangalore in 2026?",
      answer:
        "A single couple dance with 4-6 weeks of prep is ₹30,000-₹80,000. A couple plus 2-3 group sets across 6-8 weeks usually runs ₹80,000-₹2,50,000. A full sangeet (4-6 sets, family + friends, 8-week prep) is ₹2-5 lakh. Destination weddings with travel add ₹5-12 lakh+ depending on the number of pre-trips.",
    },
    {
      question: "How many rehearsals do we need for a sangeet?",
      answer:
        "Twice a week from week 5 to week 2 of an 8-week plan, plus one full dress + cue rehearsal in week 1. So roughly 8-10 rehearsals total. Anything more and the family starts losing energy by the wedding; anything less and the transitions break on the night.",
    },
    {
      question: "Should sangeet choreography be designed for Instagram reels?",
      answer:
        "Increasingly yes — most 2026 couples want shareable footage. Three tactical shifts: put the strongest visual move in the first 8 counts (reels viewers swipe in 1-2 seconds), choreograph toward one fixed camera angle, and hire a dedicated phone-shooter for vertical 1080×1920 footage separate from your main videographer. None of this requires sacrificing the in-room experience.",
    },
  ],
};
