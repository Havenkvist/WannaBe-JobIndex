import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../graphql/backend/schema';
import { resolvers } from '../../graphql/backend/resolvers';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
        return { prisma, userId: decoded.userId, userRole: decoded.role };
      } catch {
        // Invalid or expired token
        return { prisma };
      }
    }
    return { prisma };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(req: any, res: any) {
  await startServer;
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
