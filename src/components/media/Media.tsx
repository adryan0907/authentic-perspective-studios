import Image from "next/image";
import type { MediaItem } from "@/types/content";
import { aspectToCss, embedUrl } from "@/lib/media";
import { cx } from "@/lib/utils";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { ResponsiveVideo } from "./ResponsiveVideo";

/**
 * Universal renderer for any MediaItem: local image, local video, Vimeo or
 * YouTube. Items flagged `placeholder: true` render a labelled stand-in that
 * shows exactly which file to add.
 */
export function Media({
  media,
  label,
  palette,
  className,
  sizes = "100vw",
  priority = false,
  fill = false,
}: {
  media: MediaItem;
  /** Label used when the item is still a placeholder. */
  label: string;
  palette?: readonly [string, string];
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Fill the parent element instead of enforcing the media's aspect ratio. */
  fill?: boolean;
}) {
  if (media.placeholder) {
    const path =
      media.type === "image" || media.type === "video" ? media.src : media.url;
    return (
      <MediaPlaceholder
        label={`${label} — ${media.type}`}
        path={path}
        aspect={media.aspect}
        palette={palette}
        className={className}
        fill={fill}
      />
    );
  }

  if (media.type === "image") {
    return (
      <div
        className={cx(
          "relative w-full overflow-hidden",
          fill && "h-full",
          className,
        )}
        style={fill ? undefined : { aspectRatio: aspectToCss(media.aspect) }}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  if (media.type === "video") {
    return <ResponsiveVideo media={media} className={className} fill={fill} />;
  }

  const src = embedUrl(media);
  if (!src) {
    return (
      <MediaPlaceholder
        label={`${label} — invalid ${media.type} URL`}
        path={media.url}
        aspect={media.aspect}
        palette={palette}
        className={className}
      />
    );
  }

  return (
    <div
      className={cx("relative w-full overflow-hidden bg-black", className)}
      style={{ aspectRatio: aspectToCss(media.aspect) }}
    >
      <iframe
        src={src}
        title={media.alt}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
