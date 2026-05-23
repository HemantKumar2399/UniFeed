import { redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { AdminShell } from "./AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const collegeId = session.user.collegeId;
  if (!collegeId) {
    redirect("/unauthorized");
  }

  const [college, pendingReviewCount] = await Promise.all([
    db.college.findUnique({
      where: { id: collegeId },
      select: { id: true, name: true },
    }),
    db.event.count({
      where: {
        collegeId,
        status: "SUBMITTED",
      },
    }),
  ]);

  if (!college) {
    redirect("/unauthorized");
  }

  return (
    <AdminShell
      collegeName={college.name}
      pendingReviewCount={pendingReviewCount}
      userName={session.user.name ?? session.user.email ?? "Administrator"}
      userRole={session.user.role}
    >
      {children}
    </AdminShell>
  );
}
