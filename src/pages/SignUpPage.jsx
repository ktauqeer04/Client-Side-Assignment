import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/v1/auth/signup', form);
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/homepage');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch {
      setError('Server error, please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
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
          Create Account
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link to="/auth" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
