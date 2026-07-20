import Image from "next/image";
import { aspectToCss } from "@/lib/media";
import type { AspectRatio } from "@/types/content";
import { cx } from "@/lib/utils";

/**
 * A real photograph presented in the studio's editorial language: the same
 * viewfinder frame, film grain and label strip as MediaPlaceholder, so real
 * assets and placeholders sit side by side without breaking the design.
 */
export function EditorialImage({
  src,
  alt,
  label,
  subLabel,
  aspect = "4/5",
  sizes = "100vw",
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  /** Short mono caption shown inside the frame, e.g. "The founder". */
  label?: string;
  /** Second caption line, e.g. a collaboration credit. */
  subLabel?: string;
  aspect?: AspectRatio;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cx("group relative", className)}>
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: aspectToCss(aspect) }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
        />

        {/* Warm grade wash + legibility scrim for the label */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(5,4,3,0.72) 0%, rgba(5,4,3,0.18) 26%, transparent 45%), radial-gradient(120% 90% at 78% 12%, rgba(231,117,47,0.08) 0%, transparent 55%)",
          }}
        />

        {/* Film grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Viewfinder frame markings, matching the placeholder language */}
        <div
          aria-hidden
          className="border-bone/20 pointer-events-none absolute inset-3 border md:inset-4"
        >
          <span className="bg-bone/30 absolute top-0 left-1/2 h-2 w-px" />
          <span className="bg-bone/30 absolute bottom-0 left-1/2 h-2 w-px" />
          <span className="bg-bone/30 absolute top-1/2 left-0 h-px w-2" />
          <span className="bg-bone/30 absolute top-1/2 right-0 h-px w-2" />
        </div>
      </div>

      {(label || subLabel) && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 md:p-6">
          {label && (
            <span className="text-bone/85 font-mono text-[0.6rem] tracking-[0.2em] uppercase">
              <span aria-hidden className="text-ember mr-2">
                ●
              </span>
              {label}
            </span>
          )}
          {subLabel && (
            <span className="text-bone/55 font-mono text-[0.55rem] tracking-[0.15em] uppercase">
              {subLabel}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
