import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import {
  BottomNav,
  DesktopSidebarNav,
} from "@/components/navigation/BottomNav";
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
    <div className="min-h-screen bg-black text-white">
      <CommandMenu />
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 md:px-6 lg:gap-8 lg:px-8">
        <DesktopSidebarNav />

        <div className="relative w-full max-w-md pb-20 md:max-w-2xl md:pb-0">
          <main className="min-h-[calc(100vh-80px)] md:min-h-screen">{children}</main>
          <BottomNav />
        </div>

        <aside className="hidden xl:block xl:w-[320px] xl:pt-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-400">
              Campus Snapshot
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Desktop mode is optimized for scanning updates quickly. Use the left
              navigation to switch views while keeping your main feed centered.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
