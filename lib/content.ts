import experienceData from "@/data/experience.json";
import postsData from "@/data/posts.json";
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import toolsData from "@/data/tools.json";
import type { ExperienceItem, Post, Profile, Project, Tool } from "@/types";

/**
 * Typed accessors over the static JSON in `data/`. Swapping in a CMS later
 * means changing these functions only — nothing that renders touches JSON.
 */

export const profile = profileData as Profile;
export const projects = projectsData as Project[];
export const experience = experienceData as ExperienceItem[];
export const posts = postsData as Post[];
export const tools = toolsData as Tool[];

export function getFeaturedProjects(): Project[] {
  const featured = projects.filter((p) => p.featured);
  return featured.length > 0 ? featured : projects.slice(0, 3);
}

export function getProjectTags(): string[] {
  return [...new Set(projects.flatMap((p) => p.tags))].sort();
}

export function getSortedPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

/** Stable across server and client render — `toLocaleDateString` is not. */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
