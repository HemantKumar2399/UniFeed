import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const published = await db.event.findMany({
    where: { status: "PUBLISHED" },
    select: { id: true, title: true, status: true, date: true, clubId: true },
    take: 5,
  });
  console.log("PUBLISHED events:", JSON.stringify(published, null, 2));

  const cancelled = await db.event.findMany({
    where: { status: "CANCELLED" },
    select: { id: true, title: true, status: true, cancelledAt: true, cancellationReason: true },
    take: 5,
  });
  console.log("CANCELLED events:", JSON.stringify(cancelled, null, 2));

  const orgs = await db.user.findMany({
    where: { role: "ORGANIZER" },
    select: { id: true, email: true, role: true, collegeId: true },
    take: 3,
  });
  console.log("Organizers:", JSON.stringify(orgs, null, 2));

  const memberships = await db.clubMembership.findMany({
    where: { role: { in: ["OWNER", "EDITOR"] } },
    select: { userId: true, clubId: true, role: true },
    take: 10,
  });
  console.log("Club memberships:", JSON.stringify(memberships, null, 2));
}

main()
  .catch(console.error)
  .finally(() => void db.$disconnect());
