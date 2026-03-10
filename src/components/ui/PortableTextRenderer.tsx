"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-regular leading-[150%] text-text-secondary mb-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-xl font-semibold text-text-primary mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-large font-semibold text-text-primary mt-6 mb-2">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-text-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-text-secondary">
        {children}
      </ol>
    ),
  },
};

interface Props {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
}

export function PortableTextRenderer({ value, className }: Props) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
