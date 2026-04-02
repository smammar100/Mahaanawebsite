"use client";

import Link from "next/link";
import { ArrowRight } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { H3, TextLarge } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface JobListing {
  department: string;
  title: string;
  location: string;
  link: string;
}

/** Placeholder rows when CMS returns no jobs; unique `link` avoids duplicate React keys. */
const JOBS_FALLBACK: JobListing[] = [
  { department: "Engineering", title: "Senior Full Stack Developer", location: "Remote", link: "/careers?demo=engineering" },
  { department: "Product", title: "Product Manager", location: "Hybrid", link: "/careers?demo=product" },
  { department: "Design", title: "UI/UX Designer", location: "Remote", link: "/careers?demo=design" },
  { department: "Data", title: "Data Scientist", location: "On-site", link: "/careers?demo=data" },
  { department: "Marketing", title: "Growth Marketing Specialist", location: "Remote", link: "/careers?demo=marketing" },
];

interface CareersOpeningsSectionProps {
  className?: string;
  /** Jobs from CMS; falls back to dummy list when empty or undefined. */
  jobs?: JobListing[];
}

export function CareersOpeningsSection({
  className,
  jobs,
}: CareersOpeningsSectionProps) {
  const list = jobs?.length ? jobs : JOBS_FALLBACK;

  return (
    <section
      className={cn("bg-surface-bg py-12 sm:py-16 lg:py-24", className)}
      aria-labelledby="careers-openings-heading"
    >
      <Container>
        <div className="mb-16 flex w-full flex-col items-center gap-4 text-center">
          <H3 id="careers-openings-heading" className="h-fit text-text-primary">
            Current Openings
          </H3>
          <TextLarge className="h-fit w-full max-w-2xl text-center text-text-tertiary">
            Join our team and help shape the future. We&apos;re looking for
            passionate people who are excited to tackle challenging problems and
            build amazing products.
          </TextLarge>
        </div>

        <div
          className="hidden grid-cols-1 items-start gap-1.5 py-6 text-xs uppercase sm:grid sm:grid-cols-4 sm:gap-10"
          aria-hidden
        >
          <span className="text-text-tertiary">Department</span>
          <span className="col-span-2 text-text-tertiary">Title</span>
          <span className="text-text-tertiary">Location</span>
        </div>
        <Separator />

        {list.map((job, idx) => (
          <div key={`${job.link}-${job.department}-${job.title}-${idx}`}>
            <Link
              href={job.link}
              className="group relative grid grid-cols-1 items-start gap-1.5 py-6 sm:grid sm:grid-cols-4 sm:gap-10"
            >
              <Badge variant="outline" className="shrink-0">
                {job.department}
              </Badge>
              <div className="col-span-2 flex min-w-0 flex-col gap-1">
                <span className="text-lg font-semibold text-text-primary">
                  {job.title}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 sm:items-start">
                <span className="text-text-tertiary">{job.location}</span>
                <ArrowRight className="absolute right-6 top-6 size-4.5 text-text-tertiary transition-all duration-300 group-hover:translate-x-1 group-hover:text-system-brand sm:static" />
              </div>
            </Link>
            <Separator />
          </div>
        ))}

        <div className="mt-12 text-center">
          <p className="mb-4 text-text-tertiary">
            Don&apos;t see a role that fits? We&apos;re always looking for great
            talent.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 font-medium text-system-brand transition-colors hover:text-primary-200"
          >
            Send us your resume
            <ArrowRight className="mt-0.5 size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
