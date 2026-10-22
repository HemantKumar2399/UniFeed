"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { revealTheme } from "@/lib/theme-transition";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by waiting until mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="h-11 w-11 shrink-0 rounded-[var(--radius-micro)]"
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-11 w-11 shrink-0 rounded-[var(--radius-micro)] transition-transform duration-300 active:scale-95"
      onClick={(event) => {
        // Read the committed root state so rapid input cannot use a stale render.
        const nextTheme = document.documentElement.classList.contains("dark")
          ? "light"
          : "dark";
        void revealTheme(event.currentTarget, () => setTheme(nextTheme));
      }}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <Sun
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isDark
              ? "scale-0 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }`}
        />
        <Moon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
