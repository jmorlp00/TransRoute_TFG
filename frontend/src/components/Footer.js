import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer(){

return (
    <Box
      sx={{
        width: '100%',
        height: '60px', // Ajusta la altura según tus necesidades
        backgroundColor: '#f0f0f0', // Color de fondo del footer
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed', // Puedes cambiar a 'relative' si no quieres que sea fijo
        bottom: 0,
        left: 0,
        zIndex: 1000, // Asegura que esté por encima de otros elementos
      }}
    >
      <Typography variant="body1" color="textSecondary">
        © {new Date().getFullYear()} Mi Aplicación
      </Typography>
    </Box>
  );
}