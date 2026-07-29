import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { CountUp } from "@/components/CountUp";
import { Magnetic } from "@/components/Magnetic";
import { PageHeading } from "@/components/PageHeading";
import { ScrollBlock } from "@/components/ScrollBlock";
import { profile } from "@/lib/content";

const githubUrl =
  profile.socials.find((s) => s.id === "github")?.href ?? "https://github.com";

/**
 * Compact hero: heading, bio, stats and both cards sit together in the first
 * screen, matching the reference. It is one reveal block rather than several,
 * so the whole intro settles as a unit instead of each part fading separately
 * while all of them are already on screen.
 */
export function HeroSection() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="scroll-mt-28 border-b border-white/5 pb-16 lg:pb-24"
    >
      <ScrollBlock>
        <PageHeading lead={profile.role[0]} trail={profile.role[1]} />

        <p className="mt-9 max-w-[400px] text-[15px] leading-[1.75] text-muted">
          {profile.bio}
        </p>

        <ul className="mt-11 flex flex-wrap gap-x-14 gap-y-7">
          {profile.stats.map((stat, i) => (
            <li key={stat.label}>
              <span className="font-display block text-[38px] leading-none font-extrabold tracking-tight text-white tabular-nums">
                <CountUp value={stat.value} delay={i * 130} />
              </span>
              <span className="label-xs mt-2.5 block max-w-[92px] leading-[1.5] text-faint">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Magnetic strength={0.16} max={10}>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-[176px] flex-col justify-between rounded-[28px] bg-accent p-6 transition hover:brightness-110"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-10 place-items-center rounded-full bg-black/20">
                  <GithubIcon className="size-5 text-white" />
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-black/20 transition group-hover:rotate-45">
                  <ArrowUpRight className="size-4 text-white" strokeWidth={2.4} />
                </span>
              </div>
              <span className="font-display max-w-[130px] text-[15px] leading-[1.25] font-bold tracking-wide text-white uppercase">
                Explore my GitHub
              </span>
            </a>
          </Magnetic>

          <Magnetic strength={0.16} max={10}>
            <Link
              href="#projects"
              className="group relative flex h-[176px] flex-col justify-between overflow-hidden rounded-[28px] bg-lime p-6 transition hover:brightness-105"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-10 place-items-center rounded-full bg-black/15">
                  <Layers className="size-5 text-neutral-900" strokeWidth={2.1} />
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-black/15 transition group-hover:rotate-45">
                  <ArrowUpRight
                    className="size-4 text-neutral-900"
                    strokeWidth={2.4}
                  />
                </span>
              </div>
              <span className="font-display relative z-10 max-w-[120px] text-[15px] leading-[1.25] font-bold tracking-wide text-neutral-900 uppercase">
                Featured projects
              </span>
              <svg
                viewBox="0 0 120 44"
                fill="none"
                aria-hidden="true"
                className="absolute right-5 bottom-5 w-[118px]"
              >
                <path
                  d="M2 40 22 26 38 33 58 14 74 21 92 7 116 3"
                  stroke="#1a1a1a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="7 6"
                />
              </svg>
            </Link>
          </Magnetic>
        </div>
      </ScrollBlock>
    </section>
  );
}
