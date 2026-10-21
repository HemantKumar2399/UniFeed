/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
import assert from "node:assert/strict";
import { test, type TestContext } from "node:test";
import { appRouter } from "./api/root";
import { db } from "./db";
import { getCollegeForEmail } from "./auth/domain";
import { authConfig } from "./auth/config";
import { createStudentQrToken } from "@/lib/student-qr";

function replace(t: TestContext, target: any, name: string, value: any) {
  const original = target[name];
  target[name] = value;
  t.after(() => {
    target[name] = original;
  });
}

function caller(database: any) {
  return appRouter.createCaller({
    db: database,
    session: {
      user: { id: "student", role: "STUDENT", collegeId: "campus-a" },
      expires: "2030-01-01",
    },
    headers: new Headers(),
  });
}

void test("students cannot subscribe to private attendee records even in their own college", async () => {
  const api = caller({
    event: {
      findUnique: async () => ({
        id: 1,
        collegeId: "campus-a",
        status: "PUBLISHED",
        clubId: 1,
      }),
    },
  });
  await assert.rejects(api.event.onAttendanceChange({ eventId: 1 }));
});

void test("bookmark creation denies an event outside the visible student scope", async () => {
  let created = false;
  const api = caller({
    event: { findFirst: async () => null },
    savedEvent: {
      findUnique: async () => null,
      create: async () => {
        created = true;
      },
    },
  });
  await assert.rejects(api.profile.toggleSavedEvent({ eventId: 42 }));
  assert.equal(created, false);
});

void test("saved event reads enforce college, publication and deletion boundaries", async () => {
  const api = caller({
    event: {
      findMany: async ({ where }: any) => {
        assert.equal(where.collegeId, "campus-a");
        assert.equal(where.status, "PUBLISHED");
        assert.equal(where.deletedAt, null);
        assert.deepEqual(where.club, { isActive: true, deletedAt: null });
        return [];
      },
    },
  });
  assert.deepEqual(await api.profile.getSavedEvents(), []);
});

void test("an unrelated edu.in address never inherits the first college", async (t) => {
  replace(t, db.college, "findFirst", async () => null);
  replace(t, db.college, "findMany", async () => [
    { id: "campus-a", emailDomains: ["campus.edu.in"] },
  ]);
  assert.equal(await getCollegeForEmail("stranger@unrelated.edu.in"), null);
});

void test("malformed multiple-at email cannot enter a college", async (t) => {
  replace(t, db.college, "findFirst", async () => ({ id: "campus-a" }));
  assert.equal(await getCollegeForEmail("fake@other@campus.edu.in"), null);
});

void test("existing JWT permissions refresh after a role demotion", async (t) => {
  replace(t, db.user, "findUnique", async () => ({
    id: "former-admin",
    role: "STUDENT",
    collegeId: "campus-b",
  }));
  const token = await authConfig.callbacks.jwt({
    token: { id: "former-admin", role: "ADMIN", collegeId: "campus-a" },
  } as any);
  assert.equal(token?.role, "STUDENT");
  assert.equal(token?.collegeId, "campus-b");
});

void test("a deleted account cannot keep its JWT session", async (t) => {
  replace(t, db.user, "findUnique", async () => null);
  assert.equal(
    await authConfig.callbacks.jwt({
      token: { id: "deleted", role: "ADMIN" },
    } as any),
    null,
  );
});

