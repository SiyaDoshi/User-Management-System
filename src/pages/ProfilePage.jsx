// src/pages/ProfilePage.jsx
import React from 'react';
import { Container, Paper, Typography, Avatar, Box, Divider, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={currentUser.picture}
            alt={currentUser.name}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h4" component="h1">
            {currentUser.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {currentUser.email}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h2" gutterBottom>
              Account Details
            </Typography>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">
                User ID
              </Typography>
              <Typography variant="body1">
                {currentUser.id}
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">
                Roles
              </Typography>
              <Typography variant="body1">
                {currentUser.roles.join(', ')}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h2" gutterBottom>
              Account Status
            </Typography>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">
                Status
              </Typography>
              <Typography variant="body1">
                Active
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">
                Authentication Method
              </Typography>
              <Typography variant="body1">
                Google
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;