import type { db as prismaDb } from "@/server/db";
import { deriveFeedPreferenceSignals } from "@/server/services/feed-preferences";
import { buildPublishedFeedQuery, selectTopPersonalizedFeedEvents } from "@/server/services/feed-query";
import { buildStudentRelevanceProfile } from "@/server/services/feed-ranking";

interface FeedEngineContext {
  db: typeof prismaDb;
  headers: Headers;
}

export async function getPersonalizedFeed(
  ctx: FeedEngineContext,
  userId: string,
  collegeId: string,
) {
  // 1. Fetch upcoming published events for the user's college
  const events = await ctx.db.event.findMany(buildPublishedFeedQuery(collegeId, userId));

  // 2. Fetch the clubs followed by the user
  const followedRows = await ctx.db.hubFollow.findMany({
    where: { userId },
    select: { clubId: true },
  });
  const followedClubIds = followedRows.map((row) => row.clubId);

  // 3. Derive preference signals from headers
  const { courseKeywords: headerCourses, selectedDomains: headerDomains } = deriveFeedPreferenceSignals(ctx.headers);

  // 4. Fetch student profile and category preferences
  const [studentProfile, userPrefs] = await Promise.all([
    ctx.db.studentProfile.findUnique({
      where: { userId },
      select: { course: true, branch: true },
    }),
    ctx.db.userPreference.findUnique({
      where: { userId },
      select: { preferredCategories: true },
    }),
  ]);

  const dbCourses = studentProfile ? [studentProfile.course, studentProfile.branch] : [];
  const dbDomains = userPrefs?.preferredCategories ?? [];

  // 5. Merge headers and database preferences to prevent duplicate processing
  const courseKeywords = Array.from(new Set([...headerCourses, ...dbCourses]));
  const selectedDomains = Array.from(new Set([...headerDomains, ...dbDomains]));

  // 6. Build the student profile relevance object
  const profile = buildStudentRelevanceProfile({
    courseKeywords,
    selectedDomains,
    followedClubIds,
  });

  // 7. Perform relevance-weighted sorting
  return selectTopPersonalizedFeedEvents(events, profile);
}
