// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import IssueDetail from './pages/IssueDetail';
import AllIssues from './pages/AllIssues';
import ProtectedRoute from './Components/ProtectedRoute'; // Assuming you have this
import { Navigate } from 'react-router-dom';

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Make sure dashboard is the default protected route */}
        <Route path="/" element={<ProtectedRoute><Navigate to="/dashboard" /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/issue/:id" element={<ProtectedRoute><IssueDetail /></ProtectedRoute>} />
        <Route path="/issues" element={<ProtectedRoute><AllIssues /></ProtectedRoute>} /> {/* <-- ADD THIS ROUTE */}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;