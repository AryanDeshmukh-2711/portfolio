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
  href: string;
  label: string;
  /** Key into the icon map in `components/DockNav.tsx`. */
  icon: "home" | "projects" | "experience" | "tools" | "blog" | "contact";
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/projects", label: "Projects", icon: "projects" },
  { href: "/experience", label: "Experience", icon: "experience" },
  { href: "/tools", label: "Tools", icon: "tools" },
  { href: "/blog", label: "Thoughts", icon: "blog" },
  { href: "/contact", label: "Contact", icon: "contact" },
];
