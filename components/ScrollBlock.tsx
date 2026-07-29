"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const noopSubscribe = () => () => {};

/**
 * Returns false while server-rendering and during the hydration pass, true
 * afterwards. Used instead of a `useState` + `useEffect` pair so no state is
 * set synchronously inside an effect.
 */
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * A block that reveals as it scrolls into view and fades back out as it
 * leaves — `once: false`, so the effect is continuous in both directions
 * rather than a one-shot reveal.
 *
 * Before hydration the block renders fully visible, so the server HTML never
 * contains `opacity: 0`. Motion only takes over once it is running on the
 * client, which keeps the content available to crawlers and to anyone whose
 * scripts fail.
 */
export function ScrollBlock({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reducedMotion = useReducedMotion();

  // Trigger once the block is meaningfully inside the viewport rather than at
  // the very first pixel, so the fade tracks the reading position.
  const inView = useInView(ref, {
    once: false,
    margin: "-18% 0px -18% 0px",
  });

  // The global CSS override only collapses CSS animations, so reduced motion
  // has to be honoured here explicitly — otherwise content would still fade
  // in and out for someone who asked for less movement.
  const visible = !hydrated || reducedMotion || inView;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 26 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
