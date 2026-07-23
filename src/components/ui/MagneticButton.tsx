"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { spring } from "@/lib/motion";
import { cx } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

const variants = {
  primary:
    "bg-ember text-ink hover:bg-bone focus-visible:bg-bone font-semibold",
  outline:
    "border border-bone/30 text-bone hover:border-ember hover:text-ember font-medium",
} as const;

/**
 * CTA link that subtly leans toward the pointer. Labels stay static and
 * readable — idle motion comes from a soft pulse on primary buttons only.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  cursorLabel,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  /** Custom cursor badge; defaults to the string label when available. */
  cursorLabel?: string;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.soft);
  const sy = useSpring(y, spring.soft);

  const cursor =
    cursorLabel ?? (typeof children === "string" ? children : undefined);

  const onPointerMove = (event: React.PointerEvent) => {
    if (reducedMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={reducedMotion ? undefined : { x: sx, y: sy }}
      className="inline-block max-w-full"
    >
      <Link
        href={href}
        data-cursor={cursor || undefined}
        className={cx(
          "inline-flex min-h-12 max-w-full items-center justify-center whitespace-nowrap rounded-sm px-6 py-3 text-base transition-colors duration-300 sm:px-7",
          variants[variant],
          variant === "primary" && !reducedMotion && "cta-idle-pulse",
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
