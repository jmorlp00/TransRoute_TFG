import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Ruta from '../Rutas/ShowMap';

const PopupEncargoInfo = ({ encargo, onClose }) => {
  return (
    <Dialog open={Boolean(encargo)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{encargo.id}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          <strong>Fecha Salida:</strong> {encargo.fechaSalida.substring(0, 10)}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha Entrega:</strong> {encargo.fechaEntrega.substring(0, 10)}
        </Typography>
        <Typography variant="body1">
          <strong>Transportista:</strong> {encargo.transportista.name} {encargo.transportista.surname}
        </Typography>
        <Typography variant="body1">
          <strong>Ruta:</strong> {encargo.ruta.nombre}
        </Typography>
        {encargo.ruta.coordenadas && encargo.ruta.coordenadas.length > 0 && (
          <Box mt={2}>
            <Ruta coordinates={encargo.ruta.coordenadas}  st={{ height: '40vh', width: '100%' }}/>
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

export default PopupEncargoInfo;
