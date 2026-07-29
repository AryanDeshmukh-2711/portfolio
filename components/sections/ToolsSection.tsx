import {
  Box,
  Brain,
  Code,
  Database,
  Globe,
  MessageSquare,
  PenTool,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/Section";
import { tools } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  code: Code,
  terminal: Terminal,
  brain: Brain,
  message: MessageSquare,
  database: Database,
  box: Box,
  figma: PenTool,
};

export function ToolsSection() {
  return (
    <Section id="tools" lead="Premium" trail="Tools">
      <ul className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => {
          const Icon = icons[tool.icon] ?? Box;

          return (
            <li key={tool.id}>
              <a
                href={tool.href ?? "#"}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3.5 rounded-2xl border border-hairline bg-surface p-4 transition duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-neutral-700 hover:bg-surface-2"
              >
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-full transition-transform duration-400 group-hover:scale-110"
                  style={{ backgroundColor: `${tool.color}1f` }}
                >
                  <Icon
                    className="size-5"
                    style={{ color: tool.color }}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
                <span className="min-w-0">
                  <span className="font-display block text-[15px] font-bold tracking-tight text-white">
                    {tool.name}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-muted">
                    {tool.category}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
