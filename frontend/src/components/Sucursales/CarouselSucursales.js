import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const NextArrow = ({ onClick }) => {
  return (
    <div
      style={{
        display: 'block',
        background: 'rgba(0, 0, 0, 0)',
        padding: '10px',
        borderRadius: '50%',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
        transition: 'background 0.3s'
      }}
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0)'}
    >
      <ArrowForwardIosIcon style={{ color: 'black' }} />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      style={{
        display: 'block',
        background: 'rgba(0, 0, 0, 0)',
        padding: '10px',
        borderRadius: '50%',
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
        transition: 'background 0.3s'
      }}
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0)'}
    >
      <ArrowBackIosIcon style={{ color: 'black' }} />
    </div>
  );
};

const CarouselSucursales = ({ sucursales, itemStyle, onSucursalSelect, onEditSucursal, onDeleteSucursal}) => {
  const settings = {
    dots: true,
    infinite: sucursales.length > 3,
    speed: 500,
    slidesToShow: Math.min(sucursales.length, 5),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  if (sucursales.length === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <div style={{ ...itemStyle, width: '300px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>{`${sucursales[0].nombre}`}</div>
          <div>{`Email: ${sucursales[0].correo}`}</div>
          <div>{`Dirección: ${sucursales[0].direccion}`}</div>
          <div style={{ marginTop: '10px' }}>
            <IconButton onClick={() => onSucursalSelect(sucursales[0])} style={{ marginRight: '5px' }}><InfoIcon/></IconButton>
            <IconButton onClick={() => onEditSucursal(sucursales[0])}><EditIcon/></IconButton>
            <IconButton onClick={() => onDeleteSucursal(sucursales[0])}><DeleteIcon/></IconButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {sucursales.map((sucursal, index) => (
        <div key={index} style={{ padding: '10px' }}>
          <div style={{ ...itemStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>{`${sucursal.nombre}`}</div>
            <div>{`Email: ${sucursal.correo}`}</div>
            <div>{`Dirección: ${sucursal.direccion}`}</div>
            <div style={{ marginTop: '10px' }}>
              <IconButton onClick={() => onSucursalSelect(sucursal)} style={{ marginRight: '5px' }}><InfoIcon/></IconButton>
              <IconButton onClick={() => onEditSucursal(sucursal)}><EditIcon/></IconButton>
              <IconButton onClick={() => onDeleteSucursal(sucursal)}><DeleteIcon/></IconButton>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselSucursales;
