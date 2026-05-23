import { db } from "@/server/db";
import { Prisma } from "@prisma/client";

export class CapacityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CapacityError";
  }
}

export async function createRsvpPessimistic(userId: string, eventId: number) {
  // Use $transaction to ensure atomicity
  return await db.$transaction(async (tx) => {
    // Pessimistic lock on the event row: SELECT ... FOR UPDATE
    const eventParams = Prisma.sql`
      SELECT id, capacity, "createdAt", "updatedAt"
      FROM "Event"
      WHERE id = ${eventId}
      FOR UPDATE
    `;

    // Execute raw query for the lock
    const events = await tx.$queryRaw<
      { id: number; capacity: number }[]
    >(eventParams);

    if (!events || events.length === 0) {
      throw new Error("Event not found");
    }

    const event = events[0];
    if (!event) {
      throw new Error("Event not found");
    }

    // Check how many active (GOING or ATTENDED) RSVPs currently exist
    const activeCount = await tx.rSVP.count({
      where: {
        eventId,
        status: {
          in: ["GOING", "ATTENDED"],
        },
      },
    });

    const existingRsvp = await tx.rSVP.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });

    if (existingRsvp && existingRsvp.status !== "CANCELLED") {
      const p2002 = new Error("Unique constraint failed") as Error & { code?: string };
      p2002.code = "P2002";
      throw p2002;
    }

    if (existingRsvp) {
      // Re-use cancelled RSVP
      if (activeCount < event.capacity) {
        const rsvp = await tx.rSVP.update({
          where: { id: existingRsvp.id },
          data: {
            status: "GOING",
            createdAt: new Date(),
          },
        });
        return { rsvp, remainingCapacity: event.capacity - activeCount - 1 };
      } else {
        const rsvp = await tx.rSVP.update({
          where: { id: existingRsvp.id },
          data: {
            status: "WAITLISTED",
            createdAt: new Date(),
          },
        });
        return { rsvp, remainingCapacity: 0 };
      }
    }

    // Create new RSVP
    if (activeCount < event.capacity) {
      const rsvp = await tx.rSVP.create({
        data: {
          userId,
          eventId,
          status: "GOING",
        },
      });
      return { rsvp, remainingCapacity: event.capacity - activeCount - 1 };
    } else {
      const rsvp = await tx.rSVP.create({
        data: {
          userId,
          eventId,
          status: "WAITLISTED",
        },
      });
      return { rsvp, remainingCapacity: 0 };
    }
  });
}
