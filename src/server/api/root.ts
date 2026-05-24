import { discoveryRouter } from "@/server/api/routers/discovery";
import { eventRouter } from "@/server/api/routers/event";
import { clubRouter } from "@/server/api/routers/club";
import { hubRouter } from "@/server/api/routers/hub";
import { postRouter } from "@/server/api/routers/post";
import { rsvpRouter } from "@/server/api/routers/rsvp";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { uploadRouter } from "@/server/api/routers/upload";
import { studentRouter } from "@/server/api/routers/student";
import { adminRouter } from "@/server/api/routers/admin";
import { dashboardRouter } from "@/server/api/routers/dashboard";
import { profileRouter } from "@/server/api/routers/profile";
import { notificationRouter } from "@/server/api/routers/notification";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  club: clubRouter,
  discovery: discoveryRouter,
  event: eventRouter,
  hub: hubRouter,
  post: postRouter,
  rsvp: rsvpRouter,
  upload: uploadRouter,
  student: studentRouter,
  admin: adminRouter,
  dashboard: dashboardRouter,
  profile: profileRouter,
  notification: notificationRouter,
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
