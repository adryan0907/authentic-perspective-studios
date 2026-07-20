"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { MediaItem } from "@/types/content";
import { duration } from "@/lib/motion";
import { pad } from "@/lib/utils";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Accessible fullscreen lightbox: Escape closes, arrow keys navigate,
 * horizontal swipes navigate on touch, and focus stays inside while open.
 */
export function PhotoLightbox({
  items,
  index,
  label,
  palette,
  onClose,
  onNavigate,
}: {
  items: MediaItem[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  label: string;
  palette?: readonly [string, string];
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;

  const go = useCallback(
    (direction: 1 | -1) => {
      if (index === null) return;
      onNavigate((index + direction + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, go, onClose]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — image ${index! + 1} of ${items.length}`}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : duration.fast }}
          className="fixed inset-0 z-[140] flex flex-col bg-black/95 outline-none"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-bone/70 font-mono text-xs tracking-widest">
              {pad(index! + 1)} / {pad(items.length)}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-bone hover:text-ember min-h-11 px-2 text-sm tracking-widest uppercase"
            >
              Close
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-16">
            {current.type === "image" && !current.placeholder ? (
              <div className="relative h-full w-full">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full max-w-4xl">
                <MediaPlaceholder
                  label={`${label} — ${current.alt}`}
                  path={current.type === "image" || current.type === "video" ? current.src : current.url}
                  aspect={current.aspect}
                  palette={palette}
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="text-bone/70 hover:text-ember absolute top-1/2 left-1 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-2xl md:flex"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="text-bone/70 hover:text-ember absolute top-1/2 right-1 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-2xl md:flex"
            >
              →
            </button>
          </div>

          {current.caption && (
            <p className="text-stone px-5 pb-5 text-center text-sm">{current.caption}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
