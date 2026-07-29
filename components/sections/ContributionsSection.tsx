import { Section } from "@/components/Section";
import { profile } from "@/lib/content";
import { getContributions, toWeeks } from "@/lib/github";
import type { ContributionDay } from "@/lib/github";

/** GitHub's 0–4 intensity buckets, recoloured to the site's accent. */
const LEVELS = [
  "rgba(255,255,255,0.055)",
  "rgba(240,82,31,0.30)",
  "rgba(240,82,31,0.52)",
  "rgba(240,82,31,0.76)",
  "rgb(240,82,31)",
];

const CELL = 9;
const GAP = 2;
const STEP = CELL + GAP;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export async function ContributionsSection() {
  const data = await getContributions();
  const profileUrl = `https://github.com/${profile.githubUsername}`;

  return (
    <Section id="activity" lead="GitHub" trail="Activity">
      {data === null ? (
        <p className="text-[14.5px] text-muted">
          Contribution data is unavailable right now —{" "}
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent hover:underline"
          >
            view it on GitHub
          </a>
          .
        </p>
      ) : (
        <Graph total={data.total} weeks={toWeeks(data.days)} href={profileUrl} />
      )}
    </Section>
  );
}

function Graph({
  total,
  weeks,
  href,
}: {
  total: number;
  weeks: (ContributionDay | null)[][];
  href: string;
}) {
  const width = weeks.length * STEP - GAP;

  // Label a column when its month differs from the last one labelled, leaving
  // enough columns between labels that the text cannot overlap.
  const labels: { left: number; text: string }[] = [];
  let lastMonth = -1;
  let lastLabelled = -99;
  weeks.forEach((week, i) => {
    const day = week.find((d) => d !== null);
    if (!day) return;
    const month = new Date(`${day.date}T00:00:00Z`).getUTCMonth();
    if (month !== lastMonth && i - lastLabelled >= 3) {
      labels.push({ left: i * STEP, text: MONTHS[month] });
      lastMonth = month;
      lastLabelled = i;
    }
  });

  return (
    <div>
      <p className="text-[14.5px] text-muted">
        <span className="font-display font-bold text-white">{total}</span>{" "}
        contributions in the last year
      </p>

      <div className="no-scrollbar mt-6 overflow-x-auto pb-1">
        <div style={{ width }}>
          <div className="relative mb-2 h-4 text-[11px] text-faint">
            {labels.map((label) => (
              <span
                key={`${label.text}-${label.left}`}
                className="absolute top-0"
                style={{ left: label.left }}
              >
                {label.text}
              </span>
            ))}
          </div>

          <div className="flex" style={{ gap: GAP }}>
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((day, j) => (
                  <span
                    key={j}
                    title={
                      day
                        ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                        : undefined
                    }
                    className="rounded-[2px]"
                    style={{
                      width: CELL,
                      height: CELL,
                      background: day ? LEVELS[day.level] ?? LEVELS[0] : "transparent",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-[13px] text-muted transition hover:text-accent"
        >
          @{profile.githubUsername}
        </a>

        <div className="flex items-center gap-1.5 text-[11px] text-faint">
          <span>Less</span>
          {LEVELS.map((background, i) => (
            <span
              key={i}
              className="rounded-[2px]"
              style={{ width: CELL, height: CELL, background }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
