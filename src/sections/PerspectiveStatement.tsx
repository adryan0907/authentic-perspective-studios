"use client";

import { TextReveal } from "@/components/ui/TextReveal";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScrollStage } from "@/components/ui/ScrollStage";

export function PerspectiveStatement() {
  return (
    <ScrollStage
      aria-labelledby="statement-heading"
      zIndex={2}
      className="bg-ink px-gutter py-section"
    >
      <div className="mx-auto max-w-5xl">
        <h2 id="statement-heading" className="sr-only">
          Studio philosophy
        </h2>
        <TextReveal
          as="p"
          lines={[
            "A perspective is more than an angle.",
            "It determines what people notice,",
            "remember, and feel.",
          ]}
          className="text-h2 font-serif text-bone font-light tracking-tight"
        />
        <FadeIn delay={0.3} className="mt-10 md:ml-[38%]">
          <p className="text-lead text-stone measure-narrow">
            We combine storytelling, production, design, and emerging technology
            to build work that feels considered, human, and alive.
          </p>
        </FadeIn>
      </div>
    </ScrollStage>
  );
}
