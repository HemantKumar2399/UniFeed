/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
process.env.SKIP_ENV_VALIDATION = "1";
process.env.STUDENT_QR_SECRET = "student-qr-unit-test-secret";

import assert from "node:assert/strict";
import test from "node:test";

import { TRPCError } from "@trpc/server";

import { appRouter } from "@/server/api/root";
import { createCallerFactory } from "@/server/api/trpc";
import { createStudentQrToken } from "@/lib/student-qr";

const createCaller = createCallerFactory(appRouter);

const validCreateInput = {
  clubId: 10,
  title: "Campus Hack Night",
  description: "Build projects with your club mentors and classmates.",
  date: new Date("2030-05-14T18:45:00.000Z"),
  registrationClosesAt: new Date("2030-05-13T16:45:00.000Z"),
  location: "Innovation Lab",
  imageUrl: "https://example.com/poster.png",
  capacity: 180,
  category: "Technical" as const,
  tags: ["coding", "workshop"],
  domain: "Engineering" as const,
  isFreeFood: true,
  hasCertificate: true,
  isPaid: false,
  targetBranches: ["Computer Science", "Information Technology"],
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
          assert.equal(args.data.status, "DRAFT");
          assert.equal(args.data.category, "Technical");
          assert.deepEqual(args.data.tags, ["coding", "workshop"]);
          assert.equal(args.data.domain, "Engineering");
          assert.equal(args.data.isFreeFood, true);
          assert.equal(args.data.hasCertificate, true);
          assert.equal(args.data.isPaid, false);
          assert.deepEqual(args.data.targetBranches, ["Computer Science", "Information Technology"]);
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
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "You can only create events for clubs you manage.");
      return true;
    },
  );
});

void test("eventRouter.getFeed rejects logged-out callers", async () => {
  const mockedCtx = {
    db: {} as any,
    session: null,
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.event.getFeed();
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "UNAUTHORIZED");
      return true;
    },
  );
});

void test("eventRouter.getFeed requests only the viewer college's published events", async () => {
  let capturedWhere: any = null;

  const mockedCtx = {
    db: {
      event: {
        findMany: async (args: any) => {
          capturedWhere = args.where;
          return [];
        },
      },
      hubFollow: {
        findMany: async (args: any) => {
          assert.deepEqual(args.where, { userId: "student-1" });
          return [];
        },
      },
      studentProfile: {
        findUnique: async (args: any) => {
          assert.deepEqual(args.where, { userId: "student-1" });
          return null;
        },
      },
      userPreference: {
        findUnique: async (args: any) => {
          assert.deepEqual(args.where, { userId: "student-1" });
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
  await caller.event.getFeed();

  assert.equal(capturedWhere.collegeId, "college-1");
  assert.equal(capturedWhere.status, "PUBLISHED");
  assert.ok(capturedWhere.date.gte instanceof Date);
});

void test("eventRouter.getFeed rejects authenticated users without a college scope", async () => {
  const mockedCtx = {
    db: {} as any,
    session: {
      user: {
        id: "student-1",
        role: "STUDENT",
        collegeId: null,
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.event.getFeed();
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "PRECONDITION_FAILED");
      assert.equal(err.message, "User session is missing a college association.");
      return true;
    },
  );
});

void test("eventRouter.getHappeningThisWeek requests only same-college published week events", async () => {
  let capturedWhere: any = null;

  const mockedCtx = {
    db: {
      event: {
        findMany: async (args: any) => {
          capturedWhere = args.where;
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
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await caller.event.getHappeningThisWeek();

  assert.equal(capturedWhere.collegeId, "college-1");
  assert.equal(capturedWhere.status, "PUBLISHED");
  assert.ok(capturedWhere.date.gte instanceof Date);
  assert.ok(capturedWhere.date.lt instanceof Date);
});

void test("eventRouter.getAttendees allows club editors to manage event attendance", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async (args: any) => {
          if (args.select?.rsvps) {
            return {
              id: 73,
              title: "Demo Event",
              date: new Date("2030-05-14T18:45:00.000Z"),
              club: { name: "Coding Club" },
              college: { name: "North Campus" },
              rsvps: [
                {
                  id: 1,
                  userId: "student-1",
                  status: "GOING",
                  createdAt: new Date("2030-05-10T10:00:00.000Z"),
                  user: {
                    id: "student-1",
                    name: "Student One",
                    email: "student@example.com",
                    studentProfile: {
                      prn: "PRN-2026-001",
                      branch: "Computer Science",
                      course: "BTech",
                      graduationYear: 2026,
                    },
                  },
                },
              ],
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

  assert.equal(result.event.title, "Demo Event");
  assert.equal(result.counts.all, 1);
  assert.equal(result.attendees.length, 1);
  assert.equal(result.attendees[0]?.status, "GOING");
  assert.equal(result.attendees[0]?.prn, "PRN-2026-001");
  assert.equal(result.attendees[0]?.branch, "Computer Science");
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
          if (args.select?.rsvps) {
            return {
              id: 73,
              title: "Demo Event",
              date: new Date("2030-05-14T18:45:00.000Z"),
              club: { name: "Coding Club" },
              college: { name: "North Campus" },
              rsvps: [
                {
                  id: 5,
                  userId: "student-2",
                  status: "ATTENDED",
                  createdAt: new Date("2030-05-12T10:00:00.000Z"),
                  user: {
                    id: "student-2",
                    name: "Student Two",
                    email: "student2@example.com",
                    studentProfile: {
                      prn: "PRN-2026-002",
                      branch: "Information Technology",
                      course: "BTech",
                      graduationYear: 2026,
                    },
                  },
                },
              ],
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

  assert.equal(result.attendees[0]?.status, "ATTENDED");
  assert.equal(result.attendees[0]?.course, "BTech");
});

void test("eventRouter.getAttendees filters and sorts attendee results on the server", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async (args: any) => {
          if (args.select?.rsvps) {
            return {
              id: 73,
              title: "Demo Event",
              date: new Date("2030-05-14T18:45:00.000Z"),
              club: { name: "Coding Club" },
              college: { name: "North Campus" },
              rsvps: [
                {
                  id: 1,
                  userId: "student-1",
                  status: "GOING",
                  createdAt: new Date("2030-05-10T10:00:00.000Z"),
                  user: {
                    id: "student-1",
                    name: "Aarav Sharma",
                    email: "aarav@college.edu",
                    studentProfile: {
                      prn: "PRN-2026-001",
                      branch: "Computer Science",
                      course: "BTech",
                      graduationYear: 2026,
                    },
                  },
                },
                {
                  id: 2,
                  userId: "student-2",
                  status: "ATTENDED",
                  createdAt: new Date("2030-05-12T10:00:00.000Z"),
                  user: {
                    id: "student-2",
                    name: "Mira Patel",
                    email: "mira@college.edu",
                    studentProfile: {
                      prn: "PRN-2026-002",
                      branch: "Information Technology",
                      course: "BTech",
                      graduationYear: 2026,
                    },
                  },
                },
              ],
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
  const result = await caller.event.getAttendees({
    eventId: 73,
    status: "ALL",
    q: "2026-002",
    sort: "checked_in_first",
  });

  assert.equal(result.counts.all, 2);
  assert.equal(result.counts.attended, 1);
  assert.equal(result.attendees.length, 1);
  assert.equal(result.attendees[0]?.userId, "student-2");
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
          date: new Date("2030-05-14T18:45:00.000Z"),
          registrationClosesAt: new Date("2030-05-13T16:45:00.000Z"),
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

void test("eventRouter.submitForReview rejects non-editable events", async () => {
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
      assert.equal(err.message, "Only draft or rejected events can be submitted for review.");
      return true;
    },
  );
});

void test("eventRouter.submitForReview allows rejected events to be resubmitted", async () => {
  let updatedToSubmitted = false;

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 92,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Rejected Event",
          status: "REJECTED",
          date: new Date("2030-06-14T18:45:00.000Z"),
          registrationClosesAt: new Date("2030-06-13T16:45:00.000Z"),
        }),
        update: async (args: any) => {
          updatedToSubmitted = true;
          assert.equal(args.where.id, 92);
          assert.equal(args.data.status, "SUBMITTED");
          return { id: 92, title: "Rejected Event", status: "SUBMITTED", submittedAt: args.data.submittedAt };
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
          assert.equal(args.data.action, "SUBMITTED");
          return { id: 8, ...args.data };
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
  const result = await caller.event.submitForReview({ id: 92 });

  assert.ok(updatedToSubmitted);
  assert.equal(result.status, "SUBMITTED");
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
          date: new Date("2030-07-14T18:45:00.000Z"),
          registrationClosesAt: new Date("2030-07-13T16:45:00.000Z"),
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

void test("eventRouter.update saves metadata changes for editable events", async () => {
  let updatedEvent = false;

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 205,
          clubId: 10,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Draft Event",
          status: "DRAFT",
        }),
        update: async (args: any) => {
          updatedEvent = true;
          assert.equal(args.where.id, 205);
          assert.equal(args.data.category, "Technical");
          assert.deepEqual(args.data.tags, ["coding", "workshop"]);
          return { id: 205, title: args.data.title, status: "DRAFT", updatedAt: new Date("2030-05-10T00:00:00.000Z") };
        },
      },
      club: {
        findUnique: async () => ({ id: 10, collegeId: "college-1" }),
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
  const result = await caller.event.update({
    id: 205,
    data: validCreateInput,
  });

  assert.ok(updatedEvent);
  assert.equal(result.status, "DRAFT");
});

void test("eventRouter.update rejects submitted events", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 206,
          clubId: 10,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Locked Event",
          status: "SUBMITTED",
        }),
      },
      club: {
        findUnique: async () => ({ id: 10, collegeId: "college-1" }),
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
      await caller.event.update({
        id: 206,
        data: validCreateInput,
      });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "Only draft or rejected events can be edited.");
      return true;
    },
  );
});

void test("eventRouter.update rejects organizers without club membership for the target event", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 207,
          clubId: 10,
          authorId: "another-organizer-id",
          collegeId: "college-1",
          title: "Other Club Draft",
          status: "DRAFT",
        }),
      },
      club: {
        findUnique: async () => ({ id: 10, collegeId: "college-1" }),
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
      await caller.event.update({
        id: 207,
        data: validCreateInput,
      });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Unauthorized for this event");
      return true;
    },
  );
});

void test("eventRouter.cancel marks a published event as cancelled and writes audit history", async () => {
  let cancelled = false;
  let loggedCancellation = false;
  let notifiedAttendees = false;

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 301,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
        }),
        update: async (args: any) => {
          cancelled = true;
          assert.equal(args.where.id, 301);
          assert.equal(args.data.status, "CANCELLED");
          assert.equal(args.data.cancellationReason, "Venue maintenance requires cancellation.");
          return {
            id: 301,
            title: "Published Event",
            status: "CANCELLED",
            cancelledAt: args.data.cancelledAt,
            cancellationReason: args.data.cancellationReason,
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
      eventApprovalLog: {
        create: async (args: any) => {
          loggedCancellation = true;
          assert.equal(args.data.action, "CANCELLED");
          assert.equal(args.data.reason, "Venue maintenance requires cancellation.");
          return { id: 15, ...args.data };
        },
      },
      rSVP: {
        findMany: async () => [
          { userId: "student-1" },
          { userId: "student-2" },
        ],
      },
      notification: {
        createMany: async (args: any) => {
          notifiedAttendees = true;
          assert.equal(args.data.length, 2);
          assert.equal(args.data[0]?.type, "EVENT_CANCELLED");
          return { count: args.data.length };
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
  const result = await caller.event.cancel({
    id: 301,
    reason: "Venue maintenance requires cancellation.",
  });

  assert.ok(cancelled);
  assert.ok(loggedCancellation);
  assert.ok(notifiedAttendees);
  assert.equal(result.status, "CANCELLED");
});

void test("eventRouter.searchAttendees matches real PRN values without fabricating them", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async (args: any) => {
          if (args.select?.rsvps) {
            return {
              id: 88,
              title: "Published Event",
              date: new Date("2030-05-14T18:45:00.000Z"),
              club: { name: "Coding Club" },
              college: { name: "North Campus" },
              rsvps: [
                {
                  id: 1,
                  userId: "student-1",
                  status: "GOING",
                  createdAt: new Date("2030-05-10T10:00:00.000Z"),
                  user: {
                    id: "student-1",
                    name: "Aarav Sharma",
                    email: "aarav@college.edu",
                    studentProfile: {
                      prn: "PRN-2026-001",
                      branch: "Computer Science",
                      course: "BTech",
                      graduationYear: 2026,
                    },
                  },
                },
                {
                  id: 2,
                  userId: "stu001abc",
                  status: "GOING",
                  createdAt: new Date("2030-05-09T10:00:00.000Z"),
                  user: {
                    id: "stu001abc",
                    name: "Campus User",
                    email: "campus@college.edu",
                    studentProfile: null,
                  },
                },
              ],
            };
          }

          return {
            id: 88,
            clubId: 12,
            authorId: "organizer-user-id",
            collegeId: "college-1",
            title: "Published Event",
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
  const prnResults = await caller.event.searchAttendees({
    eventId: 88,
    query: "2026-001",
  });
  const fabricatedResults = await caller.event.searchAttendees({
    eventId: 88,
    query: "stu001",
  });

  assert.equal(prnResults.length, 1);
  assert.equal(prnResults[0]?.userId, "student-1");
  assert.equal(fabricatedResults.length, 0);
});

void test("eventRouter.forceCheckIn persists attended state and is idempotent for repeated scans", async () => {
  let currentStatus = "GOING";
  let updateCount = 0;

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 88,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
      rSVP: {
        findFirst: async () => ({
          id: 77,
        }),
        findUnique: async () => ({
          id: 77,
          eventId: 88,
          userId: "student-1",
          status: currentStatus,
          user: {
            id: "student-1",
            name: "Student One",
            email: "student@example.com",
          },
        }),
        update: async () => {
          updateCount += 1;
          currentStatus = "ATTENDED";
          return {
            id: 77,
            eventId: 88,
            userId: "student-1",
            status: "ATTENDED",
            user: {
              id: "student-1",
              name: "Student One",
              email: "student@example.com",
            },
          };
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
  const firstResult = await caller.event.forceCheckIn({
    eventId: 88,
    userId: "student-1",
  });
  const secondResult = await caller.event.forceCheckIn({
    eventId: 88,
    userId: "student-1",
  });

  assert.equal(firstResult.status, "ATTENDED");
  assert.equal(secondResult.status, "ATTENDED");
  assert.equal(updateCount, 1);
});

void test("eventRouter.forceCheckIn rejects waitlisted attendees", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 88,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
      rSVP: {
        findFirst: async () => ({
          id: 77,
        }),
        findUnique: async () => ({
          id: 77,
          eventId: 88,
          userId: "student-1",
          status: "WAITLISTED",
          user: {
            id: "student-1",
            name: "Student One",
            email: "student@example.com",
          },
        }),
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
      await caller.event.forceCheckIn({
        eventId: 88,
        userId: "student-1",
      });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "Only confirmed attendees can be checked in.");
      return true;
    },
  );
});

void test("eventRouter.forceCheckIn rejects cancelled events", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 88,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Cancelled Event",
          status: "CANCELLED",
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
      await caller.event.forceCheckIn({
        eventId: 88,
        userId: "student-1",
      });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "Cancelled events do not allow check-in.");
      return true;
    },
  );
});

