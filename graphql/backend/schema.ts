import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  enum Role {
    GRADUATE
    COMPANY
  }

  type User {
    id: Int!
    name: String
    username: String!
    email: String
    role: Role
    jobs: [Job!]
  }

  type Job {
    id: Int!
    title: String!
    description: String!
    company: String!
    location: String!
    postedAt: String!
    user: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    jobs: [Job!]!
    job(id: Int!): Job
    companies: [User!]!
  }

  type Mutation {
    postJob(
      title: String!
      description: String!
      company: String!
      location: String!
      userId: Int!
    ): Job!

    login(username: String!, password: String!): AuthPayload!
    register(username: String!, password: String!): AuthPayload!
  }
`;
