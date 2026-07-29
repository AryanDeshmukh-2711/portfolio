import { DockNav } from "@/components/DockNav";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition } from "@/components/PageTransition";
import { ProfileCard } from "@/components/ProfileCard";
import { ResumeButton } from "@/components/ResumeButton";

/**
 * Persistent app frame: sticky-left, scrolling-right.
 *
 * The document itself scrolls — the profile column is `position: sticky` and
 * pins in place while the content column travels past it. That real scroll
 * distance is what the per-block reveals in `ScrollBlock` are driven from, so
 * the column must not be an internal scroll container.
 *
 * `items-start` on the grid is load-bearing: the default `stretch` would make
 * the aside full-height and sticky positioning would have nothing to do.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-5 pt-6 pb-32 lg:px-6 lg:pt-28 lg:pb-16">
      <LoadingScreen />

      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <DockNav />

      <div className="grid gap-y-12 lg:grid-cols-[var(--shell-aside)_1fr] lg:items-start lg:gap-x-[var(--shell-gap)]">
        <aside className="flex flex-col items-center lg:sticky lg:top-28 lg:h-[calc(100dvh-9rem)] lg:items-stretch">
          <div className="w-full max-w-[340px]">
            <ProfileCard />
          </div>
          <div className="mt-9 lg:mt-auto lg:pt-8">
            <ResumeButton />
          </div>
        </aside>

        <main id="content" className="min-w-0">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
