import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { AdminControls } from "./AdminControls";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Guard: Authenticated and must be ADMIN or SUPER_ADMIN
  if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role;
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  const collegeId = session.user.collegeId;
  if (!collegeId) {
    redirect("/unauthorized");
  }

  // Fetch the current college information
  const college = await db.college.findUnique({
    where: { id: collegeId },
  });

  if (!college) {
    redirect("/unauthorized");
  }

  // Fetch all users belonging to this college
  const users = await db.user.findMany({
    where: { collegeId },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  // Fetch all clubs belonging to this college
  const clubs = await db.club.findMany({
    where: { collegeId },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="min-h-screen bg-[#f6f5f4] text-[rgba(0,0,0,0.95)] selection:bg-[#0075de]/20 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 inset-x-0 h-16 border-b border-black/5 bg-white/80 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/home">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="w-8 h-8 rounded-lg bg-[#dd5b00] text-white font-bold flex items-center justify-center text-sm shadow-[0_2px_4px_rgba(221,91,0,0.3)]">
            A
          </div>
          <span className="font-bold tracking-tight text-[18px]">College Admin Panel</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-[#615d59]">
          <span>Logged in as: <span className="text-black/95">{session.user.name || session.user.email}</span></span>
          <span className="px-2 py-0.5 rounded-full border bg-red-50 text-red-700 border-red-100 uppercase tracking-wide">
            {role}
          </span>
        </div>
      </header>

      {/* Main Admin Dashboard Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:px-12 space-y-12">
        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-semibold text-[#a39e98] uppercase tracking-wider">
            Governance & Scopes
          </p>
          <h1 className="text-[36px] md:text-[44px] font-bold text-black/95 tracking-[-1.5px] leading-[1.1]">
            {college.name}
          </h1>
          <p className="text-sm md:text-base text-[#615d59] font-medium leading-relaxed max-w-3xl">
            Welcome to the college administration command hub. Manage local user roles, elevate student accounts to event organizers, and map permissions across verified clubs in the college domain boundary.
          </p>
        </div>

        {/* Render interactive admin forms & listings */}
        <AdminControls
          initialUsers={users as any}
          clubs={clubs}
        />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-black/5 py-8 text-center text-xs text-[#a39e98]">
        &copy; 2026 Campus Platform Inc. All rights reserved. Scoped to {college.name}.
      </footer>
    </div>
  );
}
