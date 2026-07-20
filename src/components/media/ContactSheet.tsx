"use client";

import { useState } from "react";
import { cx } from "@/lib/utils";

/**
 * A photographer's contact sheet: a grid of small frames where hovering or
 * focusing marks a frame as the "select" with a grease-pencil style ring.
 * Works with keyboard focus and touch taps as well as hover.
 */
export function ContactSheet({
  frames,
  className,
}: {
  frames: string[];
  className?: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={cx("grid grid-cols-3 gap-1.5 sm:grid-cols-4", className)}>
      {frames.map((frame, i) => {
        const active = selected === i;
        return (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setSelected(i)}
            onFocus={() => setSelected(i)}
            onClick={() => setSelected(i)}
            aria-label={`Select frame ${i + 1}: ${frame}`}
            aria-pressed={active}
            className="group relative aspect-[4/5] overflow-hidden"
          >
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{
                background: `linear-gradient(${140 + i * 27}deg, #26221c 0%, #0e0d0b 75%)`,
              }}
            />
            <span className="text-bone/40 absolute bottom-1 left-1.5 font-mono text-[0.5rem]">
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* Grease-pencil select mark */}
            <span
              aria-hidden
              className={cx(
                "border-ember absolute inset-1 rounded-full border-2 transition-opacity duration-300",
                active ? "opacity-90" : "opacity-0",
              )}
              style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
            />
            <span className="sr-only">{frame}</span>
          </button>
        );
      })}
    </div>
  );
}
