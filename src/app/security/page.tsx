import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { ComplianceSection } from "@/components/sections/ComplianceSection";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { SecurityBenefitsSection } from "@/components/sections/SecurityBenefitsSection";
import { SecurityHero } from "@/components/sections/SecurityHero";

export const metadata: Metadata = buildPageMetadata({
  title: "Security | Mahaana",
  description:
    "Learn how Mahaana keeps your investments safe — SECP-licensed, CDC custody, two-factor authentication, and bank-grade encryption. Your security is our #1 priority.",
  path: "security",
});

export default function SecurityPage() {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
      <SecurityHero />
      <ComplianceSection />
      <SecurityBenefitsSection />
      <Cta6Section />
    </div>
  );
}
