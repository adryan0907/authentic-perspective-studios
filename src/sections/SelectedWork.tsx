"use client";

import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/media/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScrollStage } from "@/components/ui/ScrollStage";
import { cx } from "@/lib/utils";

/**
 * Featured projects in an asymmetrical editorial rhythm: rows alternate
 * between a large lead image and an offset smaller one, rather than a
 * uniform card grid.
 */
export function SelectedWork() {
  const pairs: (typeof featuredProjects)[] = [];
  for (let i = 0; i < featuredProjects.length; i += 2) {
    pairs.push(featuredProjects.slice(i, i + 2));
  }

  return (
    <ScrollStage
      aria-labelledby="work-heading"
      className="bg-ink-2 px-gutter py-section"
    >
      <FadeIn className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <div>
          <h2
            id="work-heading"
            className="text-h1 font-sans font-black tracking-tight uppercase"
          >
            The work
          </h2>
        </div>
        <Link
          href="/work"
          data-cursor="Archive"
          className="text-bone/80 hover:text-ember border-line hover:border-ember mb-2 border-b pb-1 text-sm transition-colors"
        >
          Browse the full archive →
        </Link>
      </FadeIn>

      <div className="flex flex-col gap-20 md:gap-28">
        {pairs.map((pair, rowIndex) => {
          const reversed = rowIndex % 2 === 1;
          return (
            <div
              key={rowIndex}
              className="grid grid-cols-1 items-start gap-14 md:grid-cols-12 md:gap-8"
            >
              {pair[0] && (
                <FadeIn
                  className={cx(
                    "md:col-span-7",
                    reversed ? "md:order-2 md:col-start-6" : "md:col-start-1",
                  )}
                >
                  <ProjectCard
                    project={pair[0]}
                    index={rowIndex * 2 + 1}
                    sizes="(min-width: 768px) 58vw, 100vw"
                  />
                </FadeIn>
              )}
              {pair[1] && (
                <FadeIn
                  delay={0.15}
                  className={cx(
                    "md:col-span-4 md:mt-24",
                    reversed ? "md:order-1 md:col-start-1" : "md:col-start-9",
                  )}
                >
                  <ProjectCard
                    project={pair[1]}
                    index={rowIndex * 2 + 2}
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </FadeIn>
              )}
            </div>
          );
        })}
      </div>
    </ScrollStage>
  );
}
