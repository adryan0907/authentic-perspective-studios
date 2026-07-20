import type { VideoMedia } from "@/types/content";

/**
 * Homepage hero showreel.
 *
 * Drop the real files at the paths below and remove `placeholder: true`.
 * While the placeholder flag is set, the hero renders a cinematic CSS
 * composition instead, so the site never ships broken media.
 *
 * Recommended exports (see README): 1080p H.264 ~8 Mbps for desktop,
 * 720p ~3 Mbps for mobile, both muted, 20–40 seconds, seamless loop.
 */
export const heroShowreel: VideoMedia = {
  type: "video",
  src: "/media/showreel/showreel.mp4",
  mobileSrc: "/media/showreel/showreel-mobile.mp4",
  poster: "/media/showreel/showreel-poster.webp",
  alt: "Authentic Perspective showreel — selected film and photography work",
  aspect: "16/9",
  placeholder: true,
};

/**
 * Alternate "perspective" layer revealed by the lens interaction —
 * ideally the same showreel before colour grading.
 */
export const heroShowreelRaw: VideoMedia = {
  type: "video",
  src: "/media/showreel/showreel-raw.mp4",
  mobileSrc: "/media/showreel/showreel-raw-mobile.mp4",
  poster: "/media/showreel/showreel-raw-poster.webp",
  alt: "Ungraded raw footage of the Authentic Perspective showreel",
  aspect: "16/9",
  placeholder: true,
};
