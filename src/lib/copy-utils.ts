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
 * Aligned with Typography-polisher skill (smammar100/Typography-polisher).
 */
const COMPOUND_PATTERNS: [RegExp, string][] = [
  [/state-of-the-art/gi, "state of the art"],
  [/step-by-step/gi, "step by step"],
  [/end-to-end/gi, "end to end"],
  [/day-to-day/gi, "day to day"],
  [/face-to-face/gi, "face to face"],
  [/one-time/gi, "one time"],
  [/round-the-clock/gi, "round the clock"],
  [/well-known/gi, "well known"],
  [/well-defined/gi, "well defined"],
  [/well-designed/gi, "well designed"],
  [/well-established/gi, "well established"],
  [/well-suited/gi, "well suited"],
  [/high-quality/gi, "high quality"],
  [/high-level/gi, "high level"],
  [/high-speed/gi, "high speed"],
  [/high-risk/gi, "high risk"],
  [/high-end/gi, "high end"],
  [/high-yield/gi, "high yield"],
  [/long-term/gi, "long term"],
  [/long-lasting/gi, "long lasting"],
  [/long-running/gi, "long running"],
  [/short-term/gi, "short term"],
  [/real-time/gi, "real time"],
  [/real-world/gi, "real world"],
  [/user-friendly/gi, "user friendly"],
  [/first-class/gi, "first class"],
  [/first-hand/gi, "first hand"],
  [/second-hand/gi, "second hand"],
  [/full-time/gi, "full time"],
  [/part-time/gi, "part time"],
  [/low-cost/gi, "low cost"],
  [/low-risk/gi, "low risk"],
  [/best-known/gi, "best known"],
  [/better-known/gi, "better known"],
  [/tax-efficient/gi, "tax efficient"],
  [/Shariah-compliant/g, "Shariah compliant"],
  [/shariah-compliant/gi, "shariah compliant"],
  [/Shari'ah-compliant/gi, "Shari'ah compliant"],
  [/shari'ah-compliant/gi, "shari'ah compliant"],
  [/fixed-income/gi, "fixed income"],
  [/expert-curated/gi, "expert curated"],
  [/institutional-level/gi, "institutional level"],
  [/digital-only/gi, "digital only"],
  [/ice-cream/gi, "ice cream"],
  [/income-tax/gi, "income tax"],
  [/risk-free/gi, "risk free"],
  [/world-class/gi, "world class"],
  [/up-to-date/gi, "up to date"],
  [/hands-on/gi, "hands on"],
  [/built-in/gi, "built in"],
  [/so-called/gi, "so called"],
  [/old-fashioned/gi, "old fashioned"],
  [/middle-class/gi, "middle class"],
  [/ready-made/gi, "ready made"],
  [/cost-effective/gi, "cost effective"],
  [/data-driven/gi, "data driven"],
  [/brand-new/gi, "brand new"],
  [/cutting-edge/gi, "cutting edge"],
  [/decision-making/gi, "decision making"],
  [/forward-looking/gi, "forward looking"],
  [/in-depth/gi, "in depth"],
  [/in-house/gi, "in house"],
  [/large-scale/gi, "large scale"],
  [/next-generation/gi, "next generation"],
  [/open-ended/gi, "open ended"],
  [/open-minded/gi, "open minded"],
  [/problem-solving/gi, "problem solving"],
  [/time-consuming/gi, "time consuming"],
  [/top-level/gi, "top level"],
  [/top-notch/gi, "top notch"],
  [/value-added/gi, "value added"],
  [/wide-ranging/gi, "wide ranging"],
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
