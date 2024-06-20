import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PopupUserInfo = ({ user, onClose }) => {
  return (
    <Dialog open={Boolean(user)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user.name} {user.surname}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>Age:</strong> {user.age}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {user.role}
        </Typography>
        {(user.role === 'gerente' || user.role === 'transportista') && (
          <Box >
            <Typography variant="body1">
              <strong>Sucursal:</strong> {user.sucursalId.nombre} ({user.sucursalId.direccion})
            </Typography>
          </Box>
        )}
        {user.role === 'transportista' && (
          <Box >
            <Typography variant="body1">
              <strong>Gerenete:</strong> {user.gerenteId.name} {user.gerenteId.surname}
            </Typography>
            <Typography variant="body1">
              <strong>Matrícula:</strong> {user.matricula}
            </Typography>
            <Typography variant="body1">
              <strong>MMA:</strong> {user.mma}
            </Typography>
            <Typography variant="body1">
              <strong>Altura:</strong> {user.altura}
            </Typography>
            <Typography variant="body1">
              <strong>Longitud:</strong> {user.longitud}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupUserInfo;
