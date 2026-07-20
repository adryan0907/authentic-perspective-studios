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
 * CTA link that subtly leans toward the pointer. The magnetic effect is
 * decorative only — with reduced motion or on touch it is a plain link.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.soft);
  const sy = useSpring(y, spring.soft);

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
      className="inline-block"
    >
      <Link
        href={href}
        className={cx(
          "inline-flex min-h-12 items-center justify-center rounded-sm px-7 py-3 text-base transition-colors duration-300",
          variants[variant],
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
