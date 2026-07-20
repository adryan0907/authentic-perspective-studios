import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, visibleProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { CaseStudyHero } from "@/sections/case-study/CaseStudyHero";
import {
  CaseStudyBts,
  CaseStudyNarrative,
  CaseStudyOutcome,
  CaseStudyPagination,
} from "@/sections/case-study/CaseStudyBlocks";
import { FilmCaseStudy } from "@/sections/case-study/FilmCaseStudy";
import { PhotographyCaseStudy } from "@/sections/case-study/PhotographyCaseStudy";
import { AiCaseStudy } from "@/sections/case-study/AiCaseStudy";
import { UxCaseStudy } from "@/sections/case-study/UxCaseStudy";

export function generateStaticParams() {
  return visibleProjects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.seoTitle ?? `${project.title} — ${project.categoryLabel}`,
    description: project.seoDescription ?? project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Authentic Perspective`,
      description: project.seoDescription ?? project.description,
      type: "article",
    },
  };
}

const disciplineSections = {
  film: FilmCaseStudy,
  photography: PhotographyCaseStudy,
  ai: AiCaseStudy,
  ux: UxCaseStudy,
} as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const DisciplineSection = disciplineSections[project.discipline];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    dateCreated: String(project.year),
    url: `${siteConfig.domain}/work/${project.slug}`,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    ...(project.client ? { sourceOrganization: { "@type": "Organization", name: project.client } } : {}),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyHero project={project} />
      <CaseStudyNarrative project={project} />
      <DisciplineSection project={project} />
      <CaseStudyBts project={project} />
      <CaseStudyOutcome project={project} />
      <CaseStudyPagination previous={previous} next={next} />
    </article>
  );
}
