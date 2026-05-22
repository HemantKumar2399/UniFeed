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

void test("adminRouter.promoteUser fails when caller is ADMIN and target role is SUPER_ADMIN", async () => {
  const mockedCtx = {
    db: {
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
      await caller.admin.promoteUser({ userId: "target-user-id", role: "SUPER_ADMIN" });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "FORBIDDEN");
      assert.equal(err.message, "College admins cannot assign SUPER_ADMIN role.");
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
