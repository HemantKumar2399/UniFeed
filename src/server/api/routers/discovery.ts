import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  DISCOVERY_COLLECTION_OPTIONS,
  getDiscoveryMatchScore,
  normalizeDiscoveryFilters,
  normalizeDiscoveryQuery,
  type DiscoveryCollection,
  type DiscoverySearchResult,
} from "@/features/discovery/discovery";
import { EVENT_CATEGORY_OPTIONS } from "@/features/events/event-metadata";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getHappeningThisWeekWindow } from "@/server/services/happening-this-week";

const discoverySearchInput = z.object({
  query: z.string().trim().min(1).max(100),
});

const discoveryFiltersInput = z.object({
  category: z.enum(["ALL", ...EVENT_CATEGORY_OPTIONS]).optional(),
  collection: z.enum(DISCOVERY_COLLECTION_OPTIONS).optional(),
});

function applyDiscoveryCollectionWhere(
  collection: DiscoveryCollection,
): Record<string, unknown> {
  switch (collection) {
    case "happening_this_week": {
      const { start, endExclusive } = getHappeningThisWeekWindow();
      return {
        date: {
          gte: start,
          lt: endExclusive,
        },
      };
    }
    case "free_food":
      return { isFreeFood: true };
    case "workshops":
      return { tags: { has: "workshop" } };
    case "cultural":
      return { category: { in: ["Cultural", "Arts & Culture"] } };
    case "communities":
      return { id: { equals: -1 } };
    case "all":
    default:
      return {};
  }
}

function ensureCollegeId(collegeId: string | null | undefined): string {
  if (!collegeId) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "User session is missing a college association.",
    });
  }

  return collegeId;
}

export const discoveryRouter = createTRPCRouter({
  search: protectedProcedure.input(discoverySearchInput).query(async ({ ctx, input }) => {
    const collegeId = ensureCollegeId(ctx.session.user.collegeId);
    const query = normalizeDiscoveryQuery(input.query);
    const queryTokens = query
      .toLowerCase()
      .split(/[^a-z0-9&]+/i)
      .map((token) => token.trim())
      .filter(Boolean);

    const [events, communities] = await Promise.all([
      ctx.db.event.findMany({
        where: {
          status: "PUBLISHED",
          collegeId,
          date: {
            gte: new Date(),
          },
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { location: { contains: query, mode: "insensitive" } },
            { category: { contains: query, mode: "insensitive" } },
            { club: { name: { contains: query, mode: "insensitive" } } },
            ...(queryTokens.length > 0 ? [{ tags: { hasSome: queryTokens } }] : []),
          ],
        },
        select: {
          id: true,
          title: true,
          description: true,
          date: true,
          registrationClosesAt: true,
          capacity: true,
          location: true,
          category: true,
          tags: true,
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
          club: {
            select: {
              name: true,
            },
          },
        },
        take: 24,
        orderBy: [{ date: "asc" }, { id: "asc" }],
      }),
      ctx.db.club.findMany({
        where: {
          collegeId,
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          name: true,
          events: {
            where: {
              status: "PUBLISHED",
              date: {
                gte: new Date(),
              },
            },
            orderBy: { date: "asc" },
            take: 1,
            select: {
              title: true,
            },
          },
          _count: {
            select: {
              followers: true,
              events: true,
            },
          },
        },
        take: 12,
        orderBy: [{ name: "asc" }],
      }),
    ]);

    const eventResults = events
      .map((event) => ({
        type: "event" as const,
        id: event.id,
        title: event.title,
        href: `/events/${event.id}`,
        date: event.date,
        registrationClosesAt: event.registrationClosesAt,
        capacity: event.capacity,
        activeCount: event._count.rsvps,
        location: event.location,
        clubName: event.club.name,
        category: event.category,
        tags: event.tags,
        score: getDiscoveryMatchScore({
          query,
          primaryText: event.title,
          secondaryText: [
            event.description,
            event.location,
            event.category ?? "",
            event.club.name,
          ],
          tags: event.tags,
        }),
      }))
      .sort((left, right) => {
        const scoreDelta = right.score - left.score;
        if (scoreDelta !== 0) {
          return scoreDelta;
        }

        return left.date.getTime() - right.date.getTime();
      });

    const communityResults = communities
      .map((community) => ({
        type: "community" as const,
        id: community.id,
        title: community.name,
        href: `/hubs/${community.id}`,
        followerCount: community._count.followers,
        eventCount: community._count.events,
        nextEventTitle: community.events[0]?.title,
        score: getDiscoveryMatchScore({
          query,
          primaryText: community.name,
          secondaryText: community.events[0]?.title ? [community.events[0].title] : [],
        }),
      }))
      .sort((left, right) => {
        const scoreDelta = right.score - left.score;
        if (scoreDelta !== 0) {
          return scoreDelta;
        }

        return right.followerCount - left.followerCount;
      });

    return [
      ...eventResults.map(({ score: _score, ...result }) => result),
      ...communityResults.map(({ score: _score, ...result }) => result),
    ] satisfies DiscoverySearchResult[];
  }),

  getDiscover: protectedProcedure
    .input(discoveryFiltersInput)
    .query(async ({ ctx, input }) => {
      const collegeId = ensureCollegeId(ctx.session.user.collegeId);
      const filters = normalizeDiscoveryFilters(input);

      const events = await ctx.db.event.findMany({
        where: {
          status: "PUBLISHED",
          collegeId,
          date: {
            gte: new Date(),
          },
          ...(filters.category !== "ALL" ? { category: filters.category } : {}),
          ...applyDiscoveryCollectionWhere(filters.collection),
        },
        select: {
          id: true,
          title: true,
          date: true,
          registrationClosesAt: true,
          capacity: true,
          location: true,
          imageUrl: true,
          category: true,
          tags: true,
          isFreeFood: true,
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
          club: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: 18,
        orderBy: [{ date: "asc" }, { id: "asc" }],
      });

      const communities = await ctx.db.club.findMany({
        where: {
          collegeId,
        },
        select: {
          id: true,
          name: true,
          updatedAt: true,
          events: {
            where: {
              status: "PUBLISHED",
              date: {
                gte: new Date(),
              },
            },
            orderBy: { date: "asc" },
            take: 1,
            select: {
              id: true,
              title: true,
              date: true,
              location: true,
            },
          },
          _count: {
            select: {
              followers: true,
              events: true,
              blocks: true,
            },
          },
        },
        take: filters.collection === "communities" ? 24 : 8,
        orderBy:
          filters.collection === "communities"
            ? [{ name: "asc" }]
            : [{ followers: { _count: "desc" } }, { name: "asc" }],
      });

      return {
        filters,
        events:
          filters.collection === "communities"
            ? []
            : events.map((event) => ({
          id: event.id,
          title: event.title,
          href: `/events/${event.id}`,
          date: event.date,
          registrationClosesAt: event.registrationClosesAt,
          capacity: event.capacity,
          activeCount: event._count.rsvps,
          location: event.location,
          imageUrl: event.imageUrl,
          category: event.category,
          tags: event.tags,
          isFreeFood: event.isFreeFood,
          clubName: event.club.name,
        })),
        communities: communities.map((community) => ({
          id: community.id,
          title: community.name,
          href: `/hubs/${community.id}`,
          followerCount: community._count.followers,
          eventCount: community._count.events,
          blockCount: community._count.blocks,
          updatedAt: community.updatedAt,
          nextEvent: community.events[0] ?? null,
        })),
      };
    }),
});
