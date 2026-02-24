"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
}

interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}

export function SparklesCore({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  speed = 1,
  particleColor = "#FFFFFF",
  particleDensity = 500,
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio ?? 1, 2) : 1;

    function resize() {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      if (w === sizeRef.current.w && h === sizeRef.current.h) return;
      sizeRef.current = { w, h };

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = w * h;
      const count = Math.max(80, Math.floor((particleDensity * area) / (400 * 400)));
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: minSize + Math.random() * (maxSize - minSize),
          phase: Math.random() * Math.PI * 2,
          speed: 0.8 + Math.random() * 1.5 * speed,
        });
      }
      particlesRef.current = particles;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    function tick() {
      const { w, h } = sizeRef.current;
      if (w <= 0 || h <= 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.001;

      particlesRef.current.forEach((p) => {
        const alpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * p.speed + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(tick);
    }

    tick();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [background, particleColor, particleDensity, minSize, maxSize, speed]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn("relative h-full w-full", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ background, willChange: "contents" }}
        aria-hidden
      />
    </div>
  );
}
