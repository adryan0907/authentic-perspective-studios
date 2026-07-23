import type { InstagramMedia, Project, VideoMedia } from "@/types/content";
import { CinematicPlayer } from "@/components/media/CinematicPlayer";
import { Media } from "@/components/media/Media";
import { InstagramEmbed } from "@/components/media/InstagramEmbed";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * Film layout: cinematic player / Instagram reel for the main piece, then
 * selected frames. Optional impact metrics sit above the player (HOY-style).
 */
export function FilmCaseStudy({ project }: { project: Project }) {
  const mainFilm = project.gallery.find(
    (item): item is VideoMedia => item.type === "video",
  );
  const instagram = project.gallery.find(
    (item): item is InstagramMedia => item.type === "instagram",
  );
  const externalFilm = project.gallery.find(
    (item) => item.type === "vimeo" || item.type === "youtube",
  );
  const frames = project.gallery.filter((item) => item.type === "image");

  return (
    <section
      aria-labelledby="film-heading"
      className="px-gutter py-section border-line border-t"
    >
      <FadeIn>
        <h2
          id="film-heading"
          className="text-h2 mb-10 font-sans font-bold tracking-tight"
        >
          {instagram ? "The reel" : "The film"}
        </h2>
      </FadeIn>

      {project.impact && project.impact.length > 0 && (
        <FadeIn className="border-line mb-10 grid grid-cols-2 gap-6 border-b pb-8 sm:grid-cols-4">
          {project.impact.map((item) => (
            <div key={`${item.label}-${item.value}`}>
              <p className="text-meta text-stone font-mono tracking-widest uppercase">
                {item.label}
              </p>
              <p className="text-bone mt-2 text-lg font-medium tracking-tight md:text-xl">
                {item.value}
              </p>
            </div>
          ))}
        </FadeIn>
      )}

      <FadeIn>
        {mainFilm ? (
          <CinematicPlayer
            media={mainFilm}
            label={project.title}
            palette={project.placeholderPalette}
          />
        ) : instagram ? (
          <InstagramEmbed
            url={instagram.url}
            caption={instagram.caption ?? instagram.alt}
          />
        ) : externalFilm ? (
          <Media
            media={externalFilm}
            label={project.title}
            palette={project.placeholderPalette}
          />
        ) : null}
      </FadeIn>

      {frames.length > 0 && (
        <div className="mt-16">
          <FadeIn>
            <h3 className="text-meta text-stone mb-6 font-mono tracking-[0.25em] uppercase">
              Selected frames
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {frames.map((frame, index) => (
              <FadeIn
                key={index}
                delay={index * 0.08}
                className={index === 0 ? "sm:col-span-2" : undefined}
              >
                <Media
                  media={frame}
                  label={project.title}
                  palette={project.placeholderPalette}
                  sizes={
                    index === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw"
                  }
                />
              </FadeIn>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
