import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getInvestorEducations } from "@/lib/sanity/fetch";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { TextRegular } from "@/components/ui/Typography";
import { InvestorEducationLayout } from "@/components/sections/InvestorEducationLayout";

export const metadata: Metadata = buildPageMetadata({
  title: "Investor Education | Mahaana",
  description: "Learn about investing, savings, and financial planning with Mahaana.",
  path: "investor-education",
});

const HERO_HEADLINE = "Resources and insights";
const HERO_SUBTITLE =
  "The latest industry news, interviews, technologies, and resources.";

export default async function InvestorEducationPage() {
  const allItems = await getInvestorEducations();

  return (
    <div className="bg-surface-bg">
      {allItems.length > 0 ? (
        <InvestorEducationLayout
          items={allItems}
          headline={HERO_HEADLINE}
          subtitle={HERO_SUBTITLE}
        />
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
