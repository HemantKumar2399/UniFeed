import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SEED_TEST_PASSWORD = "Test@1234";
const SALT_ROUNDS = 12;
const SEED_EMAIL_DOMAIN =
  process.env.ALLOWED_DOMAINS
    ?.split(",")
    .map((domain) => domain.trim().toLowerCase())
    .find(Boolean) ?? "students.college.edu";
const SEED_RESOURCE_BASE_URL = "https://campus.example";

const isLocalDatabase = /localhost|127\.0\.0\.1/.test(
  process.env.DATABASE_URL ?? "",
);

if (process.env.NODE_ENV === "production" || !isLocalDatabase) {
  throw new Error(
    "Refusing to run destructive seed outside local/non-production database.",
  );
}

type SeedClub = {
  name: string;
  logoUrl: string;
};

type SeedEventDraft = {
  clubName: string;
  title: string;
  description: string;
  dateOffsetDays: number;
  capacity: number;
  location: string;
  imageUrl: string;
};

type SeedHubBlock = {
  type: "TEXT" | "RESOURCE" | "FAQ";
  title: string | null;
  content: string;
  linkUrl: string | null;
};

function buildSeedEmail(localPart: string): string {
  return `${localPart}@${SEED_EMAIL_DOMAIN}`;
}

function buildSeedResourceUrl(path: string): string {
  const normalizedPath = path.replace(/^\/+/, "");
  return `${SEED_RESOURCE_BASE_URL}/${normalizedPath}`;
}

const clubs: SeedClub[] = [
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
];

const organizers = [
  { email: buildSeedEmail("organizer.coding"), name: "Aarav Sharma" },
  { email: buildSeedEmail("organizer.nss"), name: "Ananya Verma" },
  { email: buildSeedEmail("organizer.robotics"), name: "Ritik Jain" },
  { email: buildSeedEmail("organizer.ecell"), name: "Ishita Mehta" },
  { email: buildSeedEmail("organizer.cultural"), name: "Kavya Singh" },
] as const;

const students = [
  { email: buildSeedEmail("student.1"), name: "Rahul Gupta" },
  { email: buildSeedEmail("student.2"), name: "Priya Joshi" },
  { email: buildSeedEmail("student.3"), name: "Aditya Nair" },
  { email: buildSeedEmail("student.4"), name: "Sneha Kapoor" },
  { email: buildSeedEmail("student.5"), name: "Yash Malhotra" },
] as const;

const eventDrafts: SeedEventDraft[] = [
  {
    clubName: "JECRC Coding Club",
    title: "HackSprint: 6-Hour Build Jam",
    description:
      "Rapid prototyping challenge with mentor checkpoints and final demos.",
    dateOffsetDays: 2,
    capacity: 180,
    location: "Innovation Lab, Block A",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    clubName: "JECRC Coding Club",
    title: "Open Source Onboarding Day",
    description:
      "Hands-on workshop to make your first open source contribution.",
    dateOffsetDays: 5,
    capacity: 120,
    location: "Seminar Hall 2",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    clubName: "NSS JECRC",
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
    clubName: "Robotics Society",
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
    clubName: "E-Cell JECRC",
    title: "Startup Pitch Arena",
    description:
      "Three-minute founder pitches with jury feedback and networking.",
    dateOffsetDays: 10,
    capacity: 140,
    location: "Auditorium",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    clubName: "Cultural Committee",
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
    clubName: "E-Cell JECRC",
    title: "Founder AMA: Building from Zero",
    description:
      "Live Q&A with alumni founders on product, hiring, and growth.",
    dateOffsetDays: 15,
    capacity: 160,
    location: "Conference Room 1",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
  },
];

