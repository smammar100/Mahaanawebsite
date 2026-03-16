import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getFaqByProduct } from "@/lib/sanity/fetch";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { FAQStructuredData } from "@/components/FAQStructuredData";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { FAQSavePlusSection } from "@/components/sections/FAQSavePlusSection";
import { SavePlusHero } from "@/components/sections/SavePlusHero";
import { WhySavePlusSection } from "@/components/sections/WhySavePlusSection";
import { savePlusBenefitsCards } from "./benefitsCards";

export const metadata: Metadata = buildPageMetadata({
  title: "Save+ | Mahaana",
  description:
    "Save more with Mahaana Save+. Build your safety net with institutional level, low risk funds and access your money whenever you need it.",
  path: "save-plus",
});

export default async function SavePlusPage() {
  const faqItems = await getFaqByProduct("save-plus");
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <BreadcrumbStructuredData items={[{ name: "Save+", path: "save-plus" }]} />
      <FAQStructuredData items={faqItems} />
      <SavePlusHero />
      <WhySavePlusSection />
      <BenefitsSection cards={savePlusBenefitsCards} />
      <FAQSavePlusSection items={faqItems} />
      <Cta6Section />
    </div>
  );
}
