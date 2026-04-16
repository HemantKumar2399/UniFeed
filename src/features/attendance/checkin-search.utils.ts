export type AttendeeSearchCandidate = {
  userId: string;
  name?: string | null;
  email?: string | null;
  prn?: string | null;
};

export function fallbackPrnFromUserId(userId: string): string {
  return `PRN-${userId.substring(0, 6).padEnd(6, "0")}`;
}

function inferPrnFromEmail(email?: string | null): string | null {
  if (!email) {
    return null;
  }

  const [localPart] = email.split("@");
  const cleaned = localPart?.trim().replace(/[^a-zA-Z0-9-]/g, "");
  if (!cleaned || cleaned.length < 4) {
    return null;
  }

  return `PRN-${cleaned.toUpperCase()}`;
}

export function resolveAttendeePrn(candidate: AttendeeSearchCandidate): string {
  if (candidate.prn && candidate.prn.trim().length > 0) {
    return candidate.prn;
  }

  const inferredPrn = inferPrnFromEmail(candidate.email);
  if (inferredPrn) {
    return inferredPrn;
  }

  return fallbackPrnFromUserId(candidate.userId);
}

export function matchesAttendeeQuery(candidate: AttendeeSearchCandidate, rawQuery: string): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return false;
  }

  const prn = resolveAttendeePrn(candidate).toLowerCase();
  const name = (candidate.name ?? "").toLowerCase();
  const email = (candidate.email ?? "").toLowerCase();

  return prn.includes(query) || name.includes(query) || email.includes(query);
}
