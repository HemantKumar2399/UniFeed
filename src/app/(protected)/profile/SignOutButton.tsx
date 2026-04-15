"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => void signOut({ callbackUrl: "/" })}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 text-red-600 px-4 py-3 font-medium hover:bg-red-100 transition-colors"
    >
      <LogOut className="h-5 w-5" />
      Sign Out
    </button>
  );
}
