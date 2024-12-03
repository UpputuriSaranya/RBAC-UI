import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Permissions = () => {
  const [permissions, setPermissions] = useState([
    { id: 1, name: 'View Dashboard', description: 'Allows viewing the dashboard' },
    { id: 2, name: 'Manage Users', description: 'Allows managing users' },
  ]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPermission, setCurrentPermission] = useState({ id: null, name: '', description: '' });

  const handleAddEditPermission = () => {
    if (editMode) {
      setPermissions(permissions.map(permission => 
        permission.id === currentPermission.id ? currentPermission : permission
      ));
    } else {
      const nextId = permissions.length > 0 ? Math.max(...permissions.map(p => p.id)) + 1 : 1;
      setPermissions([...permissions, { id: nextId, ...currentPermission }]);
    }
    setOpen(false);
    setCurrentPermission({ id: null, name: '', description: '' });
    setEditMode(false);
  };

  const handleDeletePermission = (id) => {
    const updatedPermissions = permissions
      .filter(permission => permission.id !== id)
      .map((permission, index) => ({ ...permission, id: index + 1 }));
    setPermissions(updatedPermissions);
  };

  const handleEditPermission = (permission) => {
    setCurrentPermission(permission);
    setEditMode(true);
    setOpen(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditMode(false);
          setCurrentPermission({ id: null, name: '', description: '' });
          setOpen(true);
        }}
        style={{ marginBottom: '20px' }}
      >
        Add Permission
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map(permission => (
            <TableRow key={permission.id}>
              <TableCell>{permission.id}</TableCell>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.description}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => handleEditPermission(permission)}>Edit</Button>
                <Button color="error" onClick={() => handleDeletePermission(permission.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Permission Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? 'Edit Permission' : 'Add Permission'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Permission Name"
            fullWidth
            margin="dense"
            value={currentPermission.name}
            onChange={(e) => setCurrentPermission({ ...currentPermission, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={currentPermission.description}
            onChange={(e) => setCurrentPermission({ ...currentPermission, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddEditPermission} color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Permissions;
