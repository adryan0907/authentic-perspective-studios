"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { distance, duration, easing, inView } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Generic entrance reveal for blocks of content. */
export function FadeIn({
  children,
  delay = 0,
  className,
  y = distance.md,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: duration.base, ease: easing.out, delay }}
    >
      {children}
    </motion.div>
  );
}
