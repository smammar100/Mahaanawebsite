import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getFaqByProduct, getFundDocuments } from "@/lib/sanity/fetch";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { MIIRFFAQSection } from "@/components/sections/MIIRFFAQSection";
import { MIIRFHero } from "@/components/sections/MIIRFHero";
import { MIIRFOverviewSection } from "@/components/sections/MIIRFOverviewSection";
import { MIIRFPerformanceSection } from "@/components/sections/MIIRFPerformanceSection";
import { MIIRFFundLiteratureSection } from "@/components/sections/MIIRFFundLiteratureSection";
import { MIIRFSubfundsSection } from "@/components/sections/MIIRFSubfundsSection";

export const metadata: Metadata = buildPageMetadata({
  title: "MIIRF | Mahaana",
  description: "Discover MIIRF with Mahaana. More details coming soon.",
  path: "miirf",
});

export default async function MIIRFPage() {
  const [faqItems, fundDocs] = await Promise.all([
    getFaqByProduct("miirf"),
    getFundDocuments("miirf"),
  ]);
  const documents = fundDocs.map((d) => ({
    title: d.title ?? "",
    fileUrl: d.fileUrl ?? null,
    category: d.category ?? "",
  }));
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <MIIRFHero />
      <MIIRFOverviewSection />
      <MIIRFSubfundsSection />
      <MIIRFPerformanceSection />
      <MIIRFFundLiteratureSection documents={documents} />
      <MIIRFFAQSection items={faqItems} />
      <Cta6Section />
    </div>
  );
}
