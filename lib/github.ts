import { profile } from "@/lib/content";

/**
 * GitHub's own REST API does not expose the contribution calendar — only the
 * GraphQL API does, and that requires an authenticated token. This uses a
 * public proxy for it so the graph works with no secret to configure.
 */
const ENDPOINT = "https://github-contributions-api.jogruber.de/v4";

/** One day of the calendar. `level` is GitHub's own 0–4 intensity bucket. */
export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface Contributions {
  total: number;
  days: ContributionDay[];
}

/**
 * Returns the last twelve months of contributions, or null if the username is
 * unset or the upstream call fails. Never throws: a third-party outage must
 * not fail the build or take the page down, so callers render a fallback.
 */
export async function getContributions(): Promise<Contributions | null> {
  const user = profile.githubUsername?.trim();
  if (!user) return null;

  try {
    const res = await fetch(`${ENDPOINT}/${encodeURIComponent(user)}?y=last`, {
      // Contributions change at most daily; this keeps the page static.
      next: { revalidate: 86_400 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: ContributionDay[];
    };

    const days = data.contributions ?? [];
    if (days.length === 0) return null;

    const total = Object.values(data.total ?? {}).reduce((a, b) => a + b, 0);
    return { total, days };
  } catch {
    return null;
  }
}

/**
 * Groups days into calendar weeks (columns of seven, Sunday first), padding
 * the first week so the rows line up with days of the week.
 */
export function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];

  const firstDay = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < firstDay; i++) week.push(null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}
