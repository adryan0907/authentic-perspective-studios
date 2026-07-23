"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project, VideoMedia } from "@/types/content";
import { cx } from "@/lib/utils";
import { Media } from "./Media";
import { AutoplayPreview } from "./AutoplayPreview";
import { usePrefersReducedMotion } from "@/lib/hooks";

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
 * Editorial project card. Ambient video plays as soon as the card is in view
 * so the archive feels alive on touch devices too.
 */
export function ProjectCard({
  project,
  sizes = "(min-width: 768px) 50vw, 100vw",
  className,
  titleClassName,
}: {
  project: Project;
  /** @deprecated Kept optional for call-site compatibility; no longer shown. */
  index?: number;
  sizes?: string;
  className?: string;
  titleClassName?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const ambient = ambientVideoFor(project);
  const showPreview = !reducedMotion && !!ambient && inView;

  useEffect(() => {
    const node = mediaRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "160px", threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
      <div ref={mediaRef} className="relative overflow-hidden">
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

        {project.status === "concept" && (
          <span className="bg-ink/70 text-bone/90 absolute top-3 left-3 rounded-xs px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase backdrop-blur-sm">
            Studio concept
          </span>
        )}
      </div>

      <div className="mt-4">
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
    </Link>
  );
}
