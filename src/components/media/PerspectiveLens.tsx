"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { spring } from "@/lib/motion";
import { cx } from "@/lib/utils";

type Mode = "lens" | "drag" | "static";

/**
 * The signature "Change Your Perspective" interaction.
 *
 * - Fine pointers: the cursor becomes a circular lens that reveals the
 *   alternate layer beneath the base layer.
 * - Touch: a draggable divider compares the two layers.
 * - Reduced motion (or no JS): the base layer is shown, with a simple
 *   button that swaps layers instantly.
 *
 * Both layers are plain ReactNodes so real footage can replace the
 * placeholder compositions without touching this component.
 */
export function PerspectiveLens({
  base,
  reveal,
  baseLabel = "Final grade",
  revealLabel = "Raw footage",
  className,
}: {
  base: ReactNode;
  reveal: ReactNode;
  baseLabel?: string;
  revealLabel?: string;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const containerRef = useRef<HTMLDivElement>(null);
  const mode: Mode = reducedMotion ? "static" : finePointer ? "lens" : "drag";
  const [lensActive, setLensActive] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [dragPosition, setDragPosition] = useState(50);

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, spring.soft);
  const sy = useSpring(y, spring.soft);
  const radius = useMotionValue(0);
  const sradius = useSpring(radius, spring.soft);
  const clipPath = useMotionTemplate`circle(${sradius}px at ${sx}px ${sy}px)`;

  const onPointerMove = (event: React.PointerEvent) => {
    if (mode !== "lens" || !containerRef.current) return;
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
      {/* Base layer */}
      <div className="absolute inset-0">{swapped ? reveal : base}</div>

      {/* Lens reveal — fine pointers only */}
      {mode === "lens" && (
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

      {/* Draggable comparison — touch devices */}
      {mode === "drag" && (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - dragPosition}% 0 0)` }}
          >
            {swapped ? base : reveal}
          </div>
          <div
            aria-hidden
            className="bg-bone/70 absolute top-0 bottom-0 w-px"
            style={{ left: `${dragPosition}%` }}
          >
            <span className="bg-bone text-ink absolute bottom-24 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold">
              ⇄
            </span>
          </div>
          {/* The drag control lives in a bottom band so vertical page
              scrolling over the hero is never hijacked on touch. */}
          <input
            type="range"
            min={0}
            max={100}
            value={dragPosition}
            onChange={(e) => setDragPosition(Number(e.target.value))}
            aria-label={`Compare ${baseLabel.toLowerCase()} with ${revealLabel.toLowerCase()}`}
            className="absolute inset-x-0 bottom-16 z-10 h-24 w-full cursor-ew-resize opacity-0"
            style={{ touchAction: "pan-y" }}
          />
        </>
      )}

      {/* Reduced-motion fallback: instant swap button */}
      {mode === "static" && (
        <button
          type="button"
          onClick={() => setSwapped((s) => !s)}
          className="text-bone/80 border-bone/30 bg-ink/60 hover:border-ember absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-sm border px-4 py-2 font-mono text-xs tracking-widest uppercase"
        >
          View {swapped ? baseLabel.toLowerCase() : revealLabel.toLowerCase()}
        </button>
      )}
    </div>
  );
}
