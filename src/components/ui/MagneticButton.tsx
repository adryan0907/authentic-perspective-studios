"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { spring } from "@/lib/motion";
import { cx } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { isKineticText, KineticLabel } from "./KineticLabel";

const variants = {
  primary:
    "bg-ember text-ink hover:bg-bone focus-visible:bg-bone font-semibold",
  outline:
    "border border-bone/30 text-bone hover:border-ember hover:text-ember font-medium",
} as const;

/**
 * CTA link that subtly leans toward the pointer. Primary buttons can run a
 * quiet kinetic marquee so chrome still breathes when the page is idle.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  kinetic,
  cursorLabel,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  /** Continuous label marquee. Defaults on for primary string labels. */
  kinetic?: boolean;
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

  const useKinetic =
    kinetic ?? (variant === "primary" && isKineticText(children));
  const label = isKineticText(children) ? children : undefined;
  const cursor = cursorLabel ?? label;

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
          "inline-flex min-h-12 max-w-full items-center justify-center overflow-hidden rounded-sm px-7 py-3 text-base transition-colors duration-300",
          variants[variant],
          variant === "primary" && !reducedMotion && "cta-idle-pulse",
          useKinetic && label && "w-56",
          className,
        )}
      >
        {useKinetic && label ? <KineticLabel>{label}</KineticLabel> : children}
      </Link>
    </motion.div>
  );
}
