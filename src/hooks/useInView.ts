"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight viewport visibility hook. Use with .section-fade-in-up + .visible for CSS-only entrance.
 * @param threshold fraction of element visible (0–1), default 0.15
 */
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
