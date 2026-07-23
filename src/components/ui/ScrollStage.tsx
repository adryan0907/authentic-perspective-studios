"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cx } from "@/lib/utils";

/**
 * Softens a section when it leaves the viewport centre so the active band
 * stays bright — scroll reads as directed attention rather than a long page.
 */
export function ScrollStage({
  children,
  className,
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
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
    [0, 0.1, 0.22, 0.78, 0.9, 1],
    [0.5, 1, 1, 1, 1, 0.5],
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
      className={cx(className)}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
    >
      {children}
    </motion.section>
  );
}
