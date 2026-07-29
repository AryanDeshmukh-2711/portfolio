import { ScrollBlock } from "@/components/ScrollBlock";
import { PageHeading } from "@/components/PageHeading";

/**
 * One anchored stop on the single-page scroll. `scroll-mt` keeps the heading
 * clear of the fixed dock when the section is jumped to from the nav.
 */
export function Section({
  id,
  lead,
  trail,
  children,
  last = false,
}: {
  id: string;
  lead: string;
  trail: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      id={id}
      aria-label={`${lead} ${trail}`}
      className={`scroll-mt-28 py-16 lg:py-24 ${
        last ? "" : "border-b border-white/5"
      }`}
    >
      <ScrollBlock>
        <PageHeading lead={lead} trail={trail} />
      </ScrollBlock>
      <ScrollBlock className="mt-10">{children}</ScrollBlock>
    </section>
  );
}
