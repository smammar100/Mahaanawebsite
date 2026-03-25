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
      children?: React.ReactNode;
    }) => {
      const plain = headingPlainText(value as { children?: BlockChild[] });
      return (
        <h1 className="mt-8 mb-3 text-text-primary">
          {plain != null ? cleanCopy(plain) : children}
        </h1>
      );
    },
    normal: ({
      value,
      children,
    }: {
      value?: { children?: BlockChild[] };
      children?: React.ReactNode;
    }) => {
      const block = value as { children?: BlockChild[] } | undefined;
      const hasPlainText =
        block?.children?.length &&
        !block.children.some((c) => c.marks?.length);
      if (hasPlainText) {
        const plain = block.children!.map((c) => c.text ?? "").join("");
        return (
          <p className="mb-4 text-text-tertiary">{cleanCopy(plain)}</p>
        );
      }
      return <p className="mb-4 text-text-tertiary">{children}</p>;
    },
    h2: ({
      value,
      children,
    }: {
      value?: { children?: BlockChild[] };
      children?: React.ReactNode;
    }) => {
      const plain = headingPlainText(value as { children?: BlockChild[] });
      return (
        <h2 className="mt-8 mb-3 text-text-primary">
          {plain != null ? cleanCopy(plain) : children}
        </h2>
      );
    },
    h3: ({
      value,
      children,
    }: {
      value?: { children?: BlockChild[] };
      children?: React.ReactNode;
    }) => {
      const plain = headingPlainText(value as { children?: BlockChild[] });
      return (
        <p className="text-body-lg font-semibold mt-6 mb-2 text-text-primary">
          {plain != null ? cleanCopy(plain) : children}
        </p>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-system-brand pl-4 text-text-tertiary italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-text-tertiary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-text-tertiary">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; blank?: boolean };
      children?: React.ReactNode;
    }) => {
      const href = value?.href ?? "#";
      const blank = value?.blank === true;
      return (
        <a
          href={href}
          className="font-medium text-system-brand underline-offset-2 hover:underline"
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
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
