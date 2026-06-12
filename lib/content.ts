/**
 * Single source of truth for all marketing copy on the landing page.
 * Items flagged with TODO are placeholders awaiting real client input.
 */

export const SITE = {
  name: "Move & Meditate",
  tagline: "Movement is Medicine. Stillness is Power.",
  description:
    "Move & Meditate is a global movement community led by Amisha — dance, yoga, breathwork, sound healing, weddings, corporate retreats and online sessions designed to help you reconnect with your body, breath and self.",
  url: "https://moveandmeditate.in", // TODO: confirm final domain
  founderName: "Amisha",
  established: 2026,
  keywords: [
    "dance classes Bangalore",
    "yoga classes",
    "movement meditation",
    "breathwork",
    "sound healing",
    "sangeet choreography",
    "wedding choreography India",
    "corporate wellness",
    "online yoga",
  ],
} as const;

export const CONTACT = {
  // Live Workspace inbox on the moveandmeditate.in domain.
  email: "contact@moveandmeditate.in",
  phone: "", // TODO: optional
  whatsappCommunityUrl: "https://chat.whatsapp.com/F9tYK0m8Nwx0y9wBhJd8Am?mode=gi_t",
  whatsappDirectUrl: "https://wa.me/", // TODO: client phone number for direct chat
  city: "Bangalore",
  socials: {
    instagram: "https://www.instagram.com/movemeditate.co?igsh=MWs5NWl2OGxndXhwYg==",
    youtube: "https://youtube.com/@moveandmeditate-q8s?si=Ase5HzDuviM8aMx-",
    facebook: "https://www.facebook.com/profile.php?id=61590710942123",
  },
};

export const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "DANCE", href: "/dance" },
  { label: "YOGA", href: "/yoga" },
  { label: "WEDDINGS", href: "/weddings" },
  { label: "CORPORATE", href: "/corporate" },
  { label: "TESTIMONIALS", href: "/#testimonials" },
] as const;

export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
};

/**
 * Pool of hero slides cycled on an infinite slow crossfade.
 * Both sides of the hero pull from this list — left starts at slide 0,
 * right starts offset so the two sides never show the same image at once.
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "dancer",
    src: "/images/hero-dancer.webp",
    alt: "A dancer mid-leap in a sunlit studio",
  },
  {
    id: "meditator",
    src: "/images/hero-meditator.webp",
    alt: "A woman seated in meditation in soft natural light",
  },
  {
    id: "corporate",
    src: "/images/hero-corporate.webp",
    alt: "A corporate wellness yoga session in a cream studio",
  },
  {
    id: "sangeet",
    src: "/images/hero-sangeet.webp",
    alt: "A couple practising sangeet wedding choreography",
  },
  {
    id: "sound",
    src: "/images/hero-sound.webp",
    alt: "A practitioner playing a bronze singing bowl for sound healing",
  },
];

export const HERO = {
  word1: "MOVE",
  conjunction: "AND",
  word2: "MEDITATE",
  tagline: "MOVEMENT IS MEDICINE · STILLNESS IS POWER",
  subTagline: "DANCE THAT MOVES YOU · YOGA THAT GROUNDS YOU",
  primaryCta: { label: "EXPLORE DANCE", href: "/dance" },
  secondaryCta: { label: "EXPLORE YOGA", href: "/yoga" },
  // Set href to a real YouTube/Vimeo URL to enable the "Watch Our Story" link.
  // Leave as "" or "#" to hide it (it's filtered out at render time in <Hero />).
  watchStory: { label: "WATCH OUR STORY", href: "" }, // TODO: real video URL
  images: {
    left: HERO_SLIDES.find((s) => s.id === "dancer")!,
    right: HERO_SLIDES.find((s) => s.id === "meditator")!,
  },
};

export type PillarSlug = "dance" | "yoga" | "weddings" | "corporate";

/**
 * Renderer-friendly shape for an event card. Events live in Sanity
 * (see `sanity/lib/events.ts`); this type just keeps the contract
 * between the CMS adapter and the React components honest.
 *
 * Note: no static `EVENTS` array exists. Events are time-sensitive —
 * a stale "next workshop" is worse than no workshop. When Sanity has
 * zero upcoming events, the section is hidden entirely rather than
 * falling back to placeholder content.
 */
export type EventItem = {
  id: string;
  day: string;
  month: string;
  title: string;
  location: string;
  href: string;
  image: { src: string; alt: string };
  /** Pillar pages this event should surface on. Empty = home only. */
  pillars: PillarSlug[];
};

export type Brand = {
  name: string;
  /** Optional hand-styled wordmark variant in `BrandMark`. Used for clients
   *  whose distinctive letterforms read better as styled text than as a
   *  raster favicon (most of Amisha's smaller production / academy /
   *  school clients fall here). */
  render?:
    | "kpmg"
    | "pwc"
    | "dxc"
    | "ralphlauren"
    | "divyasree"
    | "mgoindia"
    | "smallworld"
    | "khoyeraaste"
    | "mello"
    | "dmentors"
    | "sukoonqawalli"
    | "vagdevi"
    | "vmsentertainments"
    | "knspartners"
    | "godigit"
    | "colt"
    | "plain";
  /** Local SVG/PNG/WebP under `public/`. Wins over `render` when set —
   *  use it for clients who provide a redistributable press-kit asset. */
  logoSrc?: string;
  /** Optional external website to link the logo to. */
  websiteUrl?: string;
  /** Per-brand height tweak for the rendered logo. Defaults to `h-7` in
   *  `BrandMark`. Useful when one mark visually reads smaller / larger
   *  than the rest at the shared default size (e.g. Lenovo's tight
   *  red-box wordmark wants a bit more height to feel balanced). */
  logoHeightClass?: string;
};