const clubBlocks: Record<string, SeedHubBlock[]> = {
  "JECRC Coding Club": [
    {
      type: "TEXT",
      title: "About the Club",
      content:
        "We help students build projects, contribute to open source, and prepare for hackathons.",
      linkUrl: null,
    },
    {
      type: "RESOURCE",
      title: "Starter Kit",
      content: "Roadmap, templates, and weekly challenge sheet for new members.",
      linkUrl: buildSeedResourceUrl("coding-club/starter-kit"),
    },
    {
      type: "FAQ",
      title: "Who can join?",
      content: "Any JECRC student can join. No prior coding background is required.",
      linkUrl: null,
    },
  ],
  "NSS JECRC": [
    {
      type: "TEXT",
      title: "Mission",
      content:
        "NSS JECRC runs social impact initiatives focused on service, health, and sustainability.",
      linkUrl: null,
    },
    {
      type: "RESOURCE",
      title: "Volunteer Handbook",
      content: "Volunteer SOP, safety checklist, and campaign calendar.",
      linkUrl: buildSeedResourceUrl("nss/handbook"),
    },
    {
      type: "FAQ",
      title: "Do volunteers get certificates?",
      content: "Yes, certificates are issued based on event participation and contribution hours.",
      linkUrl: null,
    },
  ],
  "Robotics Society": [
    {
      type: "TEXT",
      title: "Build With Us",
      content:
        "We build autonomous systems, compete in robotics events, and run practical hardware labs.",
      linkUrl: null,
    },
    {
      type: "RESOURCE",
      title: "Parts and Tooling Guide",
      content: "Recommended parts list and lab access instructions.",
      linkUrl: buildSeedResourceUrl("robotics/parts-guide"),
    },
    {
      type: "FAQ",
      title: "Do I need my own hardware?",
      content: "No. Club labs provide starter kits for core projects and workshops.",
      linkUrl: null,
    },
  ],
  "E-Cell JECRC": [
    {
      type: "TEXT",
      title: "What We Do",
      content:
        "E-Cell supports aspiring founders through mentorship, pitch reviews, and startup events.",
      linkUrl: null,
    },
    {
      type: "RESOURCE",
      title: "Pitch Deck Template",
      content: "Use this template for demo day and investor intro sessions.",
      linkUrl: buildSeedResourceUrl("ecell/pitch-template"),
    },
    {
      type: "FAQ",
      title: "Can first-year students pitch?",
      content: "Absolutely. We encourage all students to pitch ideas and get mentor feedback.",
      linkUrl: null,
    },
  ],
  "Cultural Committee": [
    {
      type: "TEXT",
      title: "Campus Culture",
      content:
        "We curate the major cultural experiences on campus from music and dance to arts festivals.",
      linkUrl: null,
    },
    {
      type: "RESOURCE",
      title: "Performance Sign-up",
      content: "Apply for solo or group performances for upcoming events.",
      linkUrl: buildSeedResourceUrl("cultural/performance-signup"),
    },
    {
      type: "FAQ",
      title: "Can we perform as a team?",
      content: "Yes, both solo and team performances are welcome for all major showcases.",
      linkUrl: null,
    },
  ],
};

async function upsertUser(input: {
  email: string;
  name: string;
  role: "STUDENT" | "ORGANIZER" | "ADMIN" | "SUPER_ADMIN";
  collegeId: string;
  passwordHash: string;
}) {
  return prisma.user.upsert({
    where: { email: input.email },
    update: {
      name: input.name,
      role: input.role,
      collegeId: input.collegeId,
      password: input.passwordHash,
    },
    create: {
      email: input.email,
      name: input.name,
      role: input.role,
      collegeId: input.collegeId,
      password: input.passwordHash,
    },
  });
}

