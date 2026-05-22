import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function run() {
  console.log("Querying database...");
  const user = await prisma.user.findUnique({
    where: { email: "admin.jecrc@students.college.edu" },
    include: { college: true }
  });
  console.log("User details:", JSON.stringify(user, null, 2));

  const allUsers = await prisma.user.findMany({
    select: {
      email: true,
      role: true,
      college: { select: { name: true } }
    }
  });
  console.log("All users in DB:", allUsers);
  
  await prisma.$disconnect();
}

run().catch((err) => {
  console.error("Error querying database:", err);
});
