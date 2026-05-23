"use client";

import { type ReactNode, useTransition } from "react";
import { signOut } from "next-auth/react";

type SignOutFormProps = {
  children: ReactNode;
  className?: string;
  redirectTo?: string;
};

export function SignOutForm({
  children,
  className,
  redirectTo = "/login",
}: SignOutFormProps) {
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(() => {
      void signOut({ redirectTo });
    });
  }

  return (
    <button
      type="button"
      className={className}
      disabled={isPending}
      onClick={handleSignOut}
    >
      {children}
    </button>
  );
}