void test("eventRouter.verifyStudentQrForEvent checks in a registered student", async () => {
  const token = createStudentQrToken(
    {
      studentQrId: "sqr_active_student",
      studentQrSecretVersion: 2,
      issuedAt: 1735689600000,
    },
    process.env.STUDENT_QR_SECRET!,
  );

  let updated = false;

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 88,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
      studentProfile: {
        findUnique: async (args: any) => {
          assert.equal(args.where.studentQrId, "sqr_active_student");
          return {
            id: "profile-1",
            userId: "student-1",
            collegeId: "college-1",
            studentQrId: "sqr_active_student",
            studentQrSecretVersion: 2,
            qrRevokedAt: null,
            user: {
              id: "student-1",
              name: "Student One",
              email: "student1@example.com",
            },
          };
        },
      },
      rSVP: {
        findUnique: async () => ({
          id: 301,
          userId: "student-1",
          eventId: 88,
          status: "GOING",
          user: {
            id: "student-1",
            name: "Student One",
            email: "student1@example.com",
          },
        }),
        update: async (args: any) => {
          updated = true;
          assert.equal(args.where.id, 301);
          assert.equal(args.data.status, "ATTENDED");
          return {
            id: 301,
            userId: "student-1",
            status: "ATTENDED",
            user: {
              id: "student-1",
              name: "Student One",
              email: "student1@example.com",
            },
          };
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
  const result = await caller.event.verifyStudentQrForEvent({
    eventId: 88,
    token,
  });

  assert.ok(updated);
  assert.equal(result.outcome, "CHECKED_IN");
  assert.equal(result.userId, "student-1");
});

void test("eventRouter.verifyStudentQrForEvent returns already checked in for attended rsvps", async () => {
  const token = createStudentQrToken(
    {
      studentQrId: "sqr_attended_student",
      studentQrSecretVersion: 1,
      issuedAt: 1735689600000,
    },
    process.env.STUDENT_QR_SECRET!,
  );

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 44,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
      studentProfile: {
        findUnique: async () => ({
          id: "profile-2",
          userId: "student-2",
          collegeId: "college-1",
          studentQrId: "sqr_attended_student",
          studentQrSecretVersion: 1,
          qrRevokedAt: null,
          user: {
            id: "student-2",
            name: "Student Two",
            email: "student2@example.com",
          },
        }),
      },
      rSVP: {
        findUnique: async () => ({
          id: 302,
          userId: "student-2",
          eventId: 44,
          status: "ATTENDED",
          user: {
            id: "student-2",
            name: "Student Two",
            email: "student2@example.com",
          },
        }),
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
  const result = await caller.event.verifyStudentQrForEvent({
    eventId: 44,
    token,
  });

  assert.equal(result.outcome, "ALREADY_CHECKED_IN");
});

void test("eventRouter.verifyStudentQrForEvent rejects invalid qr payloads", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 45,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
  const result = await caller.event.verifyStudentQrForEvent({
    eventId: 45,
    token: "definitely-not-a-valid-passport-token",
  });

  assert.equal(result.outcome, "INVALID_QR");
});

void test("eventRouter.verifyStudentQrForEvent returns revoked qr when the stored version changed", async () => {
  const token = createStudentQrToken(
    {
      studentQrId: "sqr_rotated_student",
      studentQrSecretVersion: 1,
      issuedAt: 1735689600000,
    },
    process.env.STUDENT_QR_SECRET!,
  );

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 46,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
      studentProfile: {
        findUnique: async () => ({
          id: "profile-3",
          userId: "student-3",
          collegeId: "college-1",
          studentQrId: "sqr_rotated_student",
          studentQrSecretVersion: 2,
          qrRevokedAt: null,
          user: {
            id: "student-3",
            name: "Student Three",
            email: "student3@example.com",
          },
        }),
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
  const result = await caller.event.verifyStudentQrForEvent({
    eventId: 46,
    token,
  });

  assert.equal(result.outcome, "REVOKED_QR");
});

void test("eventRouter.verifyStudentQrForEvent returns wrong college when passport college does not match", async () => {
  const token = createStudentQrToken(
    {
      studentQrId: "sqr_other_college",
      studentQrSecretVersion: 1,
      issuedAt: 1735689600000,
    },
    process.env.STUDENT_QR_SECRET!,
  );

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 47,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
      studentProfile: {
        findUnique: async () => ({
          id: "profile-4",
          userId: "student-4",
          collegeId: "college-2",
          studentQrId: "sqr_other_college",
          studentQrSecretVersion: 1,
          qrRevokedAt: null,
          user: {
            id: "student-4",
            name: "Student Four",
            email: "student4@example.com",
          },
        }),
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
  const result = await caller.event.verifyStudentQrForEvent({
    eventId: 47,
    token,
  });

  assert.equal(result.outcome, "WRONG_COLLEGE");
});

void test("eventRouter.verifyStudentQrForEvent returns not registered when no valid rsvp exists", async () => {
  const token = createStudentQrToken(
    {
      studentQrId: "sqr_no_rsvp",
      studentQrSecretVersion: 1,
      issuedAt: 1735689600000,
    },
    process.env.STUDENT_QR_SECRET!,
  );

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 48,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
      studentProfile: {
        findUnique: async () => ({
          id: "profile-5",
          userId: "student-5",
          collegeId: "college-1",
          studentQrId: "sqr_no_rsvp",
          studentQrSecretVersion: 1,
          qrRevokedAt: null,
          user: {
            id: "student-5",
            name: "Student Five",
            email: "student5@example.com",
          },
        }),
      },
      rSVP: {
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
  const result = await caller.event.verifyStudentQrForEvent({
    eventId: 48,
    token,
  });

  assert.equal(result.outcome, "NOT_REGISTERED");
});

void test("eventRouter.verifyStudentQrForEvent returns not registered when the student is registered for a different event", async () => {
  const token = createStudentQrToken(
    {
      studentQrId: "sqr_other_event",
      studentQrSecretVersion: 1,
      issuedAt: 1735689600000,
    },
    process.env.STUDENT_QR_SECRET!,
  );

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 51,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
      studentProfile: {
        findUnique: async () => ({
          id: "profile-6",
          userId: "student-6",
          collegeId: "college-1",
          studentQrId: "sqr_other_event",
          studentQrSecretVersion: 1,
          qrRevokedAt: null,
          user: {
            id: "student-6",
            name: "Student Six",
            email: "student6@example.com",
          },
        }),
      },
      rSVP: {
        findUnique: async (args: any) => {
          assert.equal(args.where.userId_eventId.userId, "student-6");
          assert.equal(args.where.userId_eventId.eventId, 51);
          return null;
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
  const result = await caller.event.verifyStudentQrForEvent({
    eventId: 51,
    token,
  });

  assert.equal(result.outcome, "NOT_REGISTERED");
});

void test("eventRouter.verifyStudentQrForEvent returns not scannable when the event is not published", async () => {
  const token = createStudentQrToken(
    {
      studentQrId: "sqr_not_scannable",
      studentQrSecretVersion: 1,
      issuedAt: 1735689600000,
    },
    process.env.STUDENT_QR_SECRET!,
  );

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 49,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Approved Event",
          status: "APPROVED",
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
  const result = await caller.event.verifyStudentQrForEvent({
    eventId: 49,
    token,
  });

  assert.equal(result.outcome, "EVENT_NOT_SCANNABLE");
});

void test("eventRouter.verifyStudentQrForEvent rejects unauthorized organizers", async () => {
  const token = createStudentQrToken(
    {
      studentQrId: "sqr_unauthorized",
      studentQrSecretVersion: 1,
      issuedAt: 1735689600000,
    },
    process.env.STUDENT_QR_SECRET!,
  );

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 50,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
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
        findUnique: async () => null,
      },
    } as any,
    session: {
      user: {
        id: "different-organizer-id",
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
      await caller.event.verifyStudentQrForEvent({
        eventId: 50,
        token,
      });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      return true;
    },
  );
});

void test("eventRouter.submitForReview rejects events with invalid or expired deadlines", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 93,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Invalid Deadline Event",
          status: "DRAFT",
          date: new Date("2030-05-14T18:45:00.000Z"),
          registrationClosesAt: new Date("2030-05-15T18:45:00.000Z"), // Invalid: after event date
        }),
      },
      club: {
        findUnique: async () => ({ id: 12, collegeId: "college-1" }),
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
      await caller.event.submitForReview({ id: 93 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "Registration deadline must be set to a future time before the event starts.");
      return true;
    },
  );
});

void test("eventRouter.publishApproved rejects events with expired deadlines", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 103,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Approved Event",
          status: "APPROVED",
          date: new Date("2030-07-14T18:45:00.000Z"),
          registrationClosesAt: new Date("2020-01-01T00:00:00.000Z"), // Expired
        }),
      },
      club: {
        findUnique: async () => ({ id: 12, collegeId: "college-1" }),
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
      await caller.event.publishApproved({ id: 103 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.match(err.message, /Registration deadline must be set to a future time/i);
      return true;
    },
  );
});

