"use client";

import { useEffect, useState } from "react";
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

/**
 * Floating glass pill navigation. Fixed at the top on desktop, docked to the
 * bottom on small screens, and it contracts once the page has been scrolled.
 *
 * The active item is driven by scroll position rather than by clicks, so the
 * dock tracks where the reader actually is on the page.
 */
export function DockNav() {
  const [active, setActive] = useState(navItems[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll events already fire at most once per frame, so no rAF wrapper.
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Resolved from scroll position rather than IntersectionObserver.
    // With a narrow observer band, a section shorter than its neighbours can
    // fail to produce a threshold crossing and get skipped entirely; picking
    // the last section whose top has passed a probe line always names exactly
    // one section and can never miss one.
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = navItems[0].id;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) {
          current = item.id;
        }
      }

      // At the very bottom the last section may never reach the probe line,
      // so pin it there explicitly.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = navItems[navItems.length - 1].id;

      setActive(current);
    };

    // Not invoked immediately: the initial state already matches scroll 0, and
    // calling it here would set state synchronously inside the effect.
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
          const isActive = item.id === active;

          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative grid size-11 place-items-center rounded-full"
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-active"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-white/[0.09]"
                  />
                )}
                <Icon
                  className={`relative size-[19px] transition-colors ${
                    isActive
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
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
