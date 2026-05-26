/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
process.env.SKIP_ENV_VALIDATION = "1";

import assert from "node:assert/strict";
import test from "node:test";

import { TRPCError } from "@trpc/server";

import { appRouter } from "@/server/api/root";
import { createCallerFactory } from "@/server/api/trpc";

const createCaller = createCallerFactory(appRouter);

void test("discoveryRouter.search returns college-scoped event and community results", async () => {
  let eventSearchCalled = false;
  let communitySearchCalled = false;

  const mockedCtx = {
    db: {
      event: {
        findMany: async (args: any) => {
          eventSearchCalled = true;
          assert.equal(args.where.collegeId, "college-1");
          assert.equal(args.where.status, "PUBLISHED");
          assert.ok(args.where.date.gte instanceof Date);

          return [
            {
              id: 41,
              title: "Robotics Workshop",
              description: "Build autonomous line followers.",
              date: new Date("2030-06-01T10:00:00.000Z"),
              registrationClosesAt: new Date("2030-05-31T10:00:00.000Z"),
              capacity: 80,
              location: "Innovation Lab",
              category: "Technical",
              tags: ["robotics", "workshop"],
              _count: {
                rsvps: 32,
              },
              club: {
                name: "Robotics Hub",
              },
            },
          ];
        },
      },
      club: {
        findMany: async (args: any) => {
          communitySearchCalled = true;
          assert.equal(args.where.collegeId, "college-1");
          assert.equal(args.where.name.contains, "robotics");

          return [
            {
              id: 7,
              name: "Robotics Hub",
              events: [{ title: "Robotics Workshop" }],
              _count: {
                followers: 80,
                events: 6,
              },
            },
          ];
        },
      },
    } as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: "college-1",
      },
      expires: "2026-05-24T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  const results = await caller.discovery.search({ query: "robotics" });

  assert.ok(eventSearchCalled);
  assert.ok(communitySearchCalled);
  assert.equal(results.length, 2);
  assert.deepEqual(results[0], {
    type: "event",
    id: 41,
    title: "Robotics Workshop",
    href: "/events/41",
    date: new Date("2030-06-01T10:00:00.000Z"),
    registrationClosesAt: new Date("2030-05-31T10:00:00.000Z"),
    capacity: 80,
    activeCount: 32,
    location: "Innovation Lab",
    clubName: "Robotics Hub",
    category: "Technical",
    tags: ["robotics", "workshop"],
  });
  assert.deepEqual(results[1], {
    type: "community",
    id: 7,
    title: "Robotics Hub",
    href: "/hubs/7",
    followerCount: 80,
    eventCount: 6,
    nextEventTitle: "Robotics Workshop",
  });
});

void test("discoveryRouter.search rejects users without a college scope", async () => {
  const mockedCtx = {
    db: {
      event: {
        findMany: async () => [],
      },
      club: {
        findMany: async () => [],
      },
    } as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: null,
      },
      expires: "2026-05-24T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.discovery.search({ query: "robotics" });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "PRECONDITION_FAILED");
      return true;
    },
  );
});

void test("discoveryRouter.getDiscover applies category and collection filters safely", async () => {
  let capturedEventWhere: any = null;
  let capturedCommunityWhere: any = null;

  const mockedCtx = {
    db: {
      event: {
        findMany: async (args: any) => {
          capturedEventWhere = args.where;
          return [];
        },
      },
      club: {
        findMany: async (args: any) => {
          capturedCommunityWhere = args.where;
          return [];
        },
      },
    } as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: "college-1",
      },
      expires: "2026-05-24T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  const result = await caller.discovery.getDiscover({
    category: "Academic",
    collection: "free_food",
  });

  assert.equal(capturedEventWhere.collegeId, "college-1");
  assert.equal(capturedEventWhere.status, "PUBLISHED");
  assert.equal(capturedEventWhere.category, "Academic");
  assert.equal(capturedEventWhere.isFreeFood, true);
  assert.ok(capturedEventWhere.date.gte instanceof Date);
  assert.deepEqual(capturedCommunityWhere, { collegeId: "college-1", deletedAt: null });
  assert.equal(result.events.length, 0);
  assert.equal(result.communities.length, 0);
});

void test("discoveryRouter.getDiscover supports communities-only collection", async () => {
  let communityTake = 0;

  const mockedCtx = {
    db: {
      event: {
        findMany: async () => [
          {
            id: 1,
            title: "Should Be Hidden",
            date: new Date("2030-05-24T10:00:00.000Z"),
            registrationClosesAt: new Date("2030-05-23T10:00:00.000Z"),
            capacity: 40,
            location: "Auditorium",
            imageUrl: "https://example.com/event.png",
            category: "Academic",
            tags: ["seminar"],
            isFreeFood: false,
            _count: {
              rsvps: 14,
            },
            club: {
              id: 1,
              name: "Academic Council",
            },
          },
        ],
      },
      club: {
        findMany: async (args: any) => {
          communityTake = args.take;
          return [
            {
              id: 3,
              name: "Academic Council",
              updatedAt: new Date("2030-05-20T10:00:00.000Z"),
              events: [],
              _count: {
                followers: 25,
                events: 2,
                blocks: 4,
              },
            },
          ];
        },
      },
    } as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: "college-1",
      },
      expires: "2026-05-24T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  const result = await caller.discovery.getDiscover({
    collection: "communities",
  });

  assert.equal(communityTake, 24);
  assert.equal(result.events.length, 0);
  assert.equal(result.communities.length, 1);
  assert.equal(result.communities[0]?.href, "/hubs/3");
});
