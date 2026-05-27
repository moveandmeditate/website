import { PillarPage } from "@/components/pillar/pillar-page";
import { PILLARS } from "@/lib/content";
import { pillarJsonLd, pillarMetadata } from "@/lib/seo";

export const metadata = pillarMetadata("corporate");

export default function CorporatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pillarJsonLd("corporate")) }}
      />
      <PillarPage pillar={PILLARS.corporate} />
    </>
  );
}
