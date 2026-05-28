import { PillarPage } from "@/components/pillar/pillar-page";
import { PILLARS } from "@/lib/content";
import { jsonLdHtml, pillarFaqJsonLd, pillarJsonLd, pillarMetadata } from "@/lib/seo";

export const metadata = pillarMetadata("corporate");

export default function CorporatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(pillarJsonLd("corporate")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(pillarFaqJsonLd("corporate")) }}
      />
      <PillarPage pillar={PILLARS.corporate} />
    </>
  );
}
