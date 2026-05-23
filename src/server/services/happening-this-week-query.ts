import type { RSVPStatus } from "@prisma/client";
import { getHappeningThisWeekWindow, isInHappeningThisWeekWindow } from "./happening-this-week";

export const HAPPENING_THIS_WEEK_LIMIT = 12;

export function buildHappeningThisWeekQuery(referenceDate: Date = new Date()) {
  const { start, endExclusive } = getHappeningThisWeekWindow(referenceDate);

  return {
    where: {
      status: "PUBLISHED" as const,
      date: {
        gte: start,
        lt: endExclusive,
      },
    },
    take: HAPPENING_THIS_WEEK_LIMIT,
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
                in: ["GOING", "ATTENDED"] as RSVPStatus[],
              },
            },
          },
        },
      },
    },
  };
}

type WeekEvent = {
  id: number;
  date: Date;
};

export function selectHappeningThisWeekEvents<T extends WeekEvent>(
  events: T[],
  referenceDate: Date = new Date(),
): T[] {
  return events
    .filter((event) => isInHappeningThisWeekWindow(event.date, referenceDate))
    .sort((a, b) => {
      const dateDelta = a.date.getTime() - b.date.getTime();
      if (dateDelta !== 0) {
        return dateDelta;
      }

      return a.id - b.id;
    })
    .slice(0, HAPPENING_THIS_WEEK_LIMIT);
}