async function main() {
  const passwordHash = await bcrypt.hash(SEED_TEST_PASSWORD, SALT_ROUNDS);

  // Clean existing records in correct order to avoid FK constraints
  await prisma.rSVP.deleteMany();
  await prisma.hubFollow.deleteMany();
  await prisma.hubBlock.deleteMany();
  await prisma.clubMembership.deleteMany();
  await prisma.eventDiscussionReply.deleteMany();
  await prisma.eventDiscussionThread.deleteMany();
  await prisma.event.deleteMany();
  await prisma.club.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.college.deleteMany();

  // Create colleges
  const jecrcCollege = await prisma.college.create({
    data: {
      name: "JECRC University",
      slug: "jecrc",
      emailDomains: ["jecrc.edu.in", "students.college.edu", SEED_EMAIL_DOMAIN],
      logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=256&q=80",
    },
  });

  const spuCollege = await prisma.college.create({
    data: {
      name: "Sankalchand Patel University",
      slug: "spu",
      emailDomains: ["spu.ac.in"],
      logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=256&q=80",
    },
  });

  const organizerUsers = await Promise.all(
    organizers.map((organizer) =>
      upsertUser({
        email: organizer.email,
        name: organizer.name,
        role: "ORGANIZER",
        collegeId: jecrcCollege.id,
        passwordHash,
      }),
    ),
  );

  const studentUsers = await Promise.all(
    students.map((student) =>
      upsertUser({
        email: student.email,
        name: student.name,
        role: "STUDENT",
        collegeId: jecrcCollege.id,
        passwordHash,
      }),
    ),
  );

  // Create StudentProfiles for student users
  await Promise.all(
    studentUsers.map((student, index) =>
      prisma.studentProfile.create({
        data: {
          userId: student.id,
          collegeId: jecrcCollege.id,
          prn: `20JECRC00${index + 1}`,
          branch: "Computer Science",
          course: "B.Tech",
          graduationYear: 2026,
          section: "A",
          phone: `987654321${index}`,
          isVerified: true,
          studentQrId: `qr_stud_${student.id}`,
        },
      })
    )
  );

  // Seed Admin and Super Admin users
  await upsertUser({
    email: "admin.jecrc@students.college.edu",
    name: "Admin User JECRC",
    role: "ADMIN",
    collegeId: jecrcCollege.id,
    passwordHash,
  });

  await upsertUser({
    email: "superadmin@students.college.edu",
    name: "Super Admin User",
    role: "SUPER_ADMIN",
    collegeId: jecrcCollege.id,
    passwordHash,
  });

  await prisma.$transaction(async (tx) => {
    const createdClubs = await Promise.all(
      clubs.map((club) => tx.club.create({
        data: {
          ...club,
          collegeId: jecrcCollege.id,
        }
      })),
    );

    const clubByName = new Map(createdClubs.map((club) => [club.name, club]));

    await Promise.all(
      createdClubs.map((club, index) =>
        tx.clubMembership.createMany({
          data: [
            {
              userId: organizerUsers[index]!.id,
              clubId: club.id,
              role: "OWNER",
            },
            {
              userId: organizerUsers[(index + 1) % organizerUsers.length]!.id,
              clubId: club.id,
              role: "EDITOR",
            },
          ],
        }),
      ),
    );

    const createdEvents = await Promise.all(
      eventDrafts.map((eventDraft, index) => {
        const club = clubByName.get(eventDraft.clubName);
        if (!club) {
          throw new Error(`Missing seeded club for event draft: ${eventDraft.clubName}`);
        }

        const ownerMembershipIndex = createdClubs.findIndex((item) => item.id === club.id);
        const author = organizerUsers[ownerMembershipIndex];
        if (!author) {
          throw new Error(`Missing organizer for club: ${eventDraft.clubName}`);
        }

        const date = new Date();
        date.setDate(date.getDate() + eventDraft.dateOffsetDays);
        date.setHours(17 + (index % 3), 30, 0, 0);

        const isEven = index % 2 === 0;

        return tx.event.create({
          data: {
            title: eventDraft.title,
            description: eventDraft.description,
            date,
            capacity: eventDraft.capacity,
            location: eventDraft.location,
            imageUrl: eventDraft.imageUrl,
            clubId: club.id,
            authorId: author.id,
            collegeId: jecrcCollege.id,
            status: "PUBLISHED",
            category: isEven ? "Technical" : "Cultural",
            tags: isEven ? ["coding", "workshop"] : ["dance", "music"],
            domain: isEven ? "Engineering" : "Arts",
            isFreeFood: isEven,
            hasCertificate: true,
            isPaid: !isEven,
            targetBranches: ["Computer Science", "Information Technology"],
          },
        });
      }),
    );

    await Promise.all(
      createdClubs.map(async (club) => {
        const blocks = clubBlocks[club.name] ?? [];

        if (blocks.length === 0) {
          return;
        }

        await tx.hubBlock.createMany({
          data: blocks.map((block, index) => ({
            clubId: club.id,
            type: block.type,
            title: block.title,
            content: block.content,
            linkUrl: block.linkUrl,
            position: index,
          })),
        });
      }),
    );

    await Promise.all(
      studentUsers.map((student, studentIndex) => {
        const followedClubIds = [
          createdClubs[studentIndex % createdClubs.length]!.id,
          createdClubs[(studentIndex + 2) % createdClubs.length]!.id,
        ];

        return tx.hubFollow.createMany({
          data: followedClubIds.map((clubId) => ({
            userId: student.id,
            clubId,
          })),
          skipDuplicates: true,
        });
      }),
    );

    await Promise.all(
      studentUsers.flatMap((student, studentIndex) => {
        const targetEvents = [
          createdEvents[studentIndex % createdEvents.length],
          createdEvents[(studentIndex + 3) % createdEvents.length],
        ].filter((event): event is NonNullable<typeof event> => Boolean(event));

        return targetEvents.map((event) =>
          tx.rSVP.create({
            data: {
              userId: student.id,
              eventId: event.id,
              status: "GOING",
            },
          }),
        );
      }),
    );
  });

  const [totalClubs, totalEvents, totalBlocks, totalMemberships, totalFollows, totalRsvps, totalColleges, totalProfiles] = await Promise.all([
    prisma.club.count(),
    prisma.event.count(),
    prisma.hubBlock.count(),
    prisma.clubMembership.count(),
    prisma.hubFollow.count(),
    prisma.rSVP.count(),
    prisma.college.count(),
    prisma.studentProfile.count(),
  ]);

  console.log(
    `Seed completed: colleges=${totalColleges}, studentProfiles=${totalProfiles}, clubs=${totalClubs}, events=${totalEvents}, hubBlocks=${totalBlocks}, memberships=${totalMemberships}, follows=${totalFollows}, rsvps=${totalRsvps}`,
  );
  console.log(`Seed login password for all seeded users: ${SEED_TEST_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
