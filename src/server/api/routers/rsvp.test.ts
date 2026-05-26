/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
process.env.SKIP_ENV_VALIDATION = "1";

import assert from "node:assert/strict";
import test from "node:test";
import { TRPCError } from "@trpc/server";
import { appRouter } from "@/server/api/root";
import { createCallerFactory } from "@/server/api/trpc";

const createCaller = createCallerFactory(appRouter);

void test("rsvpRouter.onCapacityChange rejects logged-out callers", async () => {
  const mockedCtx = {
    db: {} as any,
    session: null,
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.rsvp.onCapacityChange({ eventId: 10 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "UNAUTHORIZED");
      return true;
    },
  );
});

void test("rsvpRouter.onCapacityChange blocks students from other colleges", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 10,
          clubId: 5,
          collegeId: "college-2",
          status: "PUBLISHED",
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
      await caller.rsvp.onCapacityChange({ eventId: 10 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "You cannot subscribe to another college's event.");
      return true;
    },
  );
});

void test("rsvpRouter.onCapacityChange hides unpublished events from students", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 10,
          clubId: 5,
          collegeId: "college-1",
          status: "DRAFT",
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
      await caller.rsvp.onCapacityChange({ eventId: 10 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "NOT_FOUND");
      assert.equal(err.message, "Event not found");
      return true;
    },
  );
});

