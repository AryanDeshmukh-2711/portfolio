import Image from "next/image";
import { Flame } from "lucide-react";
import { brandIcons } from "@/components/BrandIcons";
import { BadgeArc, CornerArcs } from "@/components/DashedArc";
import { profile } from "@/lib/content";

/**
 * The fixed identity card that persists across every route: duotone portrait
 * on an orange field over a white slab with the name, tagline and socials.
 */
export function ProfileCard() {
  return (
    <div className="relative">
      {/* Tucked in on small screens so the sweep never clips at the viewport edge. */}
      <CornerArcs className="pointer-events-none absolute -top-9 -left-4 z-10 w-[206px] sm:-top-11 sm:-left-9 sm:w-[236px]" />

      <article className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)]">
        <div className="relative aspect-[338/357] bg-accent">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 340px, 300px"
            className="object-cover"
          />
        </div>

        <div className="px-6 pt-6 pb-7 text-center">
          <h2 className="font-display text-[26px] leading-tight font-extrabold tracking-tight text-neutral-900">
            {profile.name}
          </h2>

          <div className="mt-4 flex justify-center">
            <span className="grid size-11 place-items-center rounded-full bg-accent shadow-[0_6px_20px_-4px_rgba(240,82,31,0.8)]">
              <Flame className="size-5 text-white" strokeWidth={2.2} aria-hidden="true" />
            </span>
          </div>

          <BadgeArc className="mt-3 h-4 w-full" />

          <p className="mt-4 text-[13.5px] leading-relaxed text-neutral-500">
            {profile.tagline}
          </p>

          <ul className="mt-6 flex items-center justify-center gap-5">
            {profile.socials.map((social) => {
              const Icon = brandIcons[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="block text-accent transition hover:scale-110 hover:text-accent-bright"
                  >
                    <Icon className="size-[21px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </div>
  );
}
