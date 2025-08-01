import { useQuery } from '@apollo/client';
import { JOBS_QUERY } from '../graphql/frontend/queries';

export default function Home() {
  const { data, loading, error } = useQuery(JOBS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Jobs</h1>
      <ul>
        {data.jobs.map((job: any) => (
          <li key={job.id}>{job.title} at {job.company}</li>
        ))}
      </ul>
    </div>
  );
}
