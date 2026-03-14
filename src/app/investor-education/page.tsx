import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getInvestorEducations } from "@/lib/sanity/fetch";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { TextRegular } from "@/components/ui/Typography";
import { InvestorEducationResourcesSection } from "@/components/sections/InvestorEducationResourcesSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Investor Education | Mahaana",
  description: "Learn about investing, savings, and financial planning with Mahaana.",
  path: "investor-education",
});

export default async function InvestorEducationPage() {
  const allItems = await getInvestorEducations();

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-white">
      {allItems.length > 0 ? (
        <InvestorEducationResourcesSection items={allItems} />
      ) : (
        <AnimatedSection className="border-t border-surface-stroke py-12">
          <Container>
            <TextRegular className="text-text-tertiary">
              No content yet. Check back soon or visit our blog from the home
              page.
            </TextRegular>
          </Container>
        </AnimatedSection>
      )}
    </div>
  );
}
