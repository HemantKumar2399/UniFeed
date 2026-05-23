import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, CalendarClock, CheckCircle2, FileStack, Library, Plus, Settings, UserCog, Users } from "lucide-react";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { AdminControls } from "./AdminControls";

const routeCards = [
  {
    title: "Pending Reviews",
    href: "/admin/events",
    description: "Open the approval queue for submitted events waiting on college admin review.",
    icon: CalendarClock,
  },
  {
    title: "Organizer Events",
    href: "/dashboard/events",
    description: "Switch to the organizer event list to inspect status changes after review decisions.",
    icon: FileStack,
  },
  {
    title: "Create Event",
    href: "/dashboard/events/new",
    description: "Use the organizer flow to create a fresh draft and test the review lifecycle end to end.",
    icon: Plus,
  },
  {
    title: "Community Hubs",
    href: "/dashboard/hubs",
    description: "Inspect community hub surfaces and owner/editor management without leaving the dashboard.",
    icon: Library,
  },
  {
    title: "Dashboard Settings",
    href: "/dashboard/settings",
    description: "Reach shared account settings and admin entry points for related organizer tools.",
    icon: Settings,
  },
] as const;

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  const collegeId = session.user.collegeId;
  if (!collegeId) {
    redirect("/unauthorized");
  }

  const [users, clubs, clubMemberships, totalEvents, submittedEvents, approvedEvents, publishedEvents] =
    await Promise.all([
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
        where: { collegeId, status: "SUBMITTED" },
      }),
      db.event.count({
        where: { collegeId, status: "APPROVED" },
      }),
      db.event.count({
        where: { collegeId, status: "PUBLISHED" },
      }),
    ]);

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
    <div className="flex flex-col gap-10">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
              {route.href === "/admin/events" ? (
                <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/75">
                  {submittedEvents} queued
                </span>
              ) : null}
            </div>
            <h2 className="mt-5 text-[18px] font-bold tracking-tight text-black/95 transition-colors group-hover:text-[#097fe8]">
              {route.title}
            </h2>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#615d59]">{route.description}</p>
          </Link>
        ))}
      </section>

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
            {clubsWithOwners} communities have an owner. {clubsWithoutOwners} still need ownership mapped.
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
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Workflow</p>
              <p className="text-[28px] font-bold tracking-tight text-black/95">{totalEvents}</p>
            </div>
          </div>
          <p className="mt-4 text-[13px] font-medium leading-relaxed text-[#615d59]">
            {submittedEvents} submitted, {approvedEvents} approved, {publishedEvents} published across {routedClubs} active communities.
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
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Epic 4 Workflow</p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-black/95">1. Organizer submits draft</h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#615d59]">
                  Draft events move into the submitted queue and stay invisible to students while waiting for review.
                </p>
              </div>
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-black/95">2. Admin approves or rejects</h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#615d59]">
                  Rejection requires a reason. Approval moves the event into an approved holding state rather than publishing it immediately.
                </p>
              </div>
              <div>
                <h3 className="text-[16px] font-bold tracking-tight text-black/95">3. Organizer publishes approved event</h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-[#615d59]">
                  Only approved events can go live, which keeps student-facing feeds aligned with the college review flow.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#a39e98]">Immediate Attention</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
                <p className="text-[13px] font-semibold text-black/95">Submitted events waiting now</p>
                <p className="mt-1 text-[13px] font-medium text-[#615d59]">{submittedEvents}</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
                <p className="text-[13px] font-semibold text-black/95">Communities without owners</p>
                <p className="mt-1 text-[13px] font-medium text-[#615d59]">{clubsWithoutOwners}</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#f6f5f4] px-4 py-3">
                <p className="text-[13px] font-semibold text-black/95">Approved but not live yet</p>
                <p className="mt-1 text-[13px] font-medium text-[#615d59]">{approvedEvents}</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
