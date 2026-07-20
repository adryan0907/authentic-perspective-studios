import type { Project } from "@/types/content";
import { ProjectGallery } from "@/components/media/ProjectGallery";
import { FadeIn } from "@/components/ui/FadeIn";

/** Photography layout: an editorial gallery with an accessible lightbox. */
export function PhotographyCaseStudy({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="gallery-heading"
      className="px-gutter py-section border-line border-t"
    >
      <FadeIn>
        <h2
          id="gallery-heading"
          className="text-h2 mb-10 font-sans font-bold tracking-tight"
        >
          The series
        </h2>
      </FadeIn>
      <ProjectGallery
        items={project.gallery}
        label={project.title}
        palette={project.placeholderPalette}
      />
    </section>
  );
}
