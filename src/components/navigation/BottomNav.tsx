"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Globe, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/global", icon: Globe, label: "Global" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 border-t left-0 right-0 mx-auto z-50 w-full max-w-md bg-background/80 backdrop-blur-xl md:hidden">
      <nav
        className="flex h-16 w-full items-center justify-around px-2"
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
                "flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors",
                isActive ? "text-rose-600" : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function DesktopSidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-[240px] md:flex-col md:gap-6 md:pr-4 lg:w-[280px] lg:pr-8">
      <div className="pt-8 text-2xl font-black tracking-tight">UniFeed</div>
      <nav className="flex flex-col gap-2" aria-label="Desktop Navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || pathname?.startsWith(tab.href + "/");

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-zinc-900 text-rose-500 ring-1 ring-zinc-800"
                  : "text-zinc-300 hover:bg-zinc-950 hover:text-white",
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