/**
 * Real "Trusted by" list confirmed by Amisha (June 2026).
 *
 * Where the brand publishes a freely redistributable mark (SVG via the
 * Simple Icons CDN / GitHub mirror) we self-host it under
 * `public/images/brands/`. Everything else falls back to a hand-styled
 * wordmark in `BrandMark` until the client supplies an official press-kit
 * asset — at which point an editor can drop the file into the same folder
 * and switch `logoSrc` in Sanity Studio or here.
 */
export const TRUSTED_BRANDS: Brand[] = [
  // Marks fetched from each company's official public source (corporate
  // site or Wikipedia commons) and self-hosted under `public/images/brands/`.
  // Trademarks remain owned by their respective companies — used here for
  // client-attribution display in a "Trusted by" strip.
  { name: "KPMG", logoSrc: "/images/brands/kpmg.svg", render: "kpmg" },
  { name: "PwC", logoSrc: "/images/brands/pwc.svg", render: "pwc" },
  { name: "Lenovo", logoSrc: "/images/brands/lenovo.webp" },
  { name: "Bosch", logoSrc: "/images/brands/bosch.svg" },
  { name: "DXC Technology", logoSrc: "/images/brands/dxc.webp", render: "dxc" },
  { name: "Colt Technologies", logoSrc: "/images/brands/colt.svg", render: "colt" },
  { name: "Go Digit", logoSrc: "/images/brands/godigit.svg", render: "godigit" },
  { name: "K&S Partners", logoSrc: "/images/brands/knspartners.webp", render: "knspartners" },
  { name: "Divyasree", logoSrc: "/images/brands/divyasree.svg", render: "divyasree" },

  // Brands without a redistributable / publicly fetchable mark — stay on
  // the typographic fallback until the client supplies a press-kit asset.
  { name: "Ralph Lauren", render: "ralphlauren" },
  { name: "MGO India Pvt Ltd", render: "mgoindia" },
  { name: "Small World", render: "smallworld" },
  { name: "Khoye Raaste", render: "khoyeraaste" },
  { name: "Mello", render: "mello" },
  { name: "Dmentors Dance Academy", render: "dmentors" },
  { name: "Sukoon Wali Qawwali", render: "sukoonqawalli" },
  { name: "Vagdevi Vilas School", render: "vagdevi" },
  { name: "VMS Entertainments", render: "vmsentertainments" },
];

export type Tile = {
  id: string;
  eyebrow: string;
  title: string;
  tags: string[];
  href: string;
  image: { src: string; alt: string };
};

export const TILES: Tile[] = [
  {
    id: "move",
    eyebrow: "DANCE",
    title: "MOVE",
    tags: ["ENERGY", "EXPRESSION", "COMMUNITY"],
    href: "/dance",
    image: { src: "/images/tile-move.webp", alt: "A dancer expressing through movement" },
  },
  {
    id: "meditate",
    eyebrow: "YOGA",
    title: "MEDITATE",
    tags: ["STILLNESS", "AWARENESS", "TRANSFORMATION"],
    href: "/yoga",
    image: { src: "/images/tile-meditate.webp", alt: "A woman in seated meditation" },
  },
  {
    id: "weddings",
    eyebrow: "OCCASIONS",
    title: "WEDDINGS",
    tags: ["YOUR STORY", "BEAUTIFULLY", "CHOREOGRAPHED"],
    href: "/weddings",
    image: { src: "/images/tile-weddings.webp", alt: "Couple in a candle-lit sangeet" },
  },
  {
    id: "corporate",
    eyebrow: "TEAMS",
    title: "CORPORATE",
    tags: ["FOCUS", "RESILIENCE", "TEAM CHEMISTRY"],
    href: "/corporate",
    image: { src: "/images/tile-corporate.webp", alt: "A corporate wellness session in a sunlit studio" },
  },
  {
    id: "retreats",
    eyebrow: "JOURNEYS",
    title: "RETREATS",
    tags: ["NATURE", "REST", "TRANSFORMATION"],
    href: "/#contact",
    image: { src: "/images/tile-retreats.webp", alt: "A wellness retreat at golden hour in the Himalayan foothills" },
  },
];

export type Experience = {
  id: string;
  icon:
    | "dance"
    | "yoga"
    | "breath"
    | "bowl"
    | "case"
    | "school";
  title: string;
  body: string;
  /** Pillar-page deep link the tile clicks through to. Anchors map to ids
   *  rendered by `OfferingsGrid` (`#offering-<slugified-title>`) so the
   *  scroll lands on the matching offering card. */
  href: string;
};

export const EXPERIENCES: Experience[] = [
  {
    id: "dance",
    icon: "dance",
    title: "Garba & Folk",
    body: "Garba, Dandiya, Bhangra and Bollywood — celebrate culture through movement.",
    href: "/dance#garba-folk",
  },
  {
    id: "yoga",
    icon: "yoga",
    title: "Yoga & Movement",
    body: "Strength, flexibility and balance built through mindful, breath-led practice.",
    href: "/yoga#yoga-movement",
  },
  {
    id: "breathwork",
    icon: "breath",
    title: "Breathwork",
    body: "Use the breath as a bridge between body and mind to unlock stored tension.",
    href: "/yoga#breathwork",
  },
  {
    id: "sound-healing",
    icon: "bowl",
    title: "Sound Healing",
    body: "Vibrational therapy with singing bowls to realign energy and find harmony.",
    href: "/yoga#sound-healing",
  },
  {
    id: "corporate",
    icon: "case",
    title: "Corporate",
    body: "Wellness programs that inspire focus, resilience and team chemistry.",
    href: "/corporate",
  },
  {
    id: "schools",
    icon: "school",
    title: "Schools & Campuses",
    body: "Annual-day choreography, weekly electives and teacher wellness programmes.",
    href: "/#schools",
  },
];

