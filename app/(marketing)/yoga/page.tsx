import { PillarPage } from "@/components/pillar/pillar-page";
import { PILLARS } from "@/lib/content";
import { pillarJsonLd, pillarMetadata } from "@/lib/seo";

export const metadata = pillarMetadata("yoga");

export default function YogaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pillarJsonLd("yoga")) }}
      />
      <PillarPage pillar={PILLARS.yoga} />
    </>
  );
}
