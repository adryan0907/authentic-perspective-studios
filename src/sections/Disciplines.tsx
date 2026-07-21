"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Filmstrip } from "@/components/media/Filmstrip";
import { ContactSheet } from "@/components/media/ContactSheet";
import { FadeIn } from "@/components/ui/FadeIn";
import { cx } from "@/lib/utils";

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

/** Digital Screen PWMI featured as the UX discipline visual. */
function PwmiUxFeature() {
  return (
    <Link
      href="/work/digital-screen-pwmi"
      data-cursor="View project"
      className="group block"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src="/media/projects/digital-screen-pwmi/cover.webp"
          alt="Digital Screen PWMI — mother and child facing an interactive neighbourhood screen"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 md:p-6">
          <span className="text-bone/85 font-mono text-[0.6rem] tracking-[0.2em] uppercase">
            <span className="text-ember mr-2">●</span>
            Digital Screen PWMI
          </span>
          <span className="text-bone/55 font-mono text-[0.55rem] tracking-[0.15em] uppercase">
            UX · Immersive public media
          </span>
        </div>
      </div>
    </Link>
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
    copy: "Digital concepts, websites, user experiences, prototypes, creative technology, and interactive storytelling — like Digital Screen PWMI for public neighbourhood media.",
    visual: <PwmiUxFeature />,
  },
];

export function Disciplines() {
  return (
    <section aria-labelledby="disciplines-heading" className="px-gutter py-section border-line border-t">
      <FadeIn className="mb-14 md:mb-20">
        <h2
          id="disciplines-heading"
          className="text-h1 font-sans font-black tracking-tight uppercase"
        >
          Four disciplines
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
                <h3
                  id={`discipline-${discipline.id}`}
                  className="text-h2 font-sans font-bold tracking-tight"
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
