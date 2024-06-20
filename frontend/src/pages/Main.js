import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import CarouselUsers from '../components/Users/CarouselUsers';
import PopupUserInfo from '../components/Users/PopUpUserInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';

import api from '../api/axiosConfig';

import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CarouselSucursales from '../components/Sucursales/CarouselSucursales';
import PopupSucursalInfo from '../components/Sucursales/PopUpSucursalInfo';
import CarouselRutas from '../components/Rutas/CarouselRutas';
import PopupRutaInfo from '../components/Rutas/PopUpRutaInfo';
import CarouselEncargos from '../components/Encargos/CarouselEncargo';
import PopupEncargoInfo from '../components/Encargos/PopUpEncargoInfo';

export default function Main() {
  const location = useLocation();
  const { userRole } = location.state.user.role || "user";
  const itemStyle = {
    background: '#E7E7E7',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    borderRadius: '8px'
  };

  const [users, setUsers] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [encargos, setEncargos] = useState([]);
  const [showPopupUser, setShowPopupUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showPopupSucursal, setShowPopupSucursal] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState(null);

  const [showPopupRuta, setShowPopupRuta] = useState(false);
  const [selectedRuta, setSelectedRuta] = useState(null);

  const [showPopupEncargo, setShowPopupEncargo] = useState(false);
  const [selectedEncargo, setSelectedEncargo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state.user) {
      fetchUsers();
      fetchSucursales();
      fetchRutas();
      fetchEncargos();
      console.log(location.state)
    } else {
      navigate('/', { state: { user: location.state.user } });
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching gerentes:', error);
    }
  };

  const fetchSucursales = async () => {
    try {
      const response = await api.get('sucursal/');
      setSucursales(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching sucursales:', error);
    }
  }

  const fetchRutas = async () => {
    try {
      const response = await api.get('ruta/');
      setRutas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching rutas:', error);
    }
  }

  const fetchEncargos = async () => {
    try {
      const response = await api.get('encargo/');
      setEncargos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching encargo:', error);
    }
  }

  const handleShowPopupUser = (user) => {
    setSelectedUser(user);
    setShowPopupUser(true);
  };

  const handleClosePopupUser = () => {
    setShowPopupUser(false);
    setSelectedUser(null);
  };
  const handleEditUser = (userData) => {
    const initialData = userData;
    const privilegio = userRole;
    navigate(`/userform`, { state: { initialData, privilegio, user: location.state.user } });
  };
  const handleClosePopupSucursal = () => {
    setShowPopupSucursal(false);
    setSelectedSucursal(null);
  };

  const handleShowPopupSucursal = (sucursal) => {
    setSelectedSucursal(sucursal);
    setShowPopupSucursal(true);
  };
  const handleEditSucursal = (sucursalData) => {
    const initialData = sucursalData;
    const privilegio = userRole;
    navigate(`/sucursalform`, { state: { initialData, privilegio, user: location.state.user } });
  };

  const handleClosePopupRuta = () => {
    setShowPopupRuta(false);
    setSelectedRuta(null);
  };

  const handleShowPopupRuta = (ruta) => {
    console.log(ruta);;
    setSelectedRuta(ruta);
    setShowPopupRuta(true);
  };
  const handleEditRuta = (rutaData) => {
    const initialData = rutaData;
    const privilegio = userRole;
    navigate(`/rutaform`, { state: { initialData, user: location.state.user } });
  };

  const handleClosePopupEncargo = () => {
    setShowPopupEncargo(false);
    setSelectedEncargo(null);
  };

  const handleShowPopupEncargo = (encargo) => {
    console.log(encargo);;
    setSelectedEncargo(encargo);
    setShowPopupEncargo(true);
  };
  const handleEditEncargo = (encargoData) => {
    const initialData = encargoData;
    const privilegio = userRole;
    navigate(`/encargoform`, { state: {initialData, privilegio, user: location.state.user }});
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flex: '1 0 auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ marginLeft: 'auto' }}>
            Lista de Usuarios
          </Typography>
          <IconButton onClick={() => navigate('/userform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })} aria-label="add user" color="primary" sx={{ marginLeft: 'auto' }}>
            <AddIcon />
          </IconButton>
        </Box>
        <Box>
          <CarouselUsers users={users} itemStyle={itemStyle} onUserSelect={handleShowPopupUser} onEditUser={handleEditUser} />
        </Box>
        {showPopupUser && selectedUser && (
          <PopupUserInfo user={selectedUser} onClose={handleClosePopupUser} />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '20px', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ marginLeft: 'auto' }}>
            Lista de Sucursales
          </Typography>
          <IconButton onClick={() => navigate('/sucursalform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })} aria-label="add sucursal" color="primary" sx={{ marginLeft: 'auto' }}>
            <AddIcon />
          </IconButton>
        </Box>
        <Box>
          <CarouselSucursales sucursales={sucursales} itemStyle={itemStyle} onSucursalSelect={handleShowPopupSucursal} onEditSucursal={handleEditSucursal} />
        </Box>
        {showPopupSucursal && selectedSucursal && (
          <PopupSucursalInfo sucursal={selectedSucursal} onClose={handleClosePopupSucursal} />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '20px', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ marginLeft: 'auto' }}>
            Lista de Rutas
          </Typography>
          <IconButton onClick={() => navigate('/rutaform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })} aria-label="add ruta" color="primary" sx={{ marginLeft: 'auto' }}>
            <AddIcon />
          </IconButton>
        </Box>
        <Box>
          <CarouselRutas rutas={rutas} itemStyle={itemStyle} onRutaSelect={handleShowPopupRuta} onEditRuta={handleEditRuta} />
        </Box>
        {showPopupRuta && selectedRuta && (
          <PopupRutaInfo ruta={selectedRuta} onClose={handleClosePopupRuta} />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '20px', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ marginLeft: 'auto' }}>
            Lista de Encargos
          </Typography>
          <IconButton onClick={() => navigate('/encargoform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })} aria-label="add encargo" color="primary" sx={{ marginLeft: 'auto' }}>
            <AddIcon />
          </IconButton>
        </Box>
        <Box>
          <CarouselEncargos encargos={encargos} itemStyle={itemStyle} onEncargoSelect={handleShowPopupEncargo} onEditEncargo={handleEditEncargo} />
        </Box>
        {showPopupEncargo && selectedEncargo && (
          <PopupEncargoInfo encargo={selectedEncargo} onClose={handleClosePopupEncargo} />
        )}
      </Box>
      <Footer />
    </Box>
  );
}
