import { BlogSection } from "@/components/sections/BlogSection";
import { Cta6Section } from "@/components/sections/Cta6Section";
import { ComplianceSection } from "@/components/sections/ComplianceSection";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { InvestHero } from "@/components/sections/InvestHero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyMahaanaTrade } from "@/components/sections/WhyMahaanaTrade";

export default function Home() {
  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <InvestHero />
      <LogoStrip />
      <WhyMahaanaTrade />
      <FeatureCards />
      <FeaturesSection />
      <TestimonialsSection />
      <ComplianceSection />
      <BlogSection />
      <Cta6Section />
    </div>
  );
}
