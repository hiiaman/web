import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/** Format an ISO date string to "Mar 1, 2026" */
export function formatDate(iso: string): string {
  return dayjs(iso).format("MMM D, YYYY");
}

/** Format an ISO date string to relative time, e.g. "2 hours ago" */
export function timeAgo(iso: string): string {
  return dayjs(iso).fromNow();
}

/** Convert months to human-readable age, e.g. 14 → "1 year 2 months" */
export function formatAge(months: number): string {
  if (months < 1) return "< 1 month";
  const years = Math.floor(months / 12);
  const rem   = months % 12;
  if (years === 0) return `${rem} month${rem !== 1 ? "s" : ""}`;
  if (rem   === 0) return `${years} year${years !== 1 ? "s" : ""}`;
  return `${years}y ${rem}m`;
}

/** Round distance to 1 decimal, e.g. 1.834 → "1.8 km" */
export function formatDistance(km: number): string {
  return `${km.toFixed(1)} km`;
}
