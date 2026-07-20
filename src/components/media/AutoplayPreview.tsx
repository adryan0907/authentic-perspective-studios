"use client";

import type { VideoMedia } from "@/types/content";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { ResponsiveVideo } from "./ResponsiveVideo";

/**
 * Short muted preview clip used on project cards. On fine-pointer devices it
 * plays while hovered; on touch it plays while in view (ResponsiveVideo
 * already gates loading and pausing via IntersectionObserver).
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
  /** Whether the preview should currently play (e.g. card hovered). */
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

  return <ResponsiveVideo media={media} playing={active} className={className} />;
}
