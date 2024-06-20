import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Ruta from './ShowMap';

const PopupRutaInfo = ({ ruta, onClose }) => {
  return (
    <Dialog open={Boolean(ruta)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{ruta.nombre}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          <strong>Altura:</strong> {ruta.altura}
        </Typography>
        <Typography variant="body1">
          <strong>Longitud:</strong> {ruta.longitud}
        </Typography>
        <Typography variant="body1">
          <strong>MMA:</strong> {ruta.mma}
        </Typography>
        {ruta.coordenadas && ruta.coordenadas.length > 0 && (
          <Box mt={2}>
            <Ruta coordinates={ruta.coordenadas} st={{ height: '40vh', width: '100%' }}/>
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

export default PopupRutaInfo;
