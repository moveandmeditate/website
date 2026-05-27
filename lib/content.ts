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
  email: "hello@moveandmeditate.in", // TODO: confirm final inbox
  phone: "", // TODO: optional
  whatsappCommunityUrl: "https://chat.whatsapp.com/", // TODO: real invite link
  whatsappDirectUrl: "https://wa.me/", // TODO: client phone number for direct chat
  city: "Bangalore",
  socials: {
    instagram: "https://instagram.com/moveandmeditate",
    youtube: "https://youtube.com/@moveandmeditate",
    facebook: "https://facebook.com/moveandmeditate",
  },
};

export const NAV_ITEMS = [
  { label: "HOME", href: "#top" },
  { label: "MOVE", href: "#move" },
  { label: "MEDITATE", href: "#meditate" },
  { label: "EVENTS", href: "#events" },
  { label: "ABOUT", href: "#founder" },
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

/**
 * Disjoint pools per side guarantee left + right never show the same image,
 * even mid-transition. Left = movement themes, right = stillness themes.
 */
const slideById = (id: string) => HERO_SLIDES.find((s) => s.id === id)!;

export const HERO_SLIDES_LEFT: HeroSlide[] = [
  slideById("dancer"),
  slideById("sangeet"),
  slideById("corporate"),
];

export const HERO_SLIDES_RIGHT: HeroSlide[] = [
  slideById("meditator"),
  slideById("sound"),
];

export const HERO = {
  word1: "MOVE",
  conjunction: "AND",
  word2: "MEDITATE",
  tagline: "MOVEMENT IS MEDICINE · STILLNESS IS POWER",
  subTagline: "DANCE · YOGA · WEDDINGS · CORPORATE · SOUND",
  primaryCta: { label: "EXPLORE DANCE", href: "#move" },
  secondaryCta: { label: "EXPLORE YOGA", href: "#meditate" },
  watchStory: { label: "WATCH OUR STORY", href: "#" }, // TODO: real video URL
  slidesLeft: HERO_SLIDES_LEFT,
  slidesRight: HERO_SLIDES_RIGHT,
  /** Pool kept for any consumer that wants all hero imagery in one list. */
  slides: HERO_SLIDES,
};

export type EventItem = {
  id: string;
  day: string;
  month: string;
  title: string;
  location: string;
  href: string;
  image: { src: string; alt: string };
};

export const EVENTS: EventItem[] = [
  {
    id: "garba-intensive",
    day: "24",
    month: "MAY",
    title: "Garba Intensive Weekend",
    location: "Bangalore",
    href: "#contact",
    image: { src: "/images/event-garba.webp", alt: "Garba dance celebration" },
  },
  {
    id: "breathwork-sound",
    day: "08",
    month: "JUN",
    title: "Breathwork & Sound Healing Circle",
    location: "Bangalore",
    href: "#contact",
    image: { src: "/images/event-breathwork.webp", alt: "Breathwork circle with sound bowls" },
  },
  {
    id: "couple-dance",
    day: "15",
    month: "JUN",
    title: "Couple Dance Workshop",
    location: "Bangalore",
    href: "#contact",
    image: { src: "/images/event-couple-dance.webp", alt: "Couple practising dance choreography" },
  },
  {
    id: "yoga-nidra",
    day: "29",
    month: "JUN",
    title: "Yoga Nidra Workshop",
    location: "Online",
    href: "#contact",
    image: { src: "/images/event-yoga-nidra.webp", alt: "Yoga Nidra relaxation practice" },
  },
];

export type Brand = {
  name: string;
  // SVG markup or short text label. We render with custom typography rather than fetched logos
  // to keep the page lightweight and trademark-safe until client supplies licensed assets.
  render: "google" | "infosys" | "mckinsey" | "wework" | "puma" | "adobe" | "deloitte";
};

export const TRUSTED_BRANDS: Brand[] = [
  { name: "Google", render: "google" },
  { name: "Infosys", render: "infosys" },
  { name: "McKinsey & Company", render: "mckinsey" },
  { name: "WeWork", render: "wework" },
  { name: "Puma", render: "puma" },
  { name: "Adobe", render: "adobe" },
  { name: "Deloitte", render: "deloitte" },
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
    href: "#contact",
    image: { src: "/images/tile-move.webp", alt: "A dancer expressing through movement" },
  },
  {
    id: "meditate",
    eyebrow: "YOGA",
    title: "MEDITATE",
    tags: ["STILLNESS", "AWARENESS", "TRANSFORMATION"],
    href: "#contact",
    image: { src: "/images/tile-meditate.webp", alt: "A woman in seated meditation" },
  },
  {
    id: "weddings",
    eyebrow: "OCCASIONS",
    title: "WEDDINGS",
    tags: ["YOUR STORY", "BEAUTIFULLY", "CHOREOGRAPHED"],
    href: "#contact",
    image: { src: "/images/tile-weddings.webp", alt: "Couple in a candle-lit sangeet" },
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
    | "screen";
  title: string;
  body: string;
};

export const EXPERIENCES: Experience[] = [
  {
    id: "dance",
    icon: "dance",
    title: "Dance & Folk",
    body: "Classical, contemporary, Bollywood and folk — celebrate culture through movement.",
  },
  {
    id: "yoga",
    icon: "yoga",
    title: "Yoga & Movement",
    body: "Strength, flexibility and balance built through mindful, breath-led practice.",
  },
  {
    id: "breathwork",
    icon: "breath",
    title: "Breathwork",
    body: "Use the breath as a bridge between body and mind to unlock stored tension.",
  },
  {
    id: "sound-healing",
    icon: "bowl",
    title: "Sound Healing",
    body: "Vibrational therapy with singing bowls to realign energy and find harmony.",
  },
  {
    id: "corporate",
    icon: "case",
    title: "Corporate",
    body: "Wellness programs that inspire focus, resilience and team chemistry.",
  },
  {
    id: "online",
    icon: "screen",
    title: "Online Sessions",
    body: "Live and recorded practice — transform anywhere, on your schedule.",
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

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  context: string;
  avatar: { src: string; alt: string };
};

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
  "Dance",
  "Yoga",
  "Wedding Choreography",
  "Corporate Wellness",
  "Online Session",
  "Something Else",
] as const;

export const FOOTER = {
  brandBlurb:
    "A global movement community creating experiences that inspire transformation through movement and stillness.",
  columns: [
    {
      heading: "MOVE",
      links: [
        { label: "Dance Classes", href: "#move" },
        { label: "Folk", href: "#move" },
        { label: "Couple Dance", href: "#move" },
        { label: "Kids", href: "#move" },
      ],
    },
    {
      heading: "MEDITATE",
      links: [
        { label: "Yoga", href: "#meditate" },
        { label: "Breathwork", href: "#meditate" },
        { label: "Sound Healing", href: "#meditate" },
        { label: "Yoga Nidra", href: "#meditate" },
      ],
    },
    {
      heading: "WEDDINGS",
      links: [
        { label: "Sangeet Choreography", href: "#contact" },
        { label: "Couple Dance", href: "#contact" },
        { label: "Family Performances", href: "#contact" },
        { label: "Destination Weddings", href: "#contact" },
      ],
    },
    {
      heading: "COMPANY",
      links: [
        { label: "About", href: "#founder" },
        { label: "Reviews", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ],
};
