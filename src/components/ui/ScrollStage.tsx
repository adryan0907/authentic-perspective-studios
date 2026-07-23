"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cx } from "@/lib/utils";

/**
 * Homepage section wrapper. Keeps normal document scroll so every band can be
 * read top-to-bottom; optionally softens slightly as it leaves the viewport.
 */
export function ScrollStage({
  children,
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  /** @deprecated Ignored — kept so existing call sites type-check during cleanup. */
  zIndex?: number;
  /** @deprecated Ignored — sticky stacking was removed for scrollability. */
  stack?: boolean;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1],
    [0.85, 1, 1, 0.85],
  );

  if (reducedMotion) {
    return (
      <section
        ref={ref}
        className={className}
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className={cx("relative", className)}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
    >
      {children}
    </motion.section>
  );
}
