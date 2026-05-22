export const FOLLOWED_CLUB_FEED_BOOST_MS = 6 * 60 * 60 * 1000;

export const RELEVANCE_WEIGHTS = {
  COURSE_MATCH: 120,
  DOMAIN_MATCH: 120,
  FOLLOWED_CLUB_MATCH: 70,
} as const;

type RankedEvent = {
  id: number;
  clubId: number;
  date: Date;
};

export type RelevanceRankedEvent = RankedEvent & {
  title: string;
  description: string;
  club?: {
    name?: string | null;
  } | null;
};

type StudentRelevanceProfileInput = {
  courseKeywords: Iterable<string>;
  selectedDomains: Iterable<string>;
  followedClubIds: Iterable<number>;
};

export type StudentRelevanceProfile = {
  courseKeywords: ReadonlySet<string>;
  selectedDomains: ReadonlySet<string>;
  followedClubIds: ReadonlySet<number>;
};

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function tokenize(value: string): string[] {
  return normalizeText(value).match(/[a-z0-9]+/g) ?? [];
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toNormalizedSet(values: Iterable<string>): Set<string> {
  const normalized = new Set<string>();

  for (const value of values) {
    const token = normalizeText(value);

    if (token.length >= 2) {
      normalized.add(token);
    }
  }

  return normalized;
}

export function buildStudentRelevanceProfile(
  input: StudentRelevanceProfileInput,
): StudentRelevanceProfile {
  return {
    courseKeywords: toNormalizedSet(input.courseKeywords),
    selectedDomains: toNormalizedSet(input.selectedDomains),
    followedClubIds: new Set(input.followedClubIds),
  };
}

function hasAnyMatch(
  searchableText: string,
  searchableTokens: ReadonlySet<string>,
  keywords: ReadonlySet<string>,
): boolean {
  for (const keyword of keywords) {
    if (keyword.includes(" ")) {
      const phrasePattern = new RegExp(`\\b${escapeRegex(keyword).replace(/\\\s+/g, "\\\\s+")}\\b`, "i");

      if (phrasePattern.test(searchableText)) {
        return true;
      }
      continue;
    }

    if (searchableTokens.has(keyword)) {
      return true;
    }
  }

  return false;
}

export function computeEventRelevanceScore(
  event: RelevanceRankedEvent,
  profile: StudentRelevanceProfile,
): number {
  const searchableText = normalizeText(
    `${event.title} ${event.description} ${event.club?.name ?? ""}`,
  );
  const searchableTokens = new Set(tokenize(searchableText));

  let score = 0;

  if (hasAnyMatch(searchableText, searchableTokens, profile.courseKeywords)) {
    score += RELEVANCE_WEIGHTS.COURSE_MATCH;
  }

  if (hasAnyMatch(searchableText, searchableTokens, profile.selectedDomains)) {
    score += RELEVANCE_WEIGHTS.DOMAIN_MATCH;
  }

  if (profile.followedClubIds.has(event.clubId)) {
    score += RELEVANCE_WEIGHTS.FOLLOWED_CLUB_MATCH;
  }

  return score;
}

export function rankEventsByRelevance<T extends RelevanceRankedEvent>(
  events: T[],
  profile: StudentRelevanceProfile,
): T[] {
  return [...events].sort((a, b) => {
    const scoreDelta = computeEventRelevanceScore(b, profile) - computeEventRelevanceScore(a, profile);

    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    const dateDelta = a.date.getTime() - b.date.getTime();

    if (dateDelta !== 0) {
      return dateDelta;
    }

    return a.id - b.id;
  });
}

export function rankEventsWithFollowBoost<T extends RankedEvent>(
  events: T[],
  followedClubIds: ReadonlySet<number>,
): T[] {
  return [...events].sort((a, b) => {
    const aScore = a.date.getTime() - (followedClubIds.has(a.clubId) ? FOLLOWED_CLUB_FEED_BOOST_MS : 0);
    const bScore = b.date.getTime() - (followedClubIds.has(b.clubId) ? FOLLOWED_CLUB_FEED_BOOST_MS : 0);

    if (aScore === bScore) {
      return a.id - b.id;
    }

    return aScore - bScore;
  });
}