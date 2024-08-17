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
import PopUpDelete from '../components/PopUpDelete';

export default function Main() {
  const location = useLocation();
  const [userRole, setUserRole] = useState(location.state.user.role || "user");
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

  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    if (location.state == null) {
      navigate('/', { replace: true });
    } else {
      if (location.state.user == null) {
        navigate('/', { replace: true });
      } else {
        setUserRole(location.state.user.role);
        fetchUsers();
        fetchSucursales();
        fetchRutas();
        fetchEncargos();
      }
    }
    console.log(encargos)

  }, []);

  const fetchUsers = async () => {
    try {
      // Obtener todos los usuarios
      const response = await api.get('users/');
      const allUsers = response.data;
      console.log(allUsers);
      // Filtrar usuarios si el rol es 'gerente'
      if (userRole === 'gerente') {
        const filteredUsers = allUsers.filter(user =>
          user.sucursalId?.id === location.state.user.sucursalId?.id
          &&
          user.id != location.state.user.id
          &&
          user.role === 'transportista'
        );
        setUsers(filteredUsers);
      } else {
        // Si el rol no es 'gerente', mostrar todos los usuarios
        setUsers(allUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSucursales = async () => {
    try {
      const response = await api.get('sucursal/');
      setSucursales(response.data);

    } catch (error) {
      console.error('Error fetching sucursales:', error);
    }
  }

  const fetchRutas = async () => {
    try {
      const response = await api.get('ruta/');
      setRutas(response.data);

    } catch (error) {
      console.error('Error fetching rutas:', error);
    }
  }

  const fetchEncargos = async () => {
    try {
      // Obtener todos los encargos
      const response = await api.get('encargo/');
      const allEncargos = response.data;
      console.log(userRole);

      // Filtrar encargos para incluir solo aquellos donde el transportista tiene el mismo sucursalId
      if (location.state.user.role === 'gerente') {
        const filteredEncargos = allEncargos.filter(encargo =>
          encargo.transportista?.sucursalId?.id === location.state.user.sucursalId?.id
        );
        setEncargos(filteredEncargos);
      } else {
        const filteredEncargos = allEncargos.filter(encargo =>
          encargo.transportista?.id === location.state.user.id
        );
        setEncargos(filteredEncargos);
      }


      // Actualizar el estado con los encargos filtrados

      console.log(encargos);
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

  const handleDelete = async () => {
    console.log(deleteData)
    if (deleteType === "user") {
      try {
        await api.delete(`users/${deleteData.id}`);
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== deleteData.id));

      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }else if(deleteType === "sucursal"){
      try {
        await api.delete(`sucursal/${deleteData.id}`);
        setSucursales((prevSucursales) => prevSucursales.filter(sucursal => sucursal.id !== deleteData.id));

      } catch (error) {
        console.error('Error deletin sucursal:', error);
      }
    }else if(deleteType === "encargo"){
      try {
        await api.delete(`encargo/${deleteData.id}`);
        setEncargos((prevEncargos) => prevEncargos.filter(encargo => encargo.id !== deleteData.id));

      } catch (error) {
        console.error('Error deletin sucursal:', error);
      }
    }


    setShowDelete(false);
  };
  const handleClosePopupDelete = () => {
    setDeleteData(null);
    setShowDelete(false);
    setDeleteType("");
  };
  const handleShowPopDeleteUser = (data) => {
    setDeleteData(data);
    setShowDelete(true);
    setDeleteType("user");
  }

  const handleShowPopDeleteSucursal = (data) => {
    setDeleteData(data);
    setShowDelete(true);
    setDeleteType("sucursal");
  }

  const handleShowPopDeleteEncargo = (data) => {
    setDeleteData(data);
    setShowDelete(true);
    setDeleteType("encargo");
  }
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
    navigate(`/encargoform`, { state: { initialData, privilegio, user: location.state.user } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flex: '1 0 auto' }}>
        {/* Lista de Usuarios */}
        {(userRole === 'admin' || userRole === 'gerente') && (<Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ marginLeft: 'auto' }}>
            Lista de Usuarios
          </Typography>
          <IconButton
            onClick={() => navigate('/userform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })}
            aria-label="add user"
            color="primary"
            sx={{ marginLeft: 'auto' }}
          >
            <AddIcon />
          </IconButton>
        </Box>)}
        {(userRole === 'admin' || userRole === 'gerente') && (<Box>
          {users.length > 0 ? (<CarouselUsers
            users={users}
            itemStyle={itemStyle}
            onUserSelect={handleShowPopupUser}
            onEditUser={handleEditUser}
            onDeleteUser={handleShowPopDeleteUser}
          />) : (
            <Typography variant='h6' sx={{ textAlign: 'center' }}>
              No hay usuarios todavía
            </Typography>)}
        </Box>)}
        {showPopupUser && selectedUser && (
          <PopupUserInfo
            user={selectedUser}
            onClose={handleClosePopupUser}
          />
        )}

        {/* Lista de Sucursales */}
        {userRole === 'admin' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '20px', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ marginLeft: 'auto' }}>
              Lista de Sucursales
            </Typography>
            <IconButton
              onClick={() => navigate('/sucursalform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })}
              aria-label="add sucursal"
              color="primary"
              sx={{ marginLeft: 'auto' }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
        {userRole === 'admin' && (
          <Box>
            {sucursales.length > 0 ? (<CarouselSucursales
              sucursales={sucursales}
              itemStyle={itemStyle}
              onSucursalSelect={handleShowPopupSucursal}
              onEditSucursal={handleEditSucursal}
              onDeleteSucursal={handleShowPopDeleteSucursal}
            />) : (
              <Typography variant='h6' sx={{ textAlign: 'center' }}>
                No hay sucursales todavía
              </Typography>)}
          </Box>
        )}
        {showPopupSucursal && selectedSucursal && (
          <PopupSucursalInfo
            sucursal={selectedSucursal}
            onClose={handleClosePopupSucursal}
          />
        )}

        {/* Lista de Rutas */}
        {(userRole === 'admin' || userRole === 'gerente') && (<Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '20px', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ marginLeft: 'auto' }}>
            Lista de Rutas
          </Typography>
          <IconButton
            onClick={() => navigate('/rutaform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })}
            aria-label="add ruta"
            color="primary"
            sx={{ marginLeft: 'auto' }}
          >
            <AddIcon />
          </IconButton>
        </Box>)}
        {(userRole === 'admin' || userRole === 'gerente') && (<Box>
          {rutas.length > 0 ? (
            <CarouselRutas
              rutas={rutas}
              itemStyle={itemStyle}
              onRutaSelect={handleShowPopupRuta}
              onEditRuta={handleEditRuta}
            />) : (
            <Typography variant='h6' sx={{ textAlign: 'center' }}>
              No hay rutas todavía
            </Typography>
          )}
        </Box>)}
        {showPopupRuta && selectedRuta && (
          <PopupRutaInfo
            ruta={selectedRuta}
            onClose={handleClosePopupRuta}
          />
        )}

        {/* Lista de Encargos (solo para 'gerente') */}
        {(userRole === 'gerente' || userRole === 'transportista') && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '20px', alignItems: 'center' }}>
            {userRole === 'gerente' ? (<><Typography variant="h6" sx={{ marginLeft: 'auto' }}>
              Lista de Encargos
            </Typography>
              <IconButton
                onClick={() => navigate('/encargoform', { state: { initialData: null, privilegio: userRole, user: location.state.user } })}
                aria-label="add encargo"
                color="primary"
                sx={{ marginLeft: 'auto' }}
              >
                <AddIcon />
              </IconButton></>) : <Typography variant="h6" sx={{ textAlign: 'center' }}>
              Lista de Encargos
            </Typography>}
          </Box>
        )}
        {(userRole === 'gerente' || userRole === 'transportista') && (
          <Box>
            {encargos.length > 0 ? (
              <CarouselEncargos
                encargos={encargos}
                itemStyle={itemStyle}
                onEncargoSelect={handleShowPopupEncargo}
                onEditEncargo={handleEditEncargo}
                onDeleteEncargo={handleShowPopDeleteEncargo}
              />
            ) : (
              <Typography variant='h6' sx={{ textAlign: 'center' }}>
                No hay encargos todavía
              </Typography>
            )}
          </Box>
        )}
        {showPopupEncargo && selectedEncargo && (
          <PopupEncargoInfo
            encargo={selectedEncargo}
            onClose={handleClosePopupEncargo}
          />
        )}
        {showDelete && deleteData && (
          <PopUpDelete
            data={deleteData}
            onClose={handleClosePopupDelete}
            onDelete={handleDelete}
            type={deleteType}
          />
        )}
      </Box>
      <Footer />
    </Box>
  );
}
