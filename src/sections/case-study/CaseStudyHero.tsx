import type { Project } from "@/types/content";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/ui/FadeIn";

/** Full-screen case-study opening: hero media, title and project facts. */
export function CaseStudyHero({ project }: { project: Project }) {
  const hero = project.heroMedia ?? project.cover;

  return (
    <header className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <Media
          media={hero}
          label={project.title}
          palette={project.placeholderPalette}
          priority
          fill
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
      />

      <div className="px-gutter relative z-10 pb-14 md:pb-20">
        <FadeIn>
          <p className="text-meta text-bone/70 mb-4 font-mono tracking-[0.25em] uppercase">
            {project.categoryLabel} · {project.year}
            {project.status === "concept" && " · Studio concept"}
          </p>
          <h1 className="text-display max-w-5xl font-sans font-black tracking-tight uppercase">
            {project.title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <dl className="border-line mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t pt-6 sm:grid-cols-4">
            {project.client && (
              <div>
                <dt className="text-meta text-stone font-mono tracking-widest uppercase">
                  Client
                </dt>
                <dd className="text-bone mt-1 text-sm">{project.client}</dd>
              </div>
            )}
            {project.location && (
              <div>
                <dt className="text-meta text-stone font-mono tracking-widest uppercase">
                  Location
                </dt>
                <dd className="text-bone mt-1 text-sm">{project.location}</dd>
              </div>
            )}
            <div>
              <dt className="text-meta text-stone font-mono tracking-widest uppercase">
                Year
              </dt>
              <dd className="text-bone mt-1 text-sm">{project.year}</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-meta text-stone font-mono tracking-widest uppercase">
                Services
              </dt>
              <dd className="text-bone mt-1 text-sm">
                {project.services.join(", ")}
              </dd>
            </div>
          </dl>
        </FadeIn>
      </div>
    </header>
  );
}
