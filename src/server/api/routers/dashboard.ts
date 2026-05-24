import { observable } from "@trpc/server/observable";

import { mergeLiveRecentActivity, type EventAttendanceRealtimePayload, type OrganizerLiveAttendanceMetrics } from "@/features/attendance/realtime-attendance";
import { createTRPCRouter, protectedOrganizerProcedure } from "@/server/api/trpc";
import { ee } from "@/server/events";
import {
  getManagedClubIdsForDashboardUser,
  getOrganizerDashboardMetrics,
} from "@/server/services/dashboard-metrics";

function toOrganizerLiveAttendanceMetrics(
  metrics: Awaited<ReturnType<typeof getOrganizerDashboardMetrics>>,
): OrganizerLiveAttendanceMetrics {
  return {
    rsvpCount: metrics.rsvpCount,
    rsvpTotals: metrics.rsvpTotals,
    recentActivity: metrics.recentActivity,
  };
}

export const dashboardRouter = createTRPCRouter({
  getOrganizerLiveMetrics: protectedOrganizerProcedure.query(async ({ ctx }) => {
    const metrics = await getOrganizerDashboardMetrics(ctx.db, {
      id: ctx.session.user.id,
      role: ctx.session.user.role,
      collegeId: ctx.session.user.collegeId,
    });

    return toOrganizerLiveAttendanceMetrics(metrics);
  }),

  onOrganizerAttendanceChange: protectedOrganizerProcedure.subscription(async ({ ctx }) => {
    const viewer = {
      id: ctx.session.user.id,
      role: ctx.session.user.role,
      collegeId: ctx.session.user.collegeId,
    };
    const managedClubIds = await getManagedClubIdsForDashboardUser(ctx.db, viewer);

    return observable<OrganizerLiveAttendanceMetrics>((emit) => {
      const onAttendanceChange = (payload: EventAttendanceRealtimePayload) => {
        const isSameCollege =
          viewer.role === "ADMIN"
            ? viewer.collegeId !== null && viewer.collegeId === payload.collegeId
            : managedClubIds?.includes(payload.clubId) ?? false;

        if (!isSameCollege) {
          return;
        }

        void getOrganizerDashboardMetrics(ctx.db, viewer).then((metrics) => {
          const liveMetrics = toOrganizerLiveAttendanceMetrics(metrics);
          emit.next({
            ...liveMetrics,
            recentActivity: mergeLiveRecentActivity(
              liveMetrics.recentActivity,
              payload.latestActivity,
            ),
          });
        });
      };

      ee.on("attendanceChange", onAttendanceChange);

      return () => {
        ee.off("attendanceChange", onAttendanceChange);
      };
    });
  }),
});
