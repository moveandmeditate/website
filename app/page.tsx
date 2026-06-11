import { SiteHeader } from "@/components/site-header";
import { SiteFooterServer } from "@/components/site-footer-server";
import { Hero } from "@/components/sections/hero";
import { UpcomingEvents } from "@/components/sections/upcoming-events";
import { TrustedBy } from "@/components/sections/trusted-by";
import { CategoryTiles } from "@/components/sections/category-tiles";
import { Experiences } from "@/components/sections/experiences";
import { Founder } from "@/components/sections/founder";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { buildJsonLd, jsonLdHtml } from "@/lib/seo";
import { getEffectiveContact } from "@/sanity/lib/site-data";

export default async function HomePage() {
  const contact = await getEffectiveContact();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(buildJsonLd()) }}
      />
      <SiteHeader contact={contact} />
      <main id="main">
        <Hero />
        <UpcomingEvents />
        <CategoryTiles />
        <Experiences />
        <Founder />
        <WhyUs />
        <Testimonials />
        <TrustedBy />
        <Contact />
      </main>
      <SiteFooterServer contact={contact} />
    </>
  );
}
