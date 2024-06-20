import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        marginTop: 4
      }}
    >
      <Typography variant="body1" color="textSecondary">
        © {new Date().getFullYear()} Mi Aplicación
      </Typography>
    </Box>
  );
}
