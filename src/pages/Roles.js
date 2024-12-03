import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Roles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', description: 'Has full access to the system' },
    { id: 2, name: 'Editor', description: 'Can edit content' },
  ]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState({ id: null, name: '', description: '' });

  const handleAddEditRole = () => {
    if (editMode) {
      setRoles(roles.map(role => 
        role.id === currentRole.id ? currentRole : role
      ));
    } else {
      const nextId = roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1;
      setRoles([...roles, { id: nextId, ...currentRole }]);
    }
    setOpen(false);
    setCurrentRole({ id: null, name: '', description: '' });
    setEditMode(false);
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles
      .filter(role => role.id !== id)
      .map((role, index) => ({ ...role, id: index + 1 }));
    setRoles(updatedRoles);
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
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
          setCurrentRole({ id: null, name: '', description: '' });
          setOpen(true);
        }}
        style={{ marginBottom: '20px' }}
      >
        Add Role
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
          {roles.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => handleEditRole(role)}>Edit</Button>
                <Button color="error" onClick={() => handleDeleteRole(role.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Role Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? 'Edit Role' : 'Add Role'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            margin="dense"
            value={currentRole.name}
            onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={currentRole.description}
            onChange={(e) => setCurrentRole({ ...currentRole, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddEditRole} color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Roles;
