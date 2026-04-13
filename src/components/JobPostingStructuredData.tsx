import { SITE_URL } from "@/lib/metadata";
import type { SanityJob } from "@/lib/sanity/types";

function schemaEmploymentType(
  raw: string | null | undefined
): string | undefined {
  if (!raw) return undefined;
  const t = raw.toLowerCase();
  if (t.includes("full")) return "FULL_TIME";
  if (t.includes("part")) return "PART_TIME";
  if (t.includes("contract")) return "CONTRACTOR";
  if (t.includes("intern")) return "INTERN";
  return undefined;
}

export function JobPostingStructuredData({ job }: { job: SanityJob }) {
  const slug = job.slug?.current;
  if (!slug) return null;
  /** Avoid marking closed roles as active job postings in search. */
  if (job.isOpen === false) return null;

  const title = job.title ?? "Role";
  const description =
    [job.roleOverview, job.aboutMahaana].filter(Boolean).join("\n\n") ||
    `Careers at Mahaana: ${title}.`;
  const datePosted = job.publishedAt ?? new Date().toISOString().slice(0, 10);

  const hiringOrganization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Mahaana",
    sameAs: SITE_URL,
  };

  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    hiringOrganization,
    directApply: true,
    url: `${SITE_URL}/careers/${slug}`,
    identifier: {
      "@type": "PropertyValue",
      name: "slug",
      value: slug,
    },
  };

  if (job.location?.trim()) {
    base.jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PK",
        addressLocality: job.location.trim(),
      },
    };
  }

  const emp = schemaEmploymentType(job.employmentType ?? undefined);
  if (emp) {
    base.employmentType = emp;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(base) }}
    />
  );
}
