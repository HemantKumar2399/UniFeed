import { db } from "@/server/db";
import { Prisma } from "../../../generated/prisma";

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

    // Check how many RSVPs currently exist
    const rsvpCount = await tx.rSVP.count({
      where: { eventId },
    });

    const remainingCapacity = event.capacity - rsvpCount;
    if (remainingCapacity <= 0) {
      throw new CapacityError("Event is at full capacity");
    }

    // Insert the RSVP (will fail safely if the unique constraint is blown)
    const newRsvp = await tx.rSVP.create({
      data: {
        userId,
        eventId,
      },
    });

    return { rsvp: newRsvp, remainingCapacity: remainingCapacity - 1 };
  });
}
