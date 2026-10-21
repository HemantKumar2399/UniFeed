import assert from "node:assert/strict";
import test from "node:test";
import { db } from "@/server/db";
import { createRsvpPessimistic } from "./rsvp";
import type { User } from "@prisma/client";

void test("createRsvpPessimistic handles concurrent RSVPs and respects capacity", async () => {
  const college = await db.college.create({
    data: {
      name: "RSVP test",
      slug: `rsvp-${Date.now()}`,
      emailDomains: ["test.edu"],
      logoUrl: "https://example.com/logo.png",
    },
  });
  const author = await db.user.create({
    data: {
      email: `organizer-${college.id}@test.edu`,
      name: "Test organizer",
      role: "ORGANIZER",
      collegeId: college.id,
    },
  });
  const club = await db.club.create({
    data: {
      name: "Test club",
      logoUrl: "https://example.com/logo.png",
      collegeId: college.id,
    },
  });

  // 4. Create an event with capacity 3
  const event = await db.event.create({
    data: {
      title: "Concurrent RSVP Test Event",
      description: "Testing pessimistic locking",
      location: "Virtual",
      imageUrl: "https://example.com/event.png",
      date: new Date(Date.now() + 86400000), // tomorrow
      registrationClosesAt: new Date(Date.now() + 43200000),
      capacity: 3,
      clubId: club.id,
      collegeId: college.id,
      authorId: author.id,
      status: "PUBLISHED",
    },
  });

  let users: User[] = [];
  try {
    // 5. Create 5 test users who will concurrently register
    users = await Promise.all(
      Array.from({ length: 5 }, (_, i) =>
        db.user.create({
          data: {
            email: `student-${event.id}-${i}@test.edu`,
            name: `Student ${i}`,
            role: "STUDENT",
            collegeId: college.id,
          },
        }),
      ),
    );

    // 6. Concurrently call createRsvpPessimistic for all 5 users
    await Promise.all(
      users.map((user) => createRsvpPessimistic(user.id, event.id)),
    );

    // 7. Verify status distributions
    const rsvps = await db.rSVP.findMany({
      where: { eventId: event.id },
    });

    const goingRsvps = rsvps.filter((r) => r.status === "GOING");
    const waitlistedRsvps = rsvps.filter((r) => r.status === "WAITLISTED");

    assert.equal(goingRsvps.length, 3);
    assert.equal(waitlistedRsvps.length, 2);

    // 8. Verify denormalized attendeeCount in the DB
    const updatedEvent = await db.event.findUnique({
      where: { id: event.id },
      select: { attendeeCount: true },
    });

    assert.equal(updatedEvent?.attendeeCount, 3);
  } finally {
    // Cleanup
    if (event) {
      await db.rSVP.deleteMany({ where: { eventId: event.id } });
      await db.event.delete({ where: { id: event.id } });
    }
    if (users.length > 0) {
      await db.user.deleteMany({
        where: { id: { in: users.map((u) => u.id) } },
      });
    }
    await db.club.delete({ where: { id: club.id } });
    await db.user.delete({ where: { id: author.id } });
    await db.college.delete({ where: { id: college.id } });
  }
});
