"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

/** Offset type accepted by framer-motion useScroll. */
type ScrollOffset = [
  "start" | "end" | "center" | number
    | `${number} ${number}` | `${number} start` | `${number} center` | `${number} end`
    | `start ${number}` | `end ${number}` | `center ${number}`,
  "start" | "end" | "center" | number
    | `${number} ${number}` | `${number} start` | `${number} center` | `${number} end`
    | `start ${number}` | `end ${number}` | `center ${number}`,
];

/**
 * Scroll-blur reveal text (inspired by Codrops ScrollBlurTypography effect 3).
 * Words reveal with blur → sharp and scale as they enter the viewport.
 * @see https://github.com/codrops/ScrollBlurTypography
 */
interface ScrollBlurTextProps {
  children: string;
  className?: string;
  /** Scroll offset: [start, end] as viewport progress. Default: element enters from bottom and reveals by ~40% viewport. */
  offset?: ScrollOffset;
}

const WORD_STAGGER = 0.08;

export function ScrollBlurText({
  children,
  className,
  offset = ["start 0.9", "start 0.35"],
}: ScrollBlurTextProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const segments = children.split(/(\s+)/);
  const totalWords = segments.filter((s) => s.trim().length > 0).length;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset,
  });

  let wordIndex = 0;
  return (
    <span ref={wrapperRef} className={cn("inline-block", className)}>
      {segments.map((segment, i) => {
        const isSpace = /^\s+$/.test(segment);
        if (isSpace) {
          return (
            <span key={i}>{segment === " " ? "\u00A0" : segment}</span>
          );
        }
        const currentWordIndex = wordIndex++;
        return (
          <ScrollBlurWord
            key={i}
            word={segment}
            wordIndex={currentWordIndex}
            totalWords={totalWords}
            scrollYProgress={scrollYProgress}
          />
        );
      })}
    </span>
  );
}

interface ScrollBlurWordProps {
  word: string;
  wordIndex: number;
  totalWords: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function ScrollBlurWord({
  word,
  wordIndex,
  totalWords,
  scrollYProgress,
}: ScrollBlurWordProps) {
  const progress = useTransform(scrollYProgress, (v) => {
    const duration = 1 + (totalWords - 1) * WORD_STAGGER;
    const time = v * duration;
    const wordProgress = (time - wordIndex * WORD_STAGGER) / 1;
    return Math.max(0, Math.min(1, wordProgress));
  });

  const scaleY = useTransform(progress, [0, 1], [0.1, 1]);
  const scaleX = useTransform(progress, [0, 1], [1.8, 1]);
  const filter = useTransform(
    progress,
    [0, 1],
    ["blur(10px) brightness(50%)", "blur(0px) brightness(100%)"],
  );

  return (
    <motion.span
      className="inline-block origin-center will-change-[transform,filter] leading-[48px] tracking-[-1px]"
      style={{
        scaleX,
        scaleY,
        filter,
      }}
    >
      {word}
    </motion.span>
  );
}
