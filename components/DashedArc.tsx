/**
 * The three concentric dashed arcs that sweep past the top-left of the profile
 * card, and the shallow arc under the flame badge. Drawn as SVG rather than
 * baked into the photo so they stay crisp at any density.
 */

export function CornerArcs({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-14 -26 268 224"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Outermost, brightest — amber */}
      <path
        d="M8.7 154.1A182 182 0 0 1 221.6 -9.2"
        stroke="#f5a623"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="17 14"
      />
      {/* Middle — accent orange */}
      <path
        d="M30.6 183.9A160 160 0 0 1 231.4 15.5"
        stroke="#f0521f"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="13 12"
        opacity="0.85"
      />
      {/* Innermost — a faint echo for depth */}
      <path
        d="M44.5 176.6A138 138 0 0 1 214.6 33.7"
        stroke="#f0521f"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="9 10"
        opacity="0.35"
      />
    </svg>
  );
}

export function BadgeArc({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 30" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2 25C46 4 194 4 238 22"
        stroke="#f0521f"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="11 10"
        opacity="0.9"
      />
    </svg>
  );
}
