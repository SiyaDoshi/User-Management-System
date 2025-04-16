// src/components/admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import { userService } from '../../services/api'; // Import your userService
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const allRoles = ['admin', 'user'];

const UserManagement = () => {
  const { currentUser } = useAuth(); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    roles: []
  });
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    email: '',
    roles: []
  });

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // If you want to show mock data when the API fails (for development)
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Load users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewUser({ name: '', email: '', roles: [] });
  };

  const handleAddUser = async () => {
    try {
      // Your API doesn't have a direct "create user" function, 
      // so you'll need to add one or use a different approach
      const userData = {
        name: newUser.name,
        email: newUser.email,
        roles: newUser.roles
      };
      
      // You'll need to implement this endpoint in your backend
      const response = await userService.createUser(userData);
      
      // Add the new user to the state
      setUsers([...users, response]);
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
  };

  // Edit user dialog
  const handleOpenEditDialog = (user) => {
    setSelectedUser(user);
    setEditUser({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: [...(user.roles || [])]
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleEditUser = async () => {
    try {
      const response = await userService.updateUser(editUser.id, editUser);
      
      // Update the user in the state
      const updatedUsers = users.map(user => 
        user.id === editUser.id ? { ...user, ...response } : user
      );
      setUsers(updatedUsers);
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error editing user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  // Delete user dialog
  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(selectedUser.id);
      
      // Remove the user from the state
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  // Handle changes for new user form
  const handleNewUserChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  // Handle changes for edit user form
  const handleEditUserChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value
    });
  };

  // Handle role selection for new user
  const handleNewUserRoleChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUser({
      ...newUser,
      roles: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // Handle role selection for edit user
  const handleEditUserRoleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEditUser({
      ...editUser,
      roles: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // Don't allow non-admin users to access this page
  if (currentUser && !currentUser.roles?.includes('admin')) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to manage users.</p>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add User
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar src={user.picture} alt={user.name} sx={{ mr: 2 }} />
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.roles && user.roles.map((role) => (
                      <Chip
                        key={role}
                        label={role}
                        color={role === 'admin' ? 'secondary' : 'primary'}
                        size="small"
                        sx={{ mr: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditDialog(user)}
                      aria-label="edit user"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteDialog(user)}
                      aria-label="delete user"
                      // Don't allow deleting yourself
                      disabled={user.id === currentUser?.id}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add User Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details for the new user.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.name}
            onChange={handleNewUserChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={handleNewUserChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="new-user-roles-label">Roles</InputLabel>
            <Select
              labelId="new-user-roles-label"
              id="new-user-roles"
              multiple
              value={newUser.roles}
              onChange={handleNewUserRoleChange}
              input={<OutlinedInput label="Roles" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {allRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the user details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editUser.name}
            onChange={handleEditUserChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={editUser.email}
            onChange={handleEditUserChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="edit-user-roles-label">Roles</InputLabel>
            <Select
              labelId="edit-user-roles-label"
              id="edit-user-roles"
              multiple
              value={editUser.roles || []}
              onChange={handleEditUserRoleChange}
              input={<OutlinedInput label="Roles" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {allRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditUser} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteUser} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;