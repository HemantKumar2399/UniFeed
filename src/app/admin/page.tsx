import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  LayoutDashboard,
  Library,
  Plus,
  Settings,
  ShieldCheck,
  Users,
  UserCog,
  Building2,
  FileStack,
} from "lucide-react";

import { SignOutForm } from "@/components/SignOutForm";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { AdminControls } from "./AdminControls";

const routeCards = [
  {
    title: "Organizer Overview",
    href: "/dashboard",
    description: "Open the main command surface used for daily operations and status checks.",
    icon: LayoutDashboard,
  },
  {
    title: "Events Dashboard",
    href: "/dashboard/events",
    description: "Review drafts, published events, and event-specific management actions.",
    icon: CalendarDays,
  },
  {
    title: "Create Event",
    href: "/dashboard/events/new",
    description: "Start a new college-scoped event draft with an explicit community selection.",
    icon: Plus,
  },
  {
    title: "Community Hubs",
    href: "/dashboard/hubs",
    description: "Inspect community hub content and owner/editor management surfaces.",
    icon: Library,
  },
  {
    title: "Dashboard Settings",
    href: "/dashboard/settings",
    description: "Reach account settings and other shared organizer configuration screens.",
    icon: Settings,
  },
];

export default async function AdminDashboardPage() {
  const session = await auth();

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

  const [college, users, clubs, clubMemberships, totalEvents, draftEvents, publishedEvents] = await Promise.all([
    db.college.findUnique({
      where: { id: collegeId },
    }),
    db.user.findMany({
      where: { collegeId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    }),
    db.club.findMany({
      where: { collegeId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        members: {
          select: {
            role: true,
          },
        },
        _count: {
          select: {
            events: true,
            members: true,
          },
        },
      },
    }),
    db.clubMembership.findMany({
      where: {
        club: {
          collegeId,
        },
      },
      select: {
        role: true,
      },
    }),
    db.event.count({
      where: { collegeId },
    }),
    db.event.count({
      where: { collegeId, status: "DRAFT" },
    }),
    db.event.count({
      where: { collegeId, status: "PUBLISHED" },
    }),
  ]);

  if (!college) {
    redirect("/unauthorized");
  }

  const roleCounts = users.reduce<Record<"STUDENT" | "ORGANIZER" | "ADMIN" | "SUPER_ADMIN", number>>(
    (acc, user) => {
      acc[user.role] += 1;
      return acc;
    },
    {
      STUDENT: 0,
      ORGANIZER: 0,
      ADMIN: 0,
      SUPER_ADMIN: 0,
    },
  );

  const ownerAssignments = clubMemberships.filter((membership) => membership.role === "OWNER").length;
  const editorAssignments = clubMemberships.filter((membership) => membership.role === "EDITOR").length;
  const clubsWithOwners = clubs.filter((club) => club.members.some((member) => member.role === "OWNER")).length;
  const clubsWithoutOwners = clubs.length - clubsWithOwners;
  const routedClubs = clubs.filter((club) => club._count.events > 0).length;

  return (
    <div className="min-h-screen bg-[#f6f5f4] text-[rgba(0,0,0,0.95)] selection:bg-[#0075de]/20 font-sans">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-5 lg:px-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <Link
                href="/dashboard"
                className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white text-black/85 shadow-sm transition-colors hover:bg-black/5"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#097fe8]/15 bg-[#f2f9ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#097fe8]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  College Admin Control Center
                </div>
                <div>
                  <h1 className="text-[34px] font-bold tracking-[-1.2px] text-black/95 md:text-[42px]">
                    {college.name}
                  </h1>
                  <p className="mt-2 max-w-3xl text-[15px] font-medium leading-relaxed text-[#615d59] md:text-[16px]">
                    Every admin route is surfaced here so you can move between college operations, event tools,
                    community ownership, and organizer workflows without manually typing URLs.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Signed in as</p>
                <p className="mt-1 text-[14px] font-semibold text-black/95">
                  {session.user.name ?? session.user.email}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dd5b00]">
                  {role.replace("_", " ")}
                </p>
              </div>
              <SignOutForm className="inline-flex h-10 items-center justify-center rounded-2xl border border-black/10 bg-white px-5 text-[15px] font-semibold text-black/90 transition-colors hover:bg-black/5">
                Sign Out
              </SignOutForm>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {routeCards.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="group rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#097fe8]/20 hover:shadow-[0_18px_40px_rgba(0,0,0,0.07)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-2xl bg-[#f2f9ff] p-3 text-[#097fe8]">
                    <route.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a39e98]">
                    Open
                  </span>
                </div>
                <h2 className="mt-5 text-[18px] font-bold tracking-tight text-black/95 transition-colors group-hover:text-[#097fe8]">
                  {route.title}
                </h2>
                <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#615d59]">
                  {route.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 lg:px-12">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#f2f9ff] p-3 text-[#097fe8]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">People</p>
                <p className="text-[28px] font-bold tracking-tight text-black/95">{users.length}</p>
              </div>
            </div>
            <p className="mt-4 text-[13px] font-medium leading-relaxed text-[#615d59]">
              {roleCounts.STUDENT} students, {roleCounts.ORGANIZER} organizers, and {roleCounts.ADMIN + roleCounts.SUPER_ADMIN} admins inside this college scope.
            </p>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#f2f9ff] p-3 text-[#097fe8]">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Communities</p>
                <p className="text-[28px] font-bold tracking-tight text-black/95">{clubs.length}</p>
              </div>
            </div>
            <p className="mt-4 text-[13px] font-medium leading-relaxed text-[#615d59]">
              {clubsWithOwners} communities have at least one owner assigned. {clubsWithoutOwners} still need an owner mapping.
            </p>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#f2f9ff] p-3 text-[#097fe8]">
                <UserCog className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Assignments</p>
                <p className="text-[28px] font-bold tracking-tight text-black/95">{clubMemberships.length}</p>
              </div>
            </div>
            <p className="mt-4 text-[13px] font-medium leading-relaxed text-[#615d59]">
              {ownerAssignments} owner assignments and {editorAssignments} editor assignments are active across your clubs.
            </p>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#f2f9ff] p-3 text-[#097fe8]">
                <FileStack className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Events</p>
                <p className="text-[28px] font-bold tracking-tight text-black/95">{totalEvents}</p>
              </div>
            </div>
            <p className="mt-4 text-[13px] font-medium leading-relaxed text-[#615d59]">
              {draftEvents} drafts, {publishedEvents} published events, and {routedClubs} communities already routing activity through events.
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="rounded-[32px] border border-black/10 bg-white/70 p-3 shadow-[0_18px_44px_rgba(0,0,0,0.04)]">
            <AdminControls
              initialUsers={users}
              clubs={clubs.map((club) => ({
                id: club.id,
                name: club.name,
                memberCount: club._count.members,
                eventCount: club._count.events,
              }))}
            />
          </div>

          <aside className="space-y-5">
            <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">How To Use This Page</p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-[16px] font-bold tracking-tight text-black/95">1. Set the right roles</h3>
                  <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#615d59]">
                    Promote students to organizers first, then grant community ownership or editor access only where needed.
                  </p>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold tracking-tight text-black/95">2. Map communities to people</h3>
                  <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#615d59]">
                    Every active club should have at least one owner so event and hub management can work without author-only bottlenecks.
                  </p>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold tracking-tight text-black/95">3. Jump directly into execution</h3>
                  <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#615d59]">
                    Use the quick route cards above to move into events, hubs, or shared dashboard settings right after an admin change.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Immediate Attention</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
                  <p className="text-[13px] font-semibold text-black/95">Communities without owners</p>
                  <p className="mt-1 text-[13px] font-medium text-[#615d59]">{clubsWithoutOwners}</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
                  <p className="text-[13px] font-semibold text-black/95">Organizers available for assignment</p>
                  <p className="mt-1 text-[13px] font-medium text-[#615d59]">
                    {roleCounts.ORGANIZER + roleCounts.ADMIN + roleCounts.SUPER_ADMIN}
                  </p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
                  <p className="text-[13px] font-semibold text-black/95">Draft events waiting in the pipeline</p>
                  <p className="mt-1 text-[13px] font-medium text-[#615d59]">{draftEvents}</p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
