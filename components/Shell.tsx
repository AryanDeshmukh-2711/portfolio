import { DockNav } from "@/components/DockNav";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition } from "@/components/PageTransition";
import { ProfileCard } from "@/components/ProfileCard";
import { ResumeButton } from "@/components/ResumeButton";

/**
 * Persistent app frame. On desktop the viewport is pinned to 100dvh and only
 * the content column scrolls, so the profile card and dock never move.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-col px-5 pt-6 pb-32 lg:h-dvh lg:px-6 lg:py-7">
      <LoadingScreen />

      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <DockNav />

      <div className="mt-8 grid flex-1 gap-y-12 lg:mt-11 lg:min-h-0 lg:grid-cols-[var(--shell-aside)_1fr] lg:gap-x-[var(--shell-gap)]">
        <aside className="flex flex-col items-center lg:items-stretch">
          <div className="w-full max-w-[340px]">
            <ProfileCard />
          </div>
          <div className="mt-9 lg:mt-auto lg:pt-8">
            <ResumeButton />
          </div>
        </aside>

        <main
          id="content"
          className="no-scrollbar min-w-0 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:pr-1"
        >
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
