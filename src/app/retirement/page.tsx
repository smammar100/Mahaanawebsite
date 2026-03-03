import type { Metadata } from "next";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { RetirementHero } from "@/components/sections/RetirementHero";
import { TaxCreditTableSection } from "@/components/sections/TaxCreditTableSection";
import { WhyRetirementSection } from "@/components/sections/WhyRetirementSection";

export const metadata: Metadata = {
  title: "Retirement | Mahaana",
  description:
    "Plan for retirement with Mahaana. Build your safety net with institutional-level, low-risk funds and access your money whenever you need it.",
};

export default function RetirementPage() {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <RetirementHero />
      <WhyRetirementSection />
      <BenefitsSection />
      <TaxCreditTableSection />
      <FAQSection />
      <Cta6Section />
    </div>
  );
}
