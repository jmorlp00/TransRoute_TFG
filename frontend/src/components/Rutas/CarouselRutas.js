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

const CarouselRutas = ({ rutas, itemStyle, onRutaSelect, onEditRuta }) => {
  const settings = {
    dots: true,
    infinite: rutas.length > 3,
    speed: 500,
    slidesToShow: Math.min(rutas.length, 5),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  if (rutas.length === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <div style={{ ...itemStyle, width: '300px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>{`${rutas[0].nombre}`}</div>
          <div>{`Email: ${rutas[0].altura}`}</div>
          <div>{`Longitud: ${rutas[0].longitud}`}</div>
          <div>{`MMA: ${rutas[0].mma}`}</div>
          <div style={{ marginTop: '10px' }}>
            <Button onClick={() => onRutaSelect(rutas[0])} style={{ marginRight: '5px' }}>Ver Detalles</Button>
            <Button onClick={() => onEditRuta(rutas[0])}>Editar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {rutas.map((ruta, index) => (
        <div key={index} style={{ padding: '10px' }}>
          <div style={{ ...itemStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>{`${ruta.nombre}`}</div>
            <div>{`Altura: ${ruta.altura}`}</div>
          <div>{`Longitud: ${ruta.longitud}`}</div>
          <div>{`MMA: ${ruta.mma}`}</div>
            <div style={{ marginTop: '10px' }}>
              <Button onClick={() => onRutaSelect(ruta)} style={{ marginRight: '5px' }}>Ver Detalles</Button>
              <Button onClick={() => onEditRuta(ruta)}>Editar</Button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselRutas;
