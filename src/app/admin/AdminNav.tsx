"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarClock, LayoutDashboard, ShieldCheck } from "lucide-react";

const adminNavItems = [
  {
    name: "Control Center",
    href: "/admin",
    icon: ShieldCheck,
  },
  {
    name: "Pending Reviews",
    href: "/admin/events",
    icon: CalendarClock,
  },
  {
    name: "Organizer Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
] as const;

export function AdminNav({ pendingReviewCount }: { pendingReviewCount: number }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {adminNavItems.map((item) => {
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        const badge = item.href === "/admin/events" ? pendingReviewCount : undefined;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center justify-between rounded-2xl border px-4 py-3 text-[14px] font-semibold transition-all ${
              isActive
                ? "border-[#dd5b00]/20 bg-[#fff3ea] dark:bg-orange-950/20 text-[#9d4200] dark:text-[#ff8a3d] shadow-[0_12px_24px_rgba(221,91,0,0.08)]"
                : "border-transparent text-muted-foreground hover:border-whisper hover:bg-card-bg"
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`rounded-xl p-2 transition-colors ${
                  isActive ? "bg-[#dd5b00] text-white" : "bg-muted text-muted-foreground group-hover:bg-[#f2f9ff] dark:group-hover:bg-blue-950/30 group-hover:text-[#097fe8]"
                }`}
              >
                <item.icon className="h-4 w-4" />
              </span>
              <span>{item.name}</span>
            </span>
            {typeof badge === "number" ? (
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                  isActive ? "bg-white dark:bg-orange-900 text-[#9d4200] dark:text-white" : "border border-whisper bg-card-bg text-foreground/70"
                }`}
              >
                {badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
