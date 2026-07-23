"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { featuredProjects } from "@/data/projects";
import { WorkCard } from "@/components/media/WorkCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { ScrollStage } from "@/components/ui/ScrollStage";
import { duration, easing, stagger } from "@/lib/motion";
import { cx } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Featured projects in an asymmetrical editorial rhythm with scroll-driven
 * cinematic motion — especially tuned for mobile, where hover does nothing.
 */
export function SelectedWork() {
  const reducedMotion = usePrefersReducedMotion();
  const pairs: (typeof featuredProjects)[] = [];
  for (let i = 0; i < featuredProjects.length; i += 2) {
    pairs.push(featuredProjects.slice(i, i + 2));
  }

  return (
    <ScrollStage
      aria-labelledby="work-heading"
      mode="flow"
      zIndex={3}
      className="bg-ink-2 px-gutter py-section"
    >
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <div>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.base, ease: easing.out }}
            className="text-meta text-ember mb-4 font-mono tracking-[0.22em] uppercase"
          >
            Selected frames
          </motion.p>
          <TextReveal
            as="h2"
            lines={["The work"]}
            className="text-h1 font-sans font-black tracking-tight uppercase"
          />
        </div>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: duration.base,
            ease: easing.out,
            delay: stagger.loose,
          }}
        >
          <Link
            href="/work"
            data-cursor="Archive"
            className="text-bone/80 hover:text-ember border-line hover:border-ember group mb-2 inline-flex items-center gap-2 border-b pb-1 text-sm transition-colors"
          >
            Browse the full archive
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="flex flex-col gap-16 md:gap-28">
        {pairs.map((pair, rowIndex) => {
          const reversed = rowIndex % 2 === 1;
          return (
            <div
              key={rowIndex}
              className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-8"
            >
              {pair[0] && (
                <WorkCard
                  project={pair[0]}
                  index={rowIndex * 2 + 1}
                  direction={reversed ? "right" : "left"}
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className={cx(
                    "md:col-span-7",
                    reversed ? "md:order-2 md:col-start-6" : "md:col-start-1",
                  )}
                />
              )}
              {pair[1] && (
                <WorkCard
                  project={pair[1]}
                  index={rowIndex * 2 + 2}
                  direction={reversed ? "left" : "right"}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={cx(
                    "md:col-span-4 md:mt-24",
                    reversed ? "md:order-1 md:col-start-1" : "md:col-start-9",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </ScrollStage>
  );
}
