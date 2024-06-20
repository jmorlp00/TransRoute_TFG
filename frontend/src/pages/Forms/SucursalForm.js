import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosConfig';

function SucursalForm() {
    const location = useLocation();
  const navigate = useNavigate();
  const { initialData } = location.state || {};

  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    nombre: initialData?.nombre || '',
    direccion: initialData?.direccion || '',
    telefono: initialData?.telefono || '',
    correo: initialData?.correo || ''
  });

  useEffect(() => {

    if (location.state == null) {
      navigate('/');
  } else {
      if (location.state.user == null) {
        navigate('/');
      } else {
          
      }
  }
  }, []);
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await saveSucursalData(formData);
  }

  async function saveSucursalData(data) {
    const url = data.id ? `/sucursal/${data.id}` : '/sucursal/add';
    const method = data.id ? 'patch' : 'post';

    try {
      const response = await api({
        method,
        url,
        data: {
          nombre: data.nombre,
          direccion: data.direccion,
          telefono: data.telefono,
          correo: data.correo
        }
      });

      console.log('Sucursal saved successfully:', response.data);
      navigate('/main' ,{ state: {user: location.state.user } });
    } catch (error) {
      console.error('Error saving sucursal:', error);
      // Handle the error appropriately, such as displaying a message to the user
    }
  }
    return (
    <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {initialData ? 'Update Sucursal' : 'Create Sucursal'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Dirección"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Correo"
                                name="correo"
                                type="email"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </Box>
                    </Grid>
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

export default SucursalForm;