"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { VideoMedia } from "@/types/content";
import { aspectToCss } from "@/lib/media";
import { cx, pad } from "@/lib/utils";
import { MediaPlaceholder } from "./MediaPlaceholder";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${pad(m)}:${pad(s)}`;
}

/**
 * Custom cinematic video player for hero films: play/pause, mute/unmute,
 * seekable progress, fullscreen and captions support. Audio never autoplays —
 * playback starts from an explicit user action.
 */
export function CinematicPlayer({
  media,
  label,
  palette,
  className,
}: {
  media: VideoMedia;
  label: string;
  palette?: readonly [string, string];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [started, setStarted] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setStarted(true);
    } else {
      video.pause();
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => setProgress(video.currentTime);
    const onMeta = () => setDuration(video.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  if (media.placeholder) {
    return (
      <div className={className}>
        <MediaPlaceholder
          label={`${label} — final film`}
          path={media.src}
          aspect={media.aspect}
          palette={palette}
        />
      </div>
    );
  }

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Number(event.target.value);
    setProgress(video.currentTime);
  };

  const toggleFullscreen = () => {
    const node = containerRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    } else {
      node.requestFullscreen().catch(() => undefined);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cx("group relative w-full overflow-hidden bg-black", className)}
      style={{ aspectRatio: aspectToCss(media.aspect) }}
    >
      <video
        ref={videoRef}
        poster={media.poster}
        preload="metadata"
        playsInline
        muted={muted}
        aria-label={media.alt}
        onClick={togglePlay}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        crossOrigin={media.captions ? "anonymous" : undefined}
      >
        <source src={media.src} />
        {media.captions && (
          <track kind="captions" src={media.captions} srcLang="en" label="English" default />
        )}
      </video>

      {/* Big initial play affordance */}
      {!started && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="sr-only">Play {media.alt}</span>
          <span
            aria-hidden
            className="bg-ember text-ink flex h-20 w-20 items-center justify-center rounded-full text-2xl transition-transform group-hover:scale-110"
          >
            ▶
          </span>
        </button>
      )}

      {/* Control bar */}
      <div
        className={cx(
          "absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pt-10 pb-3 transition-opacity",
          started ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          type="button"
          onClick={togglePlay}
          className="text-bone hover:text-ember min-h-11 min-w-11 text-sm"
        >
          {playing ? "Pause" : "Play"}
          <span className="sr-only"> video</span>
        </button>

        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={progress}
          onChange={seek}
          aria-label="Seek"
          className="accent-ember h-1 flex-1 cursor-pointer"
        />

        <span className="text-bone/80 font-mono text-xs tabular-nums">
          {formatTime(progress)} / {formatTime(duration)}
        </span>

        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="text-bone hover:text-ember min-h-11 min-w-11 text-sm"
        >
          {muted ? "Unmute" : "Mute"}
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          className="text-bone hover:text-ember min-h-11 min-w-11 text-sm"
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
}
