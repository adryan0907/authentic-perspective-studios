"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/types/content";
import { cx, pad } from "@/lib/utils";
import { Media } from "./Media";
import { AutoplayPreview } from "./AutoplayPreview";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Editorial project card. Hover starts the muted preview clip (when one
 * exists) and flips the title from outline to filled type. All information
 * is always visible, so nothing depends on hover.
 */
export function ProjectCard({
  project,
  index,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
  titleClassName,
}: {
  project: Project;
  /** Editorial project number shown alongside the title. */
  index: number;
  sizes?: string;
  className?: string;
  titleClassName?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const showPreview = hovered && !reducedMotion && !!project.previewVideo;

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View project"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={cx("group block", className)}
    >
      <div className="relative overflow-hidden">
        <div
          className={cx(
            "transition-transform duration-700 ease-[var(--ease-out-soft)]",
            !reducedMotion && "group-hover:scale-[1.03]",
          )}
        >
          <Media
            media={project.cover}
            label={project.title}
            palette={project.placeholderPalette}
            sizes={sizes}
          />
        </div>

        {project.previewVideo && (
          <div
            className={cx(
              "absolute inset-0 transition-opacity duration-500",
              showPreview ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <AutoplayPreview
              media={project.previewVideo}
              label={project.title}
              palette={project.placeholderPalette}
              active={showPreview}
              className="h-full"
            />
          </div>
        )}

        {project.status === "concept" && (
          <span className="bg-ink/70 text-bone/90 absolute top-3 left-3 rounded-xs px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase backdrop-blur-sm">
            Studio concept
          </span>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-stone shrink-0 font-mono text-xs">{pad(index)}</span>
        <div>
          <h3
            className={cx(
              "text-h3 font-sans font-bold tracking-tight transition-colors duration-300",
              hovered && !reducedMotion ? "text-outline" : "text-bone",
              titleClassName,
            )}
          >
            {project.title}
          </h3>
          <p className="text-stone mt-1 text-sm">{project.description}</p>
          <p className="text-meta text-stone/80 mt-2 font-mono tracking-widest uppercase">
            {project.categoryLabel} · {project.year}
          </p>
        </div>
      </div>
    </Link>
  );
}
