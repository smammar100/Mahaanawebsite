"use client";

import { motion } from "motion/react";
import { sectionFadeInUp, sectionViewport } from "@/lib/sectionMotion";
import { cx } from "@/utils/cx";

interface AnimatedSectionProps {
  as?: "section" | "div";
  className?: string;
  children: React.ReactNode;
}

export function AnimatedSection({
  as: Component = "section",
  className,
  children,
}: AnimatedSectionProps) {
  const motionProps = {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: sectionViewport,
    variants: sectionFadeInUp,
    className: cx(className),
  };

  if (Component === "div") {
    return <motion.div {...motionProps}>{children}</motion.div>;
  }
  return <motion.section {...motionProps}>{children}</motion.section>;
}
