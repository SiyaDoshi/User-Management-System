// src/pages/AdminPage.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import UserManagement from '../components/admin/UserManagement';
import RoleManagement from '../components/admin/RoleManagement';
import PermissionManagement from '../components/admin/PermissionManagement';

const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Panel
        </Typography>
        <Typography variant="body1" paragraph>
          Manage users, roles, and permissions for the system.
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
            <Tab label="User Management" />
            <Tab label="Role Management" />
            <Tab label="Permission Management" />
          </Tabs>
        </Box>

        {tabValue === 0 && <UserManagement />}
        {tabValue === 1 && <RoleManagement />}
        {tabValue === 2 && <PermissionManagement />}
      </Paper>
    </Container>
  );
};

export default AdminPage;