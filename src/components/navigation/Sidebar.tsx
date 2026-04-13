"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, BarChart, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Standard navigation configuration
export const defaultNavItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Events", href: "/dashboard/events", icon: CalendarDays },
  { name: "Metrics", href: "/dashboard/metrics", icon: BarChart },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex flex-col gap-6 pt-8", className)}>
      <div className="flex px-4 items-center gap-2">
         {/* Simple textual logo, since no specific logo provided in reqs */}
         <div className="flex items-center justify-center h-8 w-8 bg-zinc-800 rounded-full">
           <UserCircle className="h-5 w-5 text-rose-500" />
         </div>
         <span className="text-xl font-semibold text-rose-50 tracking-tight">Organizer</span>
      </div>
      
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {defaultNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-start gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-rose-500/10 text-rose-500"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-rose-400 font-normal"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-rose-500" : "text-zinc-500 group-hover:text-rose-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}