import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../graphql/frontend/mutations';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted(data) {
      localStorage.setItem('token', data.register.token);
      router.push('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ variables: { username, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
