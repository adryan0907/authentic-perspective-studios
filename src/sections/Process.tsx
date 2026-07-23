"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScrollStage } from "@/components/ui/ScrollStage";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The studio works by the design thinking method: five phases, applied to
 * every discipline — film, photography, AI creative and UX alike.
 */
const phases = [
  {
    title: "Empathise",
    copy: "We begin with the people behind the project — understanding your audience, context, and the feeling the work needs to carry before anything is planned or filmed.",
  },
  {
    title: "Define",
    copy: "We sharpen everything we heard into one clear creative problem: what the work must say, to whom, and what it should change.",
  },
  {
    title: "Ideate",
    copy: "We explore concepts, narratives, and visual directions — openly at first, then deliberately, until the strongest perspective remains.",
  },
  {
    title: "Prototype",
    copy: "We make the idea tangible early: storyboards, previsualisation, test frames, wireframes, or a rough cut — so decisions happen before budgets are spent.",
  },
  {
    title: "Test & Deliver",
    copy: "We refine the work against real feedback and prepare it for the platforms where it needs to perform — then learn from how it lands.",
  },
];

/**
 * The studio process as five phases with a scroll-linked progress line.
 * Normal scrolling is never intercepted — the line simply reacts to it.
 */
export function Process() {
  const reducedMotion = usePrefersReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, spring.soft);

  return (
    <ScrollStage
      aria-labelledby="process-heading"
      zIndex={5}
      className="bg-ink-3 px-gutter py-section border-line border-t"
    >
      <div ref={contentRef}>
        <FadeIn className="mb-14 md:mb-20">
          <h2
            id="process-heading"
            className="text-h1 font-sans font-black tracking-tight uppercase"
          >
            The process
          </h2>
          <p className="text-lead text-stone measure-narrow mt-5">
            Every project — film, photography, AI, or interactive — moves through
            the design thinking method. It keeps the work human-centred and the
            decisions early, honest, and affordable.
          </p>
        </FadeIn>

        <div className="relative md:ml-[10%]">
          <div
            aria-hidden
            className="bg-line absolute top-0 bottom-0 left-[7px] w-px md:left-[9px]"
          >
            <motion.div
              className="bg-ember absolute inset-x-0 top-0 origin-top"
              style={{
                height: "100%",
                scaleY: reducedMotion ? 1 : progress,
              }}
            />
          </div>

          <ol className="flex flex-col gap-16 md:gap-24">
            {phases.map((phase) => (
              <li key={phase.title} className="relative pl-10 md:pl-16">
                <span
                  aria-hidden
                  className="border-ember bg-ink-3 absolute top-2 left-0 block h-4 w-4 rounded-full border-2 md:h-5 md:w-5"
                />
                <FadeIn>
                  <h3 className="text-h2 font-sans font-bold tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="text-stone mt-3 max-w-xl text-base leading-relaxed md:text-lg">
                    {phase.copy}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ScrollStage>
  );
}
