process.env.SKIP_ENV_VALIDATION = "1";

import assert from "node:assert/strict";
import test from "node:test";

import { TRPCError } from "@trpc/server";

import { appRouter } from "@/server/api/root";
import { createCallerFactory } from "@/server/api/trpc";

const createCaller = createCallerFactory(appRouter);

const validCreateInput = {
  clubId: 10,
  title: "Campus Hack Night",
  description: "Build projects with your club mentors and classmates.",
  date: new Date("2030-05-14T18:45:00.000Z"),
  location: "Innovation Lab",
  imageUrl: "https://example.com/poster.png",
  capacity: 180,
};

void test("eventRouter.create succeeds for a managed club", async () => {
  let createCalled = false;

  const mockedCtx = {
    db: {
      club: {
        findUnique: async (args: any) => {
          assert.equal(args.where.id, 10);
          return { id: 10, collegeId: "college-1" };
        },
      },
      clubMembership: {
        findUnique: async () => ({ role: "OWNER" }),
      },
      event: {
        create: async (args: any) => {
          createCalled = true;
          assert.equal(args.data.clubId, 10);
          assert.equal(args.data.collegeId, "college-1");
          return { id: 55, ...args.data };
        },
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
  const result = await caller.event.create(validCreateInput);

  assert.ok(createCalled);
  assert.equal(result.id, 55);
});

void test("eventRouter.create rejects unmanaged clubs", async () => {
  const mockedCtx = {
    db: {
      club: {
        findUnique: async () => ({ id: 10, collegeId: "college-1" }),
      },
      clubMembership: {
        findUnique: async () => null,
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
  await assert.rejects(
    async () => {
      await caller.event.create(validCreateInput);
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "You can only create events for clubs you manage.");
      return true;
    },
  );
});

void test("eventRouter.create rejects clubs from another college", async () => {
  const mockedCtx = {
    db: {
      club: {
        findUnique: async () => ({ id: 10, collegeId: "college-2" }),
      },
      clubMembership: {
        findUnique: async () => ({ role: "OWNER" }),
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
  await assert.rejects(
    async () => {
      await caller.event.create(validCreateInput);
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "User session is not associated with the selected club's college.");
      return true;
    },
  );
});

void test("eventRouter.getAttendees allows club editors to manage event attendance", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async (args: any) => {
          if (args.include) {
            return {
              id: 73,
              authorId: "another-organizer-id",
              rsvps: [{ id: 1, status: "GOING", user: { id: "student-1", name: "Student One", email: "student@example.com" } }],
            };
          }

          return {
            id: 73,
            clubId: 12,
            authorId: "another-organizer-id",
            collegeId: "college-1",
            title: "Demo Event",
            status: "PUBLISHED",
          };
        },
      },
      club: {
        findUnique: async () => ({
          id: 12,
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
  const result = await caller.event.getAttendees({ eventId: 73 });

  assert.equal(result.length, 1);
  assert.equal(result[0]?.status, "GOING");
});

void test("eventRouter.getAttendees rejects unrelated organizers", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async (args: any) => {
          if (args.include) {
            return {
              id: 73,
              authorId: "another-organizer-id",
              rsvps: [],
            };
          }

          return {
            id: 73,
            clubId: 12,
            authorId: "another-organizer-id",
            collegeId: "college-1",
            title: "Demo Event",
            status: "PUBLISHED",
          };
        },
      },
      club: {
        findUnique: async () => ({
          id: 12,
          name: "Coding Club",
          logoUrl: "https://example.com/coding.png",
          collegeId: "college-1",
        }),
      },
      clubMembership: {
        findUnique: async () => null,
      },
    } as any,
    session: {
      user: {
        id: "random-organizer-id",
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
      await caller.event.getAttendees({ eventId: 73 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Unauthorized to view attendees for this event");
      return true;
    },
  );
});

void test("eventRouter.getAttendees allows same-college admins without club membership", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async (args: any) => {
          if (args.include) {
            return {
              id: 73,
              authorId: "another-organizer-id",
              rsvps: [{ id: 5, status: "ATTENDED", user: { id: "student-2", name: "Student Two", email: "student2@example.com" } }],
            };
          }

          return {
            id: 73,
            clubId: 12,
            authorId: "another-organizer-id",
            collegeId: "college-1",
            title: "Demo Event",
            status: "PUBLISHED",
          };
        },
      },
      club: {
        findUnique: async () => ({
          id: 12,
          name: "Coding Club",
          logoUrl: "https://example.com/coding.png",
          collegeId: "college-1",
        }),
      },
      clubMembership: {
        findUnique: async () => null,
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
  const result = await caller.event.getAttendees({ eventId: 73 });

  assert.equal(result[0]?.status, "ATTENDED");
});

void test("eventRouter.submitForReview moves a draft into submitted status and records audit history", async () => {
  let updatedToSubmitted = false;
  let loggedSubmission = false;

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 91,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Hack Night",
          status: "DRAFT",
        }),
        update: async (args: any) => {
          updatedToSubmitted = true;
          assert.equal(args.where.id, 91);
          assert.equal(args.data.status, "SUBMITTED");
          return { id: 91, title: "Hack Night", status: "SUBMITTED", submittedAt: args.data.submittedAt };
        },
      },
      club: {
        findUnique: async () => ({
          id: 12,
          name: "Coding Club",
          logoUrl: "https://example.com/coding.png",
          collegeId: "college-1",
        }),
      },
      clubMembership: {
        findUnique: async () => ({ role: "OWNER" }),
      },
      eventApprovalLog: {
        create: async (args: any) => {
          loggedSubmission = true;
          assert.equal(args.data.eventId, 91);
          assert.equal(args.data.actorId, "organizer-user-id");
          assert.equal(args.data.action, "SUBMITTED");
          return { id: 1, ...args.data };
        },
      },
      $transaction: async (ops: any[]) => Promise.all(ops),
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
  const result = await caller.event.submitForReview({ id: 91 });

  assert.ok(updatedToSubmitted);
  assert.ok(loggedSubmission);
  assert.equal(result.status, "SUBMITTED");
});

void test("eventRouter.submitForReview rejects non-draft events", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 91,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Hack Night",
          status: "SUBMITTED",
        }),
      },
      club: {
        findUnique: async () => ({
          id: 12,
          name: "Coding Club",
          logoUrl: "https://example.com/coding.png",
          collegeId: "college-1",
        }),
      },
      clubMembership: {
        findUnique: async () => ({ role: "OWNER" }),
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
  await assert.rejects(
    async () => {
      await caller.event.submitForReview({ id: 91 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "Only draft events can be submitted for review.");
      return true;
    },
  );
});

void test("eventRouter.publishApproved publishes an approved event", async () => {
  let published = false;

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 102,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Approved Event",
          status: "APPROVED",
        }),
        update: async (args: any) => {
          published = true;
          assert.equal(args.where.id, 102);
          assert.equal(args.data.status, "PUBLISHED");
          return { id: 102, title: "Approved Event", status: "PUBLISHED" };
        },
      },
      club: {
        findUnique: async () => ({
          id: 12,
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
  const result = await caller.event.publishApproved({ id: 102 });

  assert.ok(published);
  assert.equal(result.status, "PUBLISHED");
});

void test("eventRouter.publishApproved rejects non-approved events", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 102,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Submitted Event",
          status: "SUBMITTED",
        }),
      },
      club: {
        findUnique: async () => ({
          id: 12,
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
      await caller.event.publishApproved({ id: 102 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "Only approved events can be published.");
      return true;
    },
  );
});
