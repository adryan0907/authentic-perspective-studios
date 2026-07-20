"use client";

import { cx } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * A continuously moving strip of film frames, used by the Film discipline.
 * Pure CSS animation, paused entirely under reduced motion.
 */
export function Filmstrip({
  frames,
  className,
}: {
  /** Labels shown inside each frame (e.g. shot descriptions). */
  frames: string[];
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const loop = [...frames, ...frames];

  return (
    <div
      aria-hidden
      className={cx("overflow-hidden py-2", className)}
    >
      <div
        className={cx("flex w-max gap-2", !reducedMotion && "animate-marquee")}
      >
        {loop.map((frame, i) => (
          <div
            key={i}
            className="border-line bg-ink-2 relative aspect-video w-40 shrink-0 border md:w-52"
          >
            {/* Sprocket holes */}
            <div className="absolute inset-x-0 top-1 flex justify-between px-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className="bg-bone/20 block h-1 w-2 rounded-[1px]" />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-1 flex justify-between px-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className="bg-bone/20 block h-1 w-2 rounded-[1px]" />
              ))}
            </div>
            <div
              className="absolute inset-x-0 top-3 bottom-3 mx-1"
              style={{
                background: `linear-gradient(150deg, #241a10 0%, #0e0b08 70%)`,
              }}
            />
            <span className="text-bone/50 absolute bottom-4 left-3 font-mono text-[0.55rem] tracking-widest uppercase">
              {frame}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
