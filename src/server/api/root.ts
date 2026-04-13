import { eventRouter } from "@/server/api/routers/event";
import { postRouter } from "@/server/api/routers/post";
import { rsvpRouter } from "@/server/api/routers/rsvp";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { uploadRouter } from "@/server/api/routers/upload";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  post: postRouter,
  rsvp: rsvpRouter,
  upload: uploadRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
