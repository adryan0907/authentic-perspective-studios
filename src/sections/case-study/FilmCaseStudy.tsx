import type { Project, VideoMedia } from "@/types/content";
import { CinematicPlayer } from "@/components/media/CinematicPlayer";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * Film layout: a cinematic player for the main film, followed by selected
 * frames presented like a grading suite's stills panel.
 */
export function FilmCaseStudy({ project }: { project: Project }) {
  const mainFilm = project.gallery.find(
    (item): item is VideoMedia => item.type === "video",
  );
  const externalFilm = project.gallery.find(
    (item) => item.type === "vimeo" || item.type === "youtube",
  );
  const frames = project.gallery.filter((item) => item.type === "image");

  return (
    <section aria-labelledby="film-heading" className="px-gutter py-section border-line border-t">
      <FadeIn>
        <h2
          id="film-heading"
          className="text-h2 mb-10 font-sans font-bold tracking-tight"
        >
          The film
        </h2>
      </FadeIn>

      <FadeIn>
        {mainFilm ? (
          <CinematicPlayer
            media={mainFilm}
            label={project.title}
            palette={project.placeholderPalette}
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
                  sizes={index === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
