import axios from 'axios';


const API_URL = 'http://localhost:5050/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  googleLogin: async (credential) => {
    const response = await axios.post(`${API_URL}/auth/google`, { token: credential });
    return response.data;
  }
};

// User services
export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
  
  assignRole: async (id, role) => {
    const response = await api.post(`/users/${id}/roles`, { role });
    return response.data;
  },
  
  removeRole: async (id, role) => {
    const response = await api.delete(`/users/${id}/roles`, { data: { role } });
    return response.data;
  }
};

// Role services
export const roleService = {
  getAllRoles: async () => {
    const response = await api.get('/roles');
    return response.data;
  },
  
  createRole: async (roleData) => {
    const response = await api.post('/roles', roleData);
    return response.data;
  },
  
  updateRole: async (id, roleData) => {
    const response = await api.put(`/roles/${id}`, roleData);
    return response.data;
  },
  
  deleteRole: async (id) => {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  }
};

// Permission services
export const permissionService = {
  getAllPermissions: async () => {
    const response = await api.get('/permissions');
    return response.data;
  },
  
  createPermission: async (permissionData) => {
    const response = await api.post('/permissions', permissionData);
    return response.data;
  },
  
  updatePermission: async (id, permissionData) => {
    const response = await api.put(`/permissions/${id}`, permissionData);
    return response.data;
  },
  
  deletePermission: async (id) => {
    const response = await api.delete(`/permissions/${id}`);
    return response.data;
  },
  
  assignPermissionToRole: async (roleId, permissionId) => {
    const response = await api.post('/role-permissions', { roleId, permissionId });
    return response.data;
  },
  
  removePermissionFromRole: async (roleId, permissionId) => {
    const response = await api.delete('/role-permissions', { 
      data: { roleId, permissionId } 
    });
    return response.data;
  }
};

export default api;