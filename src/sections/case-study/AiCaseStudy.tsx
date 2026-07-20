import type { Project } from "@/types/content";
import { BeforeAfterReveal } from "@/components/media/BeforeAfterReveal";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/ui/FadeIn";

/**
 * AI layout: concept explanation, process notes, a before/after comparison
 * and the previsualised boards — always clearly framed as concept work.
 */
export function AiCaseStudy({ project }: { project: Project }) {
  const ai = project.ai;
  if (!ai) return null;

  return (
    <>
      <section
        aria-labelledby="concept-heading"
        className="px-gutter py-section border-line border-t"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12">
          <FadeIn className="md:col-span-6 md:col-start-2">
            <h2
              id="concept-heading"
              className="text-h2 mb-6 font-sans font-bold tracking-tight"
            >
              The concept
            </h2>
            <p className="text-stone leading-relaxed">{ai.conceptExplanation}</p>
            {project.status === "concept" && (
              <p className="border-ember/40 text-bone/80 mt-6 border-l-2 pl-4 text-sm leading-relaxed">
                This is a self-initiated studio concept — not commissioned
                client work. It exists to demonstrate our AI-assisted
                production workflow.
              </p>
            )}
          </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-3 md:col-start-9">
            <h3 className="text-meta text-stone mb-6 font-mono tracking-[0.25em] uppercase">
              Process notes
            </h3>
            <ul className="flex flex-col gap-5">
              {ai.processExcerpts.map((excerpt, index) => (
                <li
                  key={index}
                  className="border-line text-stone border-l pl-4 font-mono text-xs leading-relaxed"
                >
                  {excerpt}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section
        aria-labelledby="beforeafter-heading"
        className="px-gutter py-section border-line border-t"
      >
        <FadeIn>
          <h2
            id="beforeafter-heading"
            className="text-h2 mb-3 font-sans font-bold tracking-tight"
          >
            From prompt to picture
          </h2>
          <p className="text-stone mb-10 max-w-xl text-sm">
            Drag the divider to compare an early raw generation with the final
            art-directed frame.
          </p>
        </FadeIn>
        <FadeIn>
          <BeforeAfterReveal
            before={ai.before}
            after={ai.after}
            beforeLabel="First generation"
            afterLabel="Final frame"
            label={project.title}
            palette={project.placeholderPalette}
          />
        </FadeIn>
      </section>

      {project.gallery.length > 0 && (
        <section
          aria-labelledby="boards-heading"
          className="px-gutter py-section border-line border-t"
        >
          <FadeIn>
            <h2
              id="boards-heading"
              className="text-h2 mb-10 font-sans font-bold tracking-tight"
            >
              Campaign boards
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {project.gallery.map((item, index) => (
              <FadeIn
                key={index}
                delay={index * 0.08}
                className={index === 0 ? "sm:col-span-2" : undefined}
              >
                <Media
                  media={item}
                  label={project.title}
                  palette={project.placeholderPalette}
                  sizes={index === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