void test("eventRouter.extendRegistrationDeadline succeeds for a managed organizer", async () => {
  let updatedToNewDeadline = false;
  let loggedExtension = false;

  const newDeadline = new Date("2030-05-13T10:00:00.000Z");

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 401,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
          date: new Date("2030-05-14T18:45:00.000Z"),
          registrationClosesAt: new Date("2030-05-12T16:45:00.000Z"),
        }),
        update: async (args: any) => {
          const typedArgs = args as {
            where: { id: number };
            data: { registrationClosesAt: Date };
          };
          updatedToNewDeadline = true;
          assert.equal(typedArgs.where.id, 401);
          assert.equal(typedArgs.data.registrationClosesAt.getTime(), newDeadline.getTime());
          return { id: 401, title: "Published Event", status: "PUBLISHED", registrationClosesAt: typedArgs.data.registrationClosesAt };
        },
      },
      club: {
        findUnique: async () => ({ id: 12, collegeId: "college-1" }),
      },
      clubMembership: {
        findUnique: async () => ({ role: "OWNER" }),
      },
      eventApprovalLog: {
        create: async (args: any) => {
          loggedExtension = true;
          assert.equal(args.data.eventId, 401);
          assert.equal(args.data.actorId, "organizer-user-id");
          assert.equal(args.data.action, "REGISTRATION_DEADLINE_EXTENDED");
          return { id: 10, ...args.data };
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
  const result = await caller.event.extendRegistrationDeadline({ id: 401, registrationClosesAt: newDeadline });

  assert.ok(updatedToNewDeadline);
  assert.ok(loggedExtension);
  assert.ok(result.registrationClosesAt);
  assert.equal(result.registrationClosesAt.getTime(), newDeadline.getTime());
});

void test("eventRouter.extendRegistrationDeadline succeeds for a same-college admin", async () => {
  let updatedToNewDeadline = false;

  const newDeadline = new Date("2030-05-13T10:00:00.000Z");

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 402,
          clubId: 12,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Published Event",
          status: "PUBLISHED",
          date: new Date("2030-05-14T18:45:00.000Z"),
          registrationClosesAt: new Date("2030-05-12T16:45:00.000Z"),
        }),
        update: async (args: any) => {
          updatedToNewDeadline = true;
          assert.equal(args.where.id, 402);
          return { id: 402, title: "Published Event", status: "PUBLISHED", registrationClosesAt: args.data.registrationClosesAt };
        },
      },
      club: {
        findUnique: async () => ({ id: 12, collegeId: "college-1" }),
      },
      clubMembership: {
        findUnique: async () => null, // Not a member
      },
      eventApprovalLog: {
        create: async () => ({ id: 11 }),
      },
      $transaction: async (ops: any[]) => Promise.all(ops),
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
  await caller.event.extendRegistrationDeadline({ id: 402, registrationClosesAt: newDeadline });

  assert.ok(updatedToNewDeadline);
});

void test("eventRouter.extendRegistrationDeadline rejects unmanaged access", async () => {
  const newDeadline = new Date("2030-05-13T10:00:00.000Z");

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 403,
          clubId: 12,
          collegeId: "college-1",
          status: "PUBLISHED",
          date: new Date("2030-05-14T18:45:00.000Z"),
        }),
      },
      club: {
        findUnique: async () => ({ id: 12, collegeId: "college-1" }),
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
      await caller.event.extendRegistrationDeadline({ id: 403, registrationClosesAt: newDeadline });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      return true;
    },
  );
});

void test("eventRouter.extendRegistrationDeadline rejects non-reopenable events", async () => {
  const newDeadline = new Date("2030-05-13T10:00:00.000Z");

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 404,
          clubId: 12,
          collegeId: "college-1",
          status: "CANCELLED", // Not reopenable
          date: new Date("2030-05-14T18:45:00.000Z"),
        }),
      },
      club: {
        findUnique: async () => ({ id: 12, collegeId: "college-1" }),
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
      await caller.event.extendRegistrationDeadline({ id: 404, registrationClosesAt: newDeadline });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.match(err.message, /extend registration/i);
      return true;
    },
  );
});

void test("eventRouter.extendRegistrationDeadline rejects invalid deadlines", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 405,
          clubId: 12,
          collegeId: "college-1",
          status: "PUBLISHED",
          date: new Date("2030-05-14T18:45:00.000Z"),
        }),
      },
      club: {
        findUnique: async () => ({ id: 12, collegeId: "college-1" }),
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
  
  // After event start
  await assert.rejects(
    async () => {
      await caller.event.extendRegistrationDeadline({ id: 405, registrationClosesAt: new Date("2030-05-15T10:00:00.000Z") });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      return true;
    },
  );
  
  // Past deadline
  await assert.rejects(
    async () => {
      await caller.event.extendRegistrationDeadline({ id: 405, registrationClosesAt: new Date("2020-01-01T10:00:00.000Z") });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      return true;
    },
  );
});

