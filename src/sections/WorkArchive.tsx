"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/types/content";
import { duration, easing } from "@/lib/motion";
import { cx } from "@/lib/utils";
import {
  matchesFilter,
  workFilters,
  type WorkFilterId,
} from "@/lib/workFilters";
import { ProjectCard } from "@/components/media/ProjectCard";
import { usePrefersReducedMotion } from "@/lib/hooks";

type View = "grid" | "list";

/**
 * Filterable portfolio archive with grid and list (production-credits) views.
 * The active filter is mirrored into the URL (?filter=...) without reloading,
 * so filtered views are shareable.
 */
export function WorkArchive({
  projects,
  initialFilter,
  initialView,
}: {
  projects: Project[];
  initialFilter: WorkFilterId;
  initialView: View;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [filter, setFilter] = useState<WorkFilterId>(initialFilter);
  const [view, setView] = useState<View>(initialView);

  const syncUrl = useCallback((nextFilter: WorkFilterId, nextView: View) => {
    const params = new URLSearchParams();
    if (nextFilter !== "all") params.set("filter", nextFilter);
    if (nextView !== "grid") params.set("view", nextView);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `/work?${query}` : "/work");
  }, []);

  const applyFilter = (next: WorkFilterId) => {
    setFilter(next);
    syncUrl(next, view);
  };

  const applyView = (next: View) => {
    setView(next);
    syncUrl(filter, next);
  };

  const filtered = useMemo(
    () => projects.filter((p) => matchesFilter(p, filter)),
    [projects, filter],
  );

  return (
    <div>
      {/* Filters + view toggle */}
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter projects"
          className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
        >
          {workFilters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => applyFilter(item.id)}
                aria-pressed={active}
                className={cx(
                  "min-h-11 shrink-0 rounded-sm border px-4 font-mono text-xs tracking-widest whitespace-nowrap uppercase transition-colors",
                  active
                    ? "border-ember bg-ember text-ink font-bold"
                    : "border-line text-bone/70 hover:border-line-strong hover:text-bone",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          role="group"
          aria-label="Change view"
          className="flex shrink-0 gap-2"
        >
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => applyView(v)}
              aria-pressed={view === v}
              className={cx(
                "min-h-11 rounded-sm border px-4 font-mono text-xs tracking-widest uppercase transition-colors",
                view === v
                  ? "border-bone text-bone font-bold"
                  : "border-line text-bone/60 hover:text-bone",
              )}
            >
              {v === "grid" ? "◼ Grid" : "☰ List"}
            </button>
          ))}
        </div>
      </div>

      {/* Live count for screen readers */}
      <p aria-live="polite" className="sr-only">
        {filtered.length} project{filtered.length === 1 ? "" : "s"} shown
      </p>

      {filtered.length === 0 ? (
        <div className="border-line flex flex-col items-start gap-4 border px-8 py-16">
          <p className="text-h3 font-serif italic">
            Nothing in this category yet.
          </p>
          <p className="text-stone max-w-md text-sm">
            We are always producing. If you are curious what we could do here,
            we would love to talk about it.
          </p>
          <button
            type="button"
            onClick={() => applyFilter("all")}
            className="border-line hover:border-ember text-bone mt-2 min-h-11 rounded-sm border px-5 text-sm"
          >
            Show all projects
          </button>
        </div>
      ) : view === "grid" ? (
        <motion.ul layout={!reducedMotion} className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, index) => (
              <motion.li
                layout={!reducedMotion}
                key={project.slug}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: duration.fast, ease: easing.out }}
                className={cx(index % 4 === 1 || index % 4 === 2 ? "md:mt-16" : "")}
              >
                <ProjectCard project={project} index={index + 1} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <motion.ol layout={!reducedMotion} className="border-line border-t">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.li
                layout={!reducedMotion}
                key={project.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.fast }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group border-line hover:bg-ink-2 grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b px-2 py-5 transition-colors sm:grid-cols-[1fr_auto_6rem] md:gap-x-8"
                >
                  <span className="min-w-0">
                    <span className="text-h3 group-hover:text-ember block truncate font-sans font-bold tracking-tight transition-colors">
                      {project.title}
                      {project.status === "concept" && (
                        <span className="text-stone ml-3 align-middle font-mono text-[0.6rem] tracking-widest uppercase">
                          Studio concept
                        </span>
                      )}
                    </span>
                    <span className="text-stone block text-sm">
                      {project.description}
                    </span>
                  </span>
                  <span className="text-meta text-stone hidden font-mono tracking-widest uppercase sm:block">
                    {project.categoryLabel}
                  </span>
                  <span className="text-stone justify-self-end font-mono text-xs">
                    {project.year}
                  </span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ol>
      )}
    </div>
  );
}
