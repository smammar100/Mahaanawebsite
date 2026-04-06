"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import "./Stack.css";

interface CardRotateProps {
  children: React.ReactNode;
  disableDrag?: boolean;
}

function CardRotate({ children, disableDrag = false }: CardRotateProps) {
  if (disableDrag) {
    return <motion.div className="card-rotate-disabled">{children}</motion.div>;
  }

  return <motion.div className="card-rotate">{children}</motion.div>;
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cards?: React.ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
}

export default function Stack({
  randomRotation = false,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const baseCards = useMemo(
    () => cards.map((content, index) => ({ id: index + 1, content })),
    [cards]
  );
  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    baseCards.map((card) => card.id)
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const normalizedOrder = useMemo(() => {
    const baseIds = baseCards.map((card) => card.id);
    const existingIds = cardOrder.filter((id) => baseIds.includes(id));
    const newIds = baseIds.filter((id) => !existingIds.includes(id));
    return [...existingIds, ...newIds];
  }, [baseCards, cardOrder]);

  const stackedCards = useMemo(() => {
    const cardsById = new Map(baseCards.map((card) => [card.id, card]));
    return normalizedOrder
      .map((id) => cardsById.get(id))
      .filter((item): item is { id: number; content: React.ReactNode } => Boolean(item));
  }, [baseCards, normalizedOrder]);

  const rotationOffsets = useMemo(
    () =>
      stackedCards.reduce<Record<number, number>>((acc, card) => {
        if (!randomRotation) {
          acc[card.id] = 0;
          return acc;
        }

        // Stable pseudo-random rotation based on id.
        acc[card.id] = ((card.id * 37) % 11) - 5;
        return acc;
      }, {}),
    [randomRotation, stackedCards]
  );

  const sendToBack = (id: number) => {
    setCardOrder((prev) => {
      const index = prev.findIndex((item) => item === id);
      if (index === -1) return prev;

      const reordered = [...prev];
      const [cardId] = reordered.splice(index, 1);
      reordered.unshift(cardId);
      return reordered;
    });
  };

  useEffect(() => {
    if (!autoplay || stackedCards.length < 2 || isPaused) return;

    const interval = window.setInterval(() => {
      const topCardId = stackedCards[stackedCards.length - 1]?.id;
      if (topCardId != null) {
        sendToBack(topCardId);
      }
    }, autoplayDelay);

    return () => window.clearInterval(interval);
  }, [autoplay, autoplayDelay, isPaused, stackedCards]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stackedCards.map((card, index) => (
        <CardRotate key={card.id} disableDrag={shouldDisableDrag}>
          <motion.div
            className="stack-card"
            onClick={() => shouldEnableClick && sendToBack(card.id)}
            animate={{
              rotateZ: (stackedCards.length - index - 1) * 4 + (rotationOffsets[card.id] ?? 0),
              scale: 1 + index * 0.06 - stackedCards.length * 0.06,
              transformOrigin: "90% 90%",
            }}
            initial={false}
            transition={{
              type: "spring",
              stiffness: animationConfig.stiffness,
              damping: animationConfig.damping,
            }}
            style={{ zIndex: index + 1 }}
          >
            {card.content}
          </motion.div>
        </CardRotate>
      ))}
    </div>
  );
}
