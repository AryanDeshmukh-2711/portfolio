import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHeading } from "@/components/PageHeading";
import { Reveal } from "@/components/Reveal";
import { experience } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description: "Roles, responsibilities and the work behind them.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="pb-4">
      <PageHeading lead="Work" trail="Experience" />

      <ul className="mt-10 border-t border-hairline">
        {experience.map((item, i) => (
          <li key={item.slug} className="border-b border-hairline">
            <Reveal
              index={i + 1}
              className="group py-6 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1.5"
            >
              <p className="label-xs text-accent">{item.role}</p>
              <h2 className="font-display mt-2 flex items-center gap-2 text-[19px] font-bold tracking-tight text-white">
                {item.company}
                <ArrowRight
                  className="size-4 -translate-x-2 text-accent opacity-0 transition duration-400 group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </h2>
              <p className="mt-2.5 max-w-[560px] text-[14.5px] leading-[1.7] text-muted">
                {item.description}
              </p>
              <p className="font-mono mt-4 text-[12px] text-faint">
                {item.start} — {item.end}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
