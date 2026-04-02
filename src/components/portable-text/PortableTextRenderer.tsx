import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { AccordionBlock } from "./AccordionBlock";
import { CallToActionBlock } from "./CallToActionBlock";
import { ContentTableBlock } from "./ContentTableBlock";
import { DataGridBlock } from "./DataGridBlock";
import { InlineImageBlock } from "./InlineImageBlock";
import { HighchartsPortableBlock } from "./HighchartsPortableBlock";
import { IconFeatureCardBlock } from "./IconFeatureCardBlock";
import { SectionBlock } from "./SectionBlock";
import { VideoEmbedBlock } from "./VideoEmbedBlock";

type InternalLinkValue = {
  reference?: {
    slug?: { current?: string };
    _ref?: string;
  };
  slug?: string;
};

const articleBlockStyles = {
  h1: "mt-16 mb-6 text-4xl font-bold text-text-primary",
  normal: "mb-6 text-body leading-relaxed text-text-tertiary",
  h2: "mt-16 mb-6 text-3xl font-bold text-text-primary",
  h3: "mt-10 mb-4 text-2xl font-semibold text-text-primary",
  h4: "mt-8 mb-3 text-xl font-semibold text-text-primary",
} as const;

const jobJdBlockStyles = {
  h1: "mt-8 mb-4 text-2xl font-bold text-text-primary",
  normal: "mb-4 text-body leading-relaxed text-text-tertiary",
  h2: "mt-8 mb-4 text-xl font-bold text-text-primary",
  h3: "mt-6 mb-3 text-lg font-semibold text-text-primary sm:text-xl",
  h4: "mt-5 mb-2 text-base font-semibold text-text-primary sm:text-lg",
} as const;

function buildBlockComponents(
  styles: typeof articleBlockStyles
): PortableTextComponents["block"] {
  return {
    h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
    normal: ({ children }) => <p className={styles.normal}>{children}</p>,
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-system-brand pl-6 text-body leading-relaxed italic text-text-secondary">
        {children}
      </blockquote>
    ),
    pullquote: ({ children }) => (
      <aside className="my-10 rounded-2xl border border-surface-stroke bg-surface-card p-8 text-body leading-relaxed italic text-text-secondary">
        {children}
      </aside>
    ),
  };
}

const sharedList: PortableTextComponents["list"] = {
  bullet: ({ children }) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-body text-text-tertiary">
      {children}
    </ul>
  ),
  number: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 text-body text-text-tertiary">
      {children}
    </ol>
  ),
};

const jobJdList: PortableTextComponents["list"] = {
  bullet: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-body text-text-tertiary">
      {children}
    </ul>
  ),
  number: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-body text-text-tertiary">
      {children}
    </ol>
  ),
};

const sharedMarks: PortableTextComponents["marks"] = {
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  underline: ({ children }) => (
    <span className="underline underline-offset-2">{children}</span>
  ),
  strikethrough: ({ children }) => <s>{children}</s>,
  code: ({ children }) => (
    <code className="rounded bg-surface-bg px-1.5 py-0.5 font-mono text-sm text-text-primary">
      {children}
    </code>
  ),
  highlight: ({ children }) => (
    <mark className="rounded bg-warning-150 px-1 text-text-primary">{children}</mark>
  ),
  link: ({ value, children }) => {
    const typedValue = value as
      | { href?: string; openInNewTab?: boolean }
      | undefined;
    const href = typedValue?.href || "#";
    const openInNewTab = typedValue?.openInNewTab ?? true;
    return (
      <a
        href={href}
        className="text-system-brand underline underline-offset-2 hover:opacity-80"
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  internalLink: ({ value, children }) => {
    const typedValue = value as InternalLinkValue | undefined;
    const slug = typedValue?.slug || typedValue?.reference?.slug?.current;
    const href = slug ? `/investor-education/${slug}` : "#";
    return (
      <Link
        href={href}
        className="text-system-brand underline underline-offset-2 hover:opacity-80"
      >
        {children}
      </Link>
    );
  },
};

const sharedTypes: PortableTextComponents["types"] = {
  section: ({ value }) => <SectionBlock value={value as never} />,
  dataGrid: ({ value }) => <DataGridBlock value={value as never} />,
  contentTable: ({ value }) => <ContentTableBlock value={value as never} />,
  callToAction: ({ value }) => <CallToActionBlock value={value as never} />,
  inlineImage: ({ value }) => <InlineImageBlock value={value as never} />,
  videoEmbed: ({ value }) => <VideoEmbedBlock value={value as never} />,
  accordion: ({ value }) => <AccordionBlock value={value as never} />,
  iconFeatureCard: ({ value }) => (
    <IconFeatureCardBlock value={value as never} />
  ),
  highcharts: ({ value }) => (
    <HighchartsPortableBlock value={value as never} />
  ),
};

const articleComponents: PortableTextComponents = {
  block: buildBlockComponents(articleBlockStyles),
  list: sharedList,
  marks: sharedMarks,
  types: sharedTypes,
};

const jobJdComponents: PortableTextComponents = {
  block: buildBlockComponents(jobJdBlockStyles),
  list: jobJdList,
  marks: sharedMarks,
  types: sharedTypes,
};

export type PortableTextRendererVariant = "article" | "jobJd";

interface PortableTextRendererProps {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
  variant?: PortableTextRendererVariant;
}

export function PortableTextRenderer({
  value,
  className,
  variant = "article",
}: PortableTextRendererProps) {
  if (!value || !Array.isArray(value) || value.length === 0) return null;
  const components =
    variant === "jobJd" ? jobJdComponents : articleComponents;
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
