import { PillarPage } from "@/components/pillar/pillar-page";
import { PILLARS } from "@/lib/content";
import { jsonLdHtml, pillarFaqJsonLd, pillarJsonLd, pillarMetadata } from "@/lib/seo";

export const metadata = pillarMetadata("weddings");

export default function WeddingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(pillarJsonLd("weddings")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(pillarFaqJsonLd("weddings")) }}
      />
      <PillarPage pillar={PILLARS.weddings} />
    </>
  );
}
