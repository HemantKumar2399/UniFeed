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
         <div className="flex items-center justify-center h-8 w-8 bg-pure-white border border-[var(--border-whisper)] rounded-circle shadow-[var(--shadow-card)]">
           <UserCircle className="h-5 w-5 text-notion-blue" />
         </div>
         <span className="text-xl font-semibold text-notion-black tracking-tight">Organizer</span>
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
                "group flex items-center justify-start gap-4 rounded-subtle px-4 py-3 text-sm font-medium transition-colors duration-transition active:scale-95",
                isActive
                  ? "bg-pure-white text-notion-blue shadow-[var(--shadow-card)] border-[var(--border-whisper)]"
                  : "text-warm-gray-500 hover:bg-pure-white hover:text-notion-black border border-transparent font-normal"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0 transition-colors duration-transition", isActive ? "text-notion-blue" : "text-warm-gray-300 group-hover:text-notion-black")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}