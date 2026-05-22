import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.findUnique({
    where: { email: "admin.jecrc@students.college.edu" }
  });
  if (!user) {
    console.log("User not found!");
    return;
  }
  
  console.log("Password hash in DB:", user.password);
  
  const matches = await bcrypt.compare("Test@1234", user.password || "");
  console.log("Password matches 'Test@1234'?", matches);
  
  await prisma.$disconnect();
}

run().catch(console.error);
