"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  BookOpen,
  ChartNoAxesColumn,
  FolderOpen,
  House,
  Mail,
  Wrench,
} from "lucide-react";
import { navItems } from "@/lib/site";
import type { NavItem } from "@/lib/site";

const icons: Record<NavItem["icon"], typeof House> = {
  home: House,
  projects: FolderOpen,
  experience: ChartNoAxesColumn,
  tools: Wrench,
  blog: BookOpen,
  contact: Mail,
};

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Floating glass pill navigation. Fixed at the top on desktop and docked to
 * the bottom on small screens, and it contracts slightly once the page has
 * been scrolled so it recedes behind the content.
 */
export function DockNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Reading scrollY in the listener rather than deferring into rAF: scroll
    // events already fire at most once per frame, and this keeps the dock
    // working in contexts where animation frames are throttled.
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center lg:top-6 lg:bottom-auto"
    >
      {/* Nearly opaque on small screens, where the dock floats over content
          that may be bright; pure glass on desktop, where it sits on the page. */}
      <ul
        className={`flex origin-top items-center gap-1 rounded-full border border-white/[0.07] bg-neutral-950/85 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:bg-white/[0.05] ${
          scrolled ? "lg:scale-[0.88]" : ""
        }`}
      >
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          const active = isActive(pathname, item.href);

          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group relative grid size-11 place-items-center rounded-full"
              >
                {active && (
                  <motion.span
                    layoutId="dock-active"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-white/[0.09]"
                  />
                )}
                <Icon
                  className={`relative size-[19px] transition-colors ${
                    active
                      ? "text-accent"
                      : "text-neutral-500 group-hover:text-neutral-200"
                  }`}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
                <span className="sr-only">{item.label}</span>

                <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 rounded-md border border-white/10 bg-neutral-900 px-2 py-1 text-[11px] whitespace-nowrap text-neutral-300 opacity-0 transition group-hover:opacity-100 lg:top-auto lg:-bottom-9 lg:block">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
