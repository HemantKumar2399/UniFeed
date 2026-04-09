import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { BottomNav } from "@/components/navigation/BottomNav";

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
    <div className="relative min-h-screen w-full mx-auto max-w-md pb-20 overscroll-y-none">
      <main className="min-h-[calc(100vh-80px)]">{children}</main>
      <BottomNav />
    </div>
  );
}
