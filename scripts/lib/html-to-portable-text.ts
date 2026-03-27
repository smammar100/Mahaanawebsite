import { htmlToPortableText } from "@portabletext/html";
import { normalizeBlock } from "@portabletext/block-tools";
import { compileSchema, defineSchema } from "@portabletext/schema";
import { JSDOM } from "jsdom";
import parse, { type HTMLElement, type Node } from "node-html-parser";

type PortableBlock = Record<string, unknown>;
type MarkDef = Record<string, unknown>;

export interface HtmlImportMeta {
  title: string;
  author: string;
  readingTime: string;
  excerpt: string;
}

export interface ConvertHtmlOptions {
  includeProfiles?: boolean;
}

export interface ConvertHtmlResult {
  meta: HtmlImportMeta;
  bodyHtml: PortableBlock[];
}

const key = () => crypto.randomUUID().replace(/-/g, "").slice(0, 12);

const schema = compileSchema(
  defineSchema({
    styles: [
      { name: "normal" },
      { name: "h2" },
      { name: "h3" },
      { name: "h4" },
      { name: "blockquote" },
      { name: "pullquote" },
    ],
    decorators: [
      { name: "strong" },
      { name: "em" },
      { name: "underline" },
      { name: "strikethrough" },
      { name: "code" },
      { name: "highlight" },
    ],
    annotations: [
      {
        name: "link",
        fields: [
          { name: "href", type: "string" },
          { name: "openInNewTab", type: "boolean" },
        ],
      },
      {
        name: "internalLink",
        fields: [{ name: "reference", type: "string" }],
      },
    ],
    blockObjects: [
      { name: "videoEmbed", fields: [{ name: "url", type: "string" }] },
      { name: "section", fields: [{ name: "heading", type: "string" }] },
      { name: "dataGrid", fields: [{ name: "heading", type: "string" }] },
      { name: "callToAction", fields: [{ name: "heading", type: "string" }] },
      { name: "accordion", fields: [{ name: "heading", type: "string" }] },
    ],
  })
);

function getPlainText(node: Node | null | undefined): string {
  if (!node) return "";
  return (node as { textContent?: string }).textContent?.trim() || "";
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function extractMeta(root: HTMLElement): HtmlImportMeta {
  const title =
    normalizeText(getPlainText(root.querySelector("title"))) ||
    normalizeText(getPlainText(root.querySelector("h1"))) ||
    "Untitled";
  const main = root.querySelector("main");
  const mainText = normalizeText(getPlainText(main));
  const byNode = main
    ?.querySelectorAll("p,span,div,strong")
    .map((node) => normalizeText(getPlainText(node)))
    .find((value) => /^by\s+/i.test(value) && value.length < 120);
  const byMatch = byNode?.match(/^by\s+(.+)$/i);
  const readMatch = mainText.match(/(\d+\s*Min\s*Read)/i);
  const author = byMatch?.[1]?.trim() || "";
  const readingTime = readMatch?.[1]?.trim() || "5 Min Read";
  const excerpt =
    normalizeText(getPlainText(root.querySelector(".content-block p"))) ||
    normalizeText(getPlainText(root.querySelector("main p"))) ||
    "";

  return {
    title,
    author,
    readingTime,
    excerpt: excerpt.length > 200 ? `${excerpt.slice(0, 197)}...` : excerpt,
  };
}

function asTextBlock(block: PortableBlock): block is PortableBlock {
  return block?._type === "block" && Array.isArray(block.children);
}

function sanitizeMarkDefs(markDefs: unknown): MarkDef[] {
  if (!Array.isArray(markDefs)) return [];
  const sanitized: MarkDef[] = [];
  for (const def of markDefs) {
    if (!def || typeof def !== "object") continue;
    const typed = def as Record<string, unknown>;
    const type = typeof typed._type === "string" ? typed._type : "";
    const _key = typeof typed._key === "string" ? typed._key : key();

    if (type === "link") {
      const href = typeof typed.href === "string" ? typed.href.trim() : "";
      if (!href) continue;
      sanitized.push({
        _key,
        _type: "link",
        href,
        openInNewTab: typed.openInNewTab !== false,
      });
      continue;
    }

    if (type === "internalLink") {
      const reference = typed.reference;
      if (!reference || typeof reference !== "object") continue;
      sanitized.push({
        _key,
        _type: "internalLink",
        reference,
      });
    }
  }
  return sanitized;
}

function normalizeBlocks(blocks: PortableBlock[]): PortableBlock[] {
  const normalized = blocks
    .map((block) => normalizeBlock(block as { _type: string }, { keyGenerator: key }))
    .map((block) => ({ ...block })) as PortableBlock[];

  for (const block of normalized) {
    if (!asTextBlock(block)) continue;
    const style = typeof block.style === "string" ? block.style : "normal";
    if (!["normal", "h2", "h3", "h4", "blockquote", "pullquote"].includes(style)) {
      block.style = "normal";
    }
    block.markDefs = sanitizeMarkDefs(block.markDefs);
    if (!Array.isArray(block.children) || block.children.length === 0) {
      block.children = [{ _type: "span", _key: key(), text: " ", marks: [] }];
    }
  }

  return normalized;
}

function makeTextBlock(
  text: string,
  style: "normal" | "h3" | "h4" = "normal",
  options?: { listItem?: "bullet" | "number"; level?: number }
): PortableBlock {
  const block: PortableBlock = {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: normalizeText(text), marks: [] }],
  };
  if (options?.listItem) block.listItem = options.listItem;
  if (options?.level) block.level = options.level;
  return block;
}

