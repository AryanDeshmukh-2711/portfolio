/**
 * Wordmark and progress bar that cover the page on load, then fade out.
 *
 * Intentionally has no JavaScript: it is server-rendered and both the bar fill
 * and the dismissal are CSS animations with `forwards` fill. That means no
 * hydration mismatch, no flash of content before the overlay mounts, and no
 * way for a script failure to leave the overlay stuck over the site. It lives
 * in the root layout, so it plays once per page load rather than per route.
 */
export function LoadingScreen() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-ink"
      style={{ animation: "loader-out 2.2s cubic-bezier(0.22,1,0.36,1) forwards" }}
    >
      <div className="flex w-[240px] flex-col items-center gap-5">
        <span className="font-display text-[22px] font-extrabold tracking-[0.2em] text-white uppercase">
          Aryan<span className="text-accent">.dev</span>
        </span>
        <span className="h-px w-full overflow-hidden bg-white/10">
          <span
            className="block h-full bg-accent"
            style={{
              animation: "loader-bar 1.35s cubic-bezier(0.22,1,0.36,1) forwards",
            }}
          />
        </span>
      </div>
    </div>
  );
}