export const FOUNDER = {
  eyebrow: "FOUNDER",
  title: "The journey behind\nthe movement",
  paragraphs: [
    "Move & Meditate was born from a simple belief — that movement can heal, and stillness can transform. Amisha’s journey has carried her from stage to studio, from dance floors to mindful spaces.",
    "Today, the mission is to create experiences that help you reconnect with your body, your breath and your truest self — whether through a single workshop or a lifelong practice.",
  ],
  signature: "Amisha",
  signatureLabel: "FOUNDER · MOVE & MEDITATE",
  portrait: { src: "/images/founder.webp", alt: "Portrait of Amisha, founder of Move & Meditate" },
  stats: [
    { icon: "users", number: "1000+", label: "TRANSFORMED LIVES" },
    { icon: "cal", number: "500+", label: "EVENTS & WORKSHOPS" },
    { icon: "globe", number: "50+", label: "CITIES IMPACTED" },
    { icon: "heart", number: "10+", label: "YEARS OF PRACTICE" },
  ] as const,
};

export const SCHOOL_PROGRAMS = {
  eyebrow: "SCHOOLS & CAMPUSES",
  title: "Bring movement, music and mindfulness into your school.",
  paragraphs: [
    "We design termly programmes for schools, pre-schools and colleges across Bangalore — dance for annual days, yoga and breathwork for student wellbeing, choreography for inter-school competitions, and quiet teacher resets for the staff room.",
    "Every engagement starts with a free planning call with the academic team — so the work fits the calendar, not the other way around.",
  ],
  offerings: [
    "Annual-day choreography + stage direction",
    "Weekly dance, yoga or mindfulness electives",
    "Sports-day and cultural-festival sets",
    "Inter-school competition prep + judging panels",
    "Teacher + staff wellness workshops",
  ],
  image: {
    src: "/images/section-schools.webp",
    alt: "Students rehearsing a folk dance routine in a sunlit school hall",
  },
  cta: { label: "Plan a school programme", href: "/#contact" },
} as const;

export const INVITE_HOST = {
  eyebrow: "INVITE AMISHA",
  title: "Need a judge, host or guest artist?",
  body:
    "Amisha is open to judging dance competitions and showcases, headlining wellness panels and retreats, and joining corporate or community events as a guest artist or speaker. Tell us the date, the room, and what you'd like the audience to walk away with.",
  cta: { label: "Send an invitation", href: "/#contact" },
  // Quick badges underneath the body to make the offer concrete without a
  // separate paragraph. Keep the list short — three is the sweet spot.
  badges: ["Judging panels", "Hosting + emcee", "Guest performance"],
} as const;

export type WhyUsHighlight = {
  id: string;
  icon: "compass" | "globe" | "heart" | "spark";
  label: string;
  body: string;
};

export const WHY_US: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  /** Asymmetric photo collage shown beside the copy. First entry is the
   *  large/lead image; the next two are stacked thumbnails. */
  collage: { src: string; alt: string }[];
  highlights: WhyUsHighlight[];
} = {
  eyebrow: "WHY MOVE & MEDITATE",
  title: "A studio that holds the whole picture.",
  paragraphs: [
    "Move & Meditate is a Bangalore-rooted practice led by Amisha — ten years across dance, yoga, breathwork and sound healing, and the work behind hundreds of weddings, corporate offsites and quiet personal turning points.",
    "We're built on a simple belief: movement is medicine, and stillness is power. Every class, sangeet and team retreat begins with a real conversation — your body, your timeline, the day you're actually having — never a template.",
  ],
  collage: [
    {
      src: "/images/section-yoga-movement.webp",
      alt: "Woman in a flowing yoga shape against tall studio windows",
    },
    {
      src: "/images/section-dance-folk.webp",
      alt: "A folk dance celebration in motion",
    },
    {
      src: "/images/section-sound-healing.webp",
      alt: "A bronze singing bowl with mallet on a cream linen cloth",
    },
  ],
  highlights: [
    {
      id: "founder-led",
      icon: "compass",
      label: "Founder-led",
      body: "Most days, taught by Amisha herself.",
    },
    {
      id: "bangalore-online",
      icon: "globe",
      label: "Bangalore + online",
      body: "In-studio in Bangalore, live online worldwide.",
    },
    {
      id: "tailored",
      icon: "heart",
      label: "Built for your body",
      body: "Private, group, couple, family or team.",
    },
    {
      id: "trust",
      icon: "spark",
      label: "1,000+ lives",
      body: "Beginners + seasoned movers, judgement-free.",
    },
  ],
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  context: string;
  avatar: { src: string; alt: string };
};

export type VideoTestimonial = {
  id: string;
  name: string;
  context: string;
  /** Direct MP4 URL or HLS / DASH manifest hosted on a video CDN. Vertical
   *  9:16 only; anything wider gets letterboxed by the renderer. */
  videoUrl: string;
  poster: { src: string; alt: string };
};

/**
 * Static fallback for the vertical video-testimonials strip. Sanity's
 * `videoTestimonial` doc is the source of truth in production — keep this
 * empty so a site with no published video docs hides the section rather
 * than rendering placeholders. Renderer caps the list at 4 entries.
 */
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "priya",
    quote:
      "This space feels like home. Every session leaves me lighter, stronger and more connected to myself.",
    name: "Priya S.",
    context: "Yoga Member",
    avatar: { src: "/images/avatar-priya.webp", alt: "" },
  },
  {
    id: "ananya-rahul",
    quote:
      "Our sangeet was beyond anything we imagined. Amisha and her team are pure magic — every step, every cue, every smile.",
    name: "Ananya & Rahul",
    context: "Wedding Couple",
    avatar: { src: "/images/avatar-couple.webp", alt: "" },
  },
  {
    id: "rohit",
    quote:
      "The breathwork sessions helped me release years of stress and anxiety. I sleep differently now.",
    name: "Rohit M.",
    context: "Corporate Client",
    avatar: { src: "/images/avatar-rohit.webp", alt: "" },
  },
  {
    id: "neha",
    quote:
      "Professional, passionate and heartfelt in everything they do. It’s the rare studio that treats every body like a story.",
    name: "Neha T.",
    context: "Dance Student",
    avatar: { src: "/images/avatar-neha.webp", alt: "" },
  },
];

export const CONTACT_SECTION = {
  eyebrow: "GET IN TOUCH",
  title: "Let’s create something\nmeaningful.",
  body:
    "Whether you’re booking a private session, planning a sangeet, or just curious about practice — drop a note. Amisha and the team reply within one working day.",
  cta: { label: "JOIN WHATSAPP COMMUNITY", href: CONTACT.whatsappCommunityUrl },
  emailLabel: "Email",
  background: { src: "/images/contact-bg.webp", alt: "" },
};

export const INTERESTS = [
  "Dance Classes",
  "Yoga Classes",
  "Breathwork & Sound Healing",
  "Wedding / Sangeet Choreography",
  "Couple Dance",
  "Corporate Wellness",
  "Online Sessions",
  "Retreats",
  "Something Else",
] as const;

export const FOOTER = {
  brandBlurb:
    "A practice + performance studio led by Amisha. Dance, yoga, breathwork, sound healing and choreography — built around your body, your story, your timeline.",
  /** Big tagline strip at the very top of the footer. */
  ribbon: {
    wordmark: "MOVE & MEDITATE",
    tagline: "Movement is medicine. Stillness is power.",
  },
  /** Studio contact card — sits as a row above the column grid. */
  studio: {
    heading: "STUDIO",
    address: "Bangalore, Karnataka · India",
    hours: "Mon - Sat · 7am - 9pm IST",
    onlineNote: "Online sessions available worldwide",
  },
  columns: [
    {
      heading: "PRACTICE",
      links: [
        { label: "Dance", href: "/dance" },
        { label: "Group Classes", href: "/dance#offerings" },
        { label: "Private Lessons", href: "/dance#offerings" },
        { label: "Yoga", href: "/yoga" },
        { label: "Breathwork", href: "/yoga#offerings" },
        { label: "Sound Healing", href: "/yoga#offerings" },
        { label: "Yoga Nidra", href: "/yoga#offerings" },
      ],
    },
    {
      heading: "OCCASIONS",
      links: [
        { label: "Weddings", href: "/weddings" },
        { label: "Sangeet Choreography", href: "/weddings#offerings" },
        { label: "Couple Dance", href: "/weddings#offerings" },
        { label: "Family Performances", href: "/weddings#offerings" },
        { label: "Destination Weddings", href: "/weddings#offerings" },
        { label: "Corporate Wellness", href: "/corporate" },
        { label: "Team Workshops", href: "/corporate#offerings" },
        { label: "Retreats", href: "/#contact" },
      ],
    },
    {
      heading: "COMPANY",
      links: [
        { label: "About Amisha", href: "/#founder" },
        { label: "Upcoming Events", href: "/#events" },
        { label: "Testimonials", href: "/#testimonials" },
        { label: "Blog", href: "/blog" },
        { label: "Dance FAQ", href: "/dance#pillar-faq-heading" },
        { label: "Yoga FAQ", href: "/yoga#pillar-faq-heading" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      heading: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Data Concerns", href: "/privacy-policy#data-concerns" },
        { label: "Sitemap", href: "/sitemap.xml" },
      ],
    },
  ],
};

// =========================================================================
// PILLAR PAGES  (/dance · /yoga · /weddings · /corporate)
// =========================================================================

export type Offering = {
  title: string;
  blurb: string;
  ctaLabel?: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export type Faq = {
  question: string;
  answer: string;
};

/** Deep-link section embedded inside a pillar page. Each entry surfaces as
 *  a full-bleed half-and-half strip with an image and supporting copy.
 *  Targeted by anchor (`/dance#dance-folk`, `/yoga#breathwork`, etc.) from
 *  the home Experiences tiles so a single click takes the visitor straight
 *  to the matching deep dive. */
export type PillarDeepSection = {
  /** URL fragment — must be unique within the pillar page. */
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  image: { src: string; alt: string };
  /** Optional layout side for the image. Defaults to alternating per slot. */
  imageSide?: "left" | "right";
  cta?: { label: string; href: string };
};

export type Pillar = {
  slug: PillarSlug;
  nav: string;
  eyebrow: string;
  title: string;
  /** One-line italic line under the hero title. */
  tagline: string;
  /** Long description for `<meta name=description>` + JSON-LD `description`. */
  seoDescription: string;
  heroImage: { src: string; alt: string };
  intro: {
    title: string;
    paragraphs: string[];
    bullets: string[];
  };
  /** Optional deep-link sections targeted from the home Experiences tiles.
   *  Rendered between the intro and the offerings grid in DOM order. */
  deepSections?: PillarDeepSection[];
  offerings: Offering[];
  /** 3-step customer journey shown as a horizontal strip. */
  howItWorks: { title: string; steps: ProcessStep[] };
  /** 3–5 images shown in the gallery strip. */
  gallery: { src: string; alt: string }[];
  testimonialId: Testimonial["id"];
  /** SEO-optimised Q&A pairs. Drives the FAQ accordion + FAQPage JSON-LD. */
  faq: Faq[];
  cta: {
    title: string;
    subtitle: string;
  };
  /** Optional Sanskrit verse rendered as a quiet contemplative band. */
  quote?: {
    /** Devanagari script. */
    sanskrit: string;
    /** IAST transliteration. */
    transliteration: string;
    translation: string;
    /** Attribution, e.g. "Patañjali · Yoga Sūtra 1.2". */
    source: string;
  };
};

export const PILLARS: Record<PillarSlug, Pillar> = {
  dance: {
    slug: "dance",
    nav: "DANCE",
    eyebrow: "MOVEMENT",
    title: "Dance",
    tagline: "Energy. Expression. Community.",
    seoDescription:
      "Bangalore dance classes with Amisha — classical, contemporary, Bollywood and folk, plus sangeet and couple choreography. Private + group sessions, online or in-studio.",
    heroImage: {
      src: "/images/hero-dancer.webp",
      alt: "A dancer mid-leap in a sunlit studio",
    },
    intro: {
      title: "Movement that feels like coming home.",
      paragraphs: [
        "Dance with Move & Meditate is a celebration of body, story and rhythm. Whether you're stepping into your first class or warming up for a stage, you'll be guided by Amisha — a practitioner who treats every dancer like the lead of their own story.",
        "We hold space for joy, expression and the kind of community that lingers long after the music stops.",
      ],
      bullets: [
        "Classical, contemporary, Bollywood + folk in one programme",
        "Private 1:1 and small-group formats",
        "Performance prep for weddings, showcases and corporate events",
        "Online sessions for dancers outside Bangalore",
      ],
    },
    deepSections: [
      {
        id: "garba-folk",
        eyebrow: "GARBA + FOLK",
        title: "Garba & Folk — every body has a rhythm.",
        paragraphs: [
          "Garba leads — circle dance, sticks, claps, big-room energy — and we layer in the folk vocabulary it belongs to: Dandiya, Bhangra, Lavani, Kalbelia. Forms taught the way the communities danced them, not the way an aerobics class would package them.",
          "Each class starts with a warm-up that respects the body that walked in and ends with a routine you'll catch yourself humming in the elevator.",
        ],
        bullets: [
          "Garba + Dandiya sets ready for Navratri nights and sangeets",
          "Folk crossovers — Bhangra hook steps, Lavani footwork, Kalbelia spins",
          "Bollywood + film choreography stitched onto the folk base",
          "Classical roots (Kathak / Bharatanatyam) for posture, rhythm and abhinaya",
        ],
        image: {
          src: "/images/section-dance-folk.webp",
          alt: "A garba and folk dance celebration in motion",
        },
        cta: { label: "See class formats", href: "/dance#offerings" },
      },
      {
        id: "couple-dance",
        eyebrow: "COUPLE DANCE",
        title: "Couple Dance — choreographed for the way you actually move together.",
        paragraphs: [
          "First dance, sangeet centrepiece, anniversary surprise, or just because — we choreograph around the couple in the room, not a template. Song, story and comfort level decide the steps before the steps decide anything.",
          "Most couples wrap a polished routine in 6–8 sessions. We rehearse in studio in Bangalore, on-location at your venue, or hybrid with video reviews between in-person calls.",
        ],
        bullets: [
          "Sangeet + first-dance choreography, fully bespoke to your song",
          "Anniversary, milestone and surprise reveals",
          "On-location rehearsals + run-throughs for destination events",
          "Filming + framing guidance so the highlight reel actually catches it",
        ],
        image: {
          src: "/images/section-couple-dance.webp",
          alt: "A couple rehearsing a contemporary routine in a sunlit studio",
        },
        cta: { label: "Plan our first session", href: "/#contact" },
      },
      {
        id: "kids-pro",
        eyebrow: "KIDS PRO TRACK",
        title: "Kids Pro Track — practice with progression, not just play.",
        paragraphs: [
          "A serious-but-joyful programme for young dancers who want more than a weekly class. Structured curriculum across classical, Bollywood and folk; monthly assessments by Amisha and visiting faculty; certificates that mean something at the next audition.",
          "Age groups are kept small (5–9, 10–13, 14–17) so peers stay close in skill and rehearsal energy stays focused.",
        ],
        bullets: [
          "Monthly skill assessments with a written report and footage",
          "Term-end certification tied to a public showcase performance",
          "Inter-school, state and national competition preparation",
          "Parent debriefs each term — strengths, focus areas, what's next",
        ],
        image: {
          src: "/images/section-kids-pro.webp",
          alt: "A small group of young dancers in a focused rehearsal",
        },
        cta: { label: "Book an audition slot", href: "/#contact" },
      },
      {
        id: "ladies-only",
        eyebrow: "LADIES ONLY",
        title: "Ladies-Only Classes — a room that's yours.",
        paragraphs: [
          "Closed-door studio sessions for women who want to move freely — beginners welcome, no audience, no comparison. Bollywood for the joy, fusion for the fitness, folk for the roots, breath-led cool-downs to close.",
          "Friday evening and Sunday morning slots, with private one-off sessions for friend groups, bachelorettes and family-week celebrations.",
        ],
        bullets: [
          "Closed studio, women-only floor and changing space",
          "Beginner-friendly format — zero dance background needed",
          "Bollywood, dance fitness and folk fusion across the term",
          "Private group bookings for bachelorettes + friend circles",
        ],
        image: {
          src: "/images/section-ladies-only.webp",
          alt: "A group of women mid-routine in a sunlit dance studio",
        },
        cta: { label: "Reserve a class", href: "/#contact" },
      },
    ],
    offerings: [
      {
        title: "Private Lessons",
        blurb:
          "1:1 sessions tailored to your goal — first dance, audition prep, fitness through movement, or just play.",
      },
      {
        title: "Group Classes",
        blurb:
          "Weekly small-group classes across Bollywood, contemporary and folk. Begin at any level.",
      },
      {
        title: "Wedding Choreography",
        blurb:
          "Sangeet sets, couple dances, family performances and full choreography schedules.",
      },
      {
        title: "Concert Choreography",
        blurb:
          "Stage and concert choreography for performers, music videos, college fests and touring shows.",
      },
      {
        title: "Online Drop-Ins",
        blurb:
          "Live online sessions on weekends. Record + replay so you never miss a beat.",
      },
    ],
    gallery: [
      { src: "/images/tile-move.webp", alt: "Expressive contemporary dancer in studio" },
      { src: "/images/event-garba.webp", alt: "Garba celebration in motion" },
      { src: "/images/event-couple-dance.webp", alt: "Couple rehearsing choreography" },
      { src: "/images/hero-dancer.webp", alt: "Sunlit dance studio with arched windows" },
    ],
    testimonialId: "neha",
    howItWorks: {
      title: "How a class starts with us.",
      steps: [
        {
          number: "01",
          title: "Tell us your goal",
          body: "Drop a note with what you're hoping to feel after class — stronger, freer, performance-ready, or just curious. No experience required.",
        },
        {
          number: "02",
          title: "Free discovery call",
          body: "A 20-minute call with Amisha to match you to the right format — private, group, online, or wedding choreography — and answer every question.",
        },
        {
          number: "03",
          title: "Begin moving",
          body: "Step into your first session within the week. Class packs and ongoing schedules are tailored to your pace and the city you're in.",
        },
      ],
    },
    faq: [
      {
        question: "Do I need prior dance experience to join classes?",
        answer:
          "No. Every group has space for absolute beginners, and private classes are built around exactly where you are. Most students discover they can do more than they expected within the first three sessions.",
      },
      {
        question: "Where are dance classes held in Bangalore?",
        answer:
          "We hold studio classes in Bangalore (location shared on confirmation, close to central neighbourhoods) and travel to a venue of your choice for private and wedding work. We also run live online sessions for dancers outside the city.",
      },
      {
        question: "How do private 1:1 dance lessons differ from group classes?",
        answer:
          "Private lessons are fully tailored — your songs, your style, your timeline — and ideal for performance prep, weddings or fast progress. Group classes are weekly, energising and a great way to find your community.",
      },
      {
        question: "Can you choreograph for our wedding sangeet?",
        answer:
          "Yes — sangeet, couple dance, mehendi sets and full multi-day performances. Couples typically book us 6–10 weeks before the wedding. See the Weddings page for our full sangeet process.",
      },
    ],
    cta: {
      title: "Move with us.",
      subtitle:
        "Book a discovery call and we'll help you pick the right format — private, group or wedding-focused.",
    },
  },

  yoga: {
    slug: "yoga",
    nav: "YOGA",
    eyebrow: "STILLNESS",
    title: "Yoga",
    tagline: "Awareness. Breath. Transformation.",
    seoDescription:
      "Yoga with Amisha — vinyasa, restorative, yoga nidra, breathwork and sound healing. Studio classes in Bangalore + live online practice for everyone.",
    heroImage: {
      src: "/images/hero-meditator.webp",
      alt: "A woman seated in meditation in soft natural light",
    },
    intro: {
      title: "Practice that meets you where you are.",
      paragraphs: [
        "Yoga with Move & Meditate is grounded, breath-led and unhurried. We blend a classical foundation with thoughtful pacing so the practice feels supportive on every kind of day — from the heaviest to the lightest.",
        "Beyond the mat, the work continues through breathwork, sound healing and yoga nidra — all designed to release what the day pulls tight.",
      ],
      bullets: [
        "Vinyasa, hatha + restorative classes",
        "Breathwork and sound healing circles",
        "Guided yoga nidra deep-rest sessions",
        "Available on the mat in Bangalore or online from anywhere",
      ],
    },
    deepSections: [
      {
        id: "yoga-movement",
        eyebrow: "ASANA",
        title: "Yoga & Movement — a practice for every kind of day.",
        paragraphs: [
          "We weave vinyasa, hatha and restorative shapes around how your nervous system is actually showing up. Some days you'll flow, some days you'll fold — both are real practice.",
          "Foundations stay classical: alignment first, breath always, no choreography for its own sake.",
        ],
        bullets: [
          "Vinyasa flows for energy, focus and circulation",
          "Hatha holds for strength, alignment and patience",
          "Restorative + Yin to release what the week pulled tight",
        ],
        image: {
          src: "/images/section-yoga-movement.webp",
          alt: "Woman in a flowing yoga shape against tall studio windows",
        },
        cta: { label: "See class formats", href: "/yoga#offerings" },
      },
      {
        id: "breathwork",
        eyebrow: "PRANAYAMA",
        title: "Breathwork — the body's fastest reset.",
        paragraphs: [
          "A guided breathwork circle moves stuck energy in a way no podcast can. We work with classical pranayama (Nāḍī Śodhana, Bhrāmarī, Kapālabhāti) and modern conscious-connected breathing — chosen for the room, not a recipe.",
          "Expect to leave lighter, clearer and a little surprised by what the breath made room for.",
        ],
        bullets: [
          "Monthly in-studio circles — 60 to 75 minutes, props provided",
          "Private 1:1 breathwork for stress, sleep and creative blocks",
          "Online sessions for distributed clients (recording inside 24 h)",
        ],
        image: {
          src: "/images/section-breathwork.webp",
          alt: "Breathwork circle in session",
        },
        cta: { label: "Reserve a circle", href: "/#contact" },
      },
      {
        id: "sound-healing",
        eyebrow: "VIBRATION",
        title: "Sound Healing — bronze bowls, full nervous system reset.",
        paragraphs: [
          "Bronze singing bowls, gongs and tuned chimes layered into a guided journey. You lie down, we tune the room, and the body does the rest — a measurable drop in heart rate and a quiet head most people forgot was possible.",
          "Held monthly in the Bangalore studio and as private bookings for couples, families and small teams.",
        ],
        bullets: [
          "Group sound baths — 60-min full-body resonance, 8–14 mats per session",
          "Private + couple sessions for sleep, anxiety and major-life transitions",
          "Corporate add-on for offsites and end-of-quarter resets",
        ],
        image: {
          src: "/images/section-sound-healing.webp",
          alt: "A bronze singing bowl with mallet on a cream linen cloth",
        },
        cta: { label: "Book a session", href: "/#contact" },
      },
    ],
    offerings: [
      {
        title: "Yoga Classes for Females",
        blurb:
          "Closed-door studio sessions for women — asana, breath and a room with no audience. Beginner-friendly, no experience needed.",
      },
      {
        title: "Private 1:1 Sessions",
        blurb:
          "Built around your goals — recovery, flexibility, stress, focus, or returning after a break.",
      },
      {
        title: "Pranayama + Breathwork",
        blurb:
          "Classical Nāḍī Śodhana, Bhrāmarī and Kapālabhāti circles, plus modern conscious-connected breathing for stuck energy.",
      },
      {
        title: "Sound Healing",
        blurb:
          "Bronze bowls, gongs and tuned chimes layered into a guided journey. Group sound baths held monthly in the Bangalore studio.",
      },
      {
        title: "Trataka + Yog Nidra",
        blurb:
          "Candle-flame gazing for steady attention, followed by a 45-minute deep-rest yoga nidra. Live online with recording inside 24 hours.",
      },
      {
        title: "Full Moon Meditation",
        blurb:
          "Monthly evening circles to mark the lunar cycle. Breath, intention, mantra and silence — held together.",
      },
      {
        title: "Mandala + Art Meditation",
        blurb:
          "Dot mandala and intuitive art treated as moving meditation. Materials provided, zero artistic background required.",
      },
      {
        title: "Group Yoga Sessions",
        blurb:
          "Weekly small-group practice. Vinyasa for energy, hatha for grounding, restorative for repair.",
      },
    ],
    gallery: [
      { src: "/images/tile-meditate.webp", alt: "Seated meditation in a cream studio" },
      { src: "/images/hero-sound.webp", alt: "Sound healing with a bronze singing bowl" },
      { src: "/images/event-breathwork.webp", alt: "Breathwork circle in session" },
      { src: "/images/event-yoga-nidra.webp", alt: "Participants in yoga nidra rest" },
    ],
    testimonialId: "priya",
    howItWorks: {
      title: "How a practice begins.",
      steps: [
        {
          number: "01",
          title: "Tell us where you are",
          body: "Send a short note — new to yoga, returning after a break, working through an injury, looking for stress relief. We design from there.",
        },
        {
          number: "02",
          title: "Free discovery call",
          body: "A 20-minute call to map a practice to your body and your week. We'll cover format, frequency, and which adjacent practices (breathwork, sound, nidra) might serve you.",
        },
        {
          number: "03",
          title: "Roll out the mat",
          body: "Begin in the studio in Bangalore or live online from anywhere. First session inside 7 days of your call.",
        },
      ],
    },
    faq: [
      {
        question: "What kind of yoga is taught at Move & Meditate?",
        answer:
          "A grounded, breath-led blend of vinyasa, hatha and restorative yoga, layered with breathwork, sound healing and yoga nidra. Style choice is always matched to your goal — energy, recovery, or stillness.",
      },
      {
        question: "Is yoga at Move & Meditate suitable for beginners?",
        answer:
          "Yes. Every class includes modifications for newer practitioners and we never push anyone past a safe range. Many of our members started here without a single previous class.",
      },
      {
        question: "Can I join yoga classes online from outside Bangalore?",
        answer:
          "Yes — group classes, breathwork, sound and yoga nidra all run live online on weekends. Recordings are available for 24–72 hours so you can practise on your time-zone.",
      },
      {
        question: "What's the difference between yoga, breathwork and yoga nidra?",
        answer:
          "Yoga moves the body and trains attention. Breathwork uses guided breathing to regulate the nervous system. Yoga nidra is a deep-rest, lying-down practice — closer to meditation. We weave all three depending on what you need.",
      },
    ],
    cta: {
      title: "Find your practice.",
      subtitle:
        "Tell us how you'd like to feel after a class. We'll point you to the right format.",
    },
  },

  weddings: {
    slug: "weddings",
    nav: "WEDDINGS",
    eyebrow: "OCCASIONS",
    title: "Weddings",
    tagline: "Your story. Beautifully choreographed.",
    seoDescription:
      "Wedding choreography with Amisha — sangeet sets, couple dances, family performances and destination weddings. We design the moments that become the photos.",
    heroImage: {
      src: "/images/hero-sangeet.webp",
      alt: "An Indian couple practising sangeet wedding choreography",
    },
    intro: {
      title: "Choreography that tells your story — not someone else's.",
      paragraphs: [
        "We design wedding performances around the couple's personality, the family's energy and the room you're dancing into. From a quiet couple-dance to a full sangeet with multiple sets, every step is rehearsed until it feels effortless.",
        "We work in Bangalore and travel for destination weddings across India and beyond.",
      ],
      bullets: [
        "Couple dance + first-dance choreography",
        "Sangeet sets with siblings, friends and family",
        "Mehendi + haldi entertainment design",
        "Destination weddings — full travel + rehearsal support",
      ],
    },
    offerings: [
      {
        title: "Couple Dance",
        blurb:
          "A single, signature dance designed around your song, your style and your love story.",
      },
      {
        title: "Sangeet Choreography",
        blurb:
          "Full sangeet design — multiple sets, transitions, family + friends, rehearsal calendar.",
      },
      {
        title: "Family Performances",
        blurb:
          "Stage moments for parents, siblings and the friend group who promised to dance.",
      },
      {
        title: "Destination Weddings",
        blurb:
          "We travel. Pre-wedding rehearsals + on-site polish included in the package.",
      },
    ],
    gallery: [
      { src: "/images/tile-weddings.webp", alt: "Couple in a candle-lit sangeet" },
      { src: "/images/hero-sangeet.webp", alt: "Couple rehearsing sangeet choreography" },
      { src: "/images/event-couple-dance.webp", alt: "Couple dance workshop" },
      { src: "/images/tile-move.webp", alt: "Contemporary dancer in a sunlit room" },
    ],
    testimonialId: "ananya-rahul",
    howItWorks: {
      title: "From first call to first dance.",
      steps: [
        {
          number: "01",
          title: "Discovery call",
          body: "We talk songs, timeline, family + friend group size, venue, and the moments you want people to remember. Free, no pressure, no commitment.",
        },
        {
          number: "02",
          title: "Design + rehearsal calendar",
          body: "We choreograph each set, send video references, and lock a rehearsal schedule that respects everyone's calendars — including the parents.",
        },
        {
          number: "03",
          title: "Perform with confidence",
          body: "On the day, we're with you for a final polish and run-through. You step on stage knowing every cue is in your body.",
        },
      ],
    },
    faq: [
      {
        question: "How early should we book wedding choreography?",
        answer:
          "Most couples book us 6–10 weeks before the wedding. Bigger sangeet sets with multiple family groups benefit from 10–12 weeks. We do take rush bookings — drop us a note even if your wedding is closer.",
      },
      {
        question: "Do you travel for destination weddings?",
        answer:
          "Yes. We design and rehearse remotely (in-person + video), then travel for the final on-site polish and the performance itself. Travel + stay are billed at cost; everything else is in the package.",
      },
      {
        question: "How many rehearsals are usually needed for a sangeet?",
        answer:
          "A couple dance typically takes 6–8 sessions. A full sangeet with family + friend sets averages 12–18 rehearsals across 6–8 weeks. Schedules flex around your family's availability.",
      },
      {
        question: "Can you choreograph for family members of all ages and fitness levels?",
        answer:
          "Yes — that's our specialty. Steps are adapted on the spot so grandparents, kids and your unfit-but-enthusiastic cousins all look great on stage. The goal is celebration, never comparison.",
      },
    ],
    cta: {
      title: "Let's design your sangeet.",
      subtitle:
        "Book a discovery call. We'll talk songs, timeline, family vibe — and walk you through how we'd choreograph it.",
    },
  },

  corporate: {
    slug: "corporate",
    nav: "CORPORATE",
    eyebrow: "TEAMS",
    title: "Corporate",
    tagline: "Focus. Resilience. Team chemistry.",
    seoDescription:
      "Corporate wellness programmes with Amisha — yoga, dance, breathwork and sound healing for teams, offsites and retreats. Bangalore + India-wide.",
    heroImage: {
      src: "/images/hero-corporate.webp",
      alt: "A corporate wellness yoga session in a cream studio",
    },
    intro: {
      title: "Wellness that actually shows up at work.",
      paragraphs: [
        "We design corporate programmes that go beyond the one-off lunchtime class. Movement, breath and stillness layered together so teams arrive at meetings more focused, more present and a little more human with each other.",
        "Formats span weekly on-site sessions, multi-day offsites, retreats and on-demand digital practice.",
      ],
      bullets: [
        "Weekly on-site yoga + movement sessions",
        "Half-day team workshops (breathwork, sound healing, dance)",
        "Multi-day retreats + offsites with full programme design",
        "On-demand digital sessions for distributed teams",
      ],
    },
    offerings: [
      {
        title: "Weekly Sessions",
        blurb:
          "Recurring on-site yoga, movement or breathwork. We come to your office.",
      },
      {
        title: "Team Workshops",
        blurb:
          "Half-day formats — breath, sound, dance — built around team-specific goals.",
      },
      {
        title: "Offsites + Retreats",
        blurb:
          "Multi-day programmes for leadership groups + full teams. Bangalore, Goa, the foothills — we design it.",
      },
      {
        title: "Digital Wellness",
        blurb:
          "Live + recorded library for distributed teams. Monthly themes, measurable engagement.",
      },
    ],
    gallery: [
      { src: "/images/tile-corporate.webp", alt: "Group corporate wellness session" },
      { src: "/images/hero-corporate.webp", alt: "Sunlit corporate yoga studio" },
      { src: "/images/event-breathwork.webp", alt: "Breathwork circle in a studio" },
      { src: "/images/event-yoga-nidra.webp", alt: "Participants resting in yoga nidra" },
    ],
    testimonialId: "rohit",
    howItWorks: {
      title: "How we partner with your team.",
      steps: [
        {
          number: "01",
          title: "Listening call",
          body: "We start with a 30-minute call to understand your team — energy levels, hybrid mix, calendar pressure, and the outcomes you're hoping for.",
        },
        {
          number: "02",
          title: "Programme design",
          body: "We propose a format (weekly on-site, monthly workshop, offsite, or hybrid library) and a 4-, 8- or 12-week arc with measurable engagement signals.",
        },
        {
          number: "03",
          title: "Run + review",
          body: "We deliver every session and review impact with you every 4 weeks. The programme flexes as your team's needs evolve.",
        },
      ],
    },
    faq: [
      {
        question: "What corporate wellness formats do you offer?",
        answer:
          "Weekly on-site sessions, half-day team workshops, multi-day offsites + retreats, and on-demand digital practice for distributed teams. Most clients combine 2–3 formats across a quarter.",
      },
      {
        question: "How does a corporate retreat with Move & Meditate work?",
        answer:
          "We design the entire programme — movement, breathwork, sound, yoga nidra and reflection — around your team's theme. Typical retreats run 2–4 days, in Bangalore or destinations like Goa and the Himalayan foothills.",
      },
      {
        question: "Can you run sessions for distributed teams?",
        answer:
          "Yes. We host live sessions on Zoom or Meet, and maintain a curated library of recorded practices your team can drop into. Engagement reports are shared with HR / People Ops monthly.",
      },
      {
        question: "How is impact measured for corporate wellness programs?",
        answer:
          "We track attendance, retention across sessions, and a short post-session pulse (3 questions). For longer engagements we run a baseline + 12-week wellbeing survey and share the comparison with you.",
      },
    ],
    cta: {
      title: "Bring wellness to your team.",
      subtitle:
        "Book a discovery call. We'll listen to your team's rhythm and design a programme that fits.",
    },
  },
};
