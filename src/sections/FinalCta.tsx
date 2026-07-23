"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { FadeIn } from "@/components/ui/FadeIn";
import { spring } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Closing call to action with an ember glow that quietly follows the
 * pointer. Static under reduced motion or on touch.
 */
export function FinalCta() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(40);
  const sx = useSpring(x, spring.soft);
  const sy = useSpring(y, spring.soft);
  const background = useMotionTemplate`radial-gradient(52% 42% at ${sx}% ${sy}%, rgba(231, 117, 47, 0.14) 0%, transparent 70%)`;

  const onPointerMove = (event: React.PointerEvent) => {
    if (reducedMotion || event.pointerType !== "mouse" || !sectionRef.current)
      return;
    const rect = sectionRef.current.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width) * 100);
    y.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      aria-label="Start a project"
      className="px-gutter border-line relative overflow-hidden border-t py-32 md:py-44"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={
          reducedMotion
            ? {
                background:
                  "radial-gradient(52% 42% at 50% 40%, rgba(231,117,47,0.1) 0%, transparent 70%)",
              }
            : { background }
        }
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <TextReveal
          as="h2"
          lines={["Have a story, idea, or", "moment worth capturing?"]}
          className="text-h1 font-sans font-black tracking-tight uppercase"
        />
        <FadeIn delay={0.2}>
          <p className="text-lead font-serif text-stone mx-auto mt-8 max-w-xl italic">
            Let&rsquo;s find the perspective that makes it memorable.
          </p>
        </FadeIn>
        <FadeIn delay={0.35} className="mt-10">
          <MagneticButton href="/contact" cursorLabel="Connect">
            Start a project
          </MagneticButton>
        </FadeIn>
      </div>
    </section>
  );
}
