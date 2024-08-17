import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PopUpDelete = ({ data, onClose, onDelete, type }) => {
    const getMessage = () => {
        switch (type) {
            case 'user':
                return `Usuario: ${data?.name || 'Nombre no disponible'}`;
            case 'sucursal':
                return `Sucursal: ${data?.nombre || 'Nombre no disponible'}`;
            case 'encargo':
                return `Encargo ID: ${data?.id || 'ID no disponible'}`;
            default:
                return 'Elemento no especificado';
        }
    };

    const getTitle = () => {
        switch (type) {
          case 'user':
            return '¿Desea eliminar el siguiente usuario?';
          case 'sucursal':
            return '¿Desea eliminar la siguiente sucursal?';
          case 'encargo':
            return '¿Desea eliminar el siguiente encargo?';
          default:
            return '¿Desea eliminar el siguiente elemento?';
        }
      };

    return (
        <Dialog open={Boolean(data)} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1">
                    {getMessage()}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onDelete} color="primary">
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default PopUpDelete;
