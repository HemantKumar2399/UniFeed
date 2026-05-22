import { redirect } from "next/navigation";

import { BlockEditor } from "@/components/BlockEditor";
import { auth } from "@/server/auth";

export default async function NewEventPage() {
  const session = await auth();

  const role = session?.user?.role;
  if (role !== "ORGANIZER" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return <BlockEditor />;
}
