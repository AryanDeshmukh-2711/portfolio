import profile from "@/data/profile.json";

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in production for absolute OG URLs. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const site = {
  url: siteUrl,
  name: profile.name,
  title: `${profile.name} — ${profile.role.join(" ")}`,
  description: profile.tagline,
} as const;

export interface NavItem {
  /** Matches the `id` on the corresponding <section>; the dock links to `#id`. */
  id: string;
  label: string;
  /** Key into the icon map in `components/DockNav.tsx`. */
  icon: "home" | "projects" | "experience" | "tools" | "blog" | "contact";
}

/** The site is a single scrolling page — these are in-page anchors, and the
 *  dock highlights whichever section is currently crossing the viewport. */
export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "experience", label: "Experience", icon: "experience" },
  { id: "tools", label: "Tools", icon: "tools" },
  { id: "blog", label: "Thoughts", icon: "blog" },
  { id: "contact", label: "Contact", icon: "contact" },
];
