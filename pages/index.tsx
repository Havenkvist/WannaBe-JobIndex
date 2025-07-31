import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

const GET_JOBS = gql`
  query GetJobs {
    jobs {
      id
      title
      description
      company
      location
      createdAt
    }
  }
`;

const CREATE_JOB = gql`
  mutation CreateJob(
    $title: String!
    $description: String!
    $company: String!
    $location: String!
  ) {
    createJob(
      title: $title
      description: $description
      company: $company
      location: $location
    ) {
      id
      title
      description
      company
      location
      createdAt
    }
  }
`;

export default function Home() {
  const { data, loading, error, refetch } = useQuery(GET_JOBS);
  const [createJob] = useMutation(CREATE_JOB);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !description || !company || !location) return;
    await createJob({
      variables: { title, description, company, location },
    });
    setTitle("");
    setDescription("");
    setCompany("");
    setLocation("");
    refetch();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h1>Jobboard for Nyuddannede Softwareudviklere</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          placeholder="Jobtitel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <textarea
          placeholder="Jobbeskrivelse"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <input
          placeholder="Firmanavn"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <input
          placeholder="Lokation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Opret job
        </button>
      </form>

      <ul>
        {data.jobs.map((job: any) => (
          <li key={job.id} style={{ marginBottom: "1.5rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
            <h3>{job.title}</h3>
            <p><strong>Firma:</strong> {job.company} | <strong>Lokation:</strong> {job.location}</p>
            <p>{job.description}</p>
            <small>Opslået: {new Date(job.createdAt).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
