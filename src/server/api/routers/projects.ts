import { Project } from "@prisma/client";
import { Task } from "~/interfaces/task";
import { publicProcedure, createTRPCRouter } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { z } from "zod";
const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const projects = await prisma.project.findMany({
      include: { tasks: true },
    });
    return projects;
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const projects = await prisma.project.findUnique({
        where: { id: input.id },
        include: { tasks: true },
      });
      return projects;
    }),
});

export default projectRouter;
