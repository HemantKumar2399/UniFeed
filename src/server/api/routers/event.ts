import { createTRPCRouter, publicProcedure, protectedProcedure, protectedOrganizerProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { CreateEventSchema } from "@/features/events/components/CreateEventSchema";
import { matchesAttendeeQuery, resolveAttendeePrn } from "@/features/attendance/checkin-search.utils";
import { decodeTicketPayloadToken, getTicketPayloadSecret, verifyTicketPayloadToken } from "@/lib/ticket-payload";
import type { db as prismaDb } from "@/server/db";
import { TRPCError } from "@trpc/server";

type OrganizerCtx = {
  db: typeof prismaDb;
  session: {
    user: {
      id: string;
    };
  };
};

async function assertOrganizerOwnsEvent(ctx: OrganizerCtx, eventId: number): Promise<void> {
  const event = await ctx.db.event.findUnique({
    where: { id: eventId },
    select: { authorId: true },
  });

  if (!event) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
  }

  if (event.authorId !== ctx.session.user.id) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized for this event" });
  }
}

async function markAttendedRsvp(
  ctx: OrganizerCtx,
  params: { eventId: number; rsvpId: number; expectedUserId: string },
) {
  const rsvp = await ctx.db.rSVP.findUnique({
    where: { id: params.rsvpId },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  if (rsvp?.eventId !== params.eventId) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Ticket does not belong to this event" });
  }

  if (rsvp.userId !== params.expectedUserId) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Ticket ownership mismatch" });
  }

  if (rsvp.status === "ATTENDED") {
    return rsvp;
  }

  return ctx.db.rSVP.update({
    where: { id: rsvp.id },
    data: { status: "ATTENDED" },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });
}

export const eventRouter = createTRPCRouter({
  delete: protectedOrganizerProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({ where: { id: input.id } });
      if (!event) throw new TRPCError({ code: "NOT_FOUND" });
      if (event.authorId !== ctx.session.user.id) throw new TRPCError({ code: "FORBIDDEN" });
      
      return ctx.db.event.delete({ where: { id: input.id } });
    }),

  updateStatus: protectedOrganizerProcedure
    .input(z.object({ id: z.number().int(), status: z.enum(["DRAFT", "PUBLISHED"]) }))
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({ where: { id: input.id } });
      if (!event) throw new TRPCError({ code: "NOT_FOUND" });
      if (event.authorId !== ctx.session.user.id) throw new TRPCError({ code: "FORBIDDEN" });
      
      return ctx.db.event.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  create: protectedOrganizerProcedure
    .input(CreateEventSchema)
    .mutation(async ({ ctx, input }) => {
      // In a real multi-tenant system we'd extract the Organizer's selected Club ID
      let club = await ctx.db.club.findFirst();
club ??= await ctx.db.club.create({
        data: { name: "University Club", logoUrl: "https://example.com/logo.png" }
      });

      return ctx.db.event.create({
        data: {
          title: input.title,
          description: input.description,
          date: input.date,
          location: input.location,
          imageUrl: input.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
          capacity: input.capacity,
          clubId: club.id,
          authorId: ctx.session.user.id,
        },
      });
    }),

  search: protectedProcedure
    .input(z.object({ query: z.string().min(1).max(100) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.event.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: input.query, mode: "insensitive" } },
            { description: { contains: input.query, mode: "insensitive" } },
          ],
        },
        take: 5,
        orderBy: { date: "asc" },
      });
    }),
  getOrganizerDrafts: protectedOrganizerProcedure.query(async ({ ctx }) => {    
    return ctx.db.event.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
      include: {
        _count: {
          select: { rsvps: true }
        }
      },
      orderBy: { date: "desc" },
    });
  }),

  getFeed: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany({
      where: {
        status: "PUBLISHED",
      },
      take: 10,
      orderBy: { date: "asc" },
      include: {
        club: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
        _count: {
          select: {
            rsvps: true,
          },
        },
      },
    });
  }),

  getAttendees: protectedOrganizerProcedure
    .input(z.object({ eventId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.event.findUnique({
        where: {
          id: input.eventId,
        },
        include: {
          rsvps: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      if (event.authorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Unauthorized to view attendees for this event",
        });
      }

      return event.rsvps;
    }),

  redeemTicket: protectedOrganizerProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        token: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertOrganizerOwnsEvent(ctx, input.eventId);

      let payloadSecret: string;
      try {
        payloadSecret = getTicketPayloadSecret();
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ticket security is not configured",
        });
      }

      const isValidToken = verifyTicketPayloadToken(input.token, payloadSecret);

      if (!isValidToken) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid QR payload" });
      }

      let payload: ReturnType<typeof decodeTicketPayloadToken>;
      try {
        payload = decodeTicketPayloadToken(input.token, payloadSecret);
      } catch {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Malformed QR payload" });
      }

      const ticketId = Number.parseInt(payload.eventTicketId, 10);
      if (!Number.isInteger(ticketId) || ticketId <= 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid ticket identifier" });
      }

      const updated = await markAttendedRsvp(ctx, {
        eventId: input.eventId,
        rsvpId: ticketId,
        expectedUserId: payload.studentId,
      });

      return {
        rsvpId: updated.id,
        userId: updated.userId,
        attendeeName: updated.user.name ?? updated.user.email ?? "Student",
        status: updated.status,
      };
    }),

  searchAttendees: protectedOrganizerProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        query: z.string().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      await assertOrganizerOwnsEvent(ctx, input.eventId);

      const attendees = await ctx.db.rSVP.findMany({
        where: { eventId: input.eventId },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return attendees
        .filter((rsvp) =>
          matchesAttendeeQuery(
            {
              userId: rsvp.user.id,
              name: rsvp.user.name,
              email: rsvp.user.email,
            },
            input.query,
          ),
        )
        .slice(0, 20)
        .map((rsvp) => ({
          rsvpId: rsvp.id,
          userId: rsvp.user.id,
          name: rsvp.user.name,
          email: rsvp.user.email,
            prn: resolveAttendeePrn({ userId: rsvp.user.id, email: rsvp.user.email }),
          status: rsvp.status,
        }));
    }),

  forceCheckIn: protectedOrganizerProcedure
    .input(
      z.object({
        eventId: z.number().int().positive(),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertOrganizerOwnsEvent(ctx, input.eventId);

      const rsvp = await ctx.db.rSVP.findFirst({
        where: {
          eventId: input.eventId,
          userId: input.userId,
        },
        select: {
          id: true,
        },
      });

      if (!rsvp) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Attendee ticket not found" });
      }

      const updated = await markAttendedRsvp(ctx, {
        eventId: input.eventId,
        rsvpId: rsvp.id,
        expectedUserId: input.userId,
      });

      return {
        rsvpId: updated.id,
        userId: updated.userId,
        attendeeName: updated.user.name ?? updated.user.email ?? "Student",
        status: updated.status,
      };
    }),

  getMyCalendar: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.event.findMany({
      where: {
        rsvps: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
      orderBy: { date: "asc" },
      include: {
        rsvps: {
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            status: true,
          }
        },
        club: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
        _count: {
          select: {
            rsvps: true,
          },
        },
      },
    });
  }),
});
