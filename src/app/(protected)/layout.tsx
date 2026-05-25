import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { PremiumStudentShell } from "@/components/layout/premium/PremiumStudentShell";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role === "ADMIN") {
    redirect("/dashboard");
  }

  if (session.user.role === "ORGANIZER") {
    redirect("/dashboard");
  }

  if (session.user.role !== "STUDENT") {
    redirect("/login");
  }

  const profile = await db.studentProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (!profile) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-app-bg text-foreground w-full overflow-x-hidden antialiased transition-colors duration-300">
      <PremiumStudentShell userName={session.user.name} userRole={session.user.role}>
        {children}
      </PremiumStudentShell>
    </div>
  );
}
