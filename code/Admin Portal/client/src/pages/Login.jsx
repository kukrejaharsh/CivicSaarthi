// src/pages/Login.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLoader } from 'react-icons/fi'; // <-- Changed FiUser to FiMail
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' }); // <-- Changed
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');

    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-center text-gray-500 mb-8">Login to the Admin Dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- USERNAME FIELD CHANGED TO EMAIL --- */}
          <div className="relative">
            <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <motion.button
            type="submit" disabled={isLoading}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="w-full py-3 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition disabled:opacity-70"
          >
            {isLoading ? <FiLoader className="animate-spin" /> : 'Login'}
          </motion.button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          No account?{' '}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">
            Sign Up here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;