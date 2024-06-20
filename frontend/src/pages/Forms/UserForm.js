import React, { useState, useEffect } from 'react';
import { Container, TextField, MenuItem, Button, Typography, Grid, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosConfig'


function UserForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { initialData, privilegio } = location.state || {};

  const [role, setRole] = useState(initialData?.role || '');
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    surname: initialData?.surname || '',
    age: initialData?.age || '',
    role: initialData?.role || '',
    email: initialData?.email || '',
    password: initialData?.password || '',
    sucursalId: initialData?.sucursalId.id || '',
    gerenteId: initialData?.gerenteId.id || '',
    matricula: initialData?.matricula || '',
    mma: initialData?.mma || '',
    altura: initialData?.altura || '',
    longitud: initialData?.longitud || ''
  });

  const [sucursales, setSucursales] = useState([]);
  const [gerentes, setGerentes] = useState([]);

  useEffect(() => {


    if (location.state == null) {
      navigate('/');
    } else {
      if (location.state.user == null) {
        navigate('/');
      } else {
        fetchSucursales();
        fetchGerentes();
      }
    }
  }, []);

  async function fetchSucursales() {
    try {
      const response = await api.get('sucursal/');
      setSucursales(response.data);
    } catch (error) {
      console.error('Error fetching sucursales:', error);
    }
  }

  async function fetchGerentes() {
    try {
      const response = await api.get('users/');
      setGerentes(response.data);
    } catch (error) {
      console.error('Error fetching gerentes:', error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    saveUserData(formData);
  }

  async function saveUserData(data) {
    const url = data.id ? `/users/${data.id}` : '/users/add';
    const method = data.id ? 'patch' : 'post';

    let payload = {
      name: data.name,
      surname: data.surname,
      age: data.age,
      role: data.role,
      email: data.email,
      password: data.password
    };

    let params = {};
    console.log(data);
    if (data.role === 'gerente') {
      params = { sucursalId: data.sucursalId };
    } else if (data.role === 'transportista') {

      params = {
        altura: data.altura,
        mma: data.mma,
        longitud: data.longitud,
        matricula: data.matricula,
        sucursalId: data.sucursalId,
        gerenteId: data.gerenteId
      };
    }

    try {
      const response = await api({
        method,
        url,
        data: payload,
        params: data.role === 'transportista' || data.role === 'gerente' ? params : {}
      });

      console.log('User saved successfully:', response.data);
      navigate('/main', { state: { user: location.state.user } });
    } catch (error) {
      console.error('Error saving user:', error);
      // Manejar el error de forma adecuada, como mostrar un mensaje al usuario
    }
  }

  function handleRoleChange(e) {
    setRole(e.target.value);
    setFormData({
      ...formData,
      role: e.target.value
    });
  }


  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {initialData ? 'Update User' : 'Create User'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  select
                  label="Role"
                  name="role"
                  value={role}
                  onChange={handleRoleChange}
                  required
                >
                  <MenuItem value="">Select Role</MenuItem>
                  {privilegio && <MenuItem value="admin">Admin</MenuItem>}
                  {privilegio && <MenuItem value="gerente">Gerente</MenuItem>}
                  <MenuItem value="transportista">Transportista</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Box>
            </Grid>
            {role !== '' && role !== 'admin' && (
              <Grid item xs={12} md={6}>
                {role === 'gerente' && (
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      select
                      label="Sucursal ID"
                      name="sucursalId"
                      value={formData.sucursalId}
                      onChange={handleChange}
                    >
                      {sucursales.map((sucursal) => (
                        <MenuItem key={sucursal.id} value={sucursal.id}>
                          {sucursal.nombre}({sucursal.direccion})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                )}
                {role === 'transportista' && (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        select
                        label="Gerente ID"
                        name="gerenteId"
                        value={formData.gerenteId}
                        onChange={handleChange}
                      >
                        {gerentes.map((gerente) => (
                          <MenuItem key={gerente.id} value={gerente.id}>
                            {gerente.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        select
                        label="Sucursal ID"
                        name="sucursalId"
                        value={formData.sucursalId}
                        onChange={handleChange}
                      >
                        {sucursales.map((sucursal) => (
                          <MenuItem key={sucursal.id} value={sucursal.id}>
                            {sucursal.nombre}({sucursal.direccion})
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Matricula"
                        name="matricula"
                        value={formData.matricula}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        label="MMA"
                        name="mma"
                        type="number"
                        value={formData.mma}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Altura"
                        name="altura"
                        type="number"
                        value={formData.altura}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Longitud"
                        name="longitud"
                        type="number"
                        value={formData.longitud}
                        onChange={handleChange}
                      />
                    </Box>
                  </>
                )}
              </Grid>
            )}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary" sx={{ width: 'auto', px: 4 }}>
                {initialData ? 'Update' : 'Create'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default UserForm;
