/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
process.env.SKIP_ENV_VALIDATION = "1";

import assert from "node:assert/strict";
import test from "node:test";

import { TRPCError } from "@trpc/server";

import { appRouter } from "@/server/api/root";
import { createCallerFactory } from "@/server/api/trpc";

const createCaller = createCallerFactory(appRouter);

void test("clubRouter.getMyManagedClubs returns owner and editor memberships for organizers", async () => {
  const mockedCtx = {
    db: {
      clubMembership: {
        findMany: async () => [
          {
            role: "OWNER",
            club: {
              id: 11,
              name: "Robotics Club",
              logoUrl: "https://example.com/robotics.png",
              college: { id: "college-1", name: "JECRC University" },
            },
          },
          {
            role: "EDITOR",
            club: {
              id: 17,
              name: "Music Club",
              logoUrl: "https://example.com/music.png",
              college: { id: "college-1", name: "JECRC University" },
            },
          },
        ],
      },
    } as any,
    session: {
      user: {
        id: "organizer-user-id",
        role: "ORGANIZER",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  const result = await caller.club.getMyManagedClubs();

  assert.deepEqual(result, [
    {
      id: 11,
      name: "Robotics Club",
      logoUrl: "https://example.com/robotics.png",
      college: { id: "college-1", name: "JECRC University" },
      role: "OWNER",
    },
    {
      id: 17,
      name: "Music Club",
      logoUrl: "https://example.com/music.png",
      college: { id: "college-1", name: "JECRC University" },
      role: "EDITOR",
    },
  ]);
});

void test("clubRouter.create creates a college-scoped club for admins", async () => {
  let createCalled = false;

  const mockedCtx = {
    db: {
      club: {
        create: async (args: any) => {
          createCalled = true;
          assert.equal(args.data.name, "Design Collective");
          assert.equal(args.data.logoUrl, "https://example.com/design.png");
          assert.equal(args.data.collegeId, "college-1");
          return {
            id: 91,
            name: "Design Collective",
            logoUrl: "https://example.com/design.png",
            collegeId: "college-1",
          };
        },
      },
    } as any,
    session: {
      user: {
        id: "admin-user-id",
        role: "ADMIN",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  const result = await caller.club.create({
    name: "Design Collective",
    logoUrl: "https://example.com/design.png",
  });

  assert.ok(createCalled);
  assert.equal(result.id, 91);
});

void test("clubRouter.assignEditor succeeds for a club owner", async () => {
  let upsertCalled = false;

  const mockedCtx = {
    db: {
      club: {
        findUnique: async (args: any) => {
          assert.equal(args.where.id, 22);
          return { id: 22, name: "Coding Club", logoUrl: "https://example.com/coding.png", collegeId: "college-1" };
        },
      },
      clubMembership: {
        findUnique: async (args: any) => {
          if (args.where.userId_clubId.userId === "owner-user-id") {
            return { role: "OWNER" };
          }
          return null;
        },
        upsert: async (args: any) => {
          upsertCalled = true;
          assert.equal(args.where.userId_clubId.userId, "editor-user-id");
          assert.equal(args.create.role, "EDITOR");
          return { userId: "editor-user-id", clubId: 22, role: "EDITOR" };
        },
      },
      user: {
        findUnique: async () => ({
          id: "editor-user-id",
          collegeId: "college-1",
          role: "ORGANIZER",
        }),
      },
    } as any,
    session: {
      user: {
        id: "owner-user-id",
        role: "ORGANIZER",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await caller.club.assignEditor({ clubId: 22, userId: "editor-user-id" });

  assert.ok(upsertCalled);
});

void test("clubRouter.assignEditor rejects non-owner organizers", async () => {
  const mockedCtx = {
    db: {
      club: {
        findUnique: async () => ({
          id: 22,
          name: "Coding Club",
          logoUrl: "https://example.com/coding.png",
          collegeId: "college-1",
        }),
      },
      clubMembership: {
        findUnique: async () => ({ role: "EDITOR" }),
      },
    } as any,
    session: {
      user: {
        id: "editor-user-id",
        role: "ORGANIZER",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.club.assignEditor({ clubId: 22, userId: "another-user-id" });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Only club owners can assign editors.");
      return true;
    },
  );
});
