import { DockNav } from "@/components/DockNav";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ProfileCard } from "@/components/ProfileCard";
import { ResumeButton } from "@/components/ResumeButton";

/**
 * Persistent app frame: pinned-left, scrolling-right.
 *
 * The profile column is `position: sticky` rather than `fixed` on purpose —
 * fixed positions against the viewport, so it would detach from the centred
 * container and need brittle `calc(50vw …)` math to stay aligned. Sticky keeps
 * it inside the grid, so it inherits the same margins at every width while
 * behaving identically on screen.
 *
 * `items-start` on the grid is load-bearing: the default `stretch` would make
 * the aside full-height and sticky would have nothing to move within.
 *
 * There is also no bottom padding on desktop. Padding on this wrapper sits
 * below the grid, so it would end the sticky container short of the document
 * bottom and let the card drift up over the final screen no matter how much
 * content follows. The tail inside <main> supplies that breathing room instead,
 * because it extends the grid rather than sitting outside it.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-5 pt-6 pb-32 lg:px-6 lg:pt-28 lg:pb-0">
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
          {children}

          {/* A sticky item stops at its container's content box. Without this
              tail the card would drift upward over the final screenful, so the
              content column is extended past the last section to keep it
              pinned all the way down. */}
          <div aria-hidden="true" className="hidden lg:block lg:h-[32vh]" />
        </main>
      </div>
    </div>
  );
}
