"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  Settings,
  Library,
  ShieldCheck,
  ArrowUpRight,
  Bell,
} from "lucide-react";
import React from "react";
import { api } from "@/trpc/react";
import { ThemeToggle } from "@/components/ThemeToggle";

const baseNavItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Events", href: "/dashboard/events", icon: CalendarDays },
  { name: "Hubs", href: "/dashboard/hubs", icon: Library },
  { name: "Metrics", href: "/dashboard/metrics", icon: BarChart3 },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function PremiumOrganizerShell({ 
  children,
  userName = "Organizer",
  userRole = "ORGANIZER"
}: { 
  children: React.ReactNode;
  userName?: string | null;
  userRole?: string;
}) {
  const pathname = usePathname();
  const isAdmin = userRole === "ADMIN";
  const { data: unreadCount } = api.notification.getUnreadCount.useQuery(undefined, {
    refetchInterval: 10000,
  });

  const navItems = isAdmin
    ? [...baseNavItems, { name: "Admin", href: "/admin", icon: ShieldCheck }]
    : baseNavItems;

  return (
    <div className="min-h-screen bg-app-bg selection:bg-[#0075de]/20 flex transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col gap-8 h-screen pt-8 px-4 sticky top-0 shrink-0 border-r border-whisper transition-colors duration-300">
        <div className="flex items-center gap-3 px-2 text-foreground">
          <div className="w-8 h-8 rounded-lg bg-[#0075de] text-white font-bold flex items-center justify-center text-base shadow-[0px_2px_8px_rgba(0,117,222,0.4)]">C</div>
          <span className="font-bold tracking-tight text-[22px] text-foreground">Command</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith(item.href);
              
            const isNotifications = item.name === "Notifications";

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-lg active:scale-[0.98] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#097fe8] ${
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:bg-muted font-medium"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-active-organizer"
                    className="absolute inset-0 bg-card-bg border border-whisper shadow-[0_1px_3px_rgba(0,0,0,0.02)] rounded-lg pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <item.icon className="w-[18px] h-[18px] relative z-10" />
                <span className="text-[15px] relative z-10">{item.name}</span>
                {isNotifications && unreadCount !== undefined && unreadCount > 0 && (
                  <span className="ml-auto min-w-[20px] h-5 px-1.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold z-10 shadow-sm animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {isAdmin && (
          <Link
            href="/admin"
            className="rounded-2xl border border-whisper bg-card-bg px-4 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Admin Access
                </p>
                <h3 className="mt-2 text-[16px] font-bold tracking-tight text-foreground">
                  Open Control Center
                </h3>
                <p className="mt-1 text-[13px] font-medium leading-relaxed text-muted-foreground">
                  Manage college roles, community ownership, and route shortcuts from one place.
                </p>
              </div>
              <div className="rounded-full bg-[#f2f9ff] dark:bg-blue-950/40 p-2 text-[#097fe8]">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        )}
        
        {/* User Card & Theme Toggle */}
        <div className="mt-auto mb-8 flex items-center gap-2">
          <div className="flex-grow p-3 rounded-xl border border-transparent hover:bg-card-bg hover:border-whisper hover:shadow-[rgba(0,0,0,0.04)_0px_4px_18px] transition-all cursor-pointer active:scale-95 truncate">
            <p className="text-[14px] font-semibold text-foreground tracking-tight">{userName}</p>
            <p className="text-[12px] text-muted-foreground capitalize">{userRole.toLowerCase()}</p>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-0 md:p-4">
        <div className="w-full h-full bg-card-bg md:rounded-2xl md:border md:border-whisper md:shadow-[rgba(0,0,0,0.01)_0px_1px_3px,_rgba(0,0,0,0.02)_0px_7px_15px] overflow-hidden flex flex-col relative pb-24 md:pb-0 transition-colors duration-300">
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-12 lg:px-24">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="w-full max-w-5xl mx-auto py-8 lg:py-12"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile Floating Nav */}
      <div className="md:hidden fixed bottom-6 inset-x-4 z-[100] pointer-events-none">
        <nav className="flex items-center justify-around gap-1 px-2 py-1.5 bg-card-bg/85 backdrop-blur-xl border border-whisper shadow-[0_23px_52px_rgba(0,0,0,0.1),_0_0_0_1px_rgba(0,0,0,0.05)] rounded-2xl pointer-events-auto transition-colors duration-300">
          {navItems.map((item) => {
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith(item.href);
              
            const isNotifications = item.name === "Notifications";

            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex min-w-0 flex-1 flex-col items-center justify-center py-2 active:scale-90 transition-transform outline-none rounded-xl"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-glass-active-organizer"
                    className="absolute inset-0 bg-app-bg rounded-xl pointer-events-none"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <div className="relative">
                  <item.icon
                    className={`w-6 h-6 mb-1 relative z-10 transition-colors ${isActive ? "text-[#0075de]" : "text-muted-foreground"}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isNotifications && unreadCount !== undefined && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold z-20 shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-semibold tracking-wide relative z-10 transition-colors ${
                    isActive ? "text-[#0075de]" : "text-transparent"
                  }`}
                >
                  {item.name}
                </span>
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-dot-organizer"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#0075de]"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
