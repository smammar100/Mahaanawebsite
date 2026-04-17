/**
 * Whether a key-fact row should span both columns in a 2-column grid (long label/value).
 */
export function keyFactSpansFullRow(label: string, value: string): boolean {
  const v = (value ?? "").trim();
  const l = (label ?? "").trim();
  if (!l && !v) return false;
  if (v.includes("|")) return true;
  if (l.length >= 42) return true;
  if (v.length >= 48) return true;
  if (l.length + v.length >= 82) return true;
  return false;
}
