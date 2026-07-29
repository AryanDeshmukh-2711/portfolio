import { Section } from "@/components/Section";
import { ProjectList } from "@/components/ProjectList";
import { getProjectTags, projects } from "@/lib/content";

export function ProjectsSection() {
  return (
    <Section id="projects" lead="Recent" trail="Projects">
      <ProjectList projects={projects} tags={getProjectTags()} />
    </Section>
  );
}
