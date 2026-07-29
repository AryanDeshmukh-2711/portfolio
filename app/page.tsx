import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ToolsSection } from "@/components/sections/ToolsSection";

/**
 * The whole site is one scrolling page. Each section carries the id the dock
 * links to, and the dock highlights whichever one is crossing the viewport, so
 * the nav tracks scrolling rather than only responding to clicks.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <ToolsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
