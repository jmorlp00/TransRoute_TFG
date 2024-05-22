import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

const Carousel = ({ items, itemStyle  }) => {
  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: true, // Desplazamiento infinito
    speed: 500, // Velocidad del desplazamiento
    slidesToShow: 5, // Mostrar 5 elementos a la vez
    slidesToScroll: 1, // Desplazar un elemento a la vez
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  
  return (
<Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} style={{ padding: '10px' }}>
            <div style={{ ...itemStyle }}>
              {item}
            </div>
          </div>
        ))}
      </Slider>
  );
};

export default Carousel;
