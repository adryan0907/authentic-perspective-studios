"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { spring } from "@/lib/motion";
import { cx } from "@/lib/utils";

type Mode = "lens" | "static" | "plain";

/**
 * The signature "Change Your Perspective" interaction.
 *
 * - Desktop (fine pointer): circular lens reveal
 * - Mobile: plain showreel only (no divider / swipe chrome)
 * - Reduced motion: instant swap button
 */
export function PerspectiveLens({
  base,
  reveal,
  baseLabel = "Final grade",
  revealLabel = "Raw footage",
  className,
  onRevealEngage,
}: {
  base: ReactNode;
  reveal: ReactNode;
  baseLabel?: string;
  revealLabel?: string;
  className?: string;
  /** Fires once the visitor first engages the reveal layer (desktop lens). */
  onRevealEngage?: () => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const isMobileViewport = useMediaQuery("(max-width: 767px)");
  const containerRef = useRef<HTMLDivElement>(null);

  const mode: Mode = reducedMotion
    ? "static"
    : isMobileViewport
      ? "plain"
      : finePointer
        ? "lens"
        : "plain";

  const [lensActive, setLensActive] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [revealReady, setRevealReady] = useState(false);

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, spring.soft);
  const sy = useSpring(y, spring.soft);
  const radius = useMotionValue(0);
  const sradius = useSpring(radius, spring.soft);
  const clipPath = useMotionTemplate`circle(${sradius}px at ${sx}px ${sy}px)`;

  const engageReveal = () => {
    if (!revealReady) {
      setRevealReady(true);
      onRevealEngage?.();
    }
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (mode !== "lens" || !containerRef.current) return;
    engageReveal();
    const rect = containerRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    if (!lensActive) {
      setLensActive(true);
      radius.set(Math.min(220, rect.width * 0.16));
    }
  };

  const onPointerLeave = () => {
    if (mode !== "lens") return;
    setLensActive(false);
    radius.set(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cx("absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0">{swapped ? reveal : base}</div>

      {mode === "lens" && revealReady && (
        <motion.div
          aria-hidden
          className="absolute inset-0 will-change-[clip-path]"
          style={{ clipPath }}
        >
          {swapped ? base : reveal}
          <span className="text-bone/70 absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.25em] uppercase">
            {swapped ? baseLabel : revealLabel}
          </span>
        </motion.div>
      )}

      {mode === "static" && (
        <button
          type="button"
          onClick={() => {
            engageReveal();
            setSwapped((s) => !s);
          }}
          className="text-bone/80 border-bone/30 bg-ink/60 hover:border-ember absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-sm border px-4 py-2 font-mono text-xs tracking-widest uppercase"
        >
          View {swapped ? baseLabel.toLowerCase() : revealLabel.toLowerCase()}
        </button>
      )}
    </div>
  );
}
