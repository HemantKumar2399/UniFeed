/**
 * Direct test: Simulate what the cancel mutation does server-side
 * Run with: npx tsx scratch/test-cancel.ts
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Find the first published event
  const event = await db.event.findFirst({
    where: { status: "PUBLISHED" },
    include: {
      club: {
        include: {
          members: {
            select: { userId: true, clubId: true, role: true },
          },
        },
      },
    },
  });

  if (!event) {
    console.error("No published events found!");
    return;
  }

  console.log("Found event:", event.id, event.title, "clubId:", event.clubId);
  console.log("Club members:", event.club.members);

  // Try to cancel it directly
  const cancelledAt = new Date();
  try {
    const [updatedEvent, log] = await db.$transaction([
      db.event.update({
        where: { id: event.id },
        data: {
          status: "CANCELLED",
          cancelledAt,
          cancellationReason: "Test cancellation reason with enough characters",
        },
        select: {
          id: true,
          title: true,
          status: true,
          cancelledAt: true,
          cancellationReason: true,
        },
      }),
      db.eventApprovalLog.create({
        data: {
          eventId: event.id,
          actorId: event.club.members[0]!.userId, // Use first club member
          action: "CANCELLED",
          reason: "Test cancellation reason with enough characters",
        },
      }),
    ]);

    console.log("SUCCESS - Updated event:", JSON.stringify(updatedEvent, null, 2));
    console.log("Log created:", log.id);

    // Revert the change
    await db.event.update({
      where: { id: event.id },
      data: {
        status: "PUBLISHED",
        cancelledAt: null,
        cancellationReason: null,
      },
    });
    await db.eventApprovalLog.delete({ where: { id: log.id } });
    console.log("Reverted event back to PUBLISHED");
  } catch (err) {
    console.error("FAILED:", err);
  }
}

main()
  .catch(console.error)
  .finally(() => void db.$disconnect());
