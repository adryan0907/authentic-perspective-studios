"use client";

import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Continuous horizontal marquee for short CTA labels. Duplicates the string
 * so the loop is seamless; falls back to a static label under reduced motion.
 * Parent should set a fixed width (and usually overflow-hidden).
 */
export function KineticLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={cx("relative block w-full overflow-hidden", className)}>
      <span className="cta-marquee inline-flex whitespace-nowrap will-change-transform">
        <span className="pr-5">{children}</span>
        <span className="pr-5" aria-hidden>
          {children}
        </span>
        <span className="pr-5" aria-hidden>
          {children}
        </span>
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

/** True when children is a plain string suitable for kinetic labelling. */
export function isKineticText(children: ReactNode): children is string {
  return typeof children === "string" && children.trim().length > 0;
}
