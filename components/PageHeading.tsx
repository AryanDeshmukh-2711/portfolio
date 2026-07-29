import { Fragment } from "react";

/**
 * The signature two-tone headline: first line solid white, second line dropped
 * back to near-background so it reads as texture rather than copy.
 *
 * Words animate in one at a time. The stagger is pure CSS (an inline
 * animation-delay per word), so the full heading is server-rendered as real
 * text — selectable, crawlable, and visible even if scripts never run.
 */
function Words({ text, from }: { text: string; from: number }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 && " "}
          <span
            className="reveal-word"
            style={{ animationDelay: `${(from + i) * 90}ms` }}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </>
  );
}

export function PageHeading({
  lead,
  trail,
  id,
}: {
  lead: string;
  trail: string;
  id?: string;
}) {
  const leadWords = lead.split(" ").length;

  return (
    <h1 id={id} className="display-hed text-[clamp(2.4rem,6vw,4.6rem)]">
      <span className="block text-white">
        <Words text={lead} from={0} />
      </span>
      <span className="block text-ghost">
        <Words text={trail} from={leadWords} />
      </span>
    </h1>
  );
}
