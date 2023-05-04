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
      z.object({ title: z.string(), company: z.string(), userId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.application.create({
        data: {
          title: input.title,
          company: input.company,
          userId: input.userId,
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
