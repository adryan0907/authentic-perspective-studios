"use client";

import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Continuous horizontal marquee for short CTA labels.
 * The visible track is absolutely positioned so the tripled copy never
 * expands the document width (critical on mobile).
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
    <span
      className={cx(
        "relative block w-full max-w-full overflow-hidden",
        className,
      )}
    >
      {/* Single invisible copy reserves line box height without widening */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        {children}
      </span>
      <span
        aria-hidden
        className="cta-marquee absolute top-1/2 left-0 inline-flex -translate-y-1/2 whitespace-nowrap will-change-transform"
      >
        <span className="pr-5">{children}</span>
        <span className="pr-5">{children}</span>
        <span className="pr-5">{children}</span>
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

/** True when children is a plain string suitable for kinetic labelling. */
export function isKineticText(children: ReactNode): children is string {
  return typeof children === "string" && children.trim().length > 0;
}