function isLikelyCtaHeading(value: string): boolean {
  return /(?:get started|learn more|contact|book|subscribe|open account|sign up)/i.test(
    value
  );
}

function extractDataGridFromList(listEl: HTMLElement): PortableBlock | null {
  const items = listEl.querySelectorAll("li");
  if (items.length < 2) return null;

  const mapped = items
    .map((li) => normalizeText(li.textContent || ""))
    .filter(Boolean)
    .slice(0, 12)
    .map((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const label = normalizeText(parts[0]);
        const value = normalizeText(parts.slice(1).join(":"));
        return { _key: key(), label, value };
      }
      return { _key: key(), label: line, value: "" };
    });

  if (mapped.length === 0) return null;
  return {
    _type: "dataGrid",
    _key: key(),
    heading: undefined,
    subheading: undefined,
    items: mapped,
    variant: "compact",
  };
}

function extractMetricsDataGrid(root: HTMLElement): PortableBlock | null {
  const headingNode = root
    .querySelectorAll("h2,h3")
    .find((node) => /scale of trust|data as of|assets|units|accounts/i.test(getPlainText(node)));
  if (!headingNode) return null;

  const heading = normalizeText(getPlainText(headingNode));
  const subheadingNode = headingNode.nextElementSibling;
  const subheading = subheadingNode
    ? normalizeText(getPlainText(subheadingNode as unknown as Node))
    : "";

  const mainText = normalizeText(getPlainText(root.querySelector("main")));
  const metricPattern =
    /(PKR\s*\d+(?:\.\d+)?[A-Za-z]*|\d+(?:,\d{3})*(?:\.\d+)?\s*(?:Billion|Million|Trillion)?\+?)\s+([A-Za-z][A-Za-z\s]{3,40}?)(?=(?:\s+(?:PKR\s*\d+|\d+(?:,\d{3})*(?:\.\d+)?\s*(?:Billion|Million|Trillion)?\+?))|$)/gi;
  const metricPairs: Array<{ _key: string; value: string; label: string }> = [];
  let match = metricPattern.exec(mainText);
  while (match) {
    const value = normalizeText(match[1] || "");
    const label = normalizeText(match[2] || "");
    const valueLooksMetric = /(?:pkr|\d)/i.test(value);
    const labelLooksReasonable =
      label.length >= 4 &&
      label.length <= 32 &&
      !/transitioning|execution|integration|mandate/i.test(label);
    if (value && label && valueLooksMetric && labelLooksReasonable) {
      metricPairs.push({ _key: key(), value, label });
    }
    match = metricPattern.exec(mainText);
  }

  if (metricPairs.length >= 2) {
    return {
      _type: "dataGrid",
      _key: key(),
      heading,
      subheading: subheading || undefined,
      variant: "metrics",
      items: metricPairs.slice(0, 6),
    };
  }
  return null;
}

function extractFeaturesDataGrid(root: HTMLElement): PortableBlock | null {
  const headingNode = root
    .querySelectorAll("h2,h3")
    .find((node) => /future[- ]proofing|modernizing|integration|settlement/i.test(getPlainText(node)));
  if (!headingNode) return null;

  const featureItems: Array<{ _key: string; label: string; description: string; icon: string }> =
    [];
  const section = headingNode.closest("section") || headingNode.parentNode;
  if (!section || !("querySelectorAll" in section)) return null;

  const titles = (section as HTMLElement).querySelectorAll("h4,strong");
  for (const titleNode of titles) {
    const label = normalizeText(getPlainText(titleNode));
    if (!label) continue;

    const sibling = titleNode.nextElementSibling;
    const description = sibling
      ? normalizeText(getPlainText(sibling as unknown as Node))
      : "";
    if (!description) continue;

    featureItems.push({
      _key: key(),
      label,
      description,
      icon: "•",
    });
  }

  if (featureItems.length < 2) return null;
  return {
    _type: "dataGrid",
    _key: key(),
    heading: normalizeText(getPlainText(headingNode)),
    variant: "features",
    items: featureItems.slice(0, 12),
  };
}

