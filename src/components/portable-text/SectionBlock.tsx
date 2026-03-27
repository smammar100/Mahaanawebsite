import { PortableText } from "@portabletext/react";
import type { ReactNode } from "react";

type NestedBlock = {
  _type: "block";
  _key?: string;
  children?: Array<{ _type: "span"; text?: string; marks?: string[] }>;
  markDefs?: Array<{ _type: "link"; href?: string; openInNewTab?: boolean }>;
  style?: "normal" | "h3" | "h4" | "blockquote" | "pullquote";
  listItem?: "bullet" | "number";
  level?: number;
};

export interface SectionValue {
  heading?: string;
  body?: NestedBlock[];
  variant?: "default" | "highlight" | "aside";
}

const nestedComponents = {
  block: {
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="mb-4 text-body leading-relaxed text-text-tertiary">{children}</p>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="mt-6 mb-3 text-text-primary text-xl font-semibold">{children}</h3>
    ),
    h4: ({ children }: { children?: ReactNode }) => (
      <h4 className="mt-5 mb-2 text-text-primary text-lg font-semibold">{children}</h4>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-system-brand pl-6 text-body leading-relaxed italic text-text-secondary">
        {children}
      </blockquote>
    ),
    pullquote: ({ children }: { children?: ReactNode }) => (
      <aside className="my-8 rounded-2xl border border-surface-stroke bg-surface-card p-8 text-body leading-relaxed italic text-text-secondary">
        {children}
      </aside>
    ),
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-body text-text-tertiary">{children}</ul>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-body text-text-tertiary">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: ReactNode }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }: { children?: ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: { children?: ReactNode }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code className="rounded bg-surface-bg px-1.5 py-0.5 font-mono text-sm text-text-primary">
        {children}
      </code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; openInNewTab?: boolean };
      children?: ReactNode;
    }) => (
      <a
        href={value?.href || "#"}
        target={value?.openInNewTab ? "_blank" : undefined}
        rel={value?.openInNewTab ? "noopener noreferrer" : undefined}
        className="text-system-brand underline underline-offset-2 hover:opacity-80"
      >
        {children}
      </a>
    ),
  },
};

export function SectionBlock({ value }: { value: SectionValue }) {
  const variant = value.variant || "default";
  const variantClass =
    variant === "highlight"
      ? "bg-gray-900 text-gray-100 border-gray-700"
      : variant === "aside"
        ? "bg-surface-card border-system-brand border-l-4"
        : "bg-surface-card border-surface-stroke";

  return (
    <section className={`my-10 rounded-2xl border p-6 sm:p-8 ${variantClass}`}>
      {value.heading ? (
        <h2
          className={`mb-4 text-2xl font-semibold ${
            variant === "highlight" ? "text-gray-100" : "text-text-primary"
          }`}
        >
          {value.heading}
        </h2>
      ) : null}
      {value.body && value.body.length > 0 ? (
        <div className={variant === "highlight" ? "text-gray-200" : undefined}>
          <PortableText value={value.body} components={nestedComponents} />
        </div>
      ) : null}
    </section>
  );
}