void test("eventRouter.update rejects clubs from another college", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 501,
          clubId: 10,
          authorId: "organizer-user-id",
          collegeId: "college-1",
          title: "Draft Event",
          status: "DRAFT",
        }),
      },
      club: {
        findUnique: async () => ({ id: 10, collegeId: "college-2" }), // Different college!
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
      await caller.event.update({
        id: 501,
        data: validCreateInput,
      });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Unauthorized for this event");
      return true;
    },
  );
});

void test("eventRouter.cancel rejects events from another college", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 502,
          clubId: 10,
          authorId: "organizer-user-id",
          collegeId: "college-2", // Different college!
          title: "Published Event",
          status: "PUBLISHED",
        }),
      },
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
      await caller.event.cancel({
        id: 502,
        reason: "Cancelled due to emergency closure",
      });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Unauthorized for this event");
      return true;
    },
  );
});

void test("eventRouter.extendRegistrationDeadline rejects cross-college organizer", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 503,
          clubId: 10,
          authorId: "organizer-user-id",
          collegeId: "college-2", // Different college!
          title: "Published Event",
          status: "PUBLISHED",
        }),
      },
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
      await caller.event.extendRegistrationDeadline({
        id: 503,
        registrationClosesAt: new Date("2030-05-15T12:00:00.000Z"),
      });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      return true;
    },
  );
});

void test("eventRouter.extendRegistrationDeadline rejects past or cancelled events", async () => {
  for (const status of ["CANCELLED", "DRAFT", "SUBMITTED"]) {
    const mockedCtx = {
      db: {
        event: {
          findUnique: async () => ({
            id: 504,
            clubId: 10,
            authorId: "organizer-user-id",
            collegeId: "college-1",
            title: "Reopen Event Test",
            status,
            date: new Date("2030-05-15T18:00:00.000Z"),
            registrationClosesAt: new Date("2030-05-14T18:00:00.000Z"),
          }),
        },
        club: {
          findUnique: async () => ({ id: 10, collegeId: "college-1" }),
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
        await caller.event.extendRegistrationDeadline({
          id: 504,
          registrationClosesAt: new Date("2030-05-15T12:00:00.000Z"),
        });
      },
      (err: any) => {
        assert.ok(err instanceof TRPCError);
        assert.equal(err.code, "BAD_REQUEST");
        assert.equal(err.message, "Only approved or published upcoming events can extend registration.");
        return true;
      },
    );
  }
});

