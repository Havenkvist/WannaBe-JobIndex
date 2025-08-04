import { gql } from '@apollo/client';

// Define the GraphQL mutation using gql
export const POST_JOB_MUTATION = gql`
  # 1. Declare the variables that this mutation will accept as input
  mutation PostJob(
    $title: String!
    $description: String!
    $company: String!
    $location: String!
    $userId: Int!
  ) {
    # 2. Call the postJob mutation and pass the variables to it
    postJob(
      title: $title
      description: $description
      company: $company
      location: $location
      userId: $userId
    ) {
      # 3. Specify what fields to return in the response after the mutation runs (Frontend)
      id
      title
      description
      company
      location
      postedAt
      user {
        id
        name
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password){
      token
      user {
        username
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
       
      }
    }
  }
`;