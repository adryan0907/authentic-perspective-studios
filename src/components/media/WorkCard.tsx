"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Project, VideoMedia } from "@/types/content";
import { duration, easing, spring } from "@/lib/motion";
import { cx } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Media } from "./Media";
import { AutoplayPreview } from "./AutoplayPreview";

function ambientVideoFor(project: Project): VideoMedia | undefined {
  if (project.previewVideo && !project.previewVideo.placeholder) {
    return project.previewVideo;
  }
  return project.gallery.find(
    (item): item is VideoMedia =>
      item.type === "video" && !item.placeholder,
  );
}

/**
 * Cinematic featured-work card. Motion is scroll- and viewport-driven so it
 * stays alive on mobile (no hover required): mask reveal, parallax cover,
 * slow Ken Burns while in view, and staggered type.
 */
export function WorkCard({
  project,
  index,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
  direction = "up",
}: {
  project: Project;
  index: number;
  sizes?: string;
  className?: string;
  /** Entrance bias — alternates left/right on mobile for editorial rhythm. */
  direction?: "up" | "left" | "right";
}) {
  const reducedMotion = usePrefersReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ambient = ambientVideoFor(project);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [-48, 48],
  );
  const y = useSpring(rawY, spring.soft);

  // Play as soon as the card is on screen — no hover required.
  const showPreview = !reducedMotion && !!ambient && inView;

  const enterX =
    direction === "left" ? -40 : direction === "right" ? 40 : 0;
  const enterY = direction === "up" ? 52 : 28;
  const n = String(index).padStart(2, "0");

  return (
    <motion.div
      className={cx("block", className)}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: enterX, y: enterY }
      }
      whileInView={
        reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -6% 0px" }}
      transition={{ duration: duration.slow, ease: easing.out }}
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
    >
      <Link
        ref={cardRef}
        href={`/work/${project.slug}`}
        data-cursor="View project"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group block"
      >
        <motion.div
          className="relative overflow-hidden"
          initial={
            reducedMotion
              ? false
              : { clipPath: "inset(12% 8% 12% 8%)", scale: 1.04 }
          }
          whileInView={
            reducedMotion
              ? undefined
              : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
          }
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.05, ease: easing.out }}
        >
          <motion.div
            className="relative will-change-transform"
            style={reducedMotion ? undefined : { y }}
            animate={
              reducedMotion
                ? undefined
                : inView
                  ? { scale: [1.05, 1.12, 1.05] }
                  : { scale: 1.05 }
            }
            transition={
              inView && !reducedMotion
                ? { duration: 16, repeat: Infinity, ease: "linear" }
                : { duration: duration.base }
            }
          >
            <div
              className={cx(
                "transition-transform duration-700 ease-[var(--ease-out-soft)]",
                !reducedMotion && "md:group-hover:scale-[1.02]",
              )}
            >
              <Media
                media={project.cover}
                label={project.title}
                palette={project.placeholderPalette}
                sizes={sizes}
              />
            </div>
          </motion.div>

          {ambient && (
            <div
              className={cx(
                "absolute inset-0 transition-opacity duration-500",
                showPreview ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <AutoplayPreview
                media={ambient}
                label={project.title}
                palette={project.placeholderPalette}
                active={showPreview}
                className="h-full"
              />
            </div>
          )}

          <span
            aria-hidden
            className={cx(
              "border-ember/75 pointer-events-none absolute top-3 left-3 h-5 w-5 border-t border-l transition-opacity duration-700",
              inView ? "opacity-100" : "opacity-0",
            )}
          />
          <span
            aria-hidden
            className={cx(
              "border-ember/75 pointer-events-none absolute top-3 right-3 h-5 w-5 border-t border-r transition-opacity duration-700",
              inView ? "opacity-100" : "opacity-0",
            )}
          />
          <span
            aria-hidden
            className={cx(
              "border-ember/75 pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l transition-opacity duration-700",
              inView ? "opacity-100" : "opacity-0",
            )}
          />
          <span
            aria-hidden
            className={cx(
              "border-ember/75 pointer-events-none absolute right-3 bottom-3 h-5 w-5 border-r border-b transition-opacity duration-700",
              inView ? "opacity-100" : "opacity-0",
            )}
          />

          {project.status === "concept" && (
            <span className="bg-ink/70 text-bone/90 absolute top-3 left-3 z-[1] rounded-xs px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase backdrop-blur-sm">
              Studio concept
            </span>
          )}

          <motion.span
            aria-hidden
            initial={false}
            animate={
              inView && !reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 6 }
            }
            transition={{
              duration: duration.base,
              ease: easing.out,
              delay: 0.25,
            }}
            className="bg-ink/60 text-bone pointer-events-none absolute right-3 bottom-3 rounded-xs px-2.5 py-1.5 font-mono text-[0.58rem] tracking-widest uppercase backdrop-blur-sm md:hidden"
          >
            View →
          </motion.span>
        </motion.div>

        <div className="mt-5">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{
              duration: duration.base,
              ease: easing.out,
              delay: 0.1,
            }}
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="text-ember font-mono text-[0.65rem] tracking-[0.2em]">
                {n}
              </span>
              <motion.span
                aria-hidden
                className="bg-ember/70 h-px flex-1 origin-left"
                initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: duration.slow,
                  ease: easing.out,
                  delay: 0.18,
                }}
              />
            </div>

            <h3
              className={cx(
                "text-h3 font-sans font-bold tracking-tight transition-colors duration-300",
                hovered && !reducedMotion ? "text-outline" : "text-bone",
              )}
            >
              {project.title}
            </h3>
            <p className="text-stone mt-1.5 text-sm leading-relaxed">
              {project.description}
            </p>
            <p className="text-meta text-stone/80 mt-2.5 font-mono tracking-widest uppercase">
              {project.categoryLabel} · {project.year}
            </p>
            {project.impact && project.impact.length > 0 && (
              <dl className="border-line mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-4">
                {project.impact.slice(0, 4).map((item) => (
                  <div key={`${item.label}-${item.value}`}>
                    <dt className="text-meta text-stone/70 font-mono tracking-widest uppercase">
                      {item.label}
                    </dt>
                    <dd className="text-bone mt-1 text-sm font-medium">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
