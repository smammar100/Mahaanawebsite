import { cx } from "@/utils/cx";

/**
 * Merges class names with Tailwind merge. Accepts strings and falsy values (filtered out).
 * Used by shadcn-style components.
 */
export function cn(
  ...inputs: (string | undefined | false | null)[]
): string {
  return cx(...(inputs.filter(Boolean) as string[]));
}
