import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Carousel from '../components/Carousel';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Admin() {
  const itemStyle = {
    background: '#a1a',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Añade sombreado
    margin: '10px', // Añade espaciado entre elementos
    borderRadius: '8px' // Añade bordes redondeados
  };

  const items = [
    <div >Item 1</div>,
    <div >Item 2</div>,
    <div >Item 3</div>,
    <div>Item 4</div>,
    <div>Item 5</div>,
    <div >Item 6</div>,
    // Puedes agregar más elementos aquí
  ];
  return (
    <Box >
      <Header />

      <Box >
        <Typography sx={{
        width: '100%',
        height: '60px', // Ajusta la altura según tus necesidades
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>Lista de Usuarios</Typography>
        <Carousel items={items} itemStyle={itemStyle}/>
      </Box>

      


      <Footer />
    </Box>
  );
}