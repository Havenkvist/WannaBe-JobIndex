import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql', // Your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
