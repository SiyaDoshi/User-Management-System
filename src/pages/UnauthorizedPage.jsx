// src/pages/UnauthorizedPage.jsx
import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
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
          <LockIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            Access Denied
          </Typography>
          <Typography component="p" variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
            You don't have permission to access this page. Please contact an administrator if you believe this is an error.
          </Typography>
          <Button
            component={Link}
            to="/dashboard"
            variant="contained"
            color="primary"
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;