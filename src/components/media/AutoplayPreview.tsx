"use client";

import type { VideoMedia } from "@/types/content";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { ResponsiveVideo } from "./ResponsiveVideo";

/**
 * Short muted ambient clip for project cards. Plays whenever `active` is true
 * (typically as soon as the card enters the viewport).
 */
export function AutoplayPreview({
  media,
  label,
  palette,
  active,
  className,
}: {
  media: VideoMedia;
  label: string;
  palette?: readonly [string, string];
  /** Whether the preview should currently play. */
  active: boolean;
  className?: string;
}) {
  if (media.placeholder) {
    return (
      <MediaPlaceholder
        label={`${label} — preview`}
        path={media.src}
        aspect={media.aspect}
        palette={palette}
        className={className}
        fill
      />
    );
  }

  return (
    <ResponsiveVideo
      media={media}
      playing={active}
      fill
      className={className}
    />
  );
}
