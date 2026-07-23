"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cx } from "@/lib/utils";

/**
 * Sticky stacking band for the homepage. Each band pins to the top while the
 * next one slides over it — the House of Yellow “overflowing sections” feel.
 *
 * Transforms live on an inner wrapper so `position: sticky` keeps working on
 * mobile Safari and desktop (transforms on the sticky node itself break it).
 */
export function ScrollStage({
  children,
  className,
  zIndex = 1,
  stack = true,
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  /** Stacking order — later homepage bands should pass a higher value. */
  zIndex?: number;
  /** Pin this band so the next section can overflow it. */
  stack?: boolean;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const stacking = stack && !reducedMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Hold full presence while reading; only compress as the next band covers.
  const scale = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 1, 0.5]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.78, 1],
    ["brightness(1)", "brightness(1)", "brightness(0.75)"],
  );

  if (!stacking) {
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
    <section
      ref={ref}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      style={{ zIndex }}
      className="sticky top-0 isolate"
    >
      <motion.div
        style={{ scale, opacity, filter }}
        className={cx(
          "origin-top will-change-transform",
          className,
        )}
      >
        {children}
      </motion.div>
    </section>
  );
}
