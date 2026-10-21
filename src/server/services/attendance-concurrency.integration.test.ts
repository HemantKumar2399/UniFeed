import assert from "node:assert/strict";
import { test } from "node:test";
import { appRouter } from "@/server/api/root";
import { db } from "@/server/db";

void test("check-in racing cancellation preserves one active seat and never revives a cancelled ticket", async () => {
  const college = await db.college.create({
    data: {
      name: "Race test",
      slug: `race-${Date.now()}`,
      emailDomains: ["race.test"],
      logoUrl: "https://example.com/logo.png",
    },
  });
  const admin = await db.user.create({
    data: {
      email: `admin-${college.id}@race.test`,
      collegeId: college.id,
      role: "ADMIN",
    },
  });
  const students = await Promise.all(
    [0, 1].map((i) =>
      db.user.create({
        data: {
          email: `student-${i}-${college.id}@race.test`,
          collegeId: college.id,
        },
      }),
    ),
  );
  const club = await db.club.create({
    data: {
      name: "Race club",
      collegeId: college.id,
      logoUrl: "https://example.com/logo.png",
    },
  });
  const event = await db.event.create({
    data: {
      title: "Race event",
      description: "Isolation test",
      location: "Test",
      imageUrl: "https://example.com/event.png",
      date: new Date(Date.now() + 86400000),
      registrationClosesAt: new Date(Date.now() + 3600000),
      status: "PUBLISHED",
      capacity: 1,
      attendeeCount: 1,
      clubId: club.id,
      collegeId: college.id,
      authorId: admin.id,
    },
  });
  const first = students[0]!;
  const second = students[1]!;
  try {
    const ticket = await db.rSVP.create({
      data: { userId: first.id, eventId: event.id, status: "GOING" },
    });
    await db.rSVP.create({
      data: { userId: second.id, eventId: event.id, status: "WAITLISTED" },
    });
    const organizer = appRouter.createCaller({
      db,
      session: {
        user: { id: admin.id, role: "ADMIN", collegeId: college.id },
        expires: "2030-01-01",
      },
      headers: new Headers(),
    });
    const student = appRouter.createCaller({
      db,
      session: {
        user: { id: first.id, role: "STUDENT", collegeId: college.id },
        expires: "2030-01-01",
      },
      headers: new Headers(),
    });
    const outcomes = await Promise.allSettled([
      organizer.event.forceCheckIn({ eventId: event.id, userId: first.id }),
      student.rsvp.cancel({ eventId: event.id }),
    ]);
    assert.equal(
      outcomes.filter((item) => item.status === "fulfilled").length,
      1,
    );
    assert.equal(
      await db.rSVP.count({
        where: { eventId: event.id, status: { in: ["GOING", "ATTENDED"] } },
      }),
      1,
    );
    assert.equal(
      (await db.event.findUniqueOrThrow({ where: { id: event.id } }))
        .attendeeCount,
      1,
    );
    const current = await db.rSVP.findUniqueOrThrow({
      where: { id: ticket.id },
    });
    if (current.status === "ATTENDED") {
      await organizer.event.forceCheckIn({
        eventId: event.id,
        userId: first.id,
      });
      assert.deepEqual(
        (await db.rSVP.findUniqueOrThrow({ where: { id: ticket.id } }))
          .checkedInAt,
        current.checkedInAt,
      );
    } else assert.equal(current.status, "CANCELLED");
  } finally {
    await db.event.delete({ where: { id: event.id } });
    await db.club.delete({ where: { id: club.id } });
    await db.user.deleteMany({ where: { collegeId: college.id } });
    await db.college.delete({ where: { id: college.id } });
  }
});
