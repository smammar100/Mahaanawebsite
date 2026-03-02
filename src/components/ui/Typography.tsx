import { ReactNode } from "react";

type Weight = "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";

const weightMap: Record<Weight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

interface TypographyProps {
  children: ReactNode;
  className?: string;
  weight?: Weight;
  id?: string;
}

function withHeading(
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  baseClasses: string,
  defaultWeight: Weight = "semibold"
) {
  const Tag = as;
  return function TypographyComponent({
    children,
    className = "",
    weight = defaultWeight,
    id,
  }: TypographyProps) {
    return (
      <Tag
        id={id}
        className={`${baseClasses} ${weightMap[weight]} ${className}`}
      >
        {children}
      </Tag>
    );
  };
}

function withText(baseClasses: string, defaultWeight: Weight = "normal") {
  return function TypographyComponent({
    children,
    className = "",
    weight = defaultWeight,
  }: TypographyProps) {
    return (
      <span className={`${baseClasses} ${weightMap[weight]} ${className}`}>
        {children}
      </span>
    );
  };
}

export const H1 = withHeading(
  "h1",
  "font-heading tracking-heading text-[2.5rem] lg:text-h1 leading-[120%]"
);
export const H2 = withHeading(
  "h2",
  "font-heading tracking-heading text-[2.25rem] lg:text-h2 leading-[120%]"
);
export const H3 = withHeading(
  "h3",
  "font-heading tracking-heading text-[2rem] lg:text-h3 leading-[120%]"
);
export const H4 = withHeading(
  "h4",
  "font-heading tracking-heading text-h4 leading-[140%]",
  "semibold"
);
export const H5 = withHeading(
  "h5",
  "font-heading tracking-heading text-h5 leading-[140%]",
  "semibold"
);
export const H6 = withHeading(
  "h6",
  "font-heading tracking-heading text-h6 leading-[140%]",
  "semibold"
);

export const TextLarge = withText("font-body text-large leading-[150%]");
export const TextMedium = withText("font-body text-medium leading-[150%]");
export const TextRegular = withText("font-body text-regular leading-[150%]");
export const TextSmall = withText("font-body text-small leading-[150%]");
export const TextTiny = withText("font-body text-tiny leading-[150%]");
export const Tagline = withText("font-body text-tagline leading-[150%]");
