import type { Project } from "@/types/content";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/ui/FadeIn";
import { pad } from "@/lib/utils";

/**
 * UX layout: problem → audience → insight → concept → user flow →
 * wireframes/screens → learnings, with room for an embedded prototype.
 */
export function UxCaseStudy({ project }: { project: Project }) {
  const ux = project.ux;
  if (!ux) return null;

  const blocks = [
    { title: "Problem", copy: ux.problem },
    { title: "Audience", copy: ux.audience },
    { title: "Insight", copy: ux.insight },
    { title: "Concept", copy: ux.concept },
  ];

  return (
    <>
      <section
        aria-labelledby="ux-heading"
        className="px-gutter py-section border-line border-t"
      >
        <FadeIn>
          <h2
            id="ux-heading"
            className="text-h2 mb-12 font-sans font-bold tracking-tight"
          >
            The thinking
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((block, index) => (
            <FadeIn key={block.title} delay={index * 0.08}>
              <h3 className="text-meta text-ember mb-3 font-mono tracking-[0.25em] uppercase">
                {block.title}
              </h3>
              <p className="text-stone text-sm leading-relaxed">{block.copy}</p>
            </FadeIn>
          ))}
        </div>

        {project.status === "concept" && (
          <FadeIn className="mt-12">
            <p className="border-ember/40 text-bone/80 max-w-2xl border-l-2 pl-4 text-sm leading-relaxed">
              This is an independent studio concept and is not affiliated with
              or commissioned by the organisation it imagines a product for.
            </p>
          </FadeIn>
        )}
      </section>

      <section
        aria-labelledby="flow-heading"
        className="px-gutter py-section border-line border-t"
      >
        <FadeIn>
          <h2
            id="flow-heading"
            className="text-h2 mb-10 font-sans font-bold tracking-tight"
          >
            The user flow
          </h2>
        </FadeIn>
        <ol className="flex flex-col gap-0">
          {ux.userFlow.map((step, index) => (
            <FadeIn key={index} delay={index * 0.06}>
              <li className="border-line flex items-baseline gap-6 border-b py-5">
                <span className="text-ember shrink-0 font-mono text-xs">
                  {pad(index + 1)}
                </span>
                <span className="text-bone/90">{step}</span>
              </li>
            </FadeIn>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="screens-heading"
        className="px-gutter py-section border-line border-t"
      >
        <FadeIn>
          <h2
            id="screens-heading"
            className="text-h2 mb-10 font-sans font-bold tracking-tight"
          >
            Prototype & screens
          </h2>
        </FadeIn>

        {(() => {
          const videos = project.gallery.filter((item) => item.type === "video");
          const phones = project.gallery.filter(
            (item) => item.type === "image" && item.aspect === "9/16",
          );
          const others = project.gallery.filter(
            (item) =>
              !(item.type === "video") &&
              !(item.type === "image" && item.aspect === "9/16"),
          );

          return (
            <div className="flex flex-col gap-10">
              {videos.map((item, index) => {
                const isPhone = item.aspect === "9/16";
                return (
                  <FadeIn key={`v-${index}`} delay={index * 0.08}>
                    <div
                      className={
                        isPhone
                          ? "mx-auto w-full max-w-[320px]"
                          : "w-full"
                      }
                    >
                      <Media
                        media={item}
                        label={project.title}
                        palette={project.placeholderPalette}
                      />
                    </div>
                    {item.caption && (
                      <p
                        className={
                          isPhone
                            ? "text-stone mt-2 text-center text-sm"
                            : "text-stone mt-2 text-sm"
                        }
                      >
                        {item.caption}
                      </p>
                    )}
                  </FadeIn>
                );
              })}

              {phones.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-6">
                  {phones.map((item, index) => (
                    <FadeIn key={`p-${index}`} delay={index * 0.06}>
                      <div className="mx-auto w-full max-w-[280px]">
                        <Media
                          media={item}
                          label={project.title}
                          palette={project.placeholderPalette}
                        />
                        {item.caption && (
                          <p className="text-stone mt-2 text-center text-xs">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    </FadeIn>
                  ))}
                </div>
              )}

              {others.map((item, index) => (
                <FadeIn key={`o-${index}`} delay={index * 0.08}>
                  <Media
                    media={item}
                    label={project.title}
                    palette={project.placeholderPalette}
                  />
                  {item.caption && (
                    <p className="text-stone mt-2 text-sm">{item.caption}</p>
                  )}
                </FadeIn>
              ))}
            </div>
          );
        })()}

        <FadeIn className="mt-16">
          <h3 className="text-meta text-ember mb-3 font-mono tracking-[0.25em] uppercase">
            Learnings
          </h3>
          <p className="text-stone max-w-2xl leading-relaxed">{ux.learnings}</p>
        </FadeIn>
      </section>
    </>
  );
}
