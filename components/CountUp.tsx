"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { easeOutCubic, prefersReducedMotion } from "@/lib/motion";

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DURATION = 1100;

/**
 * Counts a stat up from zero on mount. The final value is what renders on the
 * server, so the real number is in the HTML and the animation only ever
 * replaces it after hydration — never the other way round.
 *
 * Accepts values like "+5" or "12%": any non-digit prefix/suffix is preserved.
 */
export function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";

  const [display, setDisplay] = useState(target);
  const frame = useRef<number | undefined>(undefined);

  // Depend on primitives only. `match` is a fresh array on every render, so
  // including it would re-run this effect each time it sets state — an endless
  // loop that restarts the count and pins the display at zero.
  useIsomorphicLayoutEffect(() => {
    if (target === 0 || prefersReducedMotion()) return;

    setDisplay(0);
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / DURATION, 1);
      setDisplay(Math.round(easeOutCubic(t) * target));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    // requestAnimationFrame does not fire in a backgrounded or non-compositing
    // tab, which would leave the stat frozen at zero. Timers still run, so this
    // guarantees the real number is shown either way.
    const failsafe = setTimeout(
      () => setDisplay(target),
      DURATION + delay + 400,
    );

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      clearTimeout(failsafe);
    };
  }, [target, delay]);

  if (!match) return <>{value}</>;

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}
