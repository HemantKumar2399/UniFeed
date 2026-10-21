import type { ReactNode } from "react";
import { PlatformShell } from "../PlatformShell";

export function PremiumOrganizerShell(props: {
  children: ReactNode;
  userName?: string | null;
  userRole?: string;
}) {
  return <PlatformShell {...props} mode="organizer" />;
}