function extractDataGridFromTable(tableEl: HTMLElement): PortableBlock | null {
  const rows = tableEl.querySelectorAll("tr");
  const items = rows
    .map((row) => row.querySelectorAll("th,td"))
    .filter((cols) => cols.length >= 1)
    .map((cols) => ({
      _key: key(),
      label: normalizeText(cols[0]?.textContent || ""),
      value: normalizeText(cols[1]?.textContent || ""),
      description: normalizeText(cols[2]?.textContent || ""),
    }))
    .filter((row) => row.label)
    .slice(0, 12);

  if (items.length === 0) return null;
  return {
    _type: "dataGrid",
    _key: key(),
    variant: "metrics",
    items,
  };
}

function extractAccordion(detailsEls: HTMLElement[]): PortableBlock | null {
  if (detailsEls.length === 0) return null;
  const items = detailsEls
    .map((node) => {
      const title = normalizeText(getPlainText(node.querySelector("summary")));
      const bodyText = normalizeText(node.textContent.replace(title, ""));
      if (!title || !bodyText) return null;
      return {
        _key: key(),
        title,
        body: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [{ _type: "span", _key: key(), text: bodyText, marks: [] }],
          },
        ],
      };
    })
    .filter(Boolean);

  if (items.length === 0) return null;
  return {
    _type: "accordion",
    _key: key(),
    heading: "Frequently asked questions",
    items,
    variant: "faq",
  };
}

