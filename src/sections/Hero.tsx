"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { heroShowreel, heroShowreelRaw } from "@/data/hero";
import { duration, easing, stagger } from "@/lib/motion";
import { cx } from "@/lib/utils";
import { PerspectiveLens } from "@/components/media/PerspectiveLens";
import { ResponsiveVideo } from "@/components/media/ResponsiveVideo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Cinematic layer shown as the hero's "final grade". Uses the real showreel
 * once it exists; until then it renders a warm graded CSS composition with a
 * slow drift so the hero still feels alive.
 */
function GradeLayer({ paused }: { paused: boolean }) {
  if (!heroShowreel.placeholder) {
    return (
      <ResponsiveVideo
        media={heroShowreel}
        playing={!paused}
        fill
        className="h-full"
      />
    );
  }
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#120c07]">
      <div
        className={cx("absolute -inset-[12%] hero-drift")}
        style={{
          animationPlayState: paused ? "paused" : "running",
          background: `
            radial-gradient(75% 55% at 72% 30%, #e7752f2e 0%, transparent 60%),
            radial-gradient(60% 80% at 18% 78%, #3a1f0eb0 0%, transparent 62%),
            radial-gradient(120% 60% at 50% 108%, #000 20%, transparent 70%),
            linear-gradient(165deg, #1a120a 0%, #0c0a08 55%, #16100a 100%)`,
        }}
      />
      {/* Distant horizon glow */}
      <div
        className="absolute inset-x-0 top-[58%] h-px opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, #e7752f66, transparent)" }}
      />
    </div>
  );
}

/**
 * The alternate perspective: the same scene as flat, ungraded raw footage
 * with viewfinder markings.
 */
function RawLayer() {
  if (!heroShowreelRaw.placeholder) {
    return (
      <div className="h-full grayscale contrast-[1.05] brightness-[0.95]">
        <ResponsiveVideo media={heroShowreelRaw} fill className="h-full" />
      </div>
    );
  }
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#1c1b19]">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(75% 55% at 72% 30%, #6a625933 0%, transparent 60%),
            radial-gradient(60% 80% at 18% 78%, #45403a80 0%, transparent 62%),
            linear-gradient(165deg, #262420 0%, #191816 55%, #21201c 100%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-[58%] h-px opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, #9a938a, transparent)" }}
      />
      {/* Viewfinder chrome */}
      <div className="absolute inset-6 border border-white/15 md:inset-10">
        <span className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-white/40" />
        <span className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-white/40" />
        <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-white/40" />
        <span className="absolute -right-px -bottom-px h-4 w-4 border-r-2 border-b-2 border-white/40" />
      </div>
      <div className="absolute top-8 left-8 flex items-center gap-2 font-mono text-[0.6rem] tracking-widest text-white/70 uppercase md:top-12 md:left-12">
        <span className="block h-2 w-2 animate-pulse rounded-full bg-red-500" />
        REC · LOG-C · 4K 25P
      </div>
      <div className="absolute right-8 bottom-8 font-mono text-[0.6rem] tracking-widest text-white/60 md:right-12 md:bottom-12">
        TC 00:04:12:08
      </div>
    </div>
  );
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.base, ease: easing.out, delay },
  });

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <PerspectiveLens
        base={<GradeLayer paused={paused} />}
        reveal={<RawLayer />}
        baseLabel="Final grade"
        revealLabel="Raw footage"
      />

      {/* Legibility scrim — never blocks the lens */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
      />

      <div className="px-gutter pointer-events-none relative z-20 pb-14 md:pb-20">
        <motion.p
          {...enter(0.1)}
          className="text-meta text-bone/70 mb-6 font-mono tracking-[0.25em] uppercase"
        >
          Creative production studio — Eindhoven
        </motion.p>

        <h1 className="text-display text-bone font-sans font-black uppercase">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: reducedMotion ? 0 : "105%", opacity: reducedMotion ? 0 : 1 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: duration.base, ease: easing.out, delay: 0.2 }}
            >
              Defining moments.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="font-serif text-bone/95 block font-light normal-case italic"
              initial={{ y: reducedMotion ? 0 : "105%", opacity: reducedMotion ? 0 : 1 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: duration.base,
                ease: easing.out,
                delay: 0.2 + stagger.loose,
              }}
            >
              Crafted with intention.
            </motion.span>
          </span>
        </h1>

        <motion.p
          {...enter(0.55)}
          className="text-lead text-bone/80 measure-narrow mt-6"
        >
          Authentic Perspective is an Eindhoven-based creative studio creating
          cinematic films, intentional photography, AI-powered concepts, and
          interactive digital experiences.
        </motion.p>

        <motion.div
          {...enter(0.7)}
          className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="/work">View selected work</MagneticButton>
          <MagneticButton href="/contact" variant="outline">
            Start a project
          </MagneticButton>
        </motion.div>
      </div>

      {/* Showreel pause control */}
      <div className="pointer-events-auto absolute right-4 bottom-4 z-20 md:right-8 md:bottom-8">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="border-bone/25 text-bone/80 hover:border-ember hover:text-bone bg-ink/40 flex h-11 items-center gap-2 rounded-sm border px-3 font-mono text-[0.6rem] tracking-widest uppercase backdrop-blur-sm"
        >
          <span aria-hidden>{paused ? "▶" : "❚❚"}</span>
          {paused ? "Play reel" : "Pause reel"}
        </button>
      </div>

      {/* Interaction cue */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: duration.slow }}
        aria-hidden
        className="text-bone/50 absolute top-1/2 right-6 z-20 hidden -translate-y-1/2 rotate-90 font-mono text-[0.6rem] tracking-[0.3em] uppercase lg:block"
      >
        Move to change perspective — scroll to explore
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: duration.slow }}
        aria-hidden
        className="text-bone/50 absolute top-20 left-1/2 z-20 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.3em] uppercase lg:hidden"
      >
        Drag below to change perspective
      </motion.p>
    </section>
  );
}
