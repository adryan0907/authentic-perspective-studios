"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { ScrollStage } from "@/components/ui/ScrollStage";

/**
 * Collaboration strip.
 *
 * No client logos are invented: each slot below names the file to add.
 * Drop monochrome SVGs (preferred) or PNGs at
 * /public/media/clients/<name>.svg and swap the placeholder for:
 *
 *   <Image src="/media/clients/<name>.svg" alt="<Client name>"
 *          width={140} height={48} className="opacity-60" />
 */
const logoSlots = [
  "client-logo-01.svg",
  "client-logo-02.svg",
  "client-logo-03.svg",
  "client-logo-04.svg",
  "client-logo-05.svg",
  "client-logo-06.svg",
];

export function Collaborations() {
  return (
    <ScrollStage
      aria-labelledby="collab-heading"
      className="bg-ink-2 px-gutter border-line border-t py-16 md:py-20"
    >
      <FadeIn>
        <h2
          id="collab-heading"
          className="text-meta text-stone mb-10 font-mono tracking-[0.25em] uppercase"
        >
          Selected collaborations
        </h2>
        <ul className="grid grid-cols-2 gap-px sm:grid-cols-3 md:grid-cols-6">
          {logoSlots.map((slot) => (
            <li
              key={slot}
              className="border-line flex aspect-[3/1.1] items-center justify-center border"
            >
              <span className="text-stone/50 px-3 text-center font-mono text-[0.55rem] break-all">
                /media/clients/{slot}
              </span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </ScrollStage>
  );
}
