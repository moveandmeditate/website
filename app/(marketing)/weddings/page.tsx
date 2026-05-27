import { PillarPage } from "@/components/pillar/pillar-page";
import { PILLARS } from "@/lib/content";
import { pillarJsonLd, pillarMetadata } from "@/lib/seo";

export const metadata = pillarMetadata("weddings");

export default function WeddingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pillarJsonLd("weddings")) }}
      />
      <PillarPage pillar={PILLARS.weddings} />
    </>
  );
}
