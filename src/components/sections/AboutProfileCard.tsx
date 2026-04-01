"use client";

import Image from "next/image";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { Separator } from "@/components/ui/separator";
import { TextLarge, TextRegular } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export interface AboutProfileCardProps {
  name: string;
  title: string;
  imageSrc: string;
  imageSizes: string;
  linkedinUrl?: string;
  /** Shown below a gradient separator (e.g. tenure line). Omit to hide separator + footer. */
  footer?: string;
  className?: string;
}

export function AboutProfileCard({
  name,
  title,
  imageSrc,
  imageSizes,
  linkedinUrl,
  footer,
  className,
}: AboutProfileCardProps) {
  const linkedInHref = linkedinUrl?.trim() ?? "";
  const showLinkedIn = linkedInHref.length > 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-2xl border border-surface-stroke bg-surface-card p-6 dark:bg-surface-card",
        className,
      )}
    >
      <div className="relative size-28 shrink-0 overflow-hidden rounded-full border border-surface-stroke">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          sizes={imageSizes}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <TextLarge weight="semibold" className="text-text-primary">
            {name}
          </TextLarge>
          {showLinkedIn ? (
            <a
              href={linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary transition-colors hover:text-system-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-system-brand focus-visible:ring-offset-2 rounded"
              aria-label={`LinkedIn profile of ${name}`}
            >
              <LinkedInIcon size={20} className="shrink-0" />
            </a>
          ) : null}
        </div>
        <TextRegular className="text-text-tertiary">{title}</TextRegular>
      </div>
      {footer ? (
        <div className="flex flex-col gap-2">
          <Separator
            className="h-px border-0 bg-gradient-to-r from-transparent via-surface-stroke to-transparent"
            aria-hidden
          />
          <TextRegular className="text-text-tertiary">{footer}</TextRegular>
        </div>
      ) : null}
    </div>
  );
}
