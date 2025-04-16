// src/pages/LoginPage.jsx
import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { currentUser, handleGoogleLogin } = useAuth();

  // If already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            Tapistro UMS
          </Typography>
          <Typography component="p" variant="body1" sx={{ mb: 4 }}>
            Sign in to access your account
          </Typography>

          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
              theme="filled_blue"
              shape="rectangular"
              text="signin_with"
              size="large"
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;