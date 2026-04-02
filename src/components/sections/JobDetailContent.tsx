import Link from "next/link";
import { ArrowNarrowLeft } from "@untitledui/icons";
import type { PortableTextBlock } from "@portabletext/types";
import { Container } from "@/components/layout/Container";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import { Badge } from "@/components/ui/badge";
import { H1, H2, TextRegular } from "@/components/ui/Typography";
import { cleanCopy } from "@/lib/copy-utils";
import type { SanityJob } from "@/lib/sanity/types";

function ProseSection({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <H2 className="text-balance text-2xl text-text-primary sm:text-[length:var(--text-h3)]">
        {cleanCopy(heading)}
      </H2>
      <TextRegular className="mt-4 whitespace-pre-wrap text-text-secondary">
        {cleanCopy(body)}
      </TextRegular>
    </section>
  );
}

function JobPortableSection({
  heading,
  blocks,
}: {
  heading: string;
  blocks: PortableTextBlock[] | undefined;
}) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <section className="mt-10">
      <H2 className="text-balance text-2xl text-text-primary sm:text-[length:var(--text-h3)]">
        {cleanCopy(heading)}
      </H2>
      <div className="mt-6 [&_h2:first-of-type]:mt-0 [&_h3:first-of-type]:mt-0 [&_p:first-of-type]:mt-0">
        <PortableTextRenderer variant="jobJd" value={blocks} />
      </div>
    </section>
  );
}

export function JobDetailContent({ job }: { job: SanityJob }) {
  const title = job.title ?? "Job";

  return (
    <div className="-mt-[calc(4.5rem+env(safe-area-inset-top,0px))] bg-surface-bg">
      <article>
        <Container className="pt-16 pb-8 sm:pt-20 lg:pt-[120px] lg:pb-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-12 xl:gap-16">
            <aside className="shrink-0 lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:z-10 lg:self-start lg:w-[280px] xl:w-[360px]">
              <Link
                href="/careers"
                className="mb-6 inline-flex items-center gap-2 text-body-sm font-medium text-text-tertiary transition-colors hover:text-system-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-brand"
              >
                <ArrowNarrowLeft className="size-4 shrink-0" aria-hidden />
                {cleanCopy("Back to Careers")}
              </Link>
              <H1 className="pb-2 text-balance text-3xl text-text-primary lg:text-4xl">
                {cleanCopy(title)}
              </H1>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.department ? (
                  <Badge variant="outline">{cleanCopy(job.department)}</Badge>
                ) : null}
                {job.location ? (
                  <Badge variant="outline">{cleanCopy(job.location)}</Badge>
                ) : null}
                {job.employmentType ? (
                  <Badge variant="outline">
                    {cleanCopy(job.employmentType)}
                  </Badge>
                ) : null}
                {job.isOpen === false ? (
                  <Badge variant="outline">{cleanCopy("Closed")}</Badge>
                ) : null}
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <div className="readable-line-length">
                {job.aboutMahaana?.trim() ? (
                  <ProseSection
                    heading="About Mahaana"
                    body={job.aboutMahaana}
                  />
                ) : null}

                {job.roleOverview?.trim() ? (
                  <ProseSection
                    heading="Role overview"
                    body={job.roleOverview}
                  />
                ) : null}

                <JobPortableSection
                  heading="Key responsibilities"
                  blocks={job.keyResponsibilities as PortableTextBlock[] | undefined}
                />
                <JobPortableSection
                  heading="Required qualifications"
                  blocks={job.requirements as PortableTextBlock[] | undefined}
                />
                <JobPortableSection
                  heading="Good to have"
                  blocks={job.preferredQualifications as PortableTextBlock[] | undefined}
                />
                <JobPortableSection
                  heading="What we offer"
                  blocks={job.benefits as PortableTextBlock[] | undefined}
                />
              </div>
            </div>
          </div>
        </Container>
      </article>
    </div>
  );
}
