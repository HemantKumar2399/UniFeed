import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import {
  BottomNav,
  DesktopSidebarNav,
} from "@/components/navigation/BottomNav";
import { MobileHeader } from "@/components/navigation/MobileHeader";
import { CommandMenu } from "@/components/CommandMenu";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-warm-white text-notion-black">
      <CommandMenu />
      <MobileHeader />
      {/* 3-column layout constraints: Sidebar Nav, Central Feed max-w-lg, Right Panel on > 1024px (lg) */}
      <div className="mx-auto flex w-full max-w-7xl justify-center gap-6 px-4 md:px-6 lg:gap-8 lg:px-8">
        {/* Left Sidebar overrides: show on md */}
        <DesktopSidebarNav className="hidden md:flex" />

        {/* Central Feed locked to max-w-lg */}
        <div className="relative w-full max-w-md pb-20 md:pb-0 md:max-w-lg">    
          <main className="min-h-[calc(100vh-[56px])] md:min-h-screen">{children}</main>
          <BottomNav />
        </div>

        {/* Right Contextual/Analytics Panel */}
        <aside className="hidden lg:block lg:w-[320px] lg:pt-8 xl:w-[320px]">
          <div className="card-surface p-5">
            <h2 className="text-sm font-bold uppercase text-warm-gray-500 tracking-badge">
              Campus Snapshot
            </h2>
            <p className="mt-3 text-sm leading-6 text-warm-gray-500">
              Desktop mode is optimized for scanning updates quickly. Use the left
              navigation to switch views while keeping your main feed centered.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
