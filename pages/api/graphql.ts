import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql/backend/schema';
import { resolvers } from '../../graphql/backend/resolvers';
import { PrismaClient } from '@prisma/client';
import { makeExecutableSchema } from '@graphql-tools/schema';

const prisma = new PrismaClient();

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema: executableSchema,
  context: () => ({ prisma }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// You need to start the server before exporting the handler
const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
