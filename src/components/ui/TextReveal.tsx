"use client";

import type { JSX, ReactNode } from "react";
import { motion } from "motion/react";
import { duration, easing, inView, stagger } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Reveals text line by line as it enters the viewport. Pass an array of
 * strings — each string is one visual line. With reduced motion the text
 * simply fades in as a whole.
 */
export function TextReveal({
  lines,
  as: Tag = "p",
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const MotionTag = motion.create(
    Tag as keyof HTMLElementTagNameMap,
  ) as React.ComponentType<
    Record<string, unknown> & { children?: ReactNode; className?: string }
  >;

  if (reducedMotion) {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ duration: duration.fast }}
      >
        {lines.map((line, i) => (
          <span key={i} className={lineClassName ?? "block"}>
            {line}
          </span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={{ staggerChildren: stagger.base, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={lineClassName ?? "block"}
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration: duration.base, ease: easing.out },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
