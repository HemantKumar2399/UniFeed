import { redirect } from "next/navigation";

import { EventEditor } from "@/features/events/components/EventEditor";
import { auth } from "@/server/auth";

export default async function NewEventPage() {
  const session = await auth();

  const role = session?.user?.role;
  if (role !== "ORGANIZER" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return <EventEditor mode="create" />;
}
