"use client";

import { useState } from "react";
import { Filmstrip } from "@/components/media/Filmstrip";
import { ContactSheet } from "@/components/media/ContactSheet";
import { ProjectCard } from "@/components/media/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScrollStage } from "@/components/ui/ScrollStage";
import { getProject } from "@/data/projects";
import { cx } from "@/lib/utils";

const pwmiProject = getProject("digital-screen-pwmi");

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

const filmFrames = [
  {
    src: "/media/projects/roxmeister/frame-01.webp",
    alt: "ROXMEISTER supermoto frame",
    label: "ROXMEISTER",
  },
  {
    src: "/media/projects/woonboerderij/frame-01.webp",
    alt: "Woonboerderij Schijndel frame",
    label: "Woonboerderij",
  },
  {
    src: "/media/projects/boost-innovation-grant/frame-01.webp",
    alt: "Boost Innovation Grant frame",
    label: "Boost Grant",
  },
  {
    src: "/media/projects/djaygear/frame-01.webp",
    alt: "DjayGear frame",
    label: "DjayGear",
  },
  {
    src: "/media/projects/losjes-encore/frame-01.webp",
    alt: "Losjes Encore frame",
    label: "Losjes Encore",
  },
  {
    src: "/media/projects/roxmeister/frame-02.webp",
    alt: "ROXMEISTER chase frame",
    label: "Supermoto",
  },
  {
    src: "/media/projects/woonboerderij/frame-02.webp",
    alt: "Woonboerderij detail frame",
    label: "Documentary",
  },
  {
    src: "/media/projects/boost-innovation-grant/frame-02.webp",
    alt: "Boost Innovation Grant frame",
    label: "Multicamera",
  },
  {
    src: "/media/projects/djaygear/frame-02.webp",
    alt: "DjayGear product frame",
    label: "Product film",
  },
  {
    src: "/media/projects/losjes-encore/frame-02.webp",
    alt: "Losjes Encore event frame",
    label: "Aftermovie",
  },
];

const photoFrames = [
  {
    src: "/media/projects/photography-press-fashion/frame-01.webp",
    alt: "Two skaters in streetwear posing outdoors with boards",
    label: "Lifestyle",
  },
  {
    src: "/media/projects/photography-press-fashion/frame-02.webp",
    alt: "Skater carving on a paved track",
    label: "Action",
  },
  {
    src: "/media/projects/photography-press-fashion/frame-03.webp",
    alt: "Puin Collective t-shirt brand detail",
    label: "Brand",
  },
  {
    src: "/media/projects/photography-press-fashion/frame-04.webp",
    alt: "Fashion group frame from a press session",
    label: "Press",
  },
  {
    src: "/media/projects/photography-press-fashion/frame-05.webp",
    alt: "Three people in streetwear on a train platform",
    label: "Editorial",
  },
  {
    src: "/media/projects/photography-press-fashion/frame-06.webp",
    alt: "Black-and-white press portrait of a man",
    label: "Portrait",
  },
  {
    src: "/media/projects/photography-press-fashion/frame-07.webp",
    alt: "Fashion portrait from a press session",
    label: "Fashion",
  },
  {
    src: "/media/projects/photography-press-fashion/frame-08.webp",
    alt: "Black-and-white fashion portrait of a woman",
    label: "Portrait",
  },
  {
    src: "/media/projects/photography-press-fashion/frame-09.webp",
    alt: "Portrait from a DJ press and fashion session",
    label: "Press",
  },
];

const disciplines = [
  {
    id: "film",
    title: "Film",
    copy: "Brand films, documentary storytelling, automotive productions, events, aftermovies, interviews, and multicamera productions.",
    visual: <Filmstrip frames={filmFrames} />,
  },
  {
    id: "photography",
    title: "Photography",
    copy: "DJ press kits, fashion and streetwear, editorial portraits, lifestyle imagery, and campaign stills — with more series landing soon.",
    visual: <ContactSheet frames={photoFrames} />,
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
    visual: pwmiProject ? (
      <ProjectCard
        project={pwmiProject}
        sizes="(min-width: 768px) 50vw, 100vw"
      />
    ) : null,
  },
];

export function Disciplines() {
  return (
    <ScrollStage
      aria-labelledby="disciplines-heading"
      className="bg-ink px-gutter py-section border-line border-t"
    >
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
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-12"
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
                  index % 2 === 1
                    ? "md:order-1 md:col-start-1"
                    : "md:col-start-7",
                )}
              >
                {discipline.visual}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </ScrollStage>
  );
}
