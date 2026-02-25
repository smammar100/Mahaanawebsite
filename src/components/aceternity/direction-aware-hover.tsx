"use client";

import { motion } from "framer-motion";
import React, { useCallback, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface DirectionAwareHoverProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  imageClassName?: string;
}

export function DirectionAwareHover({
  imageUrl,
  children,
  className,
  childrenClassName,
  imageClassName,
}: DirectionAwareHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | "initial"
  >("initial");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = width / 2;
    const centerY = height / 2;

    const angle = Math.atan2(y - centerY, x - centerX);
    const angleDeg = (angle * 180) / Math.PI;

    if (angleDeg >= -45 && angleDeg < 45) {
      setDirection("right");
    } else if (angleDeg >= 45 && angleDeg < 135) {
      setDirection("bottom");
    } else if (angleDeg >= 135 || angleDeg < -135) {
      setDirection("left");
    } else {
      setDirection("top");
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setDirection("initial");
  }, []);

  const getTranslate = () => {
    switch (direction) {
      case "top":
        return "translateY(-100%)";
      case "bottom":
        return "translateY(100%)";
      case "left":
        return "translateX(-100%)";
      case "right":
        return "translateX(100%)";
      default:
        return "translate(0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={cn("group relative size-full overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={imageUrl}
        alt=""
        className={cn("size-full object-cover", imageClassName)}
      />
      <motion.div
        key={direction}
        className={cn(
          "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4",
          childrenClassName,
        )}
        initial={{ opacity: 0, transform: getTranslate() }}
        animate={{
          opacity: direction === "initial" ? 0 : 1,
          transform:
            direction === "initial" ? getTranslate() : "translate(0, 0)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
