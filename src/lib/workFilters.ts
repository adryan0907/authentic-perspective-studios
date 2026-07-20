import type { Project } from "@/types/content";

/** Filters available on the /work archive. */
export const workFilters = [
  { id: "all", label: "All" },
  { id: "film", label: "Film" },
  { id: "photography", label: "Photography" },
  { id: "ai", label: "AI" },
  { id: "ux", label: "UX" },
  { id: "automotive", label: "Automotive" },
  { id: "documentary", label: "Documentary" },
  { id: "events", label: "Events" },
  { id: "multicamera", label: "Multicamera" },
  { id: "brand-content", label: "Brand Content" },
] as const;

export type WorkFilterId = (typeof workFilters)[number]["id"];

const disciplineFilters: ReadonlySet<string> = new Set([
  "film",
  "photography",
  "ai",
  "ux",
]);

export function matchesFilter(project: Project, filter: WorkFilterId): boolean {
  if (filter === "all") return true;
  if (disciplineFilters.has(filter)) return project.discipline === filter;
  return project.categories.includes(filter as Project["categories"][number]);
}

export function parseFilter(value: string | undefined): WorkFilterId {
  const valid = workFilters.some((f) => f.id === value);
  return valid ? (value as WorkFilterId) : "all";
}