void test("manual check-in rechecks a ticket after acquiring the cancellation lock", async () => {
  let status = "GOING";
  let writes = 0;
  let locks = 0;
  const database: any = {
    event: {
      findUnique: async () => ({
        id: 1,
        clubId: 1,
        collegeId: "campus-a",
        status: "PUBLISHED",
      }),
    },
    club: {
      findUnique: async () => ({
        id: 1,
        collegeId: "campus-a",
        isActive: true,
      }),
    },
    rSVP: {
      findFirst: async () => ({ id: 5 }),
      findUnique: async () => ({
        id: 5,
        eventId: 1,
        userId: "student",
        status,
        user: { name: "Student", email: "student@example.edu" },
      }),
      update: async () => {
        writes++;
        return {
          id: 5,
          userId: "student",
          status: "ATTENDED",
          user: { name: "Student" },
        };
      },
    },
    $executeRaw: async () => {
      locks++;
      status = "CANCELLED";
    },
  };
  database.$transaction = async (fn: any) => fn(database);
  const api = appRouter.createCaller({
    db: database,
    session: {
      user: { id: "admin", role: "ADMIN", collegeId: "campus-a" },
      expires: "2030-01-01",
    },
    headers: new Headers(),
  });
  await assert.rejects(
    api.event.forceCheckIn({ eventId: 1, userId: "student" }),
  );
  assert.equal(locks, 1);
  assert.equal(writes, 0);
});

void test("a committed RSVP remains successful when notification delivery fails", async () => {
  const rsvp = { id: 5, status: "GOING", userId: "student", eventId: 1 };
  const api = caller({
    event: {
      findUnique: async () => ({
        id: 1,
        collegeId: "campus-a",
        status: "PUBLISHED",
        date: new Date(Date.now() + 86400000),
        registrationClosesAt: new Date(Date.now() + 3600000),
      }),
    },
    $transaction: async () => ({ rsvp, remainingCapacity: 1 }),
    rSVP: { findUnique: async () => null },
    notification: {
      create: async () => {
        throw new Error("Notification storage unavailable");
      },
    },
  });
  assert.equal((await api.rsvp.register({ eventId: 1 })).id, 5);
});

void test("only college admins can verify a profile in their own college", async () => {
  let verified = false;
  const database: any = {
    studentProfile: {
      findUnique: async () => ({
        id: "profile",
        userId: "student",
        collegeId: "campus-a",
      }),
      update: async ({ data }: any) => {
        verified = data.isVerified;
        return { userId: "student", ...data };
      },
    },
  };
  const own: any = appRouter.createCaller({
    db: database,
    session: {
      user: { id: "admin", role: "ADMIN", collegeId: "campus-a" },
      expires: "2030-01-01",
    },
    headers: new Headers(),
  });
  await own.admin.setStudentVerification({ userId: "student", verified: true });
  assert.equal(verified, true);
  const other: any = appRouter.createCaller({
    db: database,
    session: {
      user: { id: "other", role: "ADMIN", collegeId: "campus-b" },
      expires: "2030-01-01",
    },
    headers: new Headers(),
  });
  await assert.rejects(
    other.admin.setStudentVerification({ userId: "student", verified: false }),
    { code: "FORBIDDEN" },
  );
  assert.equal(verified, true);
});

void test("a signed passport does not check in an unverified student identity", async () => {
  const token = createStudentQrToken(
    {
      studentQrId: "sqr_pending_student",
      studentQrSecretVersion: 1,
      issuedAt: Date.now(),
    },
    process.env.STUDENT_QR_SECRET!,
  );
  const database: any = {
    event: {
      findUnique: async () => ({
        id: 1,
        clubId: 1,
        collegeId: "campus-a",
        status: "PUBLISHED",
      }),
    },
    club: {
      findUnique: async () => ({
        id: 1,
        collegeId: "campus-a",
        isActive: true,
      }),
    },
    studentProfile: {
      findUnique: async () => ({
        studentQrId: "sqr_pending_student",
        studentQrSecretVersion: 1,
        collegeId: "campus-a",
        userId: "student",
        isVerified: false,
        qrRevokedAt: null,
      }),
    },
    rSVP: {
      update: () => assert.fail("Unverified identity must not reach check-in"),
    },
  };
  const api = appRouter.createCaller({
    db: database,
    session: {
      user: { id: "admin", role: "ADMIN", collegeId: "campus-a" },
      expires: "2030-01-01",
    },
    headers: new Headers(),
  });
  assert.equal(
    (await api.event.verifyStudentQrForEvent({ eventId: 1, token })).outcome,
    "INVALID_QR",
  );
});
