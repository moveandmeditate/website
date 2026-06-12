import { SiteHeader } from "@/components/site-header";
import { SiteFooterServer } from "@/components/site-footer-server";
import { Hero } from "@/components/sections/hero";
import { UpcomingEvents } from "@/components/sections/upcoming-events";
import { TrustedBy } from "@/components/sections/trusted-by";
import { CategoryTiles } from "@/components/sections/category-tiles";
import { Experiences } from "@/components/sections/experiences";
import { Founder } from "@/components/sections/founder";
import { InviteHost } from "@/components/sections/invite-host";
import { SchoolPrograms } from "@/components/sections/school-programs";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { VideoTestimonials } from "@/components/sections/video-testimonials";
import { getEffectiveVideoTestimonials } from "@/sanity/lib/site-data";
import { Contact } from "@/components/sections/contact";
import { buildJsonLd, jsonLdHtml } from "@/lib/seo";
import { getEffectiveContact } from "@/sanity/lib/site-data";

export default async function HomePage() {
  const [contact, videoTestimonials] = await Promise.all([
    getEffectiveContact(),
    getEffectiveVideoTestimonials(),
  ]);
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
        <InviteHost />
        <SchoolPrograms />
        <WhyUs />
        <VideoTestimonials items={videoTestimonials} />
        <Testimonials />
        <TrustedBy />
        <Contact />
      </main>
      <SiteFooterServer contact={contact} />
    </>
  );
}
