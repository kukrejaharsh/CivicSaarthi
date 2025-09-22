// src/pages/AllIssues.js
import React from 'react';
import { Link } from 'react-router-dom';

const AllIssues = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">All Issues Page</h1>
      <p className="text-gray-600 mb-8">This page is under construction. 🏗️</p>
      <Link to="/dashboard" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition">
        &larr; Back to Dashboard
      </Link>
    </div>
  );
};

export default AllIssues;