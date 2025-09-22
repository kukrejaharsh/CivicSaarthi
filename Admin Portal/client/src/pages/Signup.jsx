// src/pages/Signup.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiBriefcase, FiLoader } from 'react-icons/fi'; // <-- Changed FiUser to FiMail
import { Link, useNavigate } from 'react-router-dom';

const adminRoles = ["PWD", "Traffic Police", "Sanitation Dept", "Water Supply Board", "Sewerage Dept", "General Grievance"];

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: '' }); // <-- Changed
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
        setMessage("Please select a role.");
        return;
    }
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Signup failed');
      }

      setMessage('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      setMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Get started with the Admin Dashboard</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- USERNAME FIELD CHANGED TO EMAIL --- */}
          <div className="relative">
            <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              onChange={handleChange} 
              required 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" 
            />
          </div>
          
          <div className="relative">
            <FiBriefcase className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <select 
              name="role" 
              onChange={handleChange} 
              defaultValue="" 
              required 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="" disabled>Select a role/department</option>
              {adminRoles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>

          <div className="relative">
            <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input 
              type="password" 
              name="password" 
              placeholder="Password (min. 6 characters)" 
              onChange={handleChange} 
              required 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" 
            />
          </div>

          {message && <p className="text-center text-sm text-gray-600">{message}</p>}

          <motion.button
            type="submit" disabled={isLoading}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="w-full py-3 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition disabled:opacity-70"
          >
            {isLoading ? <FiLoader className="animate-spin" /> : 'Create Account'}
          </motion.button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already a member?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;