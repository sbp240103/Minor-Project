
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password);
      navigate('/');
      window.location.reload();
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
        <p className="mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
