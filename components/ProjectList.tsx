"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/types";

const ALL = "All";

export function ProjectList({
  projects,
  tags,
}: {
  projects: Project[];
  tags: string[];
}) {
  const [filter, setFilter] = useState<string>(ALL);

  const visible = useMemo(
    () =>
      filter === ALL
        ? projects
        : projects.filter((p) => p.tags.includes(filter)),
    [filter, projects],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by tag"
        className="mt-9 flex flex-wrap gap-2"
      >
        {[ALL, ...tags].map((tag) => {
          const active = tag === filter;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter(tag)}
              aria-pressed={active}
              className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                active
                  ? "border-accent bg-accent text-white"
                  : "border-hairline bg-white/[0.02] text-neutral-400 hover:border-neutral-600 hover:text-white"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 border-t border-hairline">
        {visible.map((project, i) => {
          const href = project.demo || project.repo;

          return (
            <motion.li
              key={project.slug}
              layout
              style={{ animationDelay: `${i * 60}ms` }}
              className="reveal border-b border-hairline"
            >
              <Wrapper href={href}>
                {/* Zoom-on-hover, clipped by the wrapper so the tile keeps
                    its rounded footprint while the fill scales past it. */}
                <span className="grid size-14 shrink-0 overflow-hidden rounded-xl">
                  <span
                    aria-hidden="true"
                    className="font-display grid size-full place-items-center text-lg font-extrabold text-white/45 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-115"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}, ${project.accent}40)`,
                    }}
                  >
                    {project.title.charAt(0)}
                  </span>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="font-display block text-[19px] font-bold tracking-tight text-white transition-colors group-hover:text-accent">
                    {project.title}
                  </span>
                  <span className="mt-1 block text-[14px] text-muted">
                    {project.subtitle}
                  </span>
                </span>

                <span className="font-mono hidden shrink-0 text-[12px] text-faint sm:block">
                  {project.year}
                </span>

                {href && (
                  <ArrowUpRight
                    className="size-[18px] shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                )}
              </Wrapper>
            </motion.li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <p className="mt-8 text-[14px] text-muted">
          Nothing tagged “{filter}” yet.
        </p>
      )}
    </div>
  );
}

function Wrapper({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const className =
    "group flex items-center gap-5 py-5 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1.5";

  if (!href) return <div className={className}>{children}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {children}
    </a>
  );
}
