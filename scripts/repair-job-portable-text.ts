/**
 * Fixes Sanity validation "Expected type String, got Object" on job portable text fields
 * when span `marks` arrays contain objects instead of string keys (invalid portable text).
 * Repairs: keyResponsibilities, requirements, preferredQualifications, benefits.
 *
 * Prerequisites: .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * and SANITY_API_WRITE_TOKEN.
 *
 * Dry run (no writes):
 *   npx tsx scripts/repair-job-portable-text.ts --dry-run
 *
 * Apply fixes:
 *   npx tsx scripts/repair-job-portable-text.ts
 */

import { createClient } from "@sanity/client";
import { randomBytes } from "node:crypto";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

const dryRun = process.argv.includes("--dry-run");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN (or a token with write access)"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const DECORATOR_VALUES = new Set([
  "strong",
  "em",
  "underline",
  "code",
  "strikethrough",
  "highlight",
]);

function randomKey(): string {
  return randomBytes(8).toString("hex");
}

function repairBlock(block: Record<string, unknown>): boolean {
  let changed = false;

  let markDefs: Record<string, unknown>[];
  if (Array.isArray(block.markDefs)) {
    markDefs = [...(block.markDefs as Record<string, unknown>[])];
  } else {
    markDefs = [];
    changed = true;
  }

  const children = block.children;
  if (!Array.isArray(children)) {
    block.markDefs = markDefs;
    return changed;
  }

  const newChildren = children.map((child) => {
    if (!child || typeof child !== "object") return child;
    const c = child as Record<string, unknown>;
    if (c._type !== "span") return child;

    const span = { ...c };
    let spanChanged = false;

    const marks = span.marks;
    const prevMarks = marks;
    if (!Array.isArray(marks)) {
      span.marks = [];
      spanChanged = true;
    } else {
      const newMarks: string[] = [];
      for (const m of marks) {
        if (typeof m === "string") {
          newMarks.push(m);
          continue;
        }
        if (m && typeof m === "object") {
          const o = m as Record<string, unknown>;
          const t = o._type;
          if (typeof t === "string" && DECORATOR_VALUES.has(t)) {
            newMarks.push(t);
            spanChanged = true;
            continue;
          }
          if (t === "link" || t === "internalLink") {
            const key =
              typeof o._key === "string" && o._key ? o._key : `m${randomKey()}`;
            const def = { ...o, _key: key };
            if (!markDefs.some((d) => d._key === key)) {
              markDefs.push(def);
            }
            newMarks.push(key);
            spanChanged = true;
            continue;
          }
          const key = `m${randomKey()}`;
          markDefs.push({ ...o, _key: key });
          newMarks.push(key);
          spanChanged = true;
        }
      }
      if (spanChanged || newMarks.length !== (prevMarks as unknown[]).length) {
        span.marks = newMarks;
      }
    }

    let text = span.text;
    if (typeof text !== "string") {
      if (text == null) span.text = "";
      else if (typeof text === "object") {
        const loc = text as Record<string, unknown>;
        const first = Object.values(loc).find((v) => typeof v === "string");
        span.text = typeof first === "string" ? first : JSON.stringify(text);
      } else span.text = String(text);
      spanChanged = true;
    }

    if (spanChanged) changed = true;
    return span;
  });

  block.children = newChildren;
  block.markDefs = markDefs;
  return changed;
}

function repairPortableTextArray(value: unknown): { next: unknown[]; changed: boolean } {
  if (!Array.isArray(value)) return { next: value as unknown[], changed: false };
  let changed = false;
  const next = value.map((item) => {
    if (!item || typeof item !== "object") return item;
    const o = item as Record<string, unknown>;
    if (o._type !== "block") return item;
    const copy = { ...o };
    if (repairBlock(copy)) changed = true;
    return copy;
  });
  return { next, changed };
}

async function main() {
  const jobs = await client.fetch<
    Array<{
      _id: string;
      keyResponsibilities?: unknown;
      requirements?: unknown;
      preferredQualifications?: unknown;
      benefits?: unknown;
    }>
  >(
    `*[_type == "job"]{ _id, keyResponsibilities, requirements, preferredQualifications, benefits }`
  );

  let patched = 0;
  for (const job of jobs) {
    const fields: Record<string, unknown> = {};
    let docChanged = false;

    for (const name of [
      "keyResponsibilities",
      "requirements",
      "preferredQualifications",
      "benefits",
    ] as const) {
      const raw = job[name];
      const { next, changed } = repairPortableTextArray(raw);
      if (changed) {
        fields[name] = next;
        docChanged = true;
      }
    }

    if (!docChanged) continue;

    console.log(`${dryRun ? "[dry-run] Would patch" : "Patching"} ${job._id}`);
    if (!dryRun) {
      await client
        .patch(job._id)
        .set(fields)
        .commit();
    }
    patched += 1;
  }

  console.log(
    dryRun
      ? `Done. ${patched} document(s) would be updated.`
      : `Done. ${patched} document(s) updated. Open each job in Studio and publish if drafts were created.`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
