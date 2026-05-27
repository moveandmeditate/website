import { PillarPage } from "@/components/pillar/pillar-page";
import { PILLARS } from "@/lib/content";
import { pillarFaqJsonLd, pillarJsonLd, pillarMetadata } from "@/lib/seo";

export const metadata = pillarMetadata("dance");

export default function DancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pillarJsonLd("dance")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pillarFaqJsonLd("dance")) }}
      />
      <PillarPage pillar={PILLARS.dance} />
    </>
  );
}
