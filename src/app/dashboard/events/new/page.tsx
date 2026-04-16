import { redirect } from "next/navigation";

import { BlockEditor } from "@/components/BlockEditor";
import { auth } from "@/server/auth";

export default async function NewEventPage() {
  const session = await auth();

  if (session?.user?.role !== "ORGANIZER") {
    redirect("/unauthorized");
  }

  return <BlockEditor />;
}
