import { auth } from "@/server/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SignOutButton } from "./SignOutButton";
import { TicketTabs } from "./TicketTabs";
import { ThemeToggle } from "./ThemeToggle";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <main className="flex flex-col items-center py-10 px-4 w-full max-w-md mx-auto">
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border border-zinc-200">
        <Image 
          src={user.image ?? "https://github.com/shadcn.png"} 
          alt={user.name ?? "User avatar"} 
          fill
          className="object-cover"
        />
      </div>
      
      <h1 className="text-xl font-bold text-zinc-900 mb-1">{user.name}</h1>
      <p className="text-zinc-600 text-sm mb-6">{user.email}</p>

      <TicketTabs />

      <div className="w-full mt-10 space-y-4">
        <ThemeToggle />
        <SignOutButton />
      </div>
    </main>
  );
}
