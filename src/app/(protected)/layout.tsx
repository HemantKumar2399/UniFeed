import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { PremiumStudentShell } from "@/components/layout/premium/PremiumStudentShell";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  if (session.user.role === "STUDENT") {
    const profile = await db.studentProfile.findUnique({
      where: { userId: session.user.id },
    });
    if (!profile) {
      redirect("/onboarding");
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f5f4] text-[rgba(0,0,0,0.95)] w-full overflow-x-hidden antialiased">
      <PremiumStudentShell userName={session.user.name} userRole={session.user.role}>
        {children}
      </PremiumStudentShell>
    </div>
  );
}
