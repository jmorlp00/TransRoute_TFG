import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';

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

const CarouselEncargos = ({ encargos, itemStyle, onEncargoSelect, onEditEncargo }) => {
  const settings = {
    dots: true,
    infinite: encargos.length > 3,
    speed: 500,
    slidesToShow: Math.min(encargos.length, 5),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  if (encargos.length === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <div style={{ ...itemStyle, width: '300px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>{`${encargos[0].id}`}</div>
          <div>{`Fecha Salida: ${encargos[0].fechaSalida.substring(0, 10)}`}</div>
          <div>{`Fecha Entrega: ${encargos[0].fechaEntrega.substring(0, 10)}`}</div>
          <div>{`Transportista: ${encargos[0].transportista.name}`}</div>
          <div>{`Ruta: ${encargos[0].ruta.nombre}`}</div>
          <div style={{ marginTop: '10px' }}>
            <Button onClick={() => onEncargoSelect(encargos[0])} style={{ marginRight: '5px' }}>Ver Detalles</Button>
            <Button onClick={() => onEditEncargo(encargos[0])}>Editar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {encargos.map((encargo, index) => (
        <div key={index} style={{ padding: '10px' }}>
          <div style={{ ...itemStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '180px' }}>
            <div>{`${encargo.id}`}</div>
            <div>{`Fecha Salida: ${encargo.fechaSalida.substring(0, 10)}`}</div>
          <div>{`Fecha Entrega: ${encargo.fechaEntrega.substring(0, 10)}`}</div>
          <div>{`Transportista: ${encargo.transportista.name}`}</div>
          <div>{`Ruta: ${encargo.ruta.nombre}`}</div>
            <div style={{ marginTop: '10px' }}>
              <Button onClick={() => onEncargoSelect(encargo)} style={{ marginRight: '5px' }}>Ver Detalles</Button>
              <Button onClick={() => onEditEncargo(encargo)}>Editar</Button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselEncargos;
