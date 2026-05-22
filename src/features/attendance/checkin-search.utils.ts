export type AttendeeSearchCandidate = {
  userId: string;
  name?: string | null;
  email?: string | null;
  prn?: string | null;
};

export function resolveAttendeePrn(candidate: AttendeeSearchCandidate): string | null {
  if (candidate.prn && candidate.prn.trim().length > 0) {
    return candidate.prn.trim();
  }

  return null;
}

export function matchesAttendeeQuery(candidate: AttendeeSearchCandidate, rawQuery: string): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return false;
  }

  const prn = resolveAttendeePrn(candidate)?.toLowerCase();
  const name = (candidate.name ?? "").toLowerCase();
  const email = (candidate.email ?? "").toLowerCase();

  return Boolean((prn?.includes(query) ?? false) || name.includes(query) || email.includes(query));
}
