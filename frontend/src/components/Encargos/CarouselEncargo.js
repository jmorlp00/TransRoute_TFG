import React, { useState, useEffect } from 'react';
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

import { useNavigate, useLocation } from 'react-router-dom';

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

const CarouselEncargos = ({ encargos, itemStyle, onEncargoSelect, onEditEncargo, onDeleteEncargo }) => {
  const settings = {
    dots: true,
    infinite: encargos.length > 3,
    speed: 500,
    slidesToShow: Math.min(encargos.length, 5),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  const location = useLocation();
  const [userRole, setUserRole] = useState(location.state.user.role || "user");
  if (encargos.length === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <div style={{ ...itemStyle, width: '300px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' , height: '200px'}}>
          <div>{`${encargos[0].id}`}</div>
          <div>{`Fecha Salida: ${encargos[0]?.fechaSalida.substring(0, 10)}`}</div>
          <div>{`Fecha Entrega: ${encargos[0]?.fechaEntrega.substring(0, 10)}`}</div>
          <div>{`Transportista: ${encargos[0]?.transportista?.name}`}</div>
          <div>{`Ruta: ${encargos[0]?.ruta?.nombre}`}</div>
          <div style={{ marginTop: '10px' }}>
            <IconButton onClick={() => onEncargoSelect(encargos[0])} style={{ marginRight: '5px' }}><InfoIcon/></IconButton>
            {(userRole === 'admin' || userRole === 'gerente') && (<IconButton onClick={() => onEditEncargo(encargos[0])}><EditIcon/></IconButton>)}
            {(userRole === 'admin' || userRole === 'gerente') && (<IconButton onClick={() => onDeleteEncargo(encargos[0])}><DeleteIcon/></IconButton>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {encargos.map((encargo, index) => (
        <div key={index} style={{ padding: '10px' }}>
          <div style={{ ...itemStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '200px' }}>
            <div>{`${encargo.id}`}</div>
            <div>{`Fecha Salida: ${encargo?.fechaSalida.substring(0, 10)}`}</div>
          <div>{`Fecha Entrega: ${encargo?.fechaEntrega.substring(0, 10)}`}</div>
          <div>{`Transportista: ${encargo?.transportista?.name}`}</div>
          <div>{`Ruta: ${encargo?.ruta?.nombre}`}</div>
            <div style={{ marginTop: '10px' }}>
              <IconButton onClick={() => onEncargoSelect(encargo)} style={{ marginRight: '5px' }}><InfoIcon/></IconButton>
              {(userRole === 'admin' || userRole === 'gerente') &&  (<IconButton onClick={() => onEditEncargo(encargo)}><EditIcon/></IconButton>)}
              {(userRole === 'admin' || userRole === 'gerente') && (<IconButton onClick={() => onDeleteEncargo(encargo)}><DeleteIcon/></IconButton>)}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselEncargos;
