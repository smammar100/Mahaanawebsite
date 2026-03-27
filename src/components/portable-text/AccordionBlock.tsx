import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { ReactNode } from "react";

interface AccordionItem {
  _key?: string;
  title: string;
  body?: PortableTextBlock[];
}

interface AccordionValue {
  heading?: string;
  items?: AccordionItem[];
  variant?: "accordion" | "faq" | "tabs";
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

export function AccordionBlock({ value }: { value: AccordionValue }) {
  const items = value.items || [];

  return (
    <section className="my-10 rounded-2xl border border-surface-stroke bg-surface-card p-6 sm:p-8">
      {value.heading ? (
        <h2 className="mb-5 text-2xl font-semibold text-text-primary">{value.heading}</h2>
      ) : null}

      <div className="space-y-3">
        {items.map((item, index) => (
          <details
            key={item._key || `${item.title}-${index}`}
            className="group overflow-hidden rounded-xl border border-surface-stroke bg-surface-bg"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-body-md font-medium text-text-primary marker:content-none">
              <span>{item.title}</span>
              <span className="ml-4 text-text-tertiary transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-4 pb-4 pt-1">
              <PortableText value={item.body || []} components={nestedComponents} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
