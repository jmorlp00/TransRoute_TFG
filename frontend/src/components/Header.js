import React, { useState, useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RouteIcon from '@mui/icons-material/Route';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../logo.jfif';


export default function Header() {
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [userRole, setUserRole] = React.useState(location.state.user.role || "user");
  useEffect(() => {
    console.log(location.state.user)
    if(location.state.user){
      setUserRole(location.state.user.role || "user")
    }else{
      navigate('/', { replace: true });
    }
      
  }, [location.state]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{ backgroundColor: '#E5E7E6' }}
    >

      <BottomNavigationAction  
        icon={<img src={logo} alt="Logo" style={{ width: 52, height: 52 }} />} 
        sx={{ marginX: 1, marginRight: 'auto'}} 
        onClick={() => navigate(`/main`, { state: {user:location.state.user} })} 
      />


      {userRole === 'admin' && (
        <>
          <BottomNavigationAction 
            label="Create User" 
            icon={<PersonAddIcon />} 
            sx={{ marginX: 1 }} 
            onClick={() => navigate('/userform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })}
          />
          <BottomNavigationAction 
            label="Create Branch" 
            icon={<StorefrontIcon />} 
            sx={{ marginX: 1 }} 
            onClick={() => navigate('/sucursalform',{ state: { initialData: null, privilegio: userRole, user: location.state.user } })}
          />
          <BottomNavigationAction 
            label="Create Route" 
            icon={<RouteIcon />} 
            sx={{ marginX: 1 }} 
            onClick={() => navigate('/rutaform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })}
          />
        </>
      )}
      {userRole === 'gerente' && (
        <>
          <BottomNavigationAction 
            label="Create User" 
            icon={<PersonAddIcon />} 
            sx={{ marginX: 1 }} 
            onClick={() => navigate('/userform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })}
          />
          <BottomNavigationAction 
            label="Create Route" 
            icon={<RouteIcon />} 
            sx={{ marginX: 1 }} 
            onClick={() => navigate('/rutaform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })}
          />
          <BottomNavigationAction 
            label="Create Task" 
            icon={<AssignmentIcon />} 
            sx={{ marginX: 1 }} 
            onClick={() => navigate('/encargoform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })}
          />
        </>
      )}

      <BottomNavigationAction 
        label="Perfil" 
        icon={<AccountCircleIcon />} 
        sx={{ marginX: 1, marginLeft: 'auto' }} 
        onClick={() => navigate('/userform', { state: { initialData:location.state.user, privilegio: userRole, user: location.state.user } })}
      />
      <BottomNavigationAction 
        label="Logout" 
        icon={<LogoutIcon />} 
        sx={{ marginX: 1 }} 
        onClick={() => navigate('/', { replace: true })}
      />
    </BottomNavigation>
  );
}
