const month = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  timeZone: "UTC",
});

const monthYear = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats a project period such as "Nov – Dec 2023" or "Sept 2022 – May 2023". */
export function formatPeriod(start: Date, end?: Date): string {
  if (!end) return `${monthYear.format(start)} – Present`;

  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();

  if (sameYear && start.getUTCMonth() === end.getUTCMonth()) {
    return monthYear.format(start);
  }

  return sameYear
    ? `${month.format(start)} – ${monthYear.format(end)}`
    : `${monthYear.format(start)} – ${monthYear.format(end)}`;
}
