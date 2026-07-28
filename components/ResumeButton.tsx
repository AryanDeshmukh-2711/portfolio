import { Download } from "lucide-react";
import { profile } from "@/lib/content";

export function ResumeButton() {
  return (
    <a
      href={profile.resume}
      download
      className="glow-accent group inline-flex items-center gap-2.5 rounded-full bg-accent py-2.5 pr-6 pl-2.5 transition hover:bg-accent-bright"
    >
      <span className="grid size-8 place-items-center rounded-full bg-white/20 transition group-hover:bg-white/30">
        <Download className="size-4 text-white" strokeWidth={2.4} aria-hidden="true" />
      </span>
      <span className="label-xs text-white">Resume</span>
    </a>
  );
}
