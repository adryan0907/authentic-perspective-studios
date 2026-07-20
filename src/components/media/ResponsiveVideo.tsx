"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoMedia } from "@/types/content";
import { useMediaQuery, useSaveData, usePrefersReducedMotion } from "@/lib/hooks";
import { aspectToCss } from "@/lib/media";
import { cx } from "@/lib/utils";

/**
 * Muted, looping ambient video. The file only loads once the element is near
 * the viewport, playback pauses off-screen, and the poster is shown instead
 * when the visitor prefers reduced motion or reduced data.
 */
export function ResponsiveVideo({
  media,
  className,
  playing = true,
  fill = false,
}: {
  media: VideoMedia;
  className?: string;
  /** External control, e.g. hover-driven previews. */
  playing?: boolean;
  /** Fill the parent instead of enforcing the media's aspect ratio. */
  fill?: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const staticOnly = useSaveData();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const active = !reducedMotion && !staticOnly && shouldLoad;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && inView && playing) {
      video.play().catch(() => {
        /* Autoplay can be blocked; the poster remains visible. */
      });
    } else {
      video.pause();
    }
  }, [active, inView, playing]);

  const src = isMobile && media.mobileSrc ? media.mobileSrc : media.src;

  return (
    <div
      ref={containerRef}
      className={cx(
        "relative w-full overflow-hidden bg-black",
        fill && "h-full",
        className,
      )}
      style={fill ? undefined : { aspectRatio: aspectToCss(media.aspect) }}
    >
      {active ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster}
          aria-label={media.alt}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} />
        </video>
      ) : (
        media.poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.poster}
            alt={media.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      )}
    </div>
  );
}
