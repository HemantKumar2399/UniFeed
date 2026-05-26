import { MetricsPageView } from "@/features/dashboard/components/MetricsPageView";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { getOrganizerDashboardMetrics } from "@/server/services/dashboard-metrics";

export default async function MetricsPage() {
  const session = await auth();
  const user = session?.user;
  const metrics = user
    ? await getOrganizerDashboardMetrics(db, {
        id: user.id,
        role: user.role,
        collegeId: user.collegeId,
      })
    : null;

  return <MetricsPageView metrics={metrics} />;
}
