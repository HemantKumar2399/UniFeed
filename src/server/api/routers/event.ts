import { createTRPCRouter, publicProcedure, protectedProcedure, protectedOrganizerProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { CreateEventSchema } from "@/features/events/components/CreateEventSchema";
import { TRPCError } from "@trpc/server";

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
