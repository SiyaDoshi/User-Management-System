// src/components/admin/RoleManagement.jsx
import React, { useState } from 'react';
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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

// Mock data for demonstration
const initialRoles = [
  { id: 1, name: 'admin', description: 'Full access to all features' },
  { id: 2, name: 'user', description: 'Basic user with limited access' },
];

const RoleManagement = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: ''
  });
  const [editRole, setEditRole] = useState({
    id: '',
    name: '',
    description: ''
  });

  // Add role dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewRole({ name: '', description: '' });
  };

  const handleAddRole = () => {
    const role = {
      id: roles.length + 1,
      ...newRole
    };
    setRoles([...roles, role]);
    handleCloseAddDialog();
  };

  // Edit role dialog
  const handleOpenEditDialog = (role) => {
    setSelectedRole(role);
    setEditRole({
      id: role.id,
      name: role.name,
      description: role.description
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedRole(null);
  };

  const handleEditRole = () => {
    const updatedRoles = roles.map(role => 
      role.id === editRole.id ? { ...role, ...editRole } : role
    );
    setRoles(updatedRoles);
    handleCloseEditDialog();
  };

  // Delete role dialog
  const handleOpenDeleteDialog = (role) => {
    setSelectedRole(role);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = () => {
    const updatedRoles = roles.filter(role => role.id !== selectedRole.id);
    setRoles(updatedRoles);
    handleCloseDeleteDialog();
  };

  // Handle changes for new role form
  const handleNewRoleChange = (e) => {
    setNewRole({
      ...newRole,
      [e.target.name]: e.target.value
    });
  };

  // Handle changes for edit role form
  const handleEditRoleChange = (e) => {
    setEditRole({
      ...editRole,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add Role
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <Chip
                    label={role.name}
                    color={role.name === 'admin' ? 'secondary' : 'primary'}
                  />
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEditDialog(role)}
                    aria-label="edit role"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteDialog(role)}
                    aria-label="delete role"
                    disabled={role.name === 'admin' || role.name === 'user'} // Prevent deleting default roles
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Role Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details for the new role.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Role Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newRole.name}
            onChange={handleNewRoleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newRole.description}
            onChange={handleNewRoleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddRole} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the role details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Role Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editRole.name}
            onChange={handleEditRoleChange}
            sx={{ mb: 2 }}
            disabled={editRole.name === 'admin' || editRole.name === 'user'} // Prevent editing default role names
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={editRole.description}
            onChange={handleEditRoleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditRole} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Role Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the role "{selectedRole?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteRole} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;