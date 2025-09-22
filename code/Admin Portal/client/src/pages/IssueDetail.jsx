import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTag, FiCalendar, FiUser, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

// A skeleton loader for this specific page
const SkeletonDetail = () => (
  <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
    <header className="border-b border-slate-100 pb-6 mb-6">
      <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
      <div className="flex items-center gap-4 mt-2">
        <div className="h-4 bg-slate-200 rounded w-24"></div>
        <div className="h-4 bg-slate-200 rounded w-32"></div>
        <div className="h-4 bg-slate-200 rounded w-28"></div>
      </div>
    </header>
    <div className="space-y-6">
      <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
      <div className="h-20 bg-slate-200 rounded"></div>
    </div>
    <footer className="mt-8 pt-6 border-t border-slate-100 text-center">
      <div className="h-12 bg-slate-200 rounded-lg w-full max-w-xs mx-auto"></div>
    </footer>
  </div>
);


const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/issue/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) navigate('/login');
          throw new Error('Could not find the requested issue.');
        }

        const data = await response.json();
        setIssue(data);
      } catch (err) {
        console.error("Fetch issue detail error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssue();
  }, [id, navigate]);

  const handleResolve = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/issue/resolve/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to resolve issue.');
      }

      const updatedIssue = await response.json();
      // Update the UI instantly with the new status
      setIssue(updatedIssue);
    } catch (err) {
      console.error("Resolve error:", err);
      setError("An error occurred while updating the issue.");
    }
  };

  const renderContent = () => {
    if (isLoading) return <SkeletonDetail />;

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-xl shadow-md">
          <FiAlertTriangle className="text-5xl text-red-400 mb-4" />
          <h3 className="text-xl font-semibold text-red-600">An Error Occurred</h3>
          <p className="text-gray-500 mt-2">{error}</p>
        </div>
      );
    }

    if (!issue) return null; // Or a "Not Found" component

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <header className="flex justify-between items-start border-b border-slate-100 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{issue.issueName}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-2"><FiTag /> {issue.issueClassification}</span>
              <span className="flex items-center gap-2"><FiCalendar /> Opened: {new Date(issue.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-2"><FiUser /> Assigned: {issue.assignedTo}</span>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${issue.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {issue.status.toUpperCase()}
          </span>
        </header>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed bg-slate-50 p-4 rounded-lg">{issue.description}</p>
          </div>
          {issue.imageUrl && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Attached Image</h3>
              <img src={issue.imageUrl} alt={issue.issueName} className="w-full rounded-lg shadow-md" />
            </div>
          )}
        </div>
        
        <footer className="mt-8 pt-6 border-t border-slate-100 text-center">
            <motion.button
              onClick={handleResolve}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={issue.status === 'closed'}
              className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCheckCircle /> {issue.status === 'closed' ? 'Issue Resolved' : 'Mark as Resolved'}
            </motion.button>
        </footer>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard">
          <motion.div whileHover={{ x: -5 }} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-semibold mb-8">
            <FiArrowLeft /> Back to Dashboard
          </motion.div>
        </Link>
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default IssueDetail;