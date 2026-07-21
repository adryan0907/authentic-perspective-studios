"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoMedia } from "@/types/content";
import { useMediaQuery, useSaveData, usePrefersReducedMotion } from "@/lib/hooks";
import { aspectToCss } from "@/lib/media";
import { cx } from "@/lib/utils";

/**
 * Muted, looping ambient video. The file only loads once the element is near
 * the viewport (unless `priority`), playback pauses off-screen, and the poster
 * is shown instead when the visitor prefers reduced motion or reduced data.
 */
export function ResponsiveVideo({
  media,
  className,
  playing = true,
  fill = false,
  priority = false,
}: {
  media: VideoMedia;
  className?: string;
  /** External control, e.g. hover-driven previews. */
  playing?: boolean;
  /** Fill the parent instead of enforcing the media's aspect ratio. */
  fill?: boolean;
  /** Load and attempt playback immediately (hero backgrounds). */
  priority?: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const staticOnly = useSaveData();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [inView, setInView] = useState(priority);

  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      setInView(true);
      return;
    }
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
  }, [priority]);

  const active = !reducedMotion && !staticOnly && shouldLoad;
  const src = isMobile && media.mobileSrc ? media.mobileSrc : media.src;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari requires the muted flag to be set as a property before play().
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      if (active && inView && playing) {
        const playAttempt = video.play();
        if (playAttempt) {
          playAttempt.catch(() => {
            /* Autoplay can still be blocked; poster remains visible. */
          });
        }
      } else {
        video.pause();
      }
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [active, inView, playing, src]);

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
          key={src}
          muted
          autoPlay={playing}
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          poster={media.poster}
          aria-label={media.alt}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
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
