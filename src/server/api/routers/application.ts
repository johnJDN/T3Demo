import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const applicationRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.application.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        title: z.string(),
        company: z.string(),
        status: z.string(),
        // dateApplied: z.date(),
        // link: z.string(),
        // notes: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.application.create({
        data: {
          userId: input.userId,
          title: input.title,
          company: input.company,
          status: input.status,
          // dateApplied: input.dateApplied,
          // link: input.link,
          // notes: input.notes,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.application.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
