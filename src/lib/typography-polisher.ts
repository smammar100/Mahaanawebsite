/**
 * Typography polisher — smart punctuation, dash normalization, whitespace cleanup.
 * Designed to run before widow/hyphen steps in copy-utils (order: whitespace → dashes → compound hyphens → smart punctuation → widows).
 * Do not apply inside code blocks, backticks, or URLs.
 */

const EM_DASH = "\u2014";
const EN_DASH = "\u2013";
const LEFT_DOUBLE = "\u201C";
const RIGHT_DOUBLE = "\u201D";
const LEFT_SINGLE = "\u2018";
const RIGHT_SINGLE = "\u2019";
const APOSTROPHE = "\u2019";
const ELLIPSIS = "\u2026";
const MULTIPLICATION = "\u00D7";

/**
 * Protect URLs and backtick-wrapped code with placeholders so we don't modify them.
 */
function protectSensitive(
  text: string,
  fn: (t: string) => string
): string {
  const placeholders: string[] = [];
  const urlOrCode = /https?:\/\/[^\s]+|`[^`]+`/g;
  let out = text.replace(urlOrCode, (match) => {
    placeholders.push(match);
    return `\u0000\u0001${placeholders.length - 1}\u0000`;
  });
  out = fn(out);
  out = out.replace(/\u0000\u0001(\d+)\u0000/g, (_, i) => placeholders[Number(i)] ?? "");
  return out;
}

/**
 * 1. Whitespace cleanup: collapse double spaces, trim, remove space before punctuation, collapse multiple newlines.
 */
export function whitespaceCleanup(text: string): string {
  if (!text || typeof text !== "string") return text;
  return (
    text
      .replace(/\t/g, " ")
      .replace(/  +/g, " ")
      .replace(/\s+([.,;:!?])/g, "$1")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

/**
 * 2. Dash normalization: -- → em dash, spaced hyphen → em dash, number-number → en dash.
 * Skip inside placeholders (URLs/code).
 */
export function dashNormalization(text: string): string {
  if (!text || typeof text !== "string") return text;
  return protectSensitive(text, (t) => {
    return t
      .replace(/ -- /g, ` ${EM_DASH} `)
      .replace(/ - /g, ` ${EM_DASH} `)
      .replace(/(\d)-(\d)/g, `$1${EN_DASH}$2`)
      .replace(/(\b[a-zA-Z]+)-([a-zA-Z]+\b)/g, (m, a, b) => {
        if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun|am|pm)$/i.test(a) && /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun|am|pm)$/i.test(b)) {
          return `${a}${EN_DASH}${b}`;
        }
        return m;
      });
  });
}

/**
 * 3. Smart punctuation: straight quotes → curly, apostrophe, ... → …, (c)→©, (r)→®, (tm)→™, 3x5→3×5.
 */
export function smartPunctuation(text: string): string {
  if (!text || typeof text !== "string") return text;
  return protectSensitive(text, (t) => {
    let out = t;
    out = out.replace(/\.\.\./g, ELLIPSIS);
    out = out.replace(/\(c\)/gi, "©");
    out = out.replace(/\(r\)/gi, "®");
    out = out.replace(/\(tm\)/gi, "™");
    out = out.replace(/(\d)\s*[xX]\s*(\d)/g, `$1${MULTIPLICATION}$2`);
    out = out.replace(/"([^"]*)"/g, `${LEFT_DOUBLE}$1${RIGHT_DOUBLE}`);
    out = out.replace(/'([^']*)'/g, `${LEFT_SINGLE}$1${RIGHT_SINGLE}`);
    out = out.replace(/([a-zA-Z])'([a-zA-Z])/g, `$1${APOSTROPHE}$2`);
    return out;
  });
}
