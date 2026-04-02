import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { getJobBySlug, getJobSlugs } from "@/lib/sanity/fetch";
import { BreadcrumbStructuredData } from "@/components/BreadcrumbStructuredData";
import { JobDetailContent } from "@/components/sections/JobDetailContent";
import type { SanityJob } from "@/lib/sanity/types";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

function jobMetaDescription(job: SanityJob): string {
  if (job.roleOverview?.trim()) {
    const t = job.roleOverview.trim();
    return t.length > 160 ? `${t.slice(0, 157)}...` : t;
  }
  return `Careers at Mahaana: ${job.title ?? "Role"}.`;
}

export async function generateStaticParams() {
  const slugs = await getJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job?.title) return {};
  return buildPageMetadata({
    title: `${job.title} | Careers | Mahaana`,
    description: jobMetaDescription(job),
    path: `careers/${slug}`,
  });
}

export default async function CareerJobPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const title = job.title ?? "Job";

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Careers", path: "careers" },
          { name: title, path: `careers/${slug}` },
        ]}
      />
      <JobDetailContent job={job} />
    </>
  );
}