function extractCta(root: HTMLElement): PortableBlock | null {
  const links = root.querySelectorAll("a[href]");
  if (links.length === 0) return null;

  const actions = links
    .map((link) => {
      const label = normalizeText(getPlainText(link));
      const url = link.getAttribute("href")?.trim() || "";
      if (!label || !url || !/^https?:\/\//i.test(url)) return null;
      return { _key: key(), label, url, style: "primary" as const };
    })
    .filter(Boolean)
    .slice(0, 3);

  if (actions.length === 0) return null;
  const headingNode =
    root.querySelector("footer h2, footer h3, section h2, section h3") ||
    root.querySelector("h2, h3");
  const headingText = normalizeText(getPlainText(headingNode));

  return {
    _type: "callToAction",
    _key: key(),
    heading: isLikelyCtaHeading(headingText) ? headingText : "Take the next step",
    body: undefined,
    actions,
    variant: "default",
  };
}

function extractVideoEmbeds(root: HTMLElement): PortableBlock[] {
  const iframeEmbeds = root.querySelectorAll("iframe[src]");
  const linkEmbeds = root.querySelectorAll('a[href*="youtube.com"], a[href*="youtu.be"], a[href*="vimeo.com"]');
  const urls = new Set<string>();

  for (const iframe of iframeEmbeds) {
    const src = iframe.getAttribute("src")?.trim();
    if (src && /^https?:\/\//i.test(src)) urls.add(src);
  }
  for (const link of linkEmbeds) {
    const href = link.getAttribute("href")?.trim();
    if (href && /^https?:\/\//i.test(href)) urls.add(href);
  }

  return [...urls].map((url) => ({
    _type: "videoEmbed",
    _key: key(),
    url,
    title: undefined,
    caption: undefined,
  }));
}

function extractSections(root: HTMLElement, blocks: PortableBlock[]): PortableBlock[] {
  const candidates = root.querySelectorAll("section.content-block, main section");
  const sectionBlocks: PortableBlock[] = [];
  for (const sectionEl of candidates) {
    const heading = normalizeText(
      getPlainText(sectionEl.querySelector("h2")) ||
        getPlainText(sectionEl.querySelector("h3"))
    );
    const paragraphs = sectionEl
      .querySelectorAll("p")
      .map((p) => normalizeText(p.textContent || ""))
      .filter(Boolean);

    if (!heading || paragraphs.length < 2) continue;

    const body = paragraphs.map((p) => ({
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: p, marks: [] }],
    }));

    sectionBlocks.push({
      _type: "section",
      _key: key(),
      heading,
      body,
      variant: /real[- ]time|oversight|critical|important|trust/i.test(heading)
        ? "highlight"
        : "default",
    });
  }

  // Keep section blocks only if we found at least one; otherwise keep base blocks untouched.
  if (sectionBlocks.length === 0) return blocks;
  return [...sectionBlocks, ...blocks];
}

function extractHighlightSection(root: HTMLElement): PortableBlock | null {
  const headingNode = root
    .querySelectorAll("h2,h3")
    .find((node) => /real[- ]time oversight/i.test(getPlainText(node)));
  if (!headingNode) return null;
  const heading = normalizeText(getPlainText(headingNode));

  const intro = headingNode.nextElementSibling
    ? normalizeText(getPlainText(headingNode.nextElementSibling as unknown as Node))
    : "";
  const listNode =
    headingNode.parentNode && "querySelector" in headingNode.parentNode
      ? (headingNode.parentNode as HTMLElement).querySelector("ul")
      : null;
  const listItems = listNode
    ? listNode
        .querySelectorAll("li")
        .map((li) => normalizeText(getPlainText(li)))
        .filter(Boolean)
    : [];

  if (!intro && listItems.length === 0) return null;

  const body: PortableBlock[] = [];
  if (intro) body.push(makeTextBlock(intro, "normal"));
  for (const item of listItems) {
    body.push(makeTextBlock(item, "normal", { listItem: "bullet", level: 1 }));
  }

  return {
    _type: "section",
    _key: key(),
    heading,
    body,
    variant: "highlight",
  };
}

function removeDuplicatedTextBlocks(blocks: PortableBlock[]): PortableBlock[] {
  const consumed = new Set<string>();
  for (const block of blocks) {
    if (block._type === "section" && Array.isArray(block.body)) {
      const headingText = normalizeText(String(block.heading || ""));
      if (headingText) consumed.add(headingText.toLowerCase());
      for (const bodyBlock of block.body) {
        const children = Array.isArray((bodyBlock as PortableBlock).children)
          ? ((bodyBlock as PortableBlock).children as Array<{ text?: string }>)
          : [];
        for (const child of children) {
          const text = normalizeText(child.text || "");
          if (text) consumed.add(text.toLowerCase());
        }
      }
    }
    if (block._type === "dataGrid" && Array.isArray(block.items)) {
      const headingText = normalizeText(String(block.heading || ""));
      if (headingText) consumed.add(headingText.toLowerCase());
      const subheadingText = normalizeText(String(block.subheading || ""));
      if (subheadingText) consumed.add(subheadingText.toLowerCase());
      for (const item of block.items as Array<{ label?: string; value?: string; description?: string }>) {
        for (const piece of [item.label, item.value, item.description]) {
          const text = normalizeText(piece || "");
          if (text) consumed.add(text.toLowerCase());
        }
      }
    }
  }

  return blocks.filter((block) => {
    if (block._type !== "block") return true;
    const children = Array.isArray(block.children)
      ? (block.children as Array<{ text?: string }>)
      : [];
    const text = normalizeText(children.map((child) => child.text || "").join(" "));
    if (!text) return false;
    return !consumed.has(text.toLowerCase());
  });
}

function withConversionProfiles(root: HTMLElement, blocks: PortableBlock[]): PortableBlock[] {
  const out = [...blocks];

  const highlightSection = extractHighlightSection(root);
  if (highlightSection) out.push(highlightSection);

  const details = root.querySelectorAll("details");
  const accordion = extractAccordion(details);
  if (accordion) out.unshift(accordion);

  const table = root.querySelector("table");
  const tableGrid = table ? extractDataGridFromTable(table) : null;
  if (tableGrid) out.unshift(tableGrid);

  const listGrid = root.querySelector("ul,ol");
  const metricGrid = listGrid ? extractDataGridFromList(listGrid) : null;
  if (metricGrid) out.unshift(metricGrid);
  const smartMetrics = extractMetricsDataGrid(root);
  if (smartMetrics) out.unshift(smartMetrics);
  const featuresGrid = extractFeaturesDataGrid(root);
  if (featuresGrid) out.push(featuresGrid);

  const cta = extractCta(root);
  if (cta) out.push(cta);

  const videoBlocks = extractVideoEmbeds(root);
  if (videoBlocks.length > 0) out.push(...videoBlocks);

  const withSections = extractSections(root, out);
  return removeDuplicatedTextBlocks(withSections);
}

export function convertHtmlToMahaanaPortableText(
  html: string,
  options: ConvertHtmlOptions = {}
): ConvertHtmlResult {
  const root = parse(html);
  const meta = extractMeta(root);
  const baseBlocks = htmlToPortableText(html, {
    schema,
    parseHtml: (value) => new JSDOM(value).window.document,
    whitespaceMode: "normalize",
  }) as PortableBlock[];

  const profiledBlocks = options.includeProfiles === false
    ? baseBlocks
    : withConversionProfiles(root, baseBlocks);
  const normalized = normalizeBlocks(profiledBlocks);

  const bodyHtml = normalized.filter((block) => {
    if (block._type !== "block") return true;
    const children = Array.isArray(block.children) ? block.children : [];
    return children.some((child) => {
      const text = (child as { text?: string }).text || "";
      return text.trim().length > 0;
    });
  });

  return { meta, bodyHtml };
}

