import type { ClubRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import type { db as prismaDb } from "@/server/db";

type SupportedUserRole = "ORGANIZER" | "ADMIN" | "STUDENT";
type SessionUser = {
  id: string;
  role?: SupportedUserRole;
  collegeId?: string | null;
};

type ClubManagementCtx = {
  db: typeof prismaDb;
  session: {
    user: SessionUser;
  };
};

export type ClubManagementRole = ClubRole | "ADMIN";

export function isAdminUserRole(role: string | undefined): role is "ADMIN" {
  return role === "ADMIN";
}

function isClubMembershipRole(role: ClubRole | null | undefined): role is ClubRole {
  return role === "OWNER" || role === "EDITOR";
}

export async function getClubManagementRole(
  ctx: ClubManagementCtx,
  club: { id: number; collegeId: string },
  options?: { requireOwner?: boolean },
): Promise<ClubManagementRole | null> {
  if (isAdminUserRole(ctx.session.user.role)) {
    if (!ctx.session.user.collegeId || ctx.session.user.collegeId !== club.collegeId) {
      return null;
    }

    return ctx.session.user.role;
  }

  const membership = await ctx.db.clubMembership.findUnique({
    where: {
      userId_clubId: {
        userId: ctx.session.user.id,
        clubId: club.id,
      },
    },
    select: { role: true },
  });

  if (!isClubMembershipRole(membership?.role)) {
    return null;
  }

  if (options?.requireOwner && membership.role !== "OWNER") {
    return null;
  }

  return membership.role;
}

export async function assertCanManageClub(
  ctx: ClubManagementCtx,
  clubId: number,
  options?: {
    requireOwner?: boolean;
    notFoundMessage?: string;
    forbiddenMessage?: string;
  },
) {
  const club = await ctx.db.club.findUnique({
    where: { id: clubId },
    select: {
      id: true,
      name: true,
      logoUrl: true,
      collegeId: true,
    },
  });

  if (!club) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: options?.notFoundMessage ?? "Club not found",
    });
  }

  const accessRole = await getClubManagementRole(ctx, club, options);

  if (!accessRole) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: options?.forbiddenMessage ?? "You cannot manage this club.",
    });
  }

  return {
    club,
    accessRole,
  };
}

export async function assertCanManageEvent(
  ctx: ClubManagementCtx,
  eventId: number,
  options?: {
    requireOwner?: boolean;
    notFoundMessage?: string;
    forbiddenMessage?: string;
  },
) {
  const event = await ctx.db.event.findUnique({
    where: { id: eventId },
    select: {
      id: true,
      clubId: true,
      authorId: true,
      collegeId: true,
      title: true,
      status: true,
    },
  });

  if (!event) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: options?.notFoundMessage ?? "Event not found",
    });
  }

  const { accessRole, club } = await assertCanManageClub(ctx, event.clubId, {
    requireOwner: options?.requireOwner,
    forbiddenMessage: options?.forbiddenMessage ?? "You cannot manage this event.",
  });

  return {
    event,
    club,
    accessRole,
  };
}

export async function getManageableClubsForUser(ctx: ClubManagementCtx) {
  if (isAdminUserRole(ctx.session.user.role)) {
    if (!ctx.session.user.collegeId) {
      return [];
    }

    const clubs = await ctx.db.club.findMany({
      where: { collegeId: ctx.session.user.collegeId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        college: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return clubs.map((club) => ({
      ...club,
      role: ctx.session.user.role,
    }));
  }

  const memberships = await ctx.db.clubMembership.findMany({
    where: {
      userId: ctx.session.user.id,
      role: {
        in: ["OWNER", "EDITOR"],
      },
    },
    orderBy: {
      club: {
        name: "asc",
      },
    },
    select: {
      role: true,
      club: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
          college: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return memberships.map((membership) => ({
    ...membership.club,
    role: membership.role,
  }));
}
