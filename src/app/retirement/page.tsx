import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/metadata";
import { getFaqByProduct } from "@/lib/sanity/fetch";
import { FAQStructuredData } from "@/components/FAQStructuredData";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { RetirementHero } from "@/components/sections/RetirementHero";
import { retirementBenefitsCards } from "./benefitsCards";

const WhyRetirementSection = dynamic(
  () => import("@/components/sections/WhyRetirementSection").then((m) => ({ default: m.WhyRetirementSection })),
  { ssr: true }
);
const BenefitsSection = dynamic(
  () => import("@/components/sections/BenefitsSection").then((m) => ({ default: m.BenefitsSection })),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import("@/components/sections/FAQSection").then((m) => ({ default: m.FAQSection })),
  { ssr: true }
);
const Cta6Section = dynamic(
  () => import("@/components/sections/Cta6Section").then((m) => ({ default: m.Cta6Section })),
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
      <BreadcrumbStructuredData items={[{ name: "Retirement", path: "retirement" }]} />
      <FAQStructuredData items={faqItems} />
      <RetirementHero />
      <WhyRetirementSection />
      <BenefitsSection cards={retirementBenefitsCards} />
      <FAQSection items={faqItems} />
      <Cta6Section />
    </div>
  );
}
