import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { Sidebar } from "@/components/navigation/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If we don't have a session, or not an organizer, redirect
  // Middleware should technically catch this first, but defense-in-depth UI protection.
  if (session?.user?.role !== "ORGANIZER") {
    redirect("/unauthorized");
  }

  // Dashboard Expansion Layout
  // UX-DR-4: 3-column responsive flex or grid architecture.
  // Using 3 columns for desktop (left nav, main wide content, optional right panel for future context if needed)
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex w-full gap-6 px-4 md:px-6 lg:gap-8 lg:px-8 xl:grid xl:grid-cols-[250px_1fr_300px]">
        {/* Left Sidebar */}
        <Sidebar className="hidden xl:block" />

        {/* Center Canvas / Content Area */}
        <main className="min-h-[calc(100vh-80px)] w-full py-8 md:min-h-screen">
          {children}
        </main>
        
        {/* Right contextual panel stub (to satisfy 3-column architecture requirement from PRD/AC) */}
        <aside className="hidden xl:block xl:pt-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-400">
              Organizer Panel
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Additional organizer context can be placed here in future updates.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}