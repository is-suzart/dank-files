/** Space used on a mounted volume, in bytes. */
export interface VolumeUsage { used: number; total: number; }

/**
 * Unknown values never become a zero bar: a volume without a trustworthy
 * total simply has no usage, and the sidebar keeps showing its name only.
 */
export function normalizeUsage(value: unknown): VolumeUsage | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as { used?: unknown; total?: unknown };
  const used = record.used, total = record.total;
  if (typeof used !== 'number' || typeof total !== 'number') return null;
  if (!Number.isFinite(used) || !Number.isFinite(total) || total <= 0 || used < 0) return null;
  return { used: Math.min(used, total), total };
}

/** Fraction of the volume in use, or null when there is nothing to draw. */
export function usageFraction(usage: VolumeUsage | null | undefined): number | null {
  const normalized = normalizeUsage(usage);
  return normalized ? Math.max(0, Math.min(1, normalized.used / normalized.total)) : null;
}
