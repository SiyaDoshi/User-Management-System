import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

// Create the context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Handles login with Google ID token sent to backend
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      const token = credentialResponse.credential;

      // Use the authService
      const data = await authService.googleLogin(token);
      
      const user = data.user;
      const jwt = data.token;

      // Store token and user
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);

      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error.response?.data || error.message);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  // Role check helpers
  const hasRole = (role) => {
    if (!currentUser || !currentUser.roles) return false;
    return currentUser.roles.includes(role);
  };

  const isAdmin = () => hasRole('admin');

  const forceAdminRole = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        roles: [...new Set([...currentUser.roles, 'admin'])],
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log('Admin role forcibly added');
    }
  };

  const getUserInfo = () => currentUser;

  const value = {
    currentUser,
    loading,
    handleGoogleLogin,
    logout,
    hasRole,
    isAdmin,
    forceAdminRole,
    getUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;