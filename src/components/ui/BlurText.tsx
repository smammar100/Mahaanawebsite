"use client";

import { motion, type Transition } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  id?: string;
  /** Root element for the animated text. Default "p". Use "h3" for heading semantics. */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  animateBy?: "words" | "letters" | "lines";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  id,
  as: Tag = "p",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = useMemo(() => {
    if (animateBy === "lines") return text.split("\n").filter(Boolean);
    if (animateBy === "words") return text.split(" ");
    return text.split("");
  }, [text, animateBy]);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!ref.current) return;
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && ref.current) {
            setInView(true);
            observerRef.current?.unobserve(ref.current);
          }
        },
        { threshold, rootMargin }
      );
      observerRef.current.observe(ref.current);
    }, 0);
    return () => {
      clearTimeout(id);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from(
    { length: stepCount },
    (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1))
  );

  return (
    <Tag
      ref={ref as React.Ref<HTMLParagraphElement & HTMLHeadingElement>}
      id={id}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: animateBy === "lines" ? "column" : "row",
      }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            style={{
              display: animateBy === "lines" ? "block" : "inline-block",
              willChange: "transform, filter, opacity",
            }}
          >
            {animateBy === "lines"
              ? segment
              : segment === " "
                ? "\u00A0"
                : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </Tag>
  );
};

export default BlurText;
