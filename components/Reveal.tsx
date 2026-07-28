/**
 * Staggered fade-and-rise. Deliberately CSS-driven and server-rendered: a
 * JS-driven `opacity: 0` initial state would hide content from crawlers and
 * from anyone whose scripts fail. `prefers-reduced-motion` is honoured by the
 * global duration override in `globals.css`.
 */
export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {children}
    </div>
  );
}
