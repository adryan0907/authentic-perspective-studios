"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cx } from "@/lib/utils";
import { duration, easing } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export type ContactSheetFrame = {
  src: string;
  alt: string;
  label?: string;
};

const ADVANCE_MS = 3000;

/**
 * Press / fashion contact sheet: a featured frame crossfades every 3 seconds,
 * with a selectable strip underneath. Autoplay pauses on hover, focus, or
 * when the sheet leaves the viewport.
 */
export function ContactSheet({
  frames,
  className,
}: {
  frames: ContactSheetFrame[];
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || !inView || frames.length < 2) return;
    const id = window.setInterval(() => {
      setSelected((current) => (current + 1) % frames.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, inView, frames.length]);

  const active = frames[selected] ?? frames[0];
  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className={cx("flex flex-col gap-3", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {/* Featured frame — crossfades every 3s */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-ink-3 sm:aspect-3/4">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={active.src}
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 1.04 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.02 }
            }
            transition={{ duration: duration.base, ease: easing.out }}
            className="absolute inset-0"
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
              priority={selected === 0}
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        />

        <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-meta text-bone/70 font-mono tracking-widest uppercase">
              {String(selected + 1).padStart(2, "0")} /{" "}
              {String(frames.length).padStart(2, "0")}
            </p>
            {(active.label || active.alt) && (
              <p className="text-bone mt-1 line-clamp-1 text-sm">
                {active.label ?? active.alt}
              </p>
            )}
          </div>

          {/* Progress ticks for the 3s cycle */}
          {!reducedMotion && (
            <div className="flex gap-1" aria-hidden>
              {frames.map((_, i) => (
                <span
                  key={i}
                  className={cx(
                    "h-0.5 w-4 overflow-hidden rounded-full bg-bone/25",
                    i === selected && "bg-bone/40",
                  )}
                >
                  {i === selected && inView && !paused && (
                    <motion.span
                      key={`${selected}-progress`}
                      className="bg-ember block h-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: ADVANCE_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact-sheet strip */}
      <div
        className="no-scrollbar flex gap-1.5 overflow-x-auto pb-0.5"
        role="listbox"
        aria-label="Press and fashion frames"
      >
        {frames.map((frame, i) => {
          const isActive = selected === i;
          return (
            <button
              key={`${frame.src}-${i}`}
              type="button"
              role="option"
              aria-selected={isActive}
              onMouseEnter={() => setSelected(i)}
              onFocus={() => setSelected(i)}
              onClick={() => setSelected(i)}
              aria-label={
                frame.label
                  ? `Show frame ${i + 1}: ${frame.label}`
                  : `Show frame ${i + 1}`
              }
              className={cx(
                "relative aspect-4/5 w-[18%] min-w-[4.25rem] shrink-0 overflow-hidden sm:w-[14%] sm:min-w-[4.75rem]",
                isActive ? "opacity-100" : "opacity-55 hover:opacity-85",
              )}
            >
              <Image
                src={frame.src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
              <span
                aria-hidden
                className={cx(
                  "border-ember absolute inset-0.5 border transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
              <span className="sr-only">{frame.alt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
