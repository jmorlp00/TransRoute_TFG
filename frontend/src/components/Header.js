import * as React from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, useLocation } from 'react-router-dom';
export default function Header(){
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
return (
    <BottomNavigation

    showLabels
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
  >
    <BottomNavigationAction label="Recents" icon={<RestoreIcon />}  sx={{ marginX: 10 }} onClick={() => navigate('/ruta')}/>
    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} sx={{ marginX: 10 }}/>
    {true && <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} sx={{ marginX: 10 }}/>}
  </BottomNavigation>
  );
}