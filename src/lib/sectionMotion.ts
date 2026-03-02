/**
 * Shared Framer Motion config for section entrance animations.
 * Used by section components and AnimatedSection for consistent subtle fade-in + slide-up.
 */

export const sectionFadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const;

export const sectionViewport = {
  once: true,
  amount: 0.15,
} as const;
