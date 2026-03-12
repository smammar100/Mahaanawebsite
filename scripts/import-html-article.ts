/**
 * Import an HTML blog post file into Sanity as an Article (investorEducationArticle).
 *
 * Prerequisites:
 * - .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   and SANITY_WRITE_TOKEN or SANITY_API_WRITE_TOKEN.
 *
 * Usage:
 *   npm run import:html -- "path/to/post.html"
 *   npx tsx scripts/import-html-article.ts "path/to/post.html"
 */

import { createClient } from "@sanity/client";
import parse, { NodeType } from "node-html-parser";
import type { HTMLElement, Node } from "node-html-parser";
import { readFileSync } from "fs";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token =
  process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_WRITE_TOKEN or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

function key(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

type BlockChild = { _type: "span"; _key: string; text: string; marks?: string[] };
type PortableBlock = {
  _type: "block";
  _key: string;
  style?: string;
  listItem?: string;
  level?: number;
  markDefs: unknown[];
  children: BlockChild[];
};

function span(text: string, marks?: string[]): BlockChild {
  const t = text.trim();
  if (!t) return null as unknown as BlockChild;
  return {
    _type: "span",
    _key: key(),
    text: t,
    ...(marks?.length ? { marks } : {}),
  };
}

function block(
  style: string,
  children: BlockChild[],
  opts?: { listItem?: string; level?: number }
): PortableBlock {
  const filtered = children.filter(Boolean);
  if (filtered.length === 0) {
    filtered.push(span(" "));
  }
  const b: PortableBlock = {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: filtered,
  };
  if (opts?.listItem) b.listItem = opts.listItem;
  if (opts?.level != null) b.level = opts.level;
  return b;
}

function getPlainText(el: Node | null | undefined): string {
  if (!el) return "";
  return (el.textContent ?? (el as { text?: string }).text ?? "").trim();
}

function extractSpans(node: Node): BlockChild[] {
  const spans: BlockChild[] = [];
  const childNodes = node.childNodes ?? [];
  let currentText = "";

  for (const child of childNodes) {
    if (child.nodeType === NodeType.TEXT_NODE) {
      const text = (child as { text?: string }).text ?? "";
      currentText += text;
      continue;
    }
    if (child.nodeType !== NodeType.ELEMENT_NODE) continue;
    const c = child as HTMLElement;
    const tag = (c.tagName ?? "").toUpperCase();
    if (tag === "STRONG") {
      if (currentText) {
        spans.push(span(currentText));
        currentText = "";
      }
      const strongText = getPlainText(c);
      if (strongText) spans.push(span(strongText, ["strong"]));
      continue;
    }
    if (tag === "EM") {
      if (currentText) {
        spans.push(span(currentText));
        currentText = "";
      }
      const emText = getPlainText(c);
      if (emText) spans.push(span(emText, ["em"]));
      continue;
    }
    if (tag === "A" || tag === "SPAN") {
      const nested = extractSpans(c);
      if (nested.length) {
        if (currentText) {
          spans.push(span(currentText));
          currentText = "";
        }
        spans.push(...nested);
      }
      continue;
    }
    currentText += getPlainText(c);
  }
  if (currentText) spans.push(span(currentText));
  return spans;
}

interface Meta {
  title: string;
  author: string;
  readingTime: string;
  excerpt: string;
}

function getMeta(root: HTMLElement): Meta {
  const titleEl = root.querySelector("title");
  let title = titleEl ? getPlainText(titleEl) : "";
  const h1 = root.querySelector("h1");
  if (!title && h1) title = getPlainText(h1);
  if (!title) title = "Untitled";

  let author = "";
  let readingTime = "";
  const main = root.querySelector("main");
  if (main) {
    const raw = (main as { rawText?: string }).rawText ?? main.textContent ?? "";
    const byMatch = raw.match(/By\s+([^\n·•]+)/);
    if (byMatch) author = byMatch[1].trim();
    const minReadMatch = raw.match(/(\d+\s*Min\s*Read)/i);
    if (minReadMatch) readingTime = minReadMatch[1].trim();
  }
  if (!readingTime) readingTime = "5 Min Read";

  let excerpt = "";
  const firstContentBlock = root.querySelector(".content-block p, main section p");
  if (firstContentBlock) excerpt = getPlainText(firstContentBlock);
  if (excerpt.length > 200) excerpt = excerpt.slice(0, 197) + "...";

  return { title, author, readingTime, excerpt };
}

function getContentSections(root: HTMLElement): HTMLElement[] {
  const sections = root.querySelectorAll("section.content-block");
  if (sections.length) return sections;
  const main = root.querySelector("main");
  if (!main) return [];
  const secs = main.querySelectorAll("section");
  if (secs.length) return secs;
  return [main];
}

function flattenToParagraphs(el: HTMLElement): string[] {
  const texts: string[] = [];
  const tag = (el.tagName ?? "").toUpperCase();
  if (tag === "P") {
    const t = getPlainText(el);
    if (t) texts.push(t);
    return texts;
  }
  const divs = el.querySelectorAll("p");
  for (const p of divs) texts.push(getPlainText(p));
  if (texts.length === 0) {
    const t = getPlainText(el);
    if (t) texts.push(t);
  }
  return texts;
}

function htmlToPortableText(root: HTMLElement): PortableBlock[] {
  const blocks: PortableBlock[] = [];
  const sections = getContentSections(root);

  for (const section of sections) {
    const direct = section.childNodes ?? [];
    const toProcess: HTMLElement[] = [];
    for (const node of direct) {
      if (node.nodeType !== NodeType.ELEMENT_NODE) continue;
      const el = node as HTMLElement;
      const tag = (el.tagName ?? "").toUpperCase();
      if (["H2", "H3", "H4", "P", "UL", "DIV"].includes(tag)) toProcess.push(el);
    }

    for (const el of toProcess) {
      const tag = (el.tagName ?? "").toUpperCase();

      if (tag === "H2") {
        blocks.push(block("h2", [span(getPlainText(el))]));
        continue;
      }
      if (tag === "H3" || tag === "H4") {
        blocks.push(block("h3", [span(getPlainText(el))]));
        continue;
      }
      if (tag === "P") {
        const children = extractSpans(el);
        if (children.length) blocks.push(block("normal", children));
        continue;
      }
      if (tag === "UL") {
        const items = el.querySelectorAll("li");
        for (const li of items) {
          const children = extractSpans(li);
          if (children.length) blocks.push(block("normal", children, { listItem: "bullet", level: 1 }));
        }
        continue;
      }
      if (tag === "DIV") {
        const h3 = el.querySelector("h3");
        const h4 = el.querySelector("h4");
        if (h3) blocks.push(block("h3", [span(getPlainText(h3))]));
        if (h4) blocks.push(block("h3", [span(getPlainText(h4))]));
        const paras = flattenToParagraphs(el);
        for (const p of paras) {
          if (p) blocks.push(block("normal", [span(p)]));
        }
        const listItems = el.querySelectorAll("ul li");
        for (const li of listItems) {
          const children = extractSpans(li);
          if (children.length) blocks.push(block("normal", children, { listItem: "bullet", level: 1 }));
        }
      }
    }
  }

  if (blocks.length === 0) {
    const main = root.querySelector("main");
    if (main) {
      const ps = main.querySelectorAll("p");
      for (const p of ps) {
        const children = extractSpans(p);
        if (children.length) blocks.push(block("normal", children));
      }
    }
  }

  return blocks;
}

async function main() {
  const htmlPath = process.argv[2];
  if (!htmlPath) {
    console.error("Usage: npx tsx scripts/import-html-article.ts <path-to-html-file>");
    process.exit(1);
  }

  const resolved = resolve(htmlPath);
  let html: string;
  try {
    html = readFileSync(resolved, "utf-8");
  } catch (e) {
    console.error("Failed to read file:", resolved, e);
    process.exit(1);
  }

  const root = parse(html);
  const meta = getMeta(root);
  const bodyHtml = htmlToPortableText(root);

  if (bodyHtml.length === 0) {
    console.error("No content blocks found in HTML. Check structure (e.g. section.content-block, main, p, h2, h3, ul).");
    process.exit(1);
  }

  const slugCurrent = slugify(meta.title) || "untitled-" + Date.now();

  const doc = {
    _type: "investorEducationArticle",
    title: meta.title,
    slug: { _type: "slug", current: slugCurrent },
    author: meta.author || undefined,
    readingTime: meta.readingTime || undefined,
    excerpt: meta.excerpt || undefined,
    publishedAt: new Date().toISOString(),
    bodyHtml,
  };

  const result = await client.create(doc);
  console.log("Created document:", result._id);
  console.log("Slug:", slugCurrent);
  console.log("View in Studio: Articles →", meta.title);
  console.log("View on site: /investor-education/" + slugCurrent);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
