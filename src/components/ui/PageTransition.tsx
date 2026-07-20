"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { duration, easing } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Gentle page-entrance transition, rendered via app/template.tsx so it runs
 * on every route change. Deliberately subtle: content is never blocked and
 * there is no exit animation to delay navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: easing.out }}
    >
      {children}
    </motion.div>
  );
}
