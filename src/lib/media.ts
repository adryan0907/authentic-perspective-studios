import type { AspectRatio, MediaItem } from "@/types/content";

/** Convert an AspectRatio token ("16/9") into a CSS aspect-ratio value. */
export function aspectToCss(aspect: AspectRatio | undefined): string {
  return (aspect ?? "16/9").replace("/", " / ");
}

/** Extract a Vimeo video id from any common Vimeo URL shape. */
export function vimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}

/** Extract a YouTube video id from watch, share and embed URL shapes. */
export function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

/** Privacy-friendly embed URL for external players — muted autoplay on. */
export function embedUrl(media: MediaItem): string | null {
  if (media.type === "vimeo") {
    const id = vimeoId(media.url);
    return id
      ? `https://player.vimeo.com/video/${id}?dnt=1&autoplay=1&muted=1&loop=1&background=0`
      : null;
  }
  if (media.type === "youtube") {
    const id = youtubeId(media.url);
    return id
      ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1&mute=1&loop=1&playlist=${id}`
      : null;
  }
  return null;
}
