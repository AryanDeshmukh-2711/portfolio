/**
 * The signature two-tone headline: first line solid white, second line dropped
 * back to near-background so it reads as texture rather than copy.
 */
export function PageHeading({
  lead,
  trail,
  id,
}: {
  lead: string;
  trail: string;
  id?: string;
}) {
  return (
    <h1 id={id} className="display-hed text-[clamp(2.4rem,6vw,4.6rem)]">
      <span className="block text-white">{lead}</span>
      <span className="block text-ghost">{trail}</span>
    </h1>
  );
}
