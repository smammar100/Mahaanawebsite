import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getJobsForCareers } from "@/lib/sanity/fetch";
import { CareersOpeningsSection } from "@/components/sections/CareersOpeningsSection";

/** Always query Sanity on each request so new/published jobs show without waiting on ISR cache. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers | Mahaana",
  description: "Join the Mahaana team. Explore career opportunities.",
  path: "careers",
});

export default async function CareersPage() {
  const jobs = await getJobsForCareers();

  return (
    <div className="bg-surface-bg">
      <CareersOpeningsSection jobs={jobs.length > 0 ? jobs : undefined} />
    </div>
  );
}