void test("rsvpRouter.onCapacityChange allows managed organizers", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 10,
          clubId: 5,
          collegeId: "college-1",
          status: "PUBLISHED",
          title: "Capacity Safe Event",
          authorId: "organizer-1",
        }),
      },
      club: {
        findUnique: async () => ({
          id: 5,
          name: "Coding Club",
          logoUrl: "https://example.com/logo.png",
          collegeId: "college-1",
        }),
      },
      clubMembership: {
        findUnique: async () => ({ role: "OWNER" }),
      },
    } as any,
    session: {
      user: {
        id: "organizer-1",
        role: "ORGANIZER",
        collegeId: "college-1",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  const subscription = await caller.rsvp.onCapacityChange({ eventId: 10 });

  assert.ok(subscription);
});

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
          registrationClosesAt: new Date(Date.now() + 43200000),
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
          registrationClosesAt: new Date(Date.now() + 43200000),
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
          registrationClosesAt: new Date(Date.now() + 43200000),
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
  let attendeeCountDecremented = false;
  let attendeeCountIncremented = false;
  let promotedRsvpId = 0;
  const eventDate = new Date(Date.now() + 86400000);

  const mockTx = {
    $executeRaw: async () => 1,
    event: {
      findUnique: async () => ({
        id: 15,
        title: "Campus Mixer",
        capacity: 2,
        date: eventDate,
        registrationClosesAt: new Date(Date.now() + 43200000),
      }),
      update: async (args: any) => {
        if (args.data.attendeeCount?.decrement === 1) {
          attendeeCountDecremented = true;
        }

        if (args.data.attendeeCount?.increment === 1) {
          attendeeCountIncremented = true;
        }

        return { id: 15 };
      },
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
        assert.deepEqual(args.orderBy, { createdAt: "asc" });
        return { id: 202, userId: "student-waitlisted", eventId: 15, status: "WAITLISTED" };
      },
    },
    notification: {
      create: async (args: any) => {
        assert.equal(args.data.userId, "student-waitlisted");
        assert.equal(args.data.type, "RSVP_CONFIRMED");
        return { id: 99, ...args.data };
      },
    },
  };

  const mockedCtx = {
    db: {
      $transaction: async (fn: any) => fn(mockTx),
      event: {
        findUnique: async () => ({
          id: 15,
          capacity: 2,
          clubId: 8,
          collegeId: "college-1",
          rsvps: [
            {
              id: 202,
              userId: "student-waitlisted",
              status: "GOING",
              createdAt: eventDate,
              user: {
                id: "student-waitlisted",
                name: "Waitlisted Student",
                email: "waitlist@example.com",
                studentProfile: null,
              },
            },
            {
              id: 101,
              userId: "student-1",
              status: "CANCELLED",
              createdAt: eventDate,
              user: {
                id: "student-1",
                name: "Student One",
                email: "student1@example.com",
                studentProfile: null,
              },
            },
          ],
        }),
      },
      rSVP: {
        findUnique: async (args: any) => {
          if (args.where.id === 101) {
            return {
              id: 101,
              userId: "student-1",
              status: "CANCELLED",
              user: { name: "Student One", email: "student1@example.com" },
              event: {
                id: 15,
                title: "Campus Mixer",
                date: eventDate,
              },
            };
          }

          if (args.where.id === 202) {
            return {
              id: 202,
              userId: "student-waitlisted",
              status: "GOING",
              user: { name: "Waitlisted Student", email: "waitlist@example.com" },
              event: {
                id: 15,
                title: "Campus Mixer",
                date: eventDate,
              },
            };
          }

          return null;
        },
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
  const result = await caller.rsvp.cancel({ eventId: 15 });

  assert.equal(result.id, 101);
  assert.equal(result.status, "CANCELLED");
  assert.equal(rsvpUpdatedCount, 2); // 1 for cancelling, 1 for waitlist promotion
  assert.equal(promotedRsvpId, 202);
  assert.equal(attendeeCountDecremented, true);
  assert.equal(attendeeCountIncremented, true);
});

void test("rsvpRouter.cancel blocks past events", async () => {
  const mockTx = {
    $executeRaw: async () => 1,
    event: {
      findUnique: async () => ({
        id: 15,
        capacity: 2,
        date: new Date(Date.now() - 86400000), // past event
        registrationClosesAt: new Date(Date.now() + 43200000),
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

void test("rsvpRouter.register fails if event has no registration deadline", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 10,
          status: "PUBLISHED",
          collegeId: "college-1",
          date: new Date(Date.now() + 86400000), // tomorrow
          registrationClosesAt: null, // missing deadline
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
      assert.equal(err.message, "Registration for this event is closed.");
      return true;
    },
  );
});

void test("rsvpRouter.register fails if registration deadline has passed", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 10,
          status: "PUBLISHED",
          collegeId: "college-1",
          date: new Date(Date.now() + 86400000), // tomorrow
          registrationClosesAt: new Date(Date.now() - 43200000), // passed
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
      assert.equal(err.message, "Registration for this event is closed.");
      return true;
    },
  );
});

void test("rsvpRouter.cancel successfully cancels but does not promote waitlist if registration deadline has passed", async () => {
  let rsvpUpdatedCount = 0;
  const eventDate = new Date(Date.now() + 86400000);

  const mockTx = {
    $executeRaw: async () => 1,
    event: {
      findUnique: async () => ({
        id: 15,
        title: "Campus Mixer",
        capacity: 2,
        date: eventDate,
        registrationClosesAt: new Date(Date.now() - 43200000), // passed deadline
      }),
      update: async () => ({ id: 15 }),
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
        throw new Error("Invalid update");
      },
      findFirst: async () => {
        throw new Error("Should not attempt to find waitlist if deadline passed");
      },
    },
  };

  const mockedCtx = {
    db: {
      $transaction: async (fn: any) => fn(mockTx),
      event: {
        findUnique: async () => ({
          id: 15,
          capacity: 2,
          clubId: 8,
          collegeId: "college-1",
          rsvps: [
            {
              id: 101,
              userId: "student-1",
              status: "CANCELLED",
              createdAt: eventDate,
              user: {
                id: "student-1",
                name: "Student One",
                email: "student1@example.com",
                studentProfile: null,
              },
            },
          ],
        }),
      },
      rSVP: {
        findUnique: async (args: any) => {
          if (args.where.id === 101) {
            return {
              id: 101,
              userId: "student-1",
              status: "CANCELLED",
              user: { name: "Student One", email: "student1@example.com" },
              event: {
                id: 15,
                title: "Campus Mixer",
                date: eventDate,
              },
            };
          }
          return null;
        },
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
  const result = await caller.rsvp.cancel({ eventId: 15 });

  assert.equal(result.id, 101);
  assert.equal(result.status, "CANCELLED");
  assert.equal(rsvpUpdatedCount, 1); // Only the cancel update, no waitlist promotion
});
