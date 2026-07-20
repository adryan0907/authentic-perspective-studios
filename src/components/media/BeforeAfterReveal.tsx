"use client";

import { useId, useRef, useState } from "react";
import type { MediaItem } from "@/types/content";
import { aspectToCss } from "@/lib/media";
import { cx } from "@/lib/utils";
import { Media } from "./Media";

/**
 * Accessible before/after comparison. The divider is a real range input, so
 * it works with mouse, touch and keyboard, and needs no motion at all.
 */
export function BeforeAfterReveal({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  label,
  palette,
  className,
}: {
  before: MediaItem;
  after: MediaItem;
  beforeLabel?: string;
  afterLabel?: string;
  label: string;
  palette?: readonly [string, string];
  className?: string;
}) {
  const [position, setPosition] = useState(50);
  const sliderId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const aspect = after.aspect ?? before.aspect ?? "16/9";

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none"
        style={{ aspectRatio: aspectToCss(aspect) }}
      >
        {/* After layer (full) */}
        <div className="absolute inset-0">
          <Media media={{ ...after, aspect }} label={`${label} — after`} palette={palette} />
        </div>

        {/* Before layer, clipped to the slider position */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden
        >
          <Media media={{ ...before, aspect }} label={`${label} — before`} palette={palette} />
        </div>

        {/* Divider */}
        <div
          aria-hidden
          className="bg-bone absolute top-0 bottom-0 w-px"
          style={{ left: `${position}%` }}
        >
          <span className="bg-bone text-ink absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-bold shadow-lg">
            ⇄
          </span>
        </div>

        <span className="text-bone/80 bg-ink/60 absolute top-3 left-3 rounded-xs px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase">
          {beforeLabel}
        </span>
        <span className="text-bone/80 bg-ink/60 absolute top-3 right-3 rounded-xs px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase">
          {afterLabel}
        </span>

        {/* Invisible range input laid over the media drives everything. */}
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()}`}
          className={cx(
            "absolute inset-0 h-full w-full cursor-ew-resize opacity-0",
            "focus-visible:opacity-100 focus-visible:accent-[var(--color-ember)]",
          )}
        />
      </div>
    </div>
  );
}
