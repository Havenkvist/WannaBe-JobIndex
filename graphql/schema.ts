import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Job {
    id: ID!
    title: String!
    description: String!
    company: String!
    location: String!
    createdAt: String!
  }

  type Query {
    jobs: [Job!]!
  }

  type Mutation {
    createJob(
      title: String!
      description: String!
      company: String!
      location: String!
    ): Job!
  }
`;
