// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ requiredRole }) => {
  const { currentUser, loading, hasRole } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return <Loading />;
  }

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If role is required but user doesn't have it, show unauthorized
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;