
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await AuthService.signup(username, email, password);
      setSuccess('Sign up successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (error) {
      setError(error?.response?.data?.message || 'Sign up failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleSignUp} className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Sign Up
        </button>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
