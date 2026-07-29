/**
 * The three concentric dashed arcs that sweep past the top-left of the profile
 * card, and the shallow arc under the flame badge. Drawn as SVG rather than
 * baked into the photo so they stay crisp at any density.
 */

/**
 * The viewBox is expressed in card coordinates: (0, 0) is the card's top-left
 * corner and one unit is one card pixel at the 340px reference width. The
 * negative region is the bleed above and to the left of the card. Sizing the
 * SVG at 400/340 of the card width keeps the whole sweep in proportion at any
 * card size, which is why the translate percentages below are constants.
 */
export function CornerArcs({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-60 -60 400 260"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Outermost, brightest — amber. Enters the card's left edge about a
          sixth of the way down and exits the top edge near the midpoint. */}
      <path
        d="M-18 54A158.7 158.7 0 0 1 172 -30"
        stroke="#f5a623"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="16 13"
      />
      {/* Middle — accent orange */}
      <path
        d="M6.9 53.3A137 137 0 0 1 154 -12.2"
        stroke="#f0521f"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="12 11"
        opacity="0.85"
      />
      {/* Innermost — a faint echo for depth */}
      <path
        d="M29.3 57A116 116 0 0 1 141.6 6.9"
        stroke="#f0521f"
        strokeWidth="3"
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
