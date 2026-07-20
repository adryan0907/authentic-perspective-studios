"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { MediaItem } from "@/types/content";
import { cx } from "@/lib/utils";
import { Media } from "./Media";

const PhotoLightbox = dynamic(
  () => import("./PhotoLightbox").then((m) => m.PhotoLightbox),
  { ssr: false },
);

/**
 * Editorial image gallery with an accessible lightbox. Images alternate
 * between wide and column placements for an editorial rhythm rather than a
 * uniform grid.
 */
export function ProjectGallery({
  items,
  label,
  palette,
}: {
  items: MediaItem[];
  label: string;
  palette?: readonly [string, string];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <p className="text-stone mb-6 font-mono text-xs tracking-widest uppercase">
        {items.length} images — tap to view
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {items.map((item, index) => {
          const wide = item.aspect === "16/9" || item.aspect === "21/9";
          return (
            <button
              key={index}
              type="button"
              onClick={() => setOpenIndex(index)}
              className={cx(
                "group relative block w-full text-left",
                wide && "sm:col-span-2",
              )}
              aria-label={`Open image ${index + 1}: ${item.alt}`}
            >
              <Media
                media={item}
                label={label}
                palette={palette}
                sizes={wide ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                className="transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </button>
          );
        })}
      </div>

      <PhotoLightbox
        items={items}
        index={openIndex}
        label={label}
        palette={palette}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
