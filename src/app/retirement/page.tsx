import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";
import { getFaqByProduct } from "@/lib/sanity/fetch";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { RetirementHero } from "@/components/sections/RetirementHero";
import { WhyRetirementSection } from "@/components/sections/WhyRetirementSection";
import { retirementBenefitsCards } from "./benefitsCards";

const BenefitsSection = dynamic(
  () => import("@/components/sections/BenefitsSection").then((m) => ({ default: m.BenefitsSection })),
  { ssr: true }
);

export const metadata: Metadata = buildPageMetadata({
  title: "Retirement | Mahaana",
  description:
    "Plan for retirement with Mahaana. Build your safety net with institutional-level, low-risk funds and access your money whenever you need it.",
  path: "retirement",
});

export default async function RetirementPage() {
  const faqItems = await getFaqByProduct("retirement");
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <RetirementHero />
      <WhyRetirementSection />
      <BenefitsSection cards={retirementBenefitsCards} />
      <FAQSection items={faqItems} />
      <Cta6Section />
    </div>
  );
}
