import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const getAllProjects = async (): Promise<
  CollectionEntry<"projects">[]
> => {
  const projects = await getCollection("projects");
  return projects.sort(
    (a, b) => b.data.startDate.getTime() - a.data.startDate.getTime(),
  );
};

/**
 * The year a project is filed under on the projects page: the year it
 * finished, falling back to the start year for ongoing work.
 */
export const projectYear = (project: CollectionEntry<"projects">): number =>
  (project.data.endDate ?? project.data.startDate).getFullYear();

export type ProjectGroup = {
  key: string;
  label: string;
  projects: CollectionEntry<"projects">[];
};

/**
 * Projects grouped for the projects page. Projects with no end date go
 * under "Current" first; the rest follow by year, newest first.
 */
export const getProjectGroups = async (): Promise<ProjectGroup[]> => {
  const current: CollectionEntry<"projects">[] = [];
  const byYear = new Map<number, CollectionEntry<"projects">[]>();

  for (const project of await getAllProjects()) {
    if (!project.data.endDate) {
      current.push(project);
      continue;
    }

    const year = projectYear(project);
    byYear.set(year, [...(byYear.get(year) ?? []), project]);
  }

  const years = [...byYear.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, projects]) => ({ key: String(year), label: String(year), projects }));

  return current.length > 0
    ? [{ key: "current", label: "Current", projects: current }, ...years]
    : years;
};
