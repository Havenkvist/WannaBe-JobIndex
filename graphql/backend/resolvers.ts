import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = 1800; // 30 minutes in seconds

export const resolvers = {
  Query: {
    jobs: () => prisma.job.findMany({ include: { user: true } }),
    job: (_: any, { id }: { id: number }) =>
      prisma.job.findUnique({ where: { id }, include: { user: true } }),
    companies: () =>
      prisma.user.findMany({
      }),
  },

  Mutation: {
    postJob: async (_: any, args: any) => {
      return prisma.job.create({
        data: {
          ...args,
        },
      });
    },

    register: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      // Check if username exists
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser) {
        throw new Error("Username already taken");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          passwordHash: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      return { token, user };
    },

    login: async (_: any, { username, password }: { username: string; password: string }) => {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        throw new Error("Invalid username or password");
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        throw new Error("Invalid username or password");
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      return { token, user };
    },
  },

  Job: {
    user: (job) => prisma.user.findUnique({ where: { id: job.userId } }),
  },

  User: {
    jobs: (user) => prisma.job.findMany({ where: { userId: user.id } }),
  },
};
