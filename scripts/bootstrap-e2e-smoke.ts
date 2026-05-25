import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SMOKE_EVENT_TITLE = "E2E Smoke Submitted Event";
const REALTIME_SMOKE_EVENT_TITLE = "E2E Smoke Realtime Event";
const SMOKE_EVENT_DESCRIPTION =
  "Deterministic submitted event used by the Epic 16 smoke test to validate college-admin approval flow.";
const REALTIME_SMOKE_EVENT_DESCRIPTION =
  "Deterministic published event used by the Epic 17 smoke test to validate realtime RSVP fan-out across open pages.";
const DEFAULT_SEED_DOMAIN = "students.college.edu";

function buildSeedEmail(localPart: string) {
  const primaryDomain =
    process.env.ALLOWED_DOMAINS
      ?.split(",")
      .map((domain) => domain.trim().toLowerCase())
      .find(Boolean) ?? DEFAULT_SEED_DOMAIN;

  return `${localPart}@${primaryDomain}`;
}

function assertLocalDatabase() {
  const databaseUrl = process.env.DATABASE_URL ?? "";
  const isLocalDatabase = /localhost|127\.0\.0\.1/.test(databaseUrl);

  if (process.env.NODE_ENV === "production" || !isLocalDatabase) {
    throw new Error("Refusing to bootstrap E2E smoke data outside a local/test database.");
  }
}

async function main() {
  assertLocalDatabase();

  const organizerEmail = buildSeedEmail("organizer.coding");
  const adminEmail = buildSeedEmail("admin.jecrc");
  const studentEmail = buildSeedEmail("student.1");

  const [organizer, admin, student, club] = await Promise.all([
    prisma.user.findUnique({ where: { email: organizerEmail } }),
    prisma.user.findUnique({ where: { email: adminEmail } }),
    prisma.user.findUnique({ where: { email: studentEmail } }),
    prisma.club.findFirst({ where: { name: "JECRC Coding Club" } }),
  ]);

  if (!organizer || !admin || !student || !club) {
    throw new Error("Seed data is missing. Run the local seed before bootstrapping Epic 16 smoke data.");
  }

  if (!organizer.collegeId || organizer.collegeId !== admin.collegeId || organizer.collegeId !== club.collegeId) {
    throw new Error("Seeded organizer/admin/club college scope is inconsistent.");
  }

  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 3);
  eventDate.setHours(18, 30, 0, 0);

  const registrationClosesAt = new Date();
  registrationClosesAt.setDate(registrationClosesAt.getDate() + 2);
  registrationClosesAt.setHours(18, 30, 0, 0);

  const existingEvent = await prisma.event.findFirst({
    where: {
      title: SMOKE_EVENT_TITLE,
      authorId: organizer.id,
      clubId: club.id,
    },
    select: { id: true },
  });

  const event = existingEvent
    ? await prisma.event.update({
        where: { id: existingEvent.id },
        data: {
          description: SMOKE_EVENT_DESCRIPTION,
          date: eventDate,
          registrationClosesAt,
          capacity: 120,
          location: "Innovation Lab, Block A",
          imageUrl:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
          status: "SUBMITTED",
          submittedAt: new Date(),
          cancelledAt: null,
          cancellationReason: null,
          collegeId: organizer.collegeId,
          category: "Technical",
          tags: ["qa", "approval"],
          domain: "Engineering",
          isFreeFood: false,
          hasCertificate: true,
          isPaid: false,
          targetBranches: ["Computer Science", "Information Technology"],
        },
        select: { id: true },
      })
    : await prisma.event.create({
        data: {
          title: SMOKE_EVENT_TITLE,
          description: SMOKE_EVENT_DESCRIPTION,
          date: eventDate,
          registrationClosesAt,
          capacity: 120,
          location: "Innovation Lab, Block A",
          imageUrl:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
          clubId: club.id,
          authorId: organizer.id,
          collegeId: organizer.collegeId,
          status: "SUBMITTED",
          submittedAt: new Date(),
          category: "Technical",
          tags: ["qa", "approval"],
          domain: "Engineering",
          isFreeFood: false,
          hasCertificate: true,
          isPaid: false,
          targetBranches: ["Computer Science", "Information Technology"],
        },
        select: { id: true },
      });

  await prisma.eventApprovalLog.deleteMany({
    where: { eventId: event.id },
  });

  const realtimeEventDate = new Date();
  realtimeEventDate.setDate(realtimeEventDate.getDate() + 4);
  realtimeEventDate.setHours(16, 0, 0, 0);

  const realtimeRegistrationClosesAt = new Date();
  realtimeRegistrationClosesAt.setDate(realtimeRegistrationClosesAt.getDate() + 3);
  realtimeRegistrationClosesAt.setHours(16, 0, 0, 0);

  const existingRealtimeEvent = await prisma.event.findFirst({
    where: {
      title: REALTIME_SMOKE_EVENT_TITLE,
      authorId: organizer.id,
      clubId: club.id,
    },
    select: { id: true },
  });

  const realtimeEvent = existingRealtimeEvent
    ? await prisma.event.update({
        where: { id: existingRealtimeEvent.id },
        data: {
          description: REALTIME_SMOKE_EVENT_DESCRIPTION,
          date: realtimeEventDate,
          registrationClosesAt: realtimeRegistrationClosesAt,
          capacity: 80,
          location: "Realtime Lab, Block B",
          imageUrl:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
          status: "PUBLISHED",
          submittedAt: null,
          cancelledAt: null,
          cancellationReason: null,
          collegeId: organizer.collegeId,
          category: "Technical",
          tags: ["realtime", "attendance"],
          domain: "Engineering",
          isFreeFood: true,
          hasCertificate: false,
          isPaid: false,
          targetBranches: ["Computer Science", "Information Technology"],
        },
        select: { id: true },
      })
    : await prisma.event.create({
        data: {
          title: REALTIME_SMOKE_EVENT_TITLE,
          description: REALTIME_SMOKE_EVENT_DESCRIPTION,
          date: realtimeEventDate,
          registrationClosesAt: realtimeRegistrationClosesAt,
          capacity: 80,
          location: "Realtime Lab, Block B",
          imageUrl:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
          clubId: club.id,
          authorId: organizer.id,
          collegeId: organizer.collegeId,
          status: "PUBLISHED",
          category: "Technical",
          tags: ["realtime", "attendance"],
          domain: "Engineering",
          isFreeFood: true,
          hasCertificate: false,
          isPaid: false,
          targetBranches: ["Computer Science", "Information Technology"],
        },
        select: { id: true },
      });

  await prisma.rSVP.deleteMany({
    where: {
      eventId: realtimeEvent.id,
    },
  });

  await prisma.savedEvent.deleteMany({
    where: {
      eventId: realtimeEvent.id,
      userId: student.id,
    },
  });

  console.log(`Bootstrapped Epic 16 smoke event ${event.id}: ${SMOKE_EVENT_TITLE}`);
  console.log(`Bootstrapped Epic 17 realtime event ${realtimeEvent.id}: ${REALTIME_SMOKE_EVENT_TITLE}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
