import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { UpcomingEvents } from "@/components/sections/upcoming-events";
import { TrustedBy } from "@/components/sections/trusted-by";
import { CategoryTiles } from "@/components/sections/category-tiles";
import { Experiences } from "@/components/sections/experiences";
import { Founder } from "@/components/sections/founder";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { buildJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <UpcomingEvents />
        <TrustedBy />
        <CategoryTiles />
        <Experiences />
        <Founder />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
