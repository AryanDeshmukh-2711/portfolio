import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { ProjectList } from "@/components/ProjectList";
import { getProjectTags, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected engineering and machine-learning work.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="pb-4">
      <PageHeading lead="Recent" trail="Projects" />
      <ProjectList projects={projects} tags={getProjectTags()} />
    </div>
  );
}
