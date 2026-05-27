import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PillarHero } from "@/components/pillar/pillar-hero";
import { PillarIntro } from "@/components/pillar/pillar-intro";
import { OfferingsGrid } from "@/components/pillar/offerings-grid";
import { PillarHowItWorks } from "@/components/pillar/pillar-how-it-works";
import { GalleryStrip } from "@/components/pillar/gallery-strip";
import { PillarTestimonial } from "@/components/pillar/pillar-testimonial";
import { PillarEvents } from "@/components/pillar/pillar-events";
import { PillarFaq } from "@/components/pillar/pillar-faq";
import { PillarCta } from "@/components/pillar/pillar-cta";
import type { Pillar } from "@/lib/content";
import { getEffectiveContact } from "@/sanity/lib/site-data";

/**
 * Shared composition for every pillar route. Each route file (e.g.
 * `app/(marketing)/dance/page.tsx`) does nothing but pass its Pillar entry.
 *
 * The Events section is only rendered for Dance + Yoga — they're the
 * disciplines that run public workshops. Weddings + Corporate are private
 * engagements, so an "upcoming events" surface doesn't apply there.
 *
 * Server-fetches the effective contact once and threads it through the
 * three components that need it (header CTA, footer details, pillar CTA
 * book/whatsapp buttons). That's three calls vs one — but the upstream
 * fetch is request-deduped + tag-cached so the second/third call is a
 * cheap memo hit, not a Sanity round-trip.
 */
export async function PillarPage({ pillar }: { pillar: Pillar }) {
  const showEvents = pillar.slug === "dance" || pillar.slug === "yoga";
  const contact = await getEffectiveContact();

  return (
    <>
      <SiteHeader contact={contact} />
      <main id="main">
        <PillarHero pillar={pillar} />
        <PillarIntro pillar={pillar} />
        <OfferingsGrid pillar={pillar} />
        <PillarHowItWorks pillar={pillar} />
        <GalleryStrip pillar={pillar} />
        <PillarTestimonial pillar={pillar} />
        {showEvents && <PillarEvents pillar={pillar.slug} />}
        <PillarFaq pillar={pillar} />
        <PillarCta pillar={pillar} contact={contact} />
      </main>
      <SiteFooter contact={contact} />
    </>
  );
}
