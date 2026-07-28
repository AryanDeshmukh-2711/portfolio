"use client";

import { usePathname } from "next/navigation";

/**
 * Cross-fades the content column on navigation while the profile card stays
 * put. Keyed on the pathname so the element remounts and the CSS animation
 * replays; no JS-controlled opacity, so the first paint is never blank.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="reveal">
      {children}
    </div>
  );
}
