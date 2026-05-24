import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getEventIdByTitle(title: string) {
  const event = await prisma.event.findFirst({
    where: { title },
    select: { id: true },
  });

  if (!event) {
    throw new Error(`Could not find event with title "${title}".`);
  }

  return event.id;
}
