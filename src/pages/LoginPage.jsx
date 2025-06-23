import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3000/v1/auth/login',
        { email, password }
      );
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
        
      const msg = err.response?.data?.error || 'Server error, please try again.';
      setError(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            required
            className="w-full p-2 border rounded"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            required
            className="w-full p-2 border rounded"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 border rounded hover:bg-gray-100"
        >
          Log In
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}