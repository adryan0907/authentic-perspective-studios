"use client";

import Image from "next/image";
import { cx } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

export type FilmstripFrame = {
  src: string;
  alt: string;
  label?: string;
};

/**
 * A continuously moving strip of film frames, used by the Film discipline.
 * Pure CSS animation, paused entirely under reduced motion.
 */
export function Filmstrip({
  frames,
  className,
}: {
  frames: FilmstripFrame[];
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const loop = [...frames, ...frames];

  return (
    <div aria-hidden className={cx("overflow-hidden py-2", className)}>
      <div
        className={cx("flex w-max gap-2", !reducedMotion && "animate-marquee")}
      >
        {loop.map((frame, i) => (
          <div
            key={`${frame.src}-${i}`}
            className="border-line bg-ink-2 relative aspect-video w-40 shrink-0 overflow-hidden border md:w-52"
          >
            <Image
              src={frame.src}
              alt=""
              fill
              sizes="208px"
              className="object-cover"
            />
            {/* Soft grade + sprocket readability */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
            />
            {/* Sprocket holes */}
            <div className="absolute inset-x-0 top-1 z-10 flex justify-between px-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <span
                  key={j}
                  className="bg-bone/35 block h-1 w-2 rounded-[1px]"
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-1 z-10 flex justify-between px-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <span
                  key={j}
                  className="bg-bone/35 block h-1 w-2 rounded-[1px]"
                />
              ))}
            </div>
            {frame.label && (
              <span className="text-bone/80 absolute bottom-4 left-3 z-10 font-mono text-[0.55rem] tracking-widest uppercase">
                {frame.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
