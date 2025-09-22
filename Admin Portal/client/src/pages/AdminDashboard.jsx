import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FiLogOut, FiGrid, FiList, FiBell, FiChevronDown, FiAlertTriangle, FiInbox } from 'react-icons/fi';

// (SkeletonCard component is unchanged)
const SkeletonCard = () => (
  <div className="bg-white p-5 rounded-xl shadow-md animate-pulse">
    <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
    <div className="h-3 bg-slate-200 rounded w-1/2 mb-6"></div>
    <div className="flex justify-between items-center">
      <div className="h-6 bg-slate-200 rounded-full w-20"></div>
      <div className="h-8 bg-slate-200 rounded-lg w-24"></div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = useMemo(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return jwtDecode(token).user;
    } catch (error) {
      return null;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  useEffect(() => {
    const logoutAndRedirect = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const fetchIssues = async () => {
      const token = localStorage.getItem('token');
      if (!token || !user) {
        logoutAndRedirect();
        return;
      }

      try {
        // --- THIS IS THE FIX ---
        // Changed from '/api/issue/' to the correct '/api/issues' endpoint
        const response = await fetch('http://localhost:5000/api/issue', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.error("Authentication error. Logging out.");
            logoutAndRedirect();
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setError("Could not load issues. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, [navigate, user]);

  const activeLinkStyle = {
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
    fontWeight: '600'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };
  
  // A helper function to decide what content to render
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-xl shadow-md">
            <FiAlertTriangle className="text-5xl text-red-400 mb-4" />
            <h3 className="text-xl font-semibold text-red-600">An Error Occurred</h3>
            <p className="text-gray-500 mt-2">{error}</p>
        </div>
      );
    }
    
    if (issues.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-xl shadow-md">
            <FiInbox className="text-5xl text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">All Clear!</h3>
            <p className="text-gray-500 mt-2">There are no issues currently assigned to you.</p>
        </div>
      );
    }

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {issues.map((issue) => (
          <motion.div key={issue._id} variants={itemVariants}>
            <Link to={`/issue/${issue._id}`}>
              <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 truncate">{issue.issueName}</h3>
                  <p className="text-sm text-gray-500 mb-4">{issue.issueClassification}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${issue.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {issue.status.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600">View Details &rarr;</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* Sidebar content ... */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-indigo-600">CivicResolve</h1>
          {user && <p className="text-sm text-gray-500 mt-1">{user.role} Department</p>}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/dashboard" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-slate-100 rounded-lg">
            <FiGrid /> Dashboard
          </NavLink>
          <NavLink to="/issues" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-slate-100 rounded-lg">
            <FiList /> All Issues
          </NavLink>
        </nav>
        <div className="p-4 border-t">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <header className="flex justify-between items-center mb-8">
            {/* Header content ... */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Assigned Issues</h1>
              <p className="text-gray-500 mt-1">Here are the tasks that require your attention.</p>
            </div>
            <div className="flex items-center gap-4">
              <FiBell className="text-gray-500 text-xl hover:text-indigo-600 cursor-pointer"/>
              <div className="flex items-center gap-3 bg-white p-2 rounded-full shadow-sm">
                <img src={`https://i.pravatar.cc/40?u=${user?.email}`} alt="Admin" className="w-8 h-8 rounded-full" />
                {user && <span className="font-semibold text-sm text-gray-700 capitalize">{user.email.split('@')[0]}</span>}
                <FiChevronDown className="text-gray-400" />
              </div>
            </div>
          </header>

          {/* Render content using our helper function */}
          {renderContent()}

        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;