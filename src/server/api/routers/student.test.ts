/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
process.env.SKIP_ENV_VALIDATION = "1";
import assert from "node:assert/strict";
import test from "node:test";
import { appRouter } from "@/server/api/root";
import { createCallerFactory } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const createCaller = createCallerFactory(appRouter);

void test("studentRouter.getProfile returns the profile if it exists", async () => {
  const mockProfile = {
    id: "profile-id",
    userId: "test-user-id",
    collegeId: "college-id",
    prn: "12345",
    branch: "CSE",
    course: "B.Tech",
    graduationYear: 2026,
    section: "A",
    phone: "1234567890",
    isVerified: true,
    studentQrId: "qr_stud_test-user-id",
  };

  const mockedCtx = {
    db: {
      studentProfile: {
        findUnique: async (args: any) => {
          assert.equal(args.where.userId, "test-user-id");
          return mockProfile;
        },
      },
    } as any,
    session: {
      user: {
        id: "test-user-id",
        role: "STUDENT",
        collegeId: "college-id",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  const result = await caller.student.getProfile();
  assert.deepEqual(result, mockProfile);
});

void test("studentRouter.createProfile creates a new profile successfully", async () => {
  const input = {
    prn: "12345",
    branch: "CSE",
    course: "B.Tech",
    graduationYear: 2026,
    section: "A",
    phone: "1234567890",
  };

  let createCalled = false;

  const mockedCtx = {
    db: {
      studentProfile: {
        findUnique: async (args: any) => {
          // First call is checking existing profile by userId
          if (args.where.userId) {
            return null;
          }
          // Second call is checking duplicate PRN by collegeId_prn
          if (args.where.collegeId_prn) {
            assert.equal(args.where.collegeId_prn.collegeId, "college-id");
            assert.equal(args.where.collegeId_prn.prn, "12345");
            return null;
          }
          return null;
        },
        create: async (args: any) => {
          createCalled = true;
          assert.equal(args.data.userId, "test-user-id");
          assert.equal(args.data.collegeId, "college-id");
          assert.equal(args.data.prn, "12345");
          assert.equal(args.data.isVerified, true);
          return { id: "new-profile-id", ...args.data };
        },
      },
    } as any,
    session: {
      user: {
        id: "test-user-id",
        role: "STUDENT",
        collegeId: "college-id",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  const result = await caller.student.createProfile(input);
  assert.ok(createCalled);
  assert.equal(result.id, "new-profile-id");
  assert.equal(result.isVerified, true);
});

void test("studentRouter.createProfile fails if PRN is already registered in the same college", async () => {
  const input = {
    prn: "12345",
    branch: "CSE",
    course: "B.Tech",
    graduationYear: 2026,
    section: "A",
    phone: "1234567890",
  };

  const mockedCtx = {
    db: {
      studentProfile: {
        findUnique: async (args: any) => {
          if (args.where.userId) {
            return null;
          }
          if (args.where.collegeId_prn) {
            // Simulate PRN already exists in this college
            return { id: "existing-profile-id" };
          }
          return null;
        },
      },
    } as any,
    session: {
      user: {
        id: "test-user-id",
        role: "STUDENT",
        collegeId: "college-id",
      },
      expires: "2026-05-23T00:00:00.000Z",
    },
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);
  await assert.rejects(
    async () => {
      await caller.student.createProfile(input);
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "CONFLICT");
      assert.equal(err.message, "PRN_ALREADY_REGISTERED");
      return true;
    }
  );
});

void test("studentRouter procedures throw UNAUTHORIZED if user is not logged in", async () => {
  const mockedCtx = {
    db: {} as any,
    session: null,
    headers: new Headers(),
  };

  const caller = createCaller(mockedCtx as any);

  await assert.rejects(
    async () => {
      await caller.student.getProfile();
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "UNAUTHORIZED");
      return true;
    }
  );

  await assert.rejects(
    async () => {
      await caller.student.createProfile({
        prn: "12345",
        branch: "CSE",
        course: "B.Tech",
        graduationYear: 2026,
      });
    },
    (err: any) => {
      assert.ok(err instanceof TRPCError);
      assert.equal(err.code, "UNAUTHORIZED");
      return true;
    }
  );
});
