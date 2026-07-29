"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Pulls its child toward the cursor while hovered, then springs back.
 *
 * Writes to `style.transform` directly rather than through state — a
 * re-render per mousemove would be wasteful. Disabled for coarse pointers
 * (where there is no hover) and under prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.28,
  max = 14,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !prefersReducedMotion();

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !enabled()) return;

    const box = el.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);

    const x = Math.max(-max, Math.min(max, dx * strength));
    const y = Math.max(-max, Math.min(max, dy * strength));

    el.style.transition = "transform 120ms cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 450ms cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "translate(0px, 0px)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </div>
  );
}
