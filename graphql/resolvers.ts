import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    jobs: () => prisma.job.findMany({ include: { user: true } }),
    job: (_: any, { id }: { id: number }) => prisma.job.findUnique({ where: { id }, include: { user: true } }),
    companies: () => prisma.user.findMany({ where: { role: "COMPANY" } }),
  },
  Mutation: {
    postJob: async (_: any, args: any) => {
      return prisma.job.create({
        data: {
          ...args,
        },
      });
    },
  },
  Job: {
    user: (job) => prisma.user.findUnique({ where: { id: job.userId } }),
  },
  User: {
    jobs: (user) => prisma.job.findMany({ where: { userId: user.id } }),
  },
};
