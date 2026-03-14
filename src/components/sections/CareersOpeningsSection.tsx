"use client";

import Link from "next/link";
import { ArrowRight } from "@untitledui/icons";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { H2, TextLarge } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface JobListing {
  department: string;
  role: string;
  location: string;
  link: string;
}

const JOBS_FALLBACK: JobListing[] = [
  { department: "Engineering", role: "Senior Full Stack Developer", location: "Remote", link: "#" },
  { department: "Product", role: "Product Manager", location: "Hybrid", link: "#" },
  { department: "Design", role: "UI/UX Designer", location: "Remote", link: "#" },
  { department: "Data", role: "Data Scientist", location: "On-site", link: "#" },
  { department: "Marketing", role: "Growth Marketing Specialist", location: "Remote", link: "#" },
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
          <H2 id="careers-openings-heading" className="h-fit text-text-primary">
            Current Openings
          </H2>
          <TextLarge className="h-fit w-full max-w-2xl text-center text-text-secondary">
            Join our team and help shape the future. We&apos;re looking for
            passionate people who are excited to tackle challenging problems and
            build amazing products.
          </TextLarge>
        </div>

        <div
          className="hidden grid-cols-1 items-center gap-1.5 py-6 text-xs uppercase sm:grid sm:grid-cols-4 sm:gap-10"
          aria-hidden
        >
          <span className="text-text-tertiary">Department</span>
          <span className="col-span-2 text-text-tertiary">Role</span>
          <span className="text-text-tertiary">Location</span>
        </div>
        <Separator />

        {list.map((job, idx) => (
          <div key={idx}>
            <Link
              href={job.link}
              className="group relative grid grid-cols-1 items-center gap-1.5 py-6 sm:grid-cols-4 sm:gap-10"
            >
              <Badge variant="outline">{job.department}</Badge>
              <span className="col-span-2 text-lg font-semibold text-text-primary">
                {job.role}
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-text-secondary">{job.location}</span>
                <ArrowRight className="absolute right-6 top-6 size-4.5 text-text-tertiary transition-all duration-300 group-hover:translate-x-1 group-hover:text-system-brand sm:static" />
              </div>
            </Link>
            <Separator />
          </div>
        ))}

        <div className="mt-12 text-center">
          <p className="mb-4 text-text-secondary">
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
