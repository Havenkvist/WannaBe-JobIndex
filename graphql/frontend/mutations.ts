import { gql } from '@apollo/client';

export const POST_JOB_MUTATION = gql`
  mutation PostJob(
    $title: String!
    $description: String!
    $company: String!
    $location: String!
    $userId: Int!
  ) {
    postJob(
      title: $title
      description: $description
      company: $company
      location: $location
      userId: $userId
    ) {
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
