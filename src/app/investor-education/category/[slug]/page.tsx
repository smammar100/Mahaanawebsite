import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getInvestorEducations } from "@/lib/sanity/fetch";
import { mapSanityToInsightsPageData } from "@/lib/insights-data";
import {
  INSIGHTS_CATEGORY_DESCRIPTION,
  INSIGHTS_CATEGORY_HEADING,
  INSIGHTS_CATEGORY_SLUGS,
  insightsCategoryFromSlug,
} from "@/lib/insights-category-routes";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { InsightsCategoryViewClient } from "./InsightsCategoryViewClient";

/** Match hub: category listings refetch Sanity periodically. */
export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INSIGHTS_CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = insightsCategoryFromSlug(slug);
  if (!category) return {};
  const heading = INSIGHTS_CATEGORY_HEADING[category];
  const blurb = INSIGHTS_CATEGORY_DESCRIPTION[category];
  return buildPageMetadata({
    title: `${heading} | Investor Education | Mahaana`,
    description: blurb,
    path: `investor-education/category/${slug}`,
  });
}

export default async function InvestorEducationCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = insightsCategoryFromSlug(slug);
  if (!category) notFound();

  const items = await getInvestorEducations();
  const data = mapSanityToInsightsPageData(items);
  const articles = data.allArticles.filter((a) => a.category === category);
  const heading = INSIGHTS_CATEGORY_HEADING[category];
  const description = INSIGHTS_CATEGORY_DESCRIPTION[category];

  return (
    <div className="min-h-screen bg-surface-bg">
      <BreadcrumbStructuredData
        items={[
          { name: "Investor Education", path: "investor-education" },
          {
            name: heading,
            path: `investor-education/category/${slug}`,
          },
        ]}
      />
      <InsightsCategoryViewClient
        heading={heading}
        description={description}
        articles={articles}
      />
    </div>
  );
}
