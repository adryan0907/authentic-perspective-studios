"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { spring } from "@/lib/motion";

/**
 * A small brand cursor that grows into a "View project" badge over elements
 * marked with data-cursor="view". Purely decorative: it only renders on
 * fine-pointer devices, disappears with reduced motion, and never replaces
 * the native cursor for interaction.
 */
export function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const enabled = useMediaQuery("(pointer: fine)") && !reducedMotion;
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring.snappy);
  const sy = useSpring(y, spring.snappy);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]",
      );
      setLabel(target?.dataset.cursor ?? null);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[150]"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{ scale: label ? 1 : 0.18, opacity: label ? 1 : 0.9 }}
        transition={{ type: "spring", ...spring.soft }}
        className="bg-ember text-ink flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-[0.6rem] font-semibold tracking-widest uppercase"
      >
        <span style={{ opacity: label ? 1 : 0 }}>{label}</span>
      </motion.div>
    </motion.div>
  );
}
