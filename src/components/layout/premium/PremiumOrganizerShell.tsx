"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, CalendarDays, BarChart3, Settings } from "lucide-react";
import React from "react";

const mainNavItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Events", href: "/dashboard/events", icon: CalendarDays },
  { name: "Metrics", href: "/dashboard/metrics", icon: BarChart3 },
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

  return (
    <div className="min-h-screen bg-[#f6f5f4] selection:bg-[#0075de]/20 flex">
      {/* Desktop Sidebar (Light Theme for Organizer) */}
      <aside className="hidden md:flex w-64 flex-col gap-8 h-screen pt-8 px-4 sticky top-0 shrink-0">
        <div className="flex items-center gap-3 px-2 text-black/95">
          <div className="w-8 h-8 rounded-lg bg-[#0075de] text-white font-bold flex items-center justify-center text-base shadow-[0px_2px_8px_rgba(0,117,222,0.4)]">C</div>
          <span className="font-bold tracking-tight text-[22px]">Command</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {mainNavItems.map((item) => {
            // Precise active matching for /dashboard vs /dashboard/events
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith(item.href);
              
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-lg active:scale-[0.98] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#097fe8] ${
                  isActive ? "text-black/95 font-semibold" : "text-[#615d59] hover:bg-black/5 font-medium"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-active-organizer"
                    className="absolute inset-0 bg-white border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.02)] rounded-lg pointer-events-none"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <item.icon className="w-[18px] h-[18px] relative z-10" />
                <span className="text-[15px] relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* User Card */}
        <div className="mt-auto mb-8 p-3 rounded-xl border border-transparent hover:bg-white hover:border-black/5 hover:shadow-[rgba(0,0,0,0.04)_0px_4px_18px] transition-all cursor-pointer active:scale-95">
          <p className="text-[14px] font-semibold text-black/95 tracking-tight">{userName}</p>
          <p className="text-[12px] text-[#a39e98] capitalize">{userRole.toLowerCase()}</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-0 md:p-4">
        <div className="w-full h-full bg-white md:rounded-2xl md:border md:border-black/10 md:shadow-[rgba(0,0,0,0.01)_0px_1px_3px,_rgba(0,0,0,0.02)_0px_7px_15px] overflow-hidden flex flex-col relative pb-24 md:pb-0">
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

      {/* Mobile Floating Nav (Light Theme for Organizer) */}
      <div className="md:hidden fixed bottom-6 inset-x-4 z-[100] pointer-events-none">
        <nav className="flex items-center justify-around px-2 py-1.5 bg-white/80 backdrop-blur-xl border border-black/10 shadow-[0_23px_52px_rgba(0,0,0,0.1),_0_0_0_1px_rgba(0,0,0,0.05)] rounded-2xl pointer-events-auto">
          {mainNavItems.map((item) => {
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith(item.href);
              
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex flex-col items-center justify-center w-14 py-2 active:scale-90 transition-transform outline-none rounded-xl"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-glass-active-organizer"
                    className="absolute inset-0 bg-[#f6f5f4] rounded-xl pointer-events-none"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <item.icon
                  className={`w-6 h-6 mb-1 relative z-10 transition-colors ${isActive ? "text-[#0075de]" : "text-[#a39e98]"}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
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
