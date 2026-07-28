import type { Metadata } from "next";
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
            <Reveal index={i + 1} className="py-6">
              <p className="label-xs text-accent">{item.role}</p>
              <h2 className="font-display mt-2 text-[19px] font-bold tracking-tight text-white">
                {item.company}
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
