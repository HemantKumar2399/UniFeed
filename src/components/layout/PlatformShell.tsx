"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Bell,
  Search,
  Home,
  Compass,
  Building2,
  Ticket,
  User,
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  Settings,
  ShieldCheck,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { api } from "@/trpc/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SignOutForm } from "@/components/SignOutForm";
import { PLATFORM_TIME_ZONE } from "@/lib/platform-date";

const studentLinks = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Discover", href: "/discover", icon: Compass },
  { name: "Passport", href: "/passport", icon: Ticket },
  { name: "Hubs", href: "/hubs", icon: Building2 },
  { name: "Profile", href: "/profile", icon: User },
];
const organizerLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Events", href: "/dashboard/events", icon: CalendarDays },
  { name: "Hubs", href: "/dashboard/hubs", icon: Building2 },
  { name: "Metrics", href: "/dashboard/metrics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function PlatformShell({
  children,
  userName,
  userRole = "STUDENT",
  mode,
}: {
  children: ReactNode;
  userName?: string | null;
  userRole?: string;
  mode: "student" | "organizer";
}) {
  const pathname = usePathname();
  const organizer = mode === "organizer";
  const links = organizer ? organizerLinks : studentLinks;
  const notificationHref = organizer
    ? "/dashboard/notifications"
    : "/notifications";
  const { data: unreadCount } = api.notification.getUnreadCount.useQuery(
    undefined,
    { refetchInterval: 30000 },
  );
  const active = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  const trimmedName = userName?.trim() ?? "";
  const displayName =
    trimmedName.length > 0 ? trimmedName : organizer ? "Organizer" : "Student";
  const title =
    links.find((item) => active(item.href))?.name ?? "Notifications";

  return (
    <div className="bg-app-bg text-foreground min-h-dvh">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <aside className="border-border bg-card-bg fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r px-5 py-7 lg:flex">
        <Link
          href={organizer ? "/dashboard" : "/home"}
          aria-label="UniFeed home"
          className="flex items-center gap-3 rounded-lg"
        >
          <span className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl text-lg font-extrabold">
            u.
          </span>
          <div>
            <span className="font-display text-xl font-bold tracking-tight">
              UniFeed
            </span>
            <p className="text-muted-foreground text-xs">
              {organizer ? "Organizer workspace" : "Your campus, connected"}
            </p>
          </div>
        </Link>
        {organizer ? (
          <Link
            href="/dashboard/events/new"
            className="bg-primary text-primary-foreground mt-8 flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-semibold"
          >
            Create event <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/search"
            className="border-input bg-app-bg text-muted-foreground mt-8 flex min-h-11 items-center gap-3 rounded-xl border px-3 text-sm"
          >
            <Search className="h-4 w-4" />
            Search events
          </Link>
        )}
        <nav
          aria-label="Main navigation"
          className="mt-7 flex flex-1 flex-col gap-1.5"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm transition-colors ${active(item.href) ? "bg-brand-surface text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <item.icon className="h-[19px] w-[19px]" />
              {item.name}
            </Link>
          ))}
          <Link
            href={notificationHref}
            aria-current={active(notificationHref) ? "page" : undefined}
            className="text-muted-foreground hover:bg-muted mt-3 flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm"
          >
            <Bell className="h-[19px] w-[19px]" />
            Notifications
            {Boolean(unreadCount) && (
              <span className="bg-primary text-primary-foreground ml-auto rounded-full px-2 py-0.5 text-xs">
                {unreadCount}
              </span>
            )}
          </Link>
          {userRole === "ADMIN" && (
            <Link
              href="/admin"
              className="text-muted-foreground hover:bg-muted flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm"
            >
              <ShieldCheck className="h-[19px] w-[19px]" />
              College admin
            </Link>
          )}
        </nav>
        <div className="border-border mt-6 border-t pt-5">
          <p className="truncate text-sm font-semibold">{displayName}</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-muted-foreground text-xs capitalize">
              {userRole.toLowerCase()}
            </p>
            <ThemeToggle />
          </div>
          <SignOutForm className="text-muted-foreground hover:text-foreground mt-3 flex min-h-11 w-full items-center gap-2 rounded-lg text-xs">
            <LogOut className="h-4 w-4" />
            Sign out
          </SignOutForm>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="border-border bg-card-bg/95 sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b px-5 backdrop-blur-lg sm:px-8 lg:px-10">
          <Link
            href={organizer ? "/dashboard" : "/home"}
            className="font-display text-xl font-bold tracking-tight lg:hidden"
          >
            UniFeed<span className="text-primary">.</span>
          </Link>
          <p className="text-muted-foreground hidden text-sm lg:block">
            {organizer ? "Workspace" : "Campus"}
            <span className="text-muted-foreground/40 mx-3">/</span>
            <span className="text-foreground font-medium">{title}</span>
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-muted-foreground hidden text-xs xl:block"
              title="All event times use this time zone"
            >
              {PLATFORM_TIME_ZONE}
            </span>
            {!organizer && (
              <Link
                href="/search"
                aria-label="Search events"
                className="hover:bg-muted flex h-11 w-11 items-center justify-center rounded-full"
              >
                <Search className="h-5 w-5" />
              </Link>
            )}
            <Link
              href={notificationHref}
              aria-label={
                unreadCount
                  ? `Notifications, ${unreadCount} unread`
                  : "Notifications"
              }
              className="hover:bg-muted relative flex h-11 w-11 items-center justify-center rounded-full"
            >
              <Bell className="h-5 w-5" />
              {Boolean(unreadCount) && (
                <span className="bg-primary absolute top-2 right-2 h-2 w-2 rounded-full" />
              )}
            </Link>
            <span className="lg:hidden">
              <ThemeToggle />
            </span>
            <span className="ml-2 hidden text-sm font-medium sm:block">
              {displayName}
            </span>
          </div>
        </header>
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-[1240px] px-4 pt-7 pb-28 sm:px-8 lg:px-10 lg:pt-10 lg:pb-12"
        >
          {children}
        </main>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="border-border bg-card-bg/95 fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t px-2 pt-2 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active(item.href) ? "page" : undefined}
            className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium ${active(item.href) ? "bg-brand-surface text-primary" : "text-muted-foreground"}`}
          >
            <item.icon
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={active(item.href) ? 2.4 : 1.8}
            />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
