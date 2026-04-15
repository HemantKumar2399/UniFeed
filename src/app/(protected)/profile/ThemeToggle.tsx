"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-12 bg-zinc-100 rounded-lg animate-pulse" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 px-4 py-3 font-medium transition-colors"
    >
      <div className="flex items-center gap-2">
        {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="text-zinc-900 dark:text-zinc-100 text-sm">Theme</span>
      </div>
      <span className="text-sm text-zinc-500 capitalize">{theme}</span>
    </button>
  );
}
