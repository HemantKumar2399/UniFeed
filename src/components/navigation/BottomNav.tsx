"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/home", icon: Home, label: "Pulse" },
  { href: "/search", icon: Users, label: "Hubs" },
  { href: "/global", icon: Search, label: "Passport" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-md border-t border-[var(--border-whisper)] bg-pure-white/90 backdrop-blur-xl md:hidden">
      <nav
        className="flex h-14 w-full items-center justify-around px-2"
        aria-label="Bottom Navigation"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || pathname?.startsWith(tab.href + "/");

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex h-full w-14 flex-col items-center justify-center space-y-1 transition-colors duration-transition active:scale-95",
                isActive ? "text-notion-blue" : "text-warm-gray-300 hover:text-notion-black",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-badge">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function DesktopSidebarNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("hidden md:flex md:w-[240px] md:flex-col md:gap-6 md:pr-4 lg:w-[280px] lg:pr-8", className)}>
      <div className="pt-8 text-xl font-bold tracking-tight text-notion-black">Campus Platform</div>
      <nav className="flex flex-col gap-2" aria-label="Desktop Navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || pathname?.startsWith(tab.href + "/");

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-3 rounded-subtle px-4 py-3 text-sm font-semibold transition-colors duration-transition",
                isActive
                  ? "bg-pure-white text-notion-blue active:scale-95 shadow-[var(--shadow-card)] border-[var(--border-whisper)]"
                  : "text-warm-gray-500 hover:bg-pure-white hover:text-notion-black active:scale-95 border border-transparent",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
