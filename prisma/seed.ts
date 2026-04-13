import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const isLocalDatabase = /localhost|127\.0\.0\.1/.test(
  process.env.DATABASE_URL ?? "",
);

if (process.env.NODE_ENV === "production" || !isLocalDatabase) {
  throw new Error(
    "Refusing to run destructive seed outside local/non-production database.",
  );
}

const clubs = [
  {
    name: "JECRC Coding Club",
    logoUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "NSS JECRC",
    logoUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Robotics Society",
    logoUrl:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "E-Cell JECRC",
    logoUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Cultural Committee",
    logoUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=256&q=80",
  },
] as const;

const eventDrafts = [
  {
    title: "HackSprint: 6-Hour Build Jam",
    description:
      "Rapid prototyping challenge for first-year to final-year students with mentor checkpoints.",
    dateOffsetDays: 2,
    capacity: 180,
    location: "Innovation Lab, Block A",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Open Source Onboarding Day",
    description:
      "Hands-on workshop to make your first open source contribution with maintainers.",
    dateOffsetDays: 4,
    capacity: 120,
    location: "Seminar Hall 2",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "NSS Blood Donation Drive",
    description:
      "Campus-wide blood donation camp in collaboration with local hospitals.",
    dateOffsetDays: 6,
    capacity: 250,
    location: "Main Atrium",
    imageUrl:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Line Follower Bot Challenge",
    description:
      "Design and race autonomous bots on a timed obstacle track.",
    dateOffsetDays: 8,
    capacity: 90,
    location: "Mechanical Workshop",
    imageUrl:
      "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Startup Pitch Arena",
    description:
      "3-minute founder pitches with jury feedback and networking.",
    dateOffsetDays: 10,
    capacity: 140,
    location: "Auditorium",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Garba Night: Campus Edition",
    description:
      "Traditional dance night with DJ fusion and student performances.",
    dateOffsetDays: 12,
    capacity: 300,
    location: "Sports Ground",
    imageUrl:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Resume Clinic for Internships",
    description:
      "One-on-one resume and LinkedIn review sessions by senior mentors.",
    dateOffsetDays: 14,
    capacity: 110,
    location: "Career Cell",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "AI for Beginners Bootcamp",
    description:
      "Introductory AI workshop covering practical tools and fundamentals.",
    dateOffsetDays: 16,
    capacity: 200,
    location: "Block C Smart Classroom",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Community Clean-Up Marathon",
    description:
      "Volunteer campaign across campus zones with impact leaderboard.",
    dateOffsetDays: 18,
    capacity: 220,
    location: "North Gate Assembly Point",
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Founder AMA: Building from Zero",
    description:
      "Live Q&A with alumni founders on product, hiring, and growth.",
    dateOffsetDays: 20,
    capacity: 160,
    location: "Conference Room 1",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.event.deleteMany();
    await tx.club.deleteMany();

    const createdClubs = await Promise.all(
      clubs.map((club) => tx.club.create({ data: club })),
    );

    // Find or create an admin user for the seeded events
    const adminUser = await tx.user.upsert({
      where: { email: "admin@university.edu" },
      update: {},
      create: {
        email: "admin@university.edu",
        name: "Admin User",
        // Setting a dummy password or leaving it null is fine for seeding if not testing auth
        password: "hashed_password_here" 
      }
    });

    await Promise.all(
      eventDrafts.map((event, index) => {
        const club = createdClubs[index % createdClubs.length];
        const date = new Date();
        date.setDate(date.getDate() + event.dateOffsetDays);
        date.setHours(17 + (index % 3), 30, 0, 0);

        return tx.event.create({
          data: {
            title: event.title,
            description: event.description,
            date,
            capacity: event.capacity,
            location: event.location,
            imageUrl: event.imageUrl,
            clubId: club!.id,
            authorId: adminUser.id, // Add authorId here
          },
        });
      }),
    );
  });

  const totalEvents = await prisma.event.count();
  const totalClubs = await prisma.club.count();
  console.log(`Seed completed: ${totalEvents} events across ${totalClubs} clubs`);
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
