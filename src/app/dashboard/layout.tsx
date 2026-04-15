import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { Sidebar } from "@/components/navigation/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user?.role !== "ORGANIZER") {
    redirect("/unauthorized");
  }

  // Dashboard Expansion Layout
  // UX-DR-4: 3-column responsive flex or grid architecture.
  return (
    <div className="min-h-screen bg-warm-white text-notion-black">
      <div className="mx-auto flex w-full gap-6 px-4 lg:grid lg:grid-cols-[240px_1fr_300px] lg:gap-8 lg:px-8">
        {/* Left Sidebar */}
        <Sidebar className="hidden lg:flex" />

        {/* Center Canvas / Content Area locked to max width internally or letting it breath if 3 cols */}
        <main className="min-h-[calc(100vh-56px)] mx-auto w-full max-w-3xl py-8 lg:min-h-screen lg:max-w-full">
          {children}
        </main>
        
        {/* Right contextual panel stub */}
        <aside className="hidden pt-8 lg:block">
          <div className="card-surface p-5">
            <h2 className="text-sm font-bold uppercase tracking-badge text-warm-gray-500">
              Organizer Panel
            </h2>
            <p className="mt-3 text-sm leading-6 text-warm-gray-500">
              Additional organizer context can be placed here in future updates.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}