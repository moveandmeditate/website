import { PillarPage } from "@/components/pillar/pillar-page";
import { PILLARS } from "@/lib/content";
import { jsonLdHtml, pillarFaqJsonLd, pillarJsonLd, pillarMetadata } from "@/lib/seo";

export const metadata = pillarMetadata("yoga");

export default function YogaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(pillarJsonLd("yoga")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(pillarFaqJsonLd("yoga")) }}
      />
      <PillarPage pillar={PILLARS.yoga} />
    </>
  );
}
