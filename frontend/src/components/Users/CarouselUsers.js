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

const CarouselUsers = ({ users, itemStyle, onUserSelect, onEditUser }) => {
  const settings = {
    dots: true,
    infinite: users.length > 3,
    speed: 500,
    slidesToShow: Math.min(users.length, 5),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  if (users.length === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <div style={{ ...itemStyle, width: '300px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>{`${users[0].name} ${users[0].surname}`}</div>
          <div>{`Email: ${users[0].email}`}</div>
          <div style={{ marginTop: '10px' }}>
            <Button onClick={() => onUserSelect(users[0])} style={{ marginRight: '5px' }}>Ver Detalles</Button>
            <Button onClick={() => onEditUser(users[0])}>Editar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {users.map((user, index) => (
        <div key={index} style={{ padding: '10px' }}>
          <div style={{ ...itemStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>{`${user.name} ${user.surname}`}</div>
            <div>{`Email: ${user.email}`}</div>
            <div style={{ marginTop: '10px' }}>
              <Button onClick={() => onUserSelect(user)} style={{ marginRight: '5px' }}>Ver Detalles</Button>
              <Button onClick={() => onEditUser(user)}>Editar</Button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselUsers;
