import type { Metadata } from "next";
import { visibleProjects } from "@/data/projects";
import { parseFilter } from "@/lib/workFilters";
import { WorkArchive } from "@/sections/WorkArchive";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected films, photography, AI-assisted concepts and interactive experiences by Authentic Perspective, a creative production studio in Eindhoven.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; view?: string }>;
}) {
  const params = await searchParams;
  const filter = parseFilter(params.filter);
  const view = params.view === "list" ? "list" : "grid";

  return (
    <div className="px-gutter pt-32 pb-24 md:pt-44">
      <header className="mb-14 md:mb-20">
        <p className="text-meta text-stone mb-4 font-mono tracking-[0.25em] uppercase">
          The archive
        </p>
        <h1 className="text-h1 font-sans font-black tracking-tight uppercase">
          Work
        </h1>
        <p className="text-lead text-stone measure-narrow mt-5">
          Films, photography, AI-assisted concepts and interactive experiences
          — each built from a considered perspective.
        </p>
      </header>

      <WorkArchive
        projects={visibleProjects}
        initialFilter={filter}
        initialView={view}
      />
    </div>
  );
}
