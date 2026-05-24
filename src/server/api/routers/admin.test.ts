/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unused-vars */
process.env.SKIP_ENV_VALIDATION = "1";
import assert from "node:assert/strict";
import test from "node:test";
import { appRouter } from "@/server/api/root";
import { createCallerFactory } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const createCaller = createCallerFactory(appRouter);

void test("adminRouter.promoteUser succeeds when caller is ADMIN and target user is in the same college", async () => {
  let updateCalled = false;

  const mockedCtx = {
    db: {
      user: {
        findUnique: async (args: any) => {
          assert.equal(args.where.id, "target-user-id");
          return { id: "target-user-id", role: "STUDENT", collegeId: "college-1" };
        },
        update: async (args: any) => {
          updateCalled = true;
          assert.equal(args.where.id, "target-user-id");
          assert.equal(args.data.role, "ORGANIZER");
          return { id: "target-user-id", role: "ORGANIZER" };
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
  await caller.admin.promoteUser({ userId: "target-user-id", role: "ORGANIZER" });
  assert.ok(updateCalled);
});

void test("adminRouter.promoteUser fails when caller is ADMIN and target user is in a different college", async () => {
  const mockedCtx = {
    db: {
      user: {
        findUnique: async (args: any) => {
          return { id: "target-user-id", role: "STUDENT", collegeId: "college-2" }; // different college
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
  await assert.rejects(
    async () => {
      await caller.admin.promoteUser({ userId: "target-user-id", role: "ORGANIZER" });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Cannot manage users outside your college.");
      return true;
    }
  );
});




void test("adminRouter.promoteUser fails when caller is not an administrator", async () => {
  const mockedCtx = {
    db: {} as any,
    session: {
      user: {
        id: "student-user-id",
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
      await caller.admin.promoteUser({ userId: "target-user-id", role: "ORGANIZER" });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "UNAUTHORIZED");
      return true;
    }
  );
});

void test("adminRouter.assignClubMembership fails when target user is a basic student", async () => {
  const mockedCtx = {
    db: {
      club: {
        findUnique: async (args: any) => {
          return { id: 10, collegeId: "college-1" };
        },
      },
      user: {
        findUnique: async (args: any) => {
          return { id: "target-user-id", role: "STUDENT", collegeId: "college-1" };
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
  await assert.rejects(
    async () => {
      await caller.admin.assignClubMembership({ userId: "target-user-id", clubId: 10, role: "OWNER" });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "BAD_REQUEST");
      assert.equal(err.message, "User must be promoted to ORGANIZER before assigning club membership.");
      return true;
    }
  );
});

void test("adminRouter.assignClubMembership blocks clubs outside the admin college", async () => {
  const mockedCtx = {
    db: {
      club: {
        findUnique: async () => ({ id: 10, collegeId: "college-2" }),
      },
      user: {
        findUnique: async () => ({ id: "target-user-id", role: "ORGANIZER", collegeId: "college-1" }),
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
  await assert.rejects(
    async () => {
      await caller.admin.assignClubMembership({ userId: "target-user-id", clubId: 10, role: "OWNER" });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Cannot manage clubs outside your college.");
      return true;
    },
  );
});

void test("adminRouter.assignClubMembership blocks users outside the admin college", async () => {
  const mockedCtx = {
    db: {
      club: {
        findUnique: async () => ({ id: 10, collegeId: "college-1" }),
      },
      user: {
        findUnique: async () => ({ id: "target-user-id", role: "ORGANIZER", collegeId: "college-2" }),
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
  await assert.rejects(
    async () => {
      await caller.admin.assignClubMembership({ userId: "target-user-id", clubId: 10, role: "OWNER" });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Cannot assign memberships to users outside your college.");
      return true;
    },
  );
});

void test("adminRouter.getPendingEvents stays college-scoped and only requests submitted events", async () => {
  let whereArg: Record<string, unknown> | null = null;

  const mockedCtx = {
    db: {
      event: {
        findMany: async (args: any) => {
          whereArg = args.where;
          return [
            {
              id: 77,
              title: "Submitted Event",
              status: "SUBMITTED",
              date: new Date("2030-05-15T18:00:00.000Z"),
              capacity: 120,
              location: "Auditorium",
              submittedAt: new Date("2030-05-10T12:00:00.000Z"),
              createdAt: new Date("2030-05-09T12:00:00.000Z"),
              club: { id: 10, name: "Coding Club" },
              author: { id: "organizer-user-id", name: "Organizer", email: "organizer@example.com" },
            },
          ];
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
  const result = await caller.admin.getPendingEvents({ query: "Submitted" });

  assert.equal(result.length, 1);
  assert.deepEqual(whereArg, {
    collegeId: "college-1",
    status: "SUBMITTED",
    OR: [
      { title: { contains: "Submitted", mode: "insensitive" } },
      { description: { contains: "Submitted", mode: "insensitive" } },
      { author: { name: { contains: "Submitted", mode: "insensitive" } } },
      { author: { email: { contains: "Submitted", mode: "insensitive" } } },
    ],
  });
});

void test("adminRouter.getPendingEvents rejects organizer callers", async () => {
  const mockedCtx = {
    db: {} as any,
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
      await caller.admin.getPendingEvents();
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "UNAUTHORIZED");
      assert.equal(err.message, "Only administrators can access this procedure.");
      return true;
    },
  );
});

void test("adminRouter.approveEvent approves submitted events in the same college and records audit history", async () => {
  let updated = false;
  let approvalLogged = false;
  let organizerNotified = false;

  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 88,
          title: "Submitted Event",
          description: "Pending review.",
          status: "SUBMITTED",
          authorId: "organizer-user-id",
          submittedAt: new Date("2030-05-10T12:00:00.000Z"),
          date: new Date("2030-05-15T18:00:00.000Z"),
          capacity: 120,
          location: "Auditorium",
          imageUrl: "https://example.com/poster.png",
          clubId: 10,
          collegeId: "college-1",
          createdAt: new Date("2030-05-09T12:00:00.000Z"),
          club: { id: 10, name: "Coding Club", logoUrl: "https://example.com/logo.png", collegeId: "college-1" },
          author: { id: "organizer-user-id", name: "Organizer", email: "organizer@example.com" },
          approvalLogs: [],
        }),
        update: async (args: any) => {
          updated = true;
          assert.equal(args.where.id, 88);
          assert.equal(args.data.status, "APPROVED");
          return { id: 88, title: "Submitted Event", status: "APPROVED", clubId: 10, collegeId: "college-1" };
        },
      },
      eventApprovalLog: {
        create: async (args: any) => {
          approvalLogged = true;
          assert.equal(args.data.eventId, 88);
          assert.equal(args.data.actorId, "admin-user-id");
          assert.equal(args.data.action, "APPROVED");
          return { id: 1, ...args.data };
        },
      },
      notification: {
        create: async (args: any) => {
          organizerNotified = true;
          assert.equal(args.data.userId, "organizer-user-id");
          assert.equal(args.data.type, "EVENT_APPROVED");
          return { id: 2, ...args.data };
        },
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
  const result = await caller.admin.approveEvent({ eventId: 88 });

  assert.ok(updated);
  assert.ok(approvalLogged);
  assert.ok(organizerNotified);
  assert.equal(result.status, "APPROVED");
});

void test("adminRouter.rejectEvent blocks cross-college review attempts", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 89,
          title: "Other College Event",
          description: "Pending review.",
          status: "SUBMITTED",
          submittedAt: new Date("2030-05-10T12:00:00.000Z"),
          date: new Date("2030-05-15T18:00:00.000Z"),
          capacity: 120,
          location: "Auditorium",
          imageUrl: "https://example.com/poster.png",
          clubId: 20,
          collegeId: "college-2",
          createdAt: new Date("2030-05-09T12:00:00.000Z"),
          club: { id: 20, name: "Other Club", logoUrl: "https://example.com/logo.png", collegeId: "college-2" },
          author: { id: "organizer-user-id", name: "Organizer", email: "organizer@example.com" },
          approvalLogs: [],
        }),
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
  await assert.rejects(
    async () => {
      await caller.admin.rejectEvent({ eventId: 89, reason: "This event is not in the correct college scope." });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Cannot review events outside your college.");
      return true;
    },
  );
});

void test("adminRouter.approveEvent blocks cross-college review attempts", async () => {
  const mockedCtx = {
    db: {
      event: {
        findUnique: async () => ({
          id: 90,
          title: "Other College Event",
          description: "Pending review.",
          status: "SUBMITTED",
          submittedAt: new Date("2030-05-10T12:00:00.000Z"),
          date: new Date("2030-05-15T18:00:00.000Z"),
          capacity: 120,
          location: "Auditorium",
          imageUrl: "https://example.com/poster.png",
          clubId: 21,
          collegeId: "college-2",
          createdAt: new Date("2030-05-09T12:00:00.000Z"),
          club: { id: 21, name: "Other Club", logoUrl: "https://example.com/logo.png", collegeId: "college-2" },
          author: { id: "organizer-user-id", name: "Organizer", email: "organizer@example.com" },
          approvalLogs: [],
        }),
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
  await assert.rejects(
    async () => {
      await caller.admin.approveEvent({ eventId: 90 });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "Cannot review events outside your college.");
      return true;
    },
  );
});

void test("adminRouter.revokeStudentQr marks a same-college student qr as revoked", async () => {
  let updateCalled = false;

  const mockedCtx = {
    db: {
      studentProfile: {
        findUnique: async () => ({
          id: "profile-1",
          userId: "student-user-id",
          collegeId: "college-1",
          isVerified: true,
          studentQrId: "sqr_existing",
          studentQrSecretVersion: 2,
          qrRevokedAt: null,
          user: {
            id: "student-user-id",
            name: "Student One",
            email: "student1@example.com",
          },
        }),
        update: async (args: any) => {
          updateCalled = true;
          assert.equal(args.where.id, "profile-1");
          assert.ok(args.data.qrRevokedAt instanceof Date);
          return {
            userId: "student-user-id",
            isVerified: true,
            studentQrId: "sqr_existing",
            studentQrSecretVersion: 2,
            qrRevokedAt: args.data.qrRevokedAt,
            user: {
              name: "Student One",
              email: "student1@example.com",
            },
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
  const result = await caller.admin.revokeStudentQr({ userId: "student-user-id" });

  assert.ok(updateCalled);
  assert.equal(result.userId, "student-user-id");
  assert.ok(result.qrRevokedAt instanceof Date);
});

void test("adminRouter.regenerateStudentQr rotates qr id and clears revoked state", async () => {
  let updateCalled = false;

  const mockedCtx = {
    db: {
      studentProfile: {
        findUnique: async () => ({
          id: "profile-2",
          userId: "student-user-id",
          collegeId: "college-1",
          isVerified: true,
          studentQrId: "sqr_old",
          studentQrSecretVersion: 4,
          qrRevokedAt: new Date("2030-05-11T10:00:00.000Z"),
          user: {
            id: "student-user-id",
            name: "Student Two",
            email: "student2@example.com",
          },
        }),
        update: async (args: any) => {
          updateCalled = true;
          assert.equal(args.where.id, "profile-2");
          assert.match(args.data.studentQrId, /^sqr_[A-Za-z0-9_-]+$/);
          assert.deepEqual(args.data.studentQrSecretVersion, { increment: 1 });
          assert.equal(args.data.qrRevokedAt, null);
          return {
            userId: "student-user-id",
            isVerified: true,
            studentQrId: args.data.studentQrId,
            studentQrSecretVersion: 5,
            qrRevokedAt: null,
            user: {
              name: "Student Two",
              email: "student2@example.com",
            },
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
  const result = await caller.admin.regenerateStudentQr({ userId: "student-user-id" });

  assert.ok(updateCalled);
  assert.ok(result.studentQrId);
  assert.match(result.studentQrId, /^sqr_[A-Za-z0-9_-]+$/);
  assert.equal(result.studentQrSecretVersion, 5);
  assert.equal(result.qrRevokedAt, null);
});
