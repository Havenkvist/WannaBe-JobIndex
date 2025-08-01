import { gql } from '@apollo/client';

export const JOBS_QUERY = gql`
  query Jobs {
    jobs {
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
export const JOB_QUERY = gql`
  query Job($id: Int!) {
    job(id: $id) {
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