import { ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import { experience } from "@/lib/content";

export function ExperienceSection() {
  return (
    <Section id="experience" lead="Work" trail="Experience">
      <ul className="border-t border-hairline">
        {experience.map((item) => (
          <li key={item.slug} className="border-b border-hairline">
            <div className="group py-6 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1.5">
              <p className="label-xs text-accent">{item.role}</p>
              <h3 className="font-display mt-2 flex items-center gap-2 text-[19px] font-bold tracking-tight text-white">
                {item.company}
                <ArrowRight
                  className="size-4 -translate-x-2 text-accent opacity-0 transition duration-400 group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </h3>
              <p className="mt-2.5 max-w-[560px] text-[14.5px] leading-[1.7] text-muted">
                {item.description}
              </p>
              <p className="font-mono mt-4 text-[12px] text-faint">
                {item.start} — {item.end}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
