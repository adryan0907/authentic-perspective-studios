"use client";

import { useState } from "react";
import { Filmstrip } from "@/components/media/Filmstrip";
import { ContactSheet } from "@/components/media/ContactSheet";
import { FadeIn } from "@/components/ui/FadeIn";
import { cx, pad } from "@/lib/utils";

/** Generation slider: rough AI draft on the left, refined frame on the right. */
function AiGenerationSlider() {
  const [position, setPosition] = useState(55);

  return (
    <div className="relative aspect-video w-full overflow-hidden select-none">
      {/* Refined result */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(70% 60% at 70% 30%, #e7752f30 0%, transparent 60%),
            linear-gradient(155deg, #2a1a0d 0%, #0e0b08 70%)`,
        }}
      >
        <span className="text-bone/50 absolute right-3 bottom-3 font-mono text-[0.55rem] tracking-widest uppercase">
          Refined generation · v14
        </span>
      </div>
      {/* Rough draft, clipped */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          background:
            "repeating-linear-gradient(45deg, #201d1a 0 10px, #16140f 10px 20px)",
        }}
      >
        <span className="text-bone/50 absolute bottom-3 left-3 font-mono text-[0.55rem] tracking-widest uppercase">
          First prompt · v1
        </span>
      </div>
      <div
        aria-hidden
        className="bg-bone/80 absolute top-0 bottom-0 w-px"
        style={{ left: `${position}%` }}
      >
        <span className="bg-bone text-ink absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-bold">
          ⇄
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Compare first AI generation with refined result"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        style={{ touchAction: "pan-y" }}
      />
    </div>
  );
}

/** Toggle between a wireframe and the polished interface it becomes. */
function WireframeReveal() {
  const [polished, setPolished] = useState(false);

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Wireframe */}
        <div
          aria-hidden
          className={cx(
            "bg-ink-2 absolute inset-0 p-4 transition-opacity duration-500 md:p-6",
            polished ? "opacity-0" : "opacity-100",
          )}
        >
          <div className="border-bone/25 flex h-full flex-col gap-3 border border-dashed p-3">
            <div className="border-bone/25 h-8 w-2/5 border border-dashed" />
            <div className="border-bone/25 h-3 w-4/5 border border-dashed" />
            <div className="border-bone/25 h-3 w-3/5 border border-dashed" />
            <div className="mt-auto flex gap-3">
              <div className="border-bone/25 h-9 w-28 border border-dashed" />
              <div className="border-bone/25 h-9 w-28 border border-dashed" />
            </div>
          </div>
        </div>
        {/* Polished interface */}
        <div
          aria-hidden
          className={cx(
            "absolute inset-0 p-4 transition-opacity duration-500 md:p-6",
            polished ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "radial-gradient(80% 70% at 80% 20%, #e7752f22 0%, transparent 55%), linear-gradient(150deg, #1c130b 0%, #0e0b08 75%)",
          }}
        >
          <div className="flex h-full flex-col gap-3 p-3">
            <div className="text-bone font-sans text-xl font-black tracking-tight md:text-2xl">
              Generations United
            </div>
            <div className="bg-bone/25 h-2 w-4/5 rounded-full" />
            <div className="bg-bone/15 h-2 w-3/5 rounded-full" />
            <div className="mt-auto flex gap-3">
              <div className="bg-ember text-ink flex h-9 w-28 items-center justify-center rounded-sm text-[0.65rem] font-bold tracking-wide uppercase">
                Explore
              </div>
              <div className="border-bone/40 text-bone flex h-9 w-28 items-center justify-center rounded-sm border text-[0.65rem] tracking-wide uppercase">
                Stories
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPolished((p) => !p)}
        aria-pressed={polished}
        className="border-line text-bone/80 hover:border-ember mt-3 min-h-11 rounded-sm border px-4 font-mono text-[0.6rem] tracking-widest uppercase"
      >
        {polished ? "View wireframe" : "View final interface"}
      </button>
    </div>
  );
}

const disciplines = [
  {
    id: "film",
    title: "Film",
    copy: "Brand films, documentary storytelling, automotive productions, events, aftermovies, interviews, and multicamera productions.",
    visual: (
      <Filmstrip
        frames={[
          "EXT. Coastal road — dusk",
          "INT. Farmhouse kitchen",
          "Booth cam — drop",
          "Chase car — rolling",
          "Interview A-cam",
          "Macro — jog wheel",
        ]}
      />
    ),
  },
  {
    id: "photography",
    title: "Photography",
    copy: "Corporate portraits, campaign photography, lifestyle imagery, events, and visual assets for digital platforms.",
    visual: (
      <ContactSheet
        frames={[
          "Founder portrait",
          "Lab detail",
          "Team candid",
          "Atrium wide",
          "Profile backlight",
          "Whiteboard laugh",
          "Chip in hand",
          "Corridor walk",
        ]}
      />
    ),
  },
  {
    id: "ai",
    title: "AI Creative",
    copy: "AI-assisted concept development, campaign previsualisation, generative imagery, creative experimentation, and production planning.",
    visual: <AiGenerationSlider />,
  },
  {
    id: "ux",
    title: "UX & Interactive",
    copy: "Digital concepts, websites, user experiences, prototypes, creative technology, and interactive storytelling.",
    visual: <WireframeReveal />,
  },
];

export function Disciplines() {
  return (
    <section aria-labelledby="disciplines-heading" className="px-gutter py-section border-line border-t">
      <FadeIn className="mb-14 md:mb-20">
        <p className="text-meta text-stone mb-4 font-mono tracking-[0.25em] uppercase">
          03 — What we do
        </p>
        <h2
          id="disciplines-heading"
          className="text-h1 font-sans font-black tracking-tight uppercase"
        >
          Four disciplines.
          <span className="font-serif text-stone block font-light normal-case italic">
            One perspective.
          </span>
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-20 md:gap-24">
        {disciplines.map((discipline, index) => (
          <FadeIn key={discipline.id}>
            <article
              aria-labelledby={`discipline-${discipline.id}`}
              className={cx(
                "grid grid-cols-1 items-center gap-8 md:grid-cols-12",
              )}
            >
              <div
                className={cx(
                  "md:col-span-5",
                  index % 2 === 1 && "md:order-2 md:col-start-8",
                )}
              >
                <span className="text-stone font-mono text-xs">{pad(index + 1)}</span>
                <h3
                  id={`discipline-${discipline.id}`}
                  className="text-h2 mt-2 font-sans font-bold tracking-tight"
                >
                  {discipline.title}
                </h3>
                <p className="text-stone mt-4 max-w-md leading-relaxed">
                  {discipline.copy}
                </p>
              </div>
              <div
                className={cx(
                  "md:col-span-6",
                  index % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-7",
                )}
              >
                {discipline.visual}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
