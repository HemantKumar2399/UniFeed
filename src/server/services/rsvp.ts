import { db } from "@/server/db";
import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export class CapacityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CapacityError";
  }
}

export async function createRsvpPessimistic(
  userId: string,
  eventId: number,
  database = db,
) {
  return await database.$transaction(async (tx: Prisma.TransactionClient) => {
    // Enforce pessimistic locking on the target event to serialize concurrent checks
    await tx.$executeRaw`SELECT id FROM "Event" WHERE id = ${eventId} FOR UPDATE`;

    const event = await tx.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        capacity: true,
        status: true,
        date: true,
        registrationClosesAt: true,
        deletedAt: true,
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }
    // Revalidate under the same lock as seat allocation, rather than relying
    // on the router's earlier snapshot during a concurrent lifecycle change.
    if (
      event.deletedAt ||
      event.status !== "PUBLISHED" ||
      event.date <= new Date() ||
      !event.registrationClosesAt ||
      event.registrationClosesAt <= new Date()
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Registration for this event is closed.",
      });
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
      const err = new Error("Unique constraint failed") as Error & {
        code?: string;
      };
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

    if (targetStatus === "GOING") {
      await tx.event.update({
        where: { id: eventId },
        data: { attendeeCount: { increment: 1 } },
      });
    }

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
  });
}
