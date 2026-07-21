"use client";

import { useState } from "react";
import Image from "next/image";
import { cx } from "@/lib/utils";

export type ContactSheetFrame = {
  src: string;
  alt: string;
  label?: string;
};

/**
 * A photographer's contact sheet: a grid of small frames where hovering or
 * focusing marks a frame as the "select" with a grease-pencil style ring.
 * Works with keyboard focus and touch taps as well as hover.
 */
export function ContactSheet({
  frames,
  className,
}: {
  frames: ContactSheetFrame[];
  className?: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={cx("grid grid-cols-3 gap-1.5 sm:grid-cols-4", className)}>
      {frames.map((frame, i) => {
        const active = selected === i;
        return (
          <button
            key={`${frame.src}-${i}`}
            type="button"
            onMouseEnter={() => setSelected(i)}
            onFocus={() => setSelected(i)}
            onClick={() => setSelected(i)}
            aria-label={
              frame.label
                ? `Select frame ${i + 1}: ${frame.label}`
                : `Select frame ${i + 1}`
            }
            aria-pressed={active}
            className="group relative aspect-4/5 overflow-hidden"
          >
            <Image
              src={frame.src}
              alt=""
              fill
              sizes="(min-width: 640px) 12vw, 30vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />
            <span className="text-bone/70 absolute bottom-1 left-1.5 z-10 font-mono text-[0.5rem]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden
              className={cx(
                "border-ember absolute inset-1 z-10 rounded-full border-2 transition-opacity duration-300",
                active ? "opacity-90" : "opacity-0",
              )}
              style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
            />
            <span className="sr-only">{frame.alt}</span>
          </button>
        );
      })}
    </div>
  );
}
