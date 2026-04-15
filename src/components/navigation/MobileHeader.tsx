"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/home": "Campus Pulse",
  "/search": "Hubs",
  "/global": "Passport",
  "/profile": "Profile",
};

export function MobileHeader() {
  const pathname = usePathname();
  
  // Find matching title, fallback to "Campus Platform"
  const title = pathname ? (pageTitles[pathname] || "Campus Platform") : "Campus Platform";

  return (
    <header className="sticky top-0 z-50 w-full bg-pure-white/90 backdrop-blur-xl border-b border-[var(--border-whisper)] md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <h1 className="text-xl font-bold tracking-[--tracking-card-title] text-notion-black transition-all duration-300">
          {title}
        </h1>
      </div>
    </header>
  );
}