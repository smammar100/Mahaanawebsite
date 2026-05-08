import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import { cx } from "@/utils/cx";

export type SectionSize =
  | "default"
  | "compact"
  | "generous"
  | "hero"
  | "none";

export type SectionPosition = "first" | "last" | "middle";

const SIZE_CLASS: Record<Exclude<SectionSize, "none">, string> = {
  default: "section-y",
  compact: "section-y-compact",
  generous: "section-y-generous",
  hero: "pt-[calc(4.5rem+env(safe-area-inset-top,0px)+1.5rem)] pb-10 sm:pb-12 md:pb-14",
};

const POSITION_CLASS: Record<SectionPosition, string> = {
  first: "section-y-first",
  last: "section-y-last",
  middle: "",
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: SectionSize;
  position?: SectionPosition;
  as?: ElementType;
  ref?: Ref<HTMLElement>;
  children: ReactNode;
}

export function Section({
  size = "default",
  position = "middle",
  as: Comp = "section",
  ref,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Comp
      ref={ref}
      className={cx(
        size !== "none" && SIZE_CLASS[size],
        POSITION_CLASS[position],
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
