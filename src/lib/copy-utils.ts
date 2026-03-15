/**
 * Widow & hyphen cleaner + typography polisher for user-facing copy.
 * Pipeline (per Typography-polisher skill): whitespace → dashes → compound hyphens → smart punctuation → widows.
 */

import {
  whitespaceCleanup,
  dashNormalization,
  smartPunctuation,
} from "./typography-polisher";

const NBSP = "\u00A0";

/**
 * Compound phrases to dehyphenate: "word-word" or "word-word-word" → "word word".
 * Order matters: longer phrases first so "state-of-the-art" is matched before "of-the".
 */
const COMPOUND_PATTERNS: [RegExp, string][] = [
  [/state-of-the-art/gi, "state of the art"],
  [/well-known/gi, "well known"],
  [/high-quality/gi, "high quality"],
  [/long-term/gi, "long term"],
  [/short-term/gi, "short term"],
  [/real-time/gi, "real time"],
  [/user-friendly/gi, "user friendly"],
  [/first-class/gi, "first class"],
  [/second-hand/gi, "second hand"],
  [/full-time/gi, "full time"],
  [/part-time/gi, "part time"],
  [/low-cost/gi, "low cost"],
  [/high-speed/gi, "high speed"],
  [/best-known/gi, "best known"],
  [/better-known/gi, "better known"],
  [/tax-efficient/gi, "tax efficient"],
  [/Shariah-compliant/g, "Shariah compliant"],
  [/shariah-compliant/gi, "shariah compliant"],
  [/ice-cream/gi, "ice cream"],
  [/income-tax/gi, "income tax"],
  [/risk-free/gi, "risk free"],
  [/world-class/gi, "world class"],
  [/step-by-step/gi, "step by step"],
  [/one-time/gi, "one time"],
  [/up-to-date/gi, "up to date"],
  [/hands-on/gi, "hands on"],
  [/built-in/gi, "built in"],
  [/so-called/gi, "so called"],
  [/old-fashioned/gi, "old fashioned"],
  [/middle-class/gi, "middle class"],
  [/high-level/gi, "high level"],
  [/low-risk/gi, "low risk"],
  [/high-risk/gi, "high risk"],
  [/long-running/gi, "long running"],
  [/ready-made/gi, "ready made"],
  [/cost-effective/gi, "cost effective"],
  [/data-driven/gi, "data driven"],
];

/**
 * Insert non-breaking space between the second-to-last and last word when paragraph has ≥4 words.
 * Treats existing NBSP as space when finding the last gap. Skips if 1–3 words.
 */
export function fixWidows(text: string): string {
  if (!text || typeof text !== "string") return text;
  const trimmed = text.trim();
  const words = trimmed.replace(/\u00A0/g, " ").split(/\s+/).filter(Boolean);
  if (words.length < 4) return text;
  // Replace the last whitespace run before the final word with NBSP
  const lastWord = words[words.length - 1];
  const escaped = lastWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\s+(${escaped})\\s*$`);
  return trimmed.replace(re, `${NBSP}$1`);
}

/**
 * Replace compound-word hyphens with a space. Does not replace:
 * - prefix-hyphens (re-, non-, co-, etc.)
 * - technical identifiers, proper nouns, em/en dashes, URLs, code.
 */
export function removeCompoundHyphens(text: string): string {
  if (!text || typeof text !== "string") return text;
  // Protect URLs and backtick code so we don't alter them
  const placeholders: string[] = [];
  const urlOrCode = /https?:\/\/[^\s]+|`[^`]+`/g;
  let out = text.replace(urlOrCode, (match) => {
    placeholders.push(match);
    return `\u0000\u0001${placeholders.length - 1}\u0000`;
  });
  for (const [pattern, replacement] of COMPOUND_PATTERNS) {
    out = out.replace(pattern, replacement);
  }
  // Restore protected segments
  out = out.replace(/\u0000\u0001(\d+)\u0000/g, (_, i) => placeholders[Number(i)] ?? "");
  return out;
}

export interface CleanCopyOptions {
  fixWidows?: boolean;
  removeHyphens?: boolean;
  /** Apply full typography polish (whitespace, dashes, smart punctuation). Default true. */
  typographyPolish?: boolean;
}

/**
 * Apply full typography polish and widow/hyphen cleanup.
 * Order: whitespace → dash normalization → compound-hyphen removal → smart punctuation → widow fix.
 */
export function cleanCopy(
  text: string,
  options: CleanCopyOptions = {}
): string {
  if (!text || typeof text !== "string") return text;
  const {
    fixWidows: doWidows = true,
    removeHyphens: doHyphens = true,
    typographyPolish: doPolish = true,
  } = options;
  let out = text;
  if (doPolish) {
    out = whitespaceCleanup(out);
    out = dashNormalization(out);
  }
  if (doHyphens) out = removeCompoundHyphens(out);
  if (doPolish) out = smartPunctuation(out);
  if (doWidows) out = fixWidows(out);
  return out;
}
