import { type ReactNode } from "react";

import { signOut } from "@/server/auth";

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
  async function signOutAction() {
    "use server";

    await signOut({ redirectTo });
  }

  return (
    <form action={signOutAction}>
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
