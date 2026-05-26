"use client";

import { SessionProvider } from "next-auth/react";
import { ErrorBoundary } from "./ErrorBoundary";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <SessionProvider>{children}</SessionProvider>
    </ErrorBoundary>
  );
}