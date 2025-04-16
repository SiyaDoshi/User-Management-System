 // src/components/admin/PermissionManagement.jsx
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

// Mock data for demonstration
const initialPermissions = [
  { id: 1, name: 'manage_users', description: 'Can add, delete and modify users' },
  { id: 2, name: 'view_users', description: 'Can view user list' },
];

const initialRoles = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'user' },
];

const initialRolePermissions = [
  { roleId: 1, permissions: [1, 2] }, // admin role has all permissions
  { roleId: 2, permissions: [2] }, // user role can only view users
];

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [roles] = useState(initialRoles);
  const [rolePermissions, setRolePermissions] = useState(initialRolePermissions);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [newPermission, setNewPermission] = useState({
    name: '',
    description: ''
  });
  const [editPermission, setEditPermission] = useState({
    id: '',
    name: '',
    description: ''
  });
  const [permissionAssignment, setPermissionAssignment] = useState({
    roleId: '',
    permissions: []
  });

  // Add permission dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewPermission({ name: '', description: '' });
  };

  const handleAddPermission = () => {
    const permission = {
      id: permissions.length + 1,
      ...newPermission
    };
    setPermissions([...permissions, permission]);
    handleCloseAddDialog();
  };

  // Edit permission dialog
  const handleOpenEditDialog = (permission) => {
    setSelectedPermission(permission);
    setEditPermission({
      id: permission.id,
      name: permission.name,
      description: permission.description
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedPermission(null);
  };

  const handleEditPermission = () => {
    const updatedPermissions = permissions.map(permission => 
      permission.id === editPermission.id ? { ...permission, ...editPermission } : permission
    );
    setPermissions(updatedPermissions);
    handleCloseEditDialog();
  };

  // Delete permission dialog
  const handleOpenDeleteDialog = (permission) => {
    setSelectedPermission(permission);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedPermission(null);
  };

  const handleDeletePermission = () => {
    const updatedPermissions = permissions.filter(permission => permission.id !== selectedPermission.id);
    setPermissions(updatedPermissions);
    
    // Also remove this permission from all roles
    const updatedRolePermissions = rolePermissions.map(rp => ({
      ...rp,
      permissions: rp.permissions.filter(p => p !== selectedPermission.id)
    }));
    setRolePermissions(updatedRolePermissions);
    
    handleCloseDeleteDialog();
  };

  // Assign permissions dialog
  const handleOpenAssignDialog = () => {
    setPermissionAssignment({
      roleId: '',
      permissions: []
    });
    setOpenAssignDialog(true);
  };

  const handleCloseAssignDialog = () => {
    setOpenAssignDialog(false);
  };

  const handleAssignPermissions = () => {
    const { roleId, permissions: selectedPermissions } = permissionAssignment;
    
    // Find if this role already has permissions assigned
    const existingRolePermIdx = rolePermissions.findIndex(rp => rp.roleId === roleId);
    
    if (existingRolePermIdx >= 0) {
      // Update existing role permissions
      const updatedRolePermissions = [...rolePermissions];
      updatedRolePermissions[existingRolePermIdx] = {
        roleId,
        permissions: selectedPermissions
      };
      setRolePermissions(updatedRolePermissions);
    } else {
      // Add new role permissions
      setRolePermissions([
        ...rolePermissions,
        { roleId, permissions: selectedPermissions }
      ]);
    }
    
    handleCloseAssignDialog();
  };

  // Handle changes for new permission form
  const handleNewPermissionChange = (e) => {
    setNewPermission({
      ...newPermission,
      [e.target.name]: e.target.value
    });
  };

  // Handle changes for edit permission form
  const handleEditPermissionChange = (e) => {
    setEditPermission({
      ...editPermission,
      [e.target.name]: e.target.value
    });
  };

  // Handle role selection for permission assignment
  const handleRoleChange = (e) => {
    const roleId = Number(e.target.value);
    const existingPermissions = rolePermissions.find(rp => rp.roleId === roleId)?.permissions || [];
    
    setPermissionAssignment({
      roleId,
      permissions: existingPermissions
    });
  };

  // Handle permission selection for assignment
  const handlePermissionSelectionChange = (event) => {
    const {
      target: { value },
    } = event;
    
    setPermissionAssignment({
      ...permissionAssignment,
      permissions: typeof value === 'string' ? value.split(',').map(Number) : value,
    });
  };

  // Get role name by ID
  const getRoleName = (roleId) => {
    return roles.find(r => r.id === roleId)?.name || 'Unknown';
  };

  // Get permission name by ID
  const getPermissionName = (permissionId) => {
    return permissions.find(p => p.id === permissionId)?.name || 'Unknown';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenAssignDialog}
        >
          Assign Permissions to Roles
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add Permission
        </Button>
      </Box>

      {/* Permissions List */}
      <Typography variant="h6" gutterBottom>
        All Permissions
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Permission Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEditDialog(permission)}
                    aria-label="edit permission"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteDialog(permission)}
                    aria-label="delete permission"
                    disabled={permission.name === 'manage_users' || permission.name === 'view_users'} // Prevent deleting default permissions
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Role Permissions List */}
      <Typography variant="h6" gutterBottom>
        Role Permissions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>Permissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rolePermissions.map((rp) => (
              <TableRow key={rp.roleId}>
                <TableCell>
                  <Chip
                    label={getRoleName(rp.roleId)}
                    color={getRoleName(rp.roleId) === 'admin' ? 'secondary' : 'primary'}
                  />
                </TableCell>
                <TableCell>
                  {rp.permissions.map((permId) => (
                    <Chip
                      key={permId}
                      label={getPermissionName(permId)}
                      size="small"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </TableCell>
              </TableRow>
              // Continue from the previous PermissionManagement.jsx code
            ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Add Permission Dialog */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Add New Permission</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the details for the new permission.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Permission Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newPermission.name}
              onChange={handleNewPermissionChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={newPermission.description}
              onChange={handleNewPermissionChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Cancel</Button>
            <Button onClick={handleAddPermission} variant="contained" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Edit Permission Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Permission</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update the permission details.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Permission Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editPermission.name}
              onChange={handleEditPermissionChange}
              sx={{ mb: 2 }}
              disabled={editPermission.name === 'manage_users' || editPermission.name === 'view_users'} // Prevent editing default permission names
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={editPermission.description}
              onChange={handleEditPermissionChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleEditPermission} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Delete Permission Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Delete Permission</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the permission "{selectedPermission?.name}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={handleDeletePermission} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Assign Permissions to Role Dialog */}
        <Dialog open={openAssignDialog} onClose={handleCloseAssignDialog}>
          <DialogTitle>Assign Permissions to Role</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select a role and assign permissions to it.
            </DialogContentText>
            <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={permissionAssignment.roleId}
                onChange={handleRoleChange}
                label="Role"
              >
                <MenuItem value="">
                  <em>Select a role</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            {permissionAssignment.roleId && (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="permission-select-label">Permissions</InputLabel>
                <Select
                  labelId="permission-select-label"
                  id="permission-select"
                  multiple
                  value={permissionAssignment.permissions}
                  onChange={handlePermissionSelectionChange}
                  input={<OutlinedInput label="Permissions" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={getPermissionName(value)} />
                      ))}
                    </Box>
                  )}
                >
                  {permissions.map((permission) => (
                    <MenuItem key={permission.id} value={permission.id}>
                      {permission.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAssignDialog}>Cancel</Button>
            <Button 
              onClick={handleAssignPermissions} 
              variant="contained" 
              color="primary"
              disabled={!permissionAssignment.roleId}
            >
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  export default PermissionManagement;