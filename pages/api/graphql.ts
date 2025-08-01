import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../graphql/typeDefs';
import { resolvers } from '../../graphql/resolvers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
