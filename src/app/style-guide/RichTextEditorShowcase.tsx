"use client";

import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/types";

/** Representative Portable Text blocks for investor-education / CMS articles. */
const SAMPLE_RICH_TEXT = [
  {
    _type: "block" as const,
    _key: "intro",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "intro-a",
        text: "This preview uses the same ",
        marks: [],
      },
      {
        _type: "span" as const,
        _key: "intro-b",
        text: "PortableTextRenderer",
        marks: ["strong"],
      },
      {
        _type: "span" as const,
        _key: "intro-c",
        text:
          " as live articles: body text, headings, lists, blockquotes, and links share one styling system.",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "h1",
    style: "h1",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "h1-a",
        text: "Heading 1 — article title",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "after-h1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "after-h1-a",
        text: "Opening paragraph after the title uses secondary text color for comfortable reading.",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "h2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "h2-a",
        text: "Heading 2 — section",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "p-marks",
    style: "normal",
    markDefs: [
      {
        _type: "link" as const,
        _key: "link-demo",
        href: "https://www.mahaana.com",
        blank: true,
      },
    ],
    children: [
      {
        _type: "span" as const,
        _key: "pm-a",
        text: "Inline styles: ",
        marks: [],
      },
      {
        _type: "span" as const,
        _key: "pm-b",
        text: "strong",
        marks: ["strong"],
      },
      {
        _type: "span" as const,
        _key: "pm-c",
        text: ", ",
        marks: [],
      },
      {
        _type: "span" as const,
        _key: "pm-d",
        text: "emphasis",
        marks: ["em"],
      },
      {
        _type: "span" as const,
        _key: "pm-e",
        text: ", and ",
        marks: [],
      },
      {
        _type: "span" as const,
        _key: "pm-f",
        text: "links",
        marks: ["link-demo"],
      },
      {
        _type: "span" as const,
        _key: "pm-g",
        text: " use brand color with hover underline.",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "h3",
    style: "h3",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "h3-a",
        text: "Heading 3 — subsection",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "li1",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "li1-a",
        text: "Bullet list item one",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "li2",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "li2-a",
        text: "Bullet list item two with ",
        marks: [],
      },
      {
        _type: "span" as const,
        _key: "li2-b",
        text: "nested emphasis",
        marks: ["strong"],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "n1",
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "n1-a",
        text: "Numbered step one",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "n2",
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "n2-a",
        text: "Numbered step two",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "quote",
    style: "blockquote",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "q-a",
        text: "Blockquotes use a brand-colored left border and italic secondary text for pull quotes or citations.",
        marks: [],
      },
    ],
  },
] satisfies PortableTextBlock[];

export function RichTextEditorShowcase() {
  return (
    <div className="rounded-xl border border-surface-stroke bg-surface-card p-6 sm:p-8">
      <PortableTextRenderer
        value={SAMPLE_RICH_TEXT}
        className="max-w-[42rem]"
      />
    </div>
  );
}
