// src/pages/DevTools.jsx
import React, { useState } from 'react';
import { Button, Container, Paper, Typography, TextField } from '@mui/material';

const DevTools = () => {
  const [email, setEmail] = useState('');
  
  const createAdminUser = () => {
    // Create a sample admin user
    const adminUser = {
      id: 'admin-' + Date.now(),
      name: 'Admin User',
      email: email || 'admin@example.com',
      picture: '',
      roles: ['admin', 'user']
    };
    
    // Store in localStorage
    localStorage.setItem('token', 'admin-token');
    localStorage.setItem('user', JSON.stringify(adminUser));
    
    alert('Admin user created! Redirecting to dashboard...');
    window.location.href = '/dashboard';
  };
  
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>Developer Tools</Typography>
        <Typography variant="body2" paragraph>
          Create an admin user for testing purposes.
        </Typography>
        
        <TextField
          label="Admin Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
        />
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={createAdminUser}
          sx={{ mt: 2 }}
        >
          Create Admin User
        </Button>
      </Paper>
    </Container>
  );
};

export default DevTools;