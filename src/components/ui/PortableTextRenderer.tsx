"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { cleanCopy } from "@/lib/copy-utils";

type BlockChild = { _type?: string; text?: string; marks?: string[] };

function headingPlainText(value: { children?: BlockChild[] } | undefined): string | null {
  if (!value?.children?.length || value.children.some((c) => c.marks?.length))
    return null;
  return value.children.map((c) => c.text ?? "").join("");
}

const components: PortableTextComponents = {
  block: {
    h1: ({
      value,
      children,
    }: {
      value?: { children?: BlockChild[] };
      children: React.ReactNode;
    }) => {
      const plain = headingPlainText(value as { children?: BlockChild[] });
      return (
        <h1 className="mt-8 mb-3 text-text-primary">
          {plain != null ? cleanCopy(plain, { fixWidows: false }) : children}
        </h1>
      );
    },
    normal: ({
      value,
      children,
    }: {
      value?: { children?: BlockChild[] };
      children: React.ReactNode;
    }) => {
      const block = value as { children?: BlockChild[] } | undefined;
      const hasPlainText =
        block?.children?.length &&
        !block.children.some((c) => c.marks?.length);
      if (hasPlainText) {
        const plain = block.children!.map((c) => c.text ?? "").join("");
        return (
          <p className="mb-4 text-text-secondary">{cleanCopy(plain)}</p>
        );
      }
      return <p className="mb-4 text-text-secondary">{children}</p>;
    },
    h2: ({
      value,
      children,
    }: {
      value?: { children?: BlockChild[] };
      children: React.ReactNode;
    }) => {
      const plain = headingPlainText(value as { children?: BlockChild[] });
      return (
        <h2 className="mt-8 mb-3 text-text-primary">
          {plain != null ? cleanCopy(plain, { fixWidows: false }) : children}
        </h2>
      );
    },
    h3: ({
      value,
      children,
    }: {
      value?: { children?: BlockChild[] };
      children: React.ReactNode;
    }) => {
      const plain = headingPlainText(value as { children?: BlockChild[] });
      return (
        <h3 className="mt-6 mb-2 text-text-primary">
          {plain != null ? cleanCopy(plain, { fixWidows: false }) : children}
        </h3>
      );
    },
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
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
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
