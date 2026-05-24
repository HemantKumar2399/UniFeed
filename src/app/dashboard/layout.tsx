import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { PremiumOrganizerShell } from "@/components/layout/premium/PremiumOrganizerShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const role = session.user.role;
  if (role !== "ORGANIZER" && role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen bg-warm-white text-notion-black overflow-x-hidden antialiased">
      <PremiumOrganizerShell userName={session.user.name} userRole={session.user.role}>
        {children}
      </PremiumOrganizerShell>
    </div>
  );
}
