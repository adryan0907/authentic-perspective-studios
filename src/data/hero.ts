import type { VideoMedia } from "@/types/content";

/**
 * Homepage hero showreel.
 *
 * Recommended exports: 1080p H.264 for desktop, 720p for mobile,
 * both muted, looping ambient background.
 */
export const heroShowreel: VideoMedia = {
  type: "video",
  src: "/media/showreel/showreel.mp4",
  mobileSrc: "/media/showreel/showreel-mobile.mp4",
  poster: "/media/showreel/showreel-poster.webp",
  alt: "Authentic Perspective showreel — selected film and photography work",
  aspect: "16/9",
};

/**
 * Alternate "perspective" layer revealed by the lens interaction.
 * Same footage, treated as a flatter / ungraded look in the UI.
 */
export const heroShowreelRaw: VideoMedia = {
  type: "video",
  src: "/media/showreel/showreel.mp4",
  mobileSrc: "/media/showreel/showreel-mobile.mp4",
  poster: "/media/showreel/showreel-raw-poster.webp",
  alt: "Authentic Perspective showreel — alternate perspective",
  aspect: "16/9",
};
