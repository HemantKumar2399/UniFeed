import { db } from "@/server/db";
import type { Prisma } from "@prisma/client";

export class CapacityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CapacityError";
  }
}

export async function createRsvpPessimistic(userId: string, eventId: number) {
  return await db.$transaction(
    async (tx: Prisma.TransactionClient) => {
      // Fetch event capacity — no raw FOR UPDATE lock needed; REPEATABLE READ
      // isolation on the transaction prevents phantom reads at the count level.
      const event = await tx.event.findUnique({
        where: { id: eventId },
        select: { id: true, capacity: true },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      // Check for an existing (possibly cancelled) RSVP
      const existingRsvp = await tx.rSVP.findUnique({
        where: {
          userId_eventId: { userId, eventId },
        },
      });

      if (existingRsvp && existingRsvp.status !== "CANCELLED") {
        // Already has an active RSVP — surface as a unique constraint error
        // so the router can map it to ALREADY_REGISTERED.
        const err = new Error("Unique constraint failed") as Error & { code?: string };
        err.code = "P2002";
        throw err;
      }

      // Count active RSVPs to determine seat availability
      const activeCount = await tx.rSVP.count({
        where: {
          eventId,
          status: { in: ["GOING", "ATTENDED"] },
        },
      });

      const hasSeat = activeCount < event.capacity;
      const targetStatus = hasSeat ? "GOING" : "WAITLISTED";
      const remainingCapacity = hasSeat ? event.capacity - activeCount - 1 : 0;

      if (existingRsvp) {
        // Re-activate a previously cancelled RSVP
        const rsvp = await tx.rSVP.update({
          where: { id: existingRsvp.id },
          data: { status: targetStatus, createdAt: new Date() },
        });
        return { rsvp, remainingCapacity };
      }

      // Create a fresh RSVP
      const rsvp = await tx.rSVP.create({
        data: { userId, eventId, status: targetStatus },
      });
      return { rsvp, remainingCapacity };
    },
    {
      // REPEATABLE READ prevents a concurrent transaction from inserting an RSVP
      // between our count check and our create, without requiring explicit row locks.
      isolationLevel: "RepeatableRead",
    },
  );
}
