"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type StackMode = "pin" | "flow";

/**
 * Homepage section stacking.
 *
 * - `pin`  — short, roughly one-viewport bands. Sticky so the next section
 *            can slide over them (overflow effect). Safe because content fits.
 * - `flow` — tall bands (work, disciplines, process…). Normal document scroll
 *            so every project / block can be read top-to-bottom, while still
 *            covering whatever pin sits underneath when they arrive.
 */
export function ScrollStage({
  children,
  className,
  zIndex = 1,
  mode = "flow",
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  zIndex?: number;
  mode?: StackMode;
  /** @deprecated Use `mode` instead. */
  stack?: boolean;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const pin = mode === "pin" && !reducedMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: pin
      ? ["start start", "end start"]
      : ["start end", "end start"],
  });

  // Pin panels compress only as the next band covers them.
  const pinScale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.96]);
  const pinOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.55]);

  // Flow sections stay fully readable — only a whisper of fade at edges.
  const flowOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.94, 1],
    [0.92, 1, 1, 0.92],
  );

  if (reducedMotion || !pin) {
    return (
      <motion.section
        ref={ref}
        style={
          reducedMotion
            ? { zIndex }
            : { zIndex, opacity: flowOpacity }
        }
        className={cx("relative", className)}
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <section
      ref={ref}
      style={{ zIndex }}
      className="sticky top-0 isolate"
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
    >
      {/*
        Transforms stay on the inner node — applying them to the sticky
        element itself breaks sticky positioning on Safari.
      */}
      <motion.div
        style={{ scale: pinScale, opacity: pinOpacity }}
        className={cx(
          "origin-top will-change-transform",
          "flex min-h-[100svh] flex-col justify-center",
          className,
        )}
      >
        {children}
      </motion.div>
    </section>
  );
}
