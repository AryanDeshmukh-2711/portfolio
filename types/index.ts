/** Shared content types. Every file in `data/` is validated against these. */

export interface SocialLink {
  /** Key maps to an icon in `components/BrandIcons.tsx`. */
  id: "github" | "dribbble" | "twitter" | "instagram" | "youtube" | "linkedin";
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  /** Rendered as the two-tone hero heading: `role[0]` white, `role[1]` ghosted. */
  role: [string, string];
  tagline: string;
  bio: string;
  location: string;
  email: string;
  photo: string;
  resume: string;
  /** Drives the contribution graph. Leave empty to omit that section. */
  githubUsername: string;
  stats: Stat[];
  socials: SocialLink[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** Drives the filter chips on /projects. */
  tags: string[];
  year: string;
  /** Tile colour for the generated thumbnail. Set `image` to use a real one. */
  accent: string;
  image?: string;
  repo?: string;
  demo?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  slug: string;
  company: string;
  role: string;
  description: string;
  start: string;
  end: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  href?: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  /** Icon tint + circle background; any CSS colour. */
  color: string;
  /** Key maps to an icon in `components/ToolIcons.tsx`. */
  icon: string;
  href?: string;
}
