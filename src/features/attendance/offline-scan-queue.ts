export type OfflineScanItem = { token: string; scannedAt: string };

export async function reconcileOfflineScans(
  queue: OfflineScanItem[],
  verify: (
    item: OfflineScanItem,
  ) => Promise<{ outcome: string; message: string }>,
) {
  let confirmed = 0;
  const remaining: OfflineScanItem[] = [];
  const issues: string[] = [];
  for (const [index, item] of queue.entries()) {
    try {
      const result = await verify(item);
      if (
        result.outcome === "CHECKED_IN" ||
        result.outcome === "ALREADY_CHECKED_IN"
      )
        confirmed++;
      else {
        remaining.push(item);
        issues.push(result.message);
      }
    } catch (error) {
      remaining.push(...queue.slice(index));
      issues.push(
        error instanceof Error ? error.message : "Unable to sync check-in",
      );
      break;
    }
  }
  return { confirmed, remaining, issues };
}
