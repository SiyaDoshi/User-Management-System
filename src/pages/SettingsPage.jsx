import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Switch,
  FormControlLabel,
  Button,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useAuth } from '../contexts/AuthContext';
import { useThemeToggle } from '../contexts/ThemeContext';

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const { darkMode, toggleTheme } = useThemeToggle();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  if (!currentUser) return null;

  const handleSaveSettings = () => {
    console.log('Saved settings:', { darkMode });
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Manage your account settings and preferences
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <List>
          <ListItem>
            <ListItemIcon><LanguageIcon /></ListItemIcon>
            <ListItemText
              primary="Dark Mode"
              secondary="Enable dark mode for the application"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleTheme}
                  name="darkMode"
                />
              }
              label=""
            />
          </ListItem>
        </List>

        <Box mt={4} textAlign="right">
          <Button variant="contained" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">Settings saved successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default SettingsPage;