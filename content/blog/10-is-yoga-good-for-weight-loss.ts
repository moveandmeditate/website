/**
 * Article #10 — Is Yoga Good for Weight Loss?
 * Primary keyword: is yoga good for weight loss.
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
  "yoga side of Move & Meditate",
  "/yoga"
);

const dance = internalLink(
  "dance",
  "/dance"
);

export const post: SeedBlogPost = {
  slug: "is-yoga-good-for-weight-loss",
  title: "Is Yoga Good for Weight Loss? An Honest Practitioner Answer",
  excerpt:
    "Yes — but not the way Instagram thinks. Honest take on what yoga actually does to weight (stress, sleep, eating awareness) versus what it doesn't (burn many calories).",
  category: "yoga",
  tags: ["yoga", "weight-loss", "fitness", "honest-take"],
  publishedAt: "2026-05-28T11:15:00.000Z",
  readingTime: 9,
  relatedPillar: "yoga",
  seo: {
    title:
      "Is Yoga Good for Weight Loss? An Honest Practitioner Answer · Move & Meditate",
    description:
      "A practising teacher's honest take on yoga for weight loss — what the research actually shows, the real mechanisms that work, the styles that move the needle, and a weekly plan.",
  },
  body: [
    richP(
      [
        txt(
          "Short answer: yoga is good for weight loss — but almost never in the way the headline ‘burns X calories' suggests. The mechanisms that actually move the needle are stress regulation, sleep quality, eating behaviour, and the gentle metabolic compounding of a consistent movement practice. Once you understand that, yoga becomes one of the most sustainable weight-management tools available — but you also stop expecting it to do the work of a treadmill. This is the honest version I give people who join the "
        ),
        intro.span,
        txt(
          " specifically hoping to lose weight."
        ),
      ],
      [intro.mark]
    ),

    h2("The one-paragraph honest answer"),
    p(
      "Yoga supports weight loss not by burning many calories during the practice — most classes burn 150-350 kcal/hour, less than a brisk walk — but by lowering chronic stress (which lowers cortisol-driven belly-fat retention), improving sleep (which regulates appetite hormones leptin and ghrelin), increasing eating awareness, and adding consistent movement that compounds over months. People who keep practising for 6+ months reliably lose weight; people who try yoga as a calorie-burn substitute for cardio are disappointed in week three. Pick yoga because it changes how your body relates to food, stress and rest — not because it'll outwork a power-walking habit."
    ),

    h2("Why yoga isn't a calorie-burn machine (and why that's fine)"),
    p(
      "A typical 60-minute yoga class burns:"
    ),
    ...bullet([
      [strong("Hatha (slow, foundational): "), txt("150-250 kcal.")],
      [strong("Vinyasa (flow): "), txt("250-450 kcal.")],
      [strong("Power yoga / Ashtanga: "), txt("400-600 kcal — closer to moderate cardio.")],
      [strong("Restorative / Yin: "), txt("80-150 kcal — minimal.")],
      [strong("Yoga nidra: "), txt("Less than reading a book.")],
    ]),
    p(
      "Compared to running (600-900 kcal/hour) or cycling (500-800), yoga is a low-burn activity by design. If pure calorie burn is your only goal, yoga is the wrong tool. But weight management is rarely about a single hour's calorie burn — it's about the rest of the day."
    ),

    h2("The mechanisms that actually work"),
    h3("Mechanism 1 — Stress + cortisol regulation"),
    p(
      "Chronic stress elevates cortisol. Elevated cortisol increases appetite (particularly for high-calorie foods), promotes abdominal fat storage, and disrupts the insulin response. The most under-discussed reason many adults can't lose weight despite eating less is unrelenting stress."
    ),
    p(
      "Yoga has one of the strongest research bases of any intervention for lowering cortisol. Consistent practice over 8-12 weeks reliably reduces cortisol baseline."
    ),
    h3("Mechanism 2 — Sleep quality"),
    p(
      "Poor sleep increases ghrelin (hunger hormone), decreases leptin (satiety hormone), and reliably increases next-day eating by 200-300 kcal in controlled studies. Yoga — particularly evening + yoga nidra practice — measurably improves sleep quality. Better sleep, fewer cravings, easier weight management."
    ),
    h3("Mechanism 3 — Mindful eating + interoception"),
    p(
      "Yoga's attention practice spills into how you eat. Practitioners who've practised for 6+ months report eating slower, noticing fullness earlier, and reaching for stress-snacks less often. This isn't a calorie equation but it changes the daily intake substantially."
    ),
    h3("Mechanism 4 — NEAT (non-exercise activity thermogenesis)"),
    p(
      "Yoga doesn't burn many calories during class — but consistent practitioners tend to move more across the day generally (better posture, more standing, more walking). This ‘background' movement is often where the calorie deficit actually happens."
    ),
    h3("Mechanism 5 — Compound effect over months"),
    p(
      "Three 60-minute vinyasa classes per week, sustained for a year, adds up. Roughly 50,000-60,000 kcal of extra movement. That's 6-7 kg of body fat if everything else is held constant — and most things tend to improve when you practice."
    ),

    h2("The yoga styles that move the needle"),
    p(
      "Not every style is equally useful for weight management."
    ),
    h3("Power yoga / Vinyasa (most useful)"),
    p(
      "Continuous breath-led flow, sustained heart rate, real strength work. Calorie burn is meaningful, muscle conditioning is real, post-class metabolic effect adds up. The closest yoga gets to ‘cardio.'"
    ),
    h3("Ashtanga (powerful, demanding)"),
    p(
      "Structured, intense, repeated practice. The body conditioning is significant. Not for everyone — the discipline is demanding — but practitioners who sustain it for 6+ months see clear body composition shifts."
    ),
    h3("Hatha + Iyengar (technique-deep)"),
    p(
      "Slower, more alignment-focused. Lower per-class burn, but builds the postural strength and joint integrity that lets you do other higher-burn movement (running, cycling) safely. Long-term, big indirect impact on weight."
    ),
    h3("Yin + Restorative (background tools)"),
    p(
      "Almost no calorie burn. But their stress + sleep effect is significant, and that's the lever most adults actually need. Treat as the recovery layer, not the main act."
    ),

    h2("A realistic weekly plan if weight loss is your goal"),
    ...numbered([
      [
        strong("3 × power vinyasa / power yoga "),
        txt("(60 minutes each) — the calorie + conditioning base."),
      ],
      [
        strong("2 × walks "),
        txt(
          "or light cardio (30-45 minutes each) — the NEAT layer + cardiovascular complement."
        ),
      ],
      [
        strong("1 × restorative + yoga nidra "),
        txt("(60 minutes) — the recovery + sleep layer."),
      ],
      [
        strong("Daily — 10 minutes of breathwork "),
        txt("— the stress + cortisol layer."),
      ],
    ]),
    p(
      "Sustained for 6 months, this is more effective for most adults than gym programs they don't stick to."
    ),

    calloutTip([
      p(
        "If your goal is rapid weight loss for a specific event (wedding, photo shoot), yoga alone is too slow. Add structured cardio + strength training and let yoga be the recovery layer. For 90% of people whose goal is sustainable weight management over months and years, yoga can be the centre of the plan."
      ),
    ]),

    h2("Yoga + walking + diet — the actual stack"),
    p(
      "The combination that quietly works for most people I see lose 5-15 kg over a year:"
    ),
    ...bullet([
      [
        strong("Movement: "),
        txt(
          "3-4 yoga sessions per week + daily 6,000-10,000 steps. That's it; no gym required."
        ),
      ],
      [
        strong("Food: "),
        txt(
          "Cook 80% of meals at home. Protein at every meal. Eat off plates not packets. No ‘diet' label needed."
        ),
      ],
      [
        strong("Sleep: "),
        txt("7-8 hours, same bedtime daily. Yoga practice protects this."),
      ],
      [
        strong("Stress: "),
        txt(
          "Daily breathwork + weekly yoga nidra. Cortisol regulation is the under-discussed half of weight loss."
        ),
      ],
    ]),
    p(
      "None of this is revolutionary. Yoga's contribution is making the whole stack sustainable — by lowering stress, improving sleep, and giving you a practice you actually look forward to."
    ),

    ctaCard({
      heading: "Want help building the right yoga + movement mix?",
      body: "I run yoga classes in Bangalore + online — and can help you design a weekly plan that pairs the right yoga style with cardio and recovery. First call is free.",
      ctaLabel: "EXPLORE YOGA",
      ctaHref: "/yoga",
    }),

    h2("Honest expectations — what timelines look like"),
    ...bullet([
      [strong("Weeks 1-4: "), txt("Mostly nothing on the scale. Sleep + stress improve first.")],
      [
        strong("Months 1-3: "),
        txt(
          "0.5-1.5 kg loss, mostly water + glycogen. Eating habits start shifting subtly."
        ),
      ],
      [strong("Months 3-6: "), txt("Real fat loss begins — typically 2-5 kg.")],
      [
        strong("Months 6-12: "),
        txt(
          "If consistency holds, 5-10 kg loss is realistic. More importantly, body composition shifts (less belly fat specifically, due to lowered cortisol)."
        ),
      ],
      [
        strong("Year 1+: "),
        txt(
          "Weight stabilises at a new lower baseline that's much more maintainable than the post-diet rebounds most people are used to."
        ),
      ],
    ]),

    h2("When yoga is the wrong tool"),
    ...bullet([
      "You need to lose significant weight in 8-12 weeks for medical reasons — work with a doctor + structured exercise programme; yoga can be a complement.",
      "You're an athletic high-performer needing to drop weight for competition — sport-specific conditioning beats yoga for that goal.",
      "You're dealing with a hormonal disorder (PCOS, hypothyroidism). Yoga supports treatment but isn't the primary tool; see an endocrinologist first.",
      "You don't enjoy any yoga style after trying 4-6 weeks. There's no reward for forcing it — pick the movement you'll actually do."
    ]),

    h2("Yoga vs gym for weight loss — direct comparison"),
    h3("Gym wins on:"),
    ...bullet([
      "Faster calorie burn per session.",
      "More targeted muscle building.",
      "Easier to objectively measure progress (weights, reps).",
      "Better for sport-specific athletic prep.",
    ]),
    h3("Yoga wins on:"),
    ...bullet([
      "Lower cortisol over time.",
      "Better sleep quality (most gym work doesn't improve sleep; some hurts it).",
      "Sustainable across decades — yoga at 60 still works.",
      "Carries over into eating awareness + stress regulation.",
      "Cheaper, less equipment, fewer injuries.",
    ]),
    p(
      "Most adults serious about long-term body composition end up with both — gym 2-3 times a week for strength, yoga 2-3 times a week for everything else."
    ),

    calloutNote([
      p(
        "If you've been struggling to lose weight despite ‘doing all the right things,' the missing variable is often chronic stress, poor sleep, or a relationship with food that's exhausting. Yoga addresses all three. That's why it works long-term where willpower-based diets fail."
      ),
    ]),

    ctaCard({
      heading: "Want a personalised plan for your goal?",
      body: "Tell me your timeline, your current movement habit, and what you've tried. I'll come back with a realistic weekly plan — yoga + cardio + sleep + breathwork — and tell you if dance would suit you better.",
      ctaLabel: "GET IN TOUCH",
      ctaHref: "/#contact",
    }),

    richP(
      [
        txt(
          "And if your reason for losing weight is mostly about feeling better in your body, more energetic, more present — consider that the right path might not be yoga or running but "
        ),
        dance.span,
        txt(
          ". Dance burns more than yoga, builds joy in a way the gym rarely does, and the consistency curve is friendlier. Worth a serious thought."
        ),
      ],
      [dance.mark]
    ),
  ],
  faq: [
    {
      question: "How many calories does yoga burn?",
      answer:
        "Depends on style. Hatha (slow): 150-250 kcal per hour. Vinyasa flow: 250-450. Power yoga / Ashtanga: 400-600 — close to moderate cardio. Restorative or yin: 80-150. Yoga nidra burns less than reading. By calorie burn alone, yoga is a low-output activity. But weight management depends much more on what happens the rest of the day (sleep, stress, eating, background movement), and that's where yoga's real impact lives.",
    },
    {
      question: "Yoga vs gym for weight loss — which is better?",
      answer:
        "Gym wins on direct calorie burn, muscle building, and measurable progress. Yoga wins on cortisol regulation, sleep quality, sustainable long-term practice, and carrying over into eating awareness. Most adults serious about long-term body composition end up with both — gym 2-3 times a week for strength, yoga 2-3 times a week for everything else. If you can only pick one, pick the one you'll actually do for 12 months.",
    },
    {
      question: "Which type of yoga is best for weight loss?",
      answer:
        "Power vinyasa and Ashtanga have the highest direct calorie burn and the strongest conditioning effect. Vinyasa flow is the next-best mainstream option. Hatha is slower per-class but builds the postural strength that lets you do other movement (running, cycling) safely. Yin and restorative don't burn many calories but support sleep and stress — both crucial for weight loss. A weekly mix of all three works better than picking one.",
    },
    {
      question: "How quickly will yoga help me lose weight?",
      answer:
        "Realistic timelines: weeks 1-4, mostly sleep and stress improve, scale barely moves. Months 1-3, 0.5-1.5 kg loss (mostly water + glycogen). Months 3-6, real fat loss begins, typically 2-5 kg. Months 6-12, with consistency, 5-10 kg loss is realistic — and importantly, body composition shifts (less belly fat specifically, from lowered cortisol). After year one, weight stabilises at a new baseline that's much more maintainable than post-diet rebounds.",
    },
    {
      question: "Can yoga reduce belly fat specifically?",
      answer:
        "Indirectly, yes — by reducing chronic stress and lowering cortisol, which is the hormone most associated with abdominal fat retention in adults. Direct ‘ab work' from yoga is modest (no amount of asana matches a focused core programme), but the cortisol pathway is real and well-studied. Combine yoga with adequate sleep, moderate cardio and a sustainable eating pattern, and belly fat reduction reliably follows over 3-6 months.",
    },
  ],
};
