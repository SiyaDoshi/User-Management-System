// src/pages/Dashboard.jsx
import React from 'react';
import { Container, Typography, Paper, Box, Grid, Card, CardContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1">
            Welcome, {currentUser?.name}
          </Typography>
        </Box>
        <Typography variant="body1">
          This is your user management dashboard. Use the cards below to navigate through the system.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid span={4}>
          <Card 
            component={Link} 
            to="/profile"
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              textDecoration: 'none',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <PersonIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
              <Typography gutterBottom variant="h5" component="h2">
                Profile
              </Typography>
              <Typography>
                View and manage your profile information
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            component={Link} 
            to="/settings"
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              textDecoration: 'none',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <SettingsIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
              <Typography gutterBottom variant="h5" component="h2">
                Settings
              </Typography>
              <Typography>
                Configure your account settings and preferences
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Admin Panel (Only visible to admins) */}
        {isAdmin() && (
          <Grid span={4}>
            <Card 
              component={Link} 
              to="/admin"
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                textDecoration: 'none',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <AdminPanelSettingsIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
                <Typography gutterBottom variant="h5" component="h2">
                  Admin Panel
                </Typography>
                <Typography>
                  Manage users, roles, and permissions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;