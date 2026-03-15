import { ReactNode } from "react";
import { cleanCopy } from "@/lib/copy-utils";

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
  defaultWeight: Weight = "semibold"
) {
  const Tag = as;
  return function TypographyComponent({
    children,
    className = "",
    weight = defaultWeight,
    id,
  }: TypographyProps) {
    const polished =
      typeof children === "string"
        ? cleanCopy(children, { fixWidows: false })
        : children;
    return (
      <Tag id={id} className={`${weightMap[weight]} ${className}`.trim()}>
        {polished}
      </Tag>
    );
  };
}

function withText(
  baseClass: string,
  defaultWeight: Weight = "normal"
) {
  return function TypographyComponent({
    children,
    className = "",
    weight = defaultWeight,
  }: TypographyProps) {
    const polished =
      typeof children === "string" ? cleanCopy(children) : children;
    return (
      <span className={`${baseClass} ${weightMap[weight]} ${className}`.trim()}>
        {polished}
      </span>
    );
  };
}

/* Heading components: size/line-height/font-family come from globals.css base styles; only weight and color/spacing via className are applied here. */
export const H1 = withHeading("h1", "semibold");
export const H2 = withHeading("h2", "bold");
export const H3 = withHeading("h3", "semibold");
export const H4 = withHeading("h4", "semibold");
export const H5 = withHeading("h5", "semibold");
export const H6 = withHeading("h6", "semibold");

/* Text components: use global body-text classes from globals.css; only weight and color/spacing via className. */
export const TextLarge = withText("text-body-lg");
export const TextMedium = withText("text-body-md");
export const TextRegular = withText("text-body");
export const TextSmall = withText("text-body-sm");
export const TextTiny = withText("text-body-xs");
export const Tagline = withText("text-body");
