import type { EventStatus } from "@prisma/client";

export type StudentEventAccessDecision = "visible" | "hidden" | "wrong_college";

export function resolveStudentEventAccess(params: {
  eventStatus?: EventStatus | null;
  eventCollegeId?: string | null;
  userCollegeId?: string | null;
}): StudentEventAccessDecision {
  if (params.eventStatus !== "PUBLISHED") {
    return "hidden";
  }

  if (!params.userCollegeId || params.eventCollegeId !== params.userCollegeId) {
    return "wrong_college";
  }

  return "visible";
}
