import { PillarPage } from "@/components/pillar/pillar-page";
import { PILLARS } from "@/lib/content";
import { jsonLdHtml, pillarFaqJsonLd, pillarJsonLd, pillarMetadata } from "@/lib/seo";

export const metadata = pillarMetadata("dance");

export default function DancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(pillarJsonLd("dance")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(pillarFaqJsonLd("dance")) }}
      />
      <PillarPage pillar={PILLARS.dance} />
    </>
  );
}
