import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { topicRouter } from "~/server/api/routers/topic";
import { noteRouter } from "~/server/api/routers/note";
import { applicationRouter } from "~/server/api/routers/application";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  topic: topicRouter,
  note: noteRouter,
  application: applicationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
