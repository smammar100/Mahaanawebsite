import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getInvestorEducations } from "@/lib/sanity/fetch";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { mapSanityToInsightsPageData } from "@/lib/insights-data";
import { InsightsPageClient } from "./InsightsPageClient";

/** Revalidate from Sanity so new published articles appear on the hub without a full redeploy. */
export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Investor Education | Mahaana",
  description:
    "Learn about investing, savings, and financial planning with Mahaana.",
  path: "investor-education",
});

export default async function InvestorEducationPage() {
  const items = await getInvestorEducations();
  const data = mapSanityToInsightsPageData(items);

  return (
    <div className="min-h-screen bg-surface-bg">
      <BreadcrumbStructuredData
        items={[{ name: "Investor Education", path: "investor-education" }]}
      />
      <InsightsPageClient data={data} />
    </div>
  );
}
