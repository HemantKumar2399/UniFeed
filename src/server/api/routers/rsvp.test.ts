/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
process.env.SKIP_ENV_VALIDATION = "1";

import assert from "node:assert/strict";
import test from "node:test";
import { TRPCError } from "@trpc/server";
import { appRouter } from "@/server/api/root";
import { createCallerFactory } from "@/server/api/trpc";

const createCaller = createCallerFactory(appRouter);

void test("rsvpRouter.register fails if user has no collegeId in session", async () => {
  const mockedCtx = {
    db: {} as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.rsvp.register({ eventId: 10 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "PRECONDITION_FAILED");
      assert.equal(err.message, "USER_NO_COLLEGE");
      return true;
    },
  );
});

void test("rsvpRouter.register fails if event is not published", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 10,
          status: "DRAFT",
          collegeId: "college-1",
          date: new Date(Date.now() + 86400000), // tomorrow
        }),
      },
    } as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.rsvp.register({ eventId: 10 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "PRECONDITION_FAILED");
      assert.equal(err.message, "EVENT_NOT_PUBLISHED");
      return true;
    },
  );
});

void test("rsvpRouter.register fails if event is in the past", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 10,
          status: "PUBLISHED",
          collegeId: "college-1",
          date: new Date(Date.now() - 86400000), // yesterday
        }),
      },
    } as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.rsvp.register({ eventId: 10 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "EVENT_PAST");
      return true;
    },
  );
});

void test("rsvpRouter.register fails if college mismatch", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 10,
          status: "PUBLISHED",
          collegeId: "college-2",
          date: new Date(Date.now() + 86400000),
        }),
      },
    } as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.rsvp.register({ eventId: 10 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "COLLEGE_MISMATCH");
      return true;
    },
  );
});

void test("rsvpRouter.cancel successfully cancels and promotes waitlist in transaction", async () => {
  let rsvpUpdatedCount = 0;
  let promotedRsvpId = 0;

  const mockTx = {
    event: {
      findUnique: async () => ({
        id: 15,
        capacity: 2,
        date: new Date(Date.now() + 86400000),
      }),
    },
    rSVP: {
      findUnique: async () => ({
        id: 101,
        userId: "student-1",
        eventId: 15,
        status: "GOING",
      }),
      update: async (args: any) => {
        rsvpUpdatedCount++;
        if (args.where.id === 101) {
          assert.equal(args.data.status, "CANCELLED");
          return { id: 101, status: "CANCELLED" };
        }
        if (args.where.id === 202) {
          promotedRsvpId = 202;
          assert.equal(args.data.status, "GOING");
          return { id: 202, status: "GOING" };
        }
        throw new Error("Invalid update");
      },
      findFirst: async (args: any) => {
        assert.equal(args.where.eventId, 15);
        assert.equal(args.where.status, "WAITLISTED");
        return { id: 202, userId: "student-waitlisted", eventId: 15, status: "WAITLISTED" };
      },
    },
  };

  const mockedCtx = {
    db: {
      $transaction: async (fn: any) => fn(mockTx),
    } as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  const result = await caller.rsvp.cancel({ eventId: 15 });

  assert.equal(result.id, 101);
  assert.equal(result.status, "CANCELLED");
  assert.equal(rsvpUpdatedCount, 2); // 1 for cancelling, 1 for waitlist promotion
  assert.equal(promotedRsvpId, 202);
});

void test("rsvpRouter.cancel blocks past events", async () => {
  const mockTx = {
    event: {
      findUnique: async () => ({
        id: 15,
        capacity: 2,
        date: new Date(Date.now() - 86400000), // past event
      }),
    },
  };

  const mockedCtx = {
    db: {
      $transaction: async (fn: any) => fn(mockTx),
    } as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.rsvp.cancel({ eventId: 15 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "EVENT_PAST");
      return true;
    },
  );
});
