import type { StudentRelevanceProfile, RelevanceRankedEvent } from "./feed-ranking";
import { rankEventsByRelevance, rankEventsWithFollowBoost } from "./feed-ranking";

export const FEED_RESULT_LIMIT = 10;

export function buildPublishedFeedQuery(collegeId?: string, userId?: string) {
  return {
    where: {
      status: "PUBLISHED" as const,
      ...(collegeId ? { collegeId } : {}),
      date: {
        gte: new Date(),
      },
    },
    orderBy: [{ date: "asc" as const }, { id: "asc" as const }],
    include: {
      club: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
        },
      },
      _count: {
        select: {
          rsvps: {
            where: {
              status: {
                in: ["GOING", "ATTENDED"] as ("GOING" | "ATTENDED")[],
              },
            },
          },
        },
      },
      rsvps: {
        where: {
          userId: userId ?? "",
        },
        select: {
          status: true,
        },
      },
    },
  };
}

export function selectTopPersonalizedFeedEvents<T extends RelevanceRankedEvent>(
  events: T[],
  profile: StudentRelevanceProfile,
): T[] {
  const hasSignals =
    profile.followedClubIds.size > 0 ||
    profile.courseKeywords.size > 0 ||
    profile.selectedDomains.size > 0;

  if (!hasSignals) {
    return rankEventsWithFollowBoost(events, new Set<number>()).slice(0, FEED_RESULT_LIMIT);
  }

  return rankEventsByRelevance(events, profile).slice(0, FEED_RESULT_LIMIT);
}
