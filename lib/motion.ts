/** Shared motion helpers. */

/** True when the visitor has asked the OS to reduce motion. Safe on the server. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Ease-out cubic — matches the cubic-bezier(0.22, 1, 0.36, 1) used in CSS. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
