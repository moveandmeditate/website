import { CONTACT, EVENTS, FOUNDER, SITE } from "@/lib/content";

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}#org`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.svg`,
        founder: { "@id": `${SITE.url}#founder` },
        sameAs: [
          CONTACT.socials.instagram,
          CONTACT.socials.youtube,
          CONTACT.socials.facebook,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: CONTACT.email,
            contactType: "customer support",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}#founder`,
        name: SITE.founderName,
        jobTitle: "Founder, Dance & Yoga Practitioner",
        worksFor: { "@id": `${SITE.url}#org` },
        description: FOUNDER.paragraphs.join(" "),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}#site`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}#org` },
        inLanguage: "en-IN",
      },
      ...EVENTS.map((evt) => ({
        "@type": "Event",
        name: evt.title,
        startDate: undefined, // TODO: real ISO dates once client confirms event calendar
        location: {
          "@type": "Place",
          name: evt.location,
        },
        organizer: { "@id": `${SITE.url}#org` },
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode:
          evt.location.toLowerCase() === "online"
            ? "https://schema.org/OnlineEventAttendanceMode"
            : "https://schema.org/OfflineEventAttendanceMode",
      })),
    ],
  };
}
