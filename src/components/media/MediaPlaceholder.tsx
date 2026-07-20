import { aspectToCss } from "@/lib/media";
import type { AspectRatio } from "@/types/content";
import { cx } from "@/lib/utils";

/**
 * Elegant labelled stand-in rendered while a real asset is missing.
 * It shows a cinematic two-tone composition plus the exact file path to
 * drop the final asset at, so replacing media requires zero code changes.
 */
export function MediaPlaceholder({
  label,
  path,
  aspect,
  palette = ["#241a10", "#0e0b08"],
  className,
  fill = false,
  showPath = true,
}: {
  /** Short human label, e.g. project title or "Showreel". */
  label: string;
  /** Target file path, e.g. "/media/projects/djaygear/cover.webp". */
  path?: string;
  aspect?: AspectRatio;
  palette?: readonly [string, string];
  className?: string;
  /** Fill the parent instead of enforcing an aspect ratio. */
  fill?: boolean;
  showPath?: boolean;
}) {
  const [tone, base] = palette;

  return (
    <div
      aria-hidden
      className={cx(
        "relative overflow-hidden",
        fill ? "absolute inset-0 h-full w-full" : "w-full",
        className,
      )}
      style={fill ? undefined : { aspectRatio: aspectToCss(aspect) }}
    >
      {/* Cinematic wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(120% 90% at 78% 18%, ${tone} 0%, transparent 55%),
            radial-gradient(90% 120% at 12% 88%, ${tone}88 0%, transparent 50%),
            linear-gradient(160deg, ${base} 0%, ${tone}55 48%, ${base} 100%)`,
        }}
      />
      {/* Horizon line for depth */}
      <div
        className="absolute inset-x-0 top-[62%] h-px opacity-25"
        style={{ background: `linear-gradient(90deg, transparent, ${tone}, transparent)` }}
      />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Frame markings, like a viewfinder */}
      <div className="border-bone/15 absolute inset-3 border md:inset-4">
        <span className="bg-bone/25 absolute top-0 left-1/2 h-2 w-px" />
        <span className="bg-bone/25 absolute bottom-0 left-1/2 h-2 w-px" />
        <span className="bg-bone/25 absolute top-1/2 left-0 h-px w-2" />
        <span className="bg-bone/25 absolute top-1/2 right-0 h-px w-2" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        <span className="text-bone/60 font-mono text-[0.6rem] tracking-[0.2em] uppercase">
          {label}
        </span>
        {showPath && path && (
          <span className="text-bone/30 mt-1 font-mono text-[0.55rem] break-all">
            {path}
          </span>
        )}
      </div>
    </div>
  );
}
