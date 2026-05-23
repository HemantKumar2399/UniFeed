/**
 * Test the cancel mutation via the tRPC caller factory (server-side)
 * Run with: npx tsx scratch/test-trpc-cancel.ts
 */
import { PrismaClient } from "@prisma/client";
import { appRouter } from "../src/server/api/root";

const db = new PrismaClient();

async function main() {
  // Get the first PUBLISHED event
  const event = await db.event.findFirst({
    where: { status: "PUBLISHED" },
    include: {
      club: {
        include: {
          members: {
            where: { role: "OWNER" },
            select: { userId: true },
          },
        },
      },
    },
  });

  if (!event) {
    console.error("No PUBLISHED event found");
    return;
  }

  const ownerId = event.club.members[0]?.userId;
  if (!ownerId) {
    console.error("No OWNER found for club", event.clubId);
    return;
  }

  const owner = await db.user.findUnique({
    where: { id: ownerId },
    select: { id: true, email: true, role: true, collegeId: true },
  });

  if (!owner) {
    console.error("Owner user not found");
    return;
  }

  console.log("Testing cancel for event:", event.id, event.title);
  console.log("Using organizer:", owner.email, "role:", owner.role);

  // Create a server-side caller with the organizer's session
  const createCaller = appRouter.createCaller({
    db,
    session: {
      user: {
        id: owner.id,
        email: owner.email ?? "",
        name: owner.email ?? "",
        role: owner.role,
        collegeId: owner.collegeId,
      },
      expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    },
    headers: new Headers(),
  });

  try {
    const result = await createCaller.event.cancel({
      id: event.id,
      reason: "Testing the cancel mutation directly via tRPC caller",
    });
    console.log("SUCCESS:", JSON.stringify(result, null, 2));

    // Revert
    await db.event.update({
      where: { id: event.id },
      data: { status: "PUBLISHED", cancelledAt: null, cancellationReason: null },
    });
    const latestLog = await db.eventApprovalLog.findFirst({
      where: { eventId: event.id, action: "CANCELLED" },
      orderBy: { createdAt: "desc" },
    });
    if (latestLog) {
      await db.eventApprovalLog.delete({ where: { id: latestLog.id } });
    }
    console.log("Reverted successfully");
  } catch (err) {
    console.error("FAILED:", err);
  }
}

main()
  .catch(console.error)
  .finally(() => void db.$disconnect());
