import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { OnboardingForm } from "./OnboardingForm";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Only STUDENT role needs to onboarding
  if (session.user.role !== "STUDENT") {
    redirect("/home");
  }

  // Fetch the user and their college information
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      college: true,
      studentProfile: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // If the student already completed their profile, redirect to home
  if (user.studentProfile) {
    redirect("/home");
  }

  return (
    <main className="min-h-screen bg-[var(--color-warm-white)] text-[var(--color-notion-black)] flex flex-col items-center justify-center p-4 sm:p-8 antialiased selection:bg-[var(--color-badge-bg)] selection:text-[var(--color-notion-blue)]">
      
      {/* Sleek Floating Header / Brand Logo */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-12 flex items-center">
        <span className="text-[20px] font-bold tracking-tight text-[var(--color-notion-black)] flex items-center gap-2">
          ⚡ UniFeed
        </span>
      </div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <OnboardingForm userName={user.name} collegeName={user.college.name} />
      </div>
      
      {/* Subtle Footer */}
      <div className="absolute bottom-6 text-center text-sm font-medium text-[var(--color-warm-gray-300)]">
        &copy; {new Date().getFullYear()} Campus Platform Inc.
      </div>
    </main>
  );
}
