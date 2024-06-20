import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PopupSucursalInfo = ({ sucursal, onClose }) => {
  return (
    <Dialog open={Boolean(sucursal)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{sucursal.nombre} </DialogTitle>
      <DialogContent dividers>
      <Typography variant="body1">
          <strong>Dirección:</strong> {sucursal.direccion}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {sucursal.correo}
        </Typography>
        <Typography variant="body1">
          <strong>Telefono:</strong> {sucursal.telefono}
        </Typography>
        
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupSucursalInfo;
