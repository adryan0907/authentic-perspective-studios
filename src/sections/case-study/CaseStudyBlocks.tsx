import Link from "next/link";
import type { Project } from "@/types/content";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/ui/FadeIn";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** Summary, challenge and approach — the written spine of every case study. */
export function CaseStudyNarrative({ project }: { project: Project }) {
  return (
    <section aria-label="Project story" className="px-gutter py-section">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 md:grid-cols-12">
        <FadeIn className="md:col-span-10 md:col-start-2">
          <p className="text-h3 font-serif text-bone font-light leading-snug">
            {project.summary}
          </p>
        </FadeIn>

        <FadeIn className="md:col-span-5 md:col-start-2">
          <h2 className="text-meta text-ember mb-4 font-mono tracking-[0.25em] uppercase">
            The challenge
          </h2>
          <p className="text-stone leading-relaxed">{project.challenge}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="md:col-span-5 md:col-start-8">
          <h2 className="text-meta text-ember mb-4 font-mono tracking-[0.25em] uppercase">
            The approach
          </h2>
          <p className="text-stone leading-relaxed">{project.approach}</p>
        </FadeIn>
      </div>
    </section>
  );
}

/** Behind-the-scenes media strip. Rendered only when BTS media exists. */
export function CaseStudyBts({ project }: { project: Project }) {
  if (!project.btsMedia || project.btsMedia.length === 0) return null;

  return (
    <section aria-labelledby="bts-heading" className="px-gutter py-section border-line border-t">
      <FadeIn>
        <h2
          id="bts-heading"
          className="text-h2 mb-10 font-sans font-bold tracking-tight"
        >
          Behind the scenes
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {project.btsMedia.map((item, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <Media
              media={item}
              label={`${project.title} BTS`}
              palette={project.placeholderPalette}
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            {item.caption && (
              <p className="text-stone mt-2 text-sm">{item.caption}</p>
            )}
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/** Outcome and credits, presented like end titles. */
export function CaseStudyOutcome({ project }: { project: Project }) {
  return (
    <section
      aria-label="Outcome and credits"
      className="px-gutter py-section border-line border-t"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 md:grid-cols-12">
        <FadeIn className="md:col-span-6 md:col-start-2">
          <h2 className="text-meta text-ember mb-4 font-mono tracking-[0.25em] uppercase">
            The outcome
          </h2>
          <p className="text-lead text-bone/90 leading-relaxed">
            {project.outcome}
          </p>
          {project.externalLink && (
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember hover:text-bone mt-6 inline-block text-sm underline underline-offset-4"
            >
              Learn more about this project ↗
            </a>
          )}
          {project.prototypeLink && (
            <a
              href={project.prototypeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember hover:text-bone mt-6 inline-block text-sm underline underline-offset-4"
            >
              Open the prototype ↗
            </a>
          )}
        </FadeIn>

        <FadeIn delay={0.1} className="md:col-span-3 md:col-start-9">
          <h2 className="text-meta text-stone mb-6 font-mono tracking-[0.25em] uppercase">
            Credits
          </h2>
          <dl className="flex flex-col gap-4">
            {project.credits.map((credit) => (
              <div key={`${credit.role}-${credit.name}`}>
                <dt className="text-stone font-mono text-[0.65rem] tracking-widest uppercase">
                  {credit.role}
                </dt>
                <dd className="text-bone mt-0.5 text-sm">{credit.name}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}

/** Previous/next project navigation plus the closing contact CTA. */
export function CaseStudyPagination({
  previous,
  next,
}: {
  previous: Project;
  next: Project;
}) {
  return (
    <>
      <nav
        aria-label="More projects"
        className="border-line grid grid-cols-1 border-t sm:grid-cols-2"
      >
        <Link
          href={`/work/${previous.slug}`}
          className="group border-line px-gutter hover:bg-ink-2 flex flex-col gap-2 border-b py-10 transition-colors sm:border-r sm:border-b-0"
        >
          <span className="text-meta text-stone font-mono tracking-widest uppercase">
            ← Previous project
          </span>
          <span className="text-h3 group-hover:text-ember font-sans font-bold tracking-tight transition-colors">
            {previous.title}
          </span>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          className="group px-gutter hover:bg-ink-2 flex flex-col gap-2 py-10 text-right transition-colors"
        >
          <span className="text-meta text-stone font-mono tracking-widest uppercase">
            Next project →
          </span>
          <span className="text-h3 group-hover:text-ember font-sans font-bold tracking-tight transition-colors">
            {next.title}
          </span>
        </Link>
      </nav>

      <section
        aria-label="Contact"
        className="px-gutter border-line border-t py-24 text-center md:py-32"
      >
        <FadeIn>
          <p className="text-h2 font-serif mx-auto max-w-2xl font-light italic">
            Planning something in this direction?
          </p>
          <div className="mt-8">
            <MagneticButton href="/contact">Start a project</MagneticButton>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
