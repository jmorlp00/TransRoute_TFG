import React, { useState, useRef, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Stepper, Step, StepLabel, Paper, Snackbar, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosConfig';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HereMap, { createMarkerElement, addMarkerDragEvents, updateRoutes } from '../../components/Rutas/HereMap';

function RutaForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { initialData } = location.state || {};

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    nombre: initialData?.nombre || '',
    altura: initialData?.altura || '',
    mma: initialData?.mma || '',
    longitud: initialData?.longitud || '',
    coordenadas: initialData?.coordenadas || [],
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const behaviorRef = useRef(null);
  const markersRef = useRef([]);
  const routesRef = useRef([]);

  const updateRoutesWrapper = () => updateRoutes(mapInstanceRef, markersRef, routesRef);

  useEffect(() => {
    console.log(initialData);
    if (location.state == null) {
      navigate('/');
    } else {
      if (location.state.user == null) {
        navigate('/');
      }
    }
  }, [location.state, navigate]);

  const steps = ['Datos de la ruta', 'Coordenadas'];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.nombre || !formData.altura || !formData.mma || !formData.longitud) {
        setSnackbarMessage('Por favor, rellena todos los campos antes de continuar.');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
        return;
      }
    } else if (activeStep === 1) {
      if (markersRef.current.length < 2) {
        setSnackbarMessage('Por favor, añade al menos dos coordenadas antes de continuar.');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function saveRutaData(data) {
    const url = data.id ? `/ruta/${data.id}` : '/ruta/add';
    const method = data.id ? 'patch' : 'post';
    console.log(data);
    try {
      const response = await api({
        method,
        url,
        data: {
          nombre: data.nombre,
          altura: parseFloat(data.altura),
          mma: parseFloat(data.mma),
          longitud: parseFloat(data.longitud),
          coordenadas: data.coordenadas
        }
      });

      console.log('Ruta saved successfully:', response.data);
      navigate('/main', { state: { user: location.state.user } });
    } catch (error) {
      console.error('Error saving ruta:', error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (markersRef.current.length < 2) {
      setSnackbarMessage('Por favor, añade al menos dos coordenadas antes de continuar.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    } else {
      try {
        const coordenadas = markersRef.current.map(marker => {
          const { lat, lng } = marker.getGeometry();
          return { latitud: lat, longitud: lng };
        });
        const updatedFormData = { ...formData, coordenadas };

        await saveRutaData(updatedFormData);
      } catch (error) {
        console.error('Error al guardar la ruta:', error);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <>
      <Header />
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Container style={{ height: 'calc(100vh - 64px)' }}>
          <Paper component={Box} p={3} style={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>{initialData ? 'Editar Ruta' : 'Crear Ruta'}</Typography>
            <Stepper style={{ flexGrow: 1, marginBottom: '20px' }} activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <form onSubmit={handleSubmit} style={{ height: 'calc(100% - 72px)' }}>
              {activeStep === 0 && (
                <Grid container spacing={2} style={{ height: '100%' }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Altura"
                      name="altura"
                      value={formData.altura}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="MMA"
                      name="mma"
                      value={formData.mma}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Longitud"
                      name="longitud"
                      value={formData.longitud}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              )}
              {activeStep === 1 && (
                <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <HereMap
                    mapContainerRef={mapContainerRef}
                    mapInstanceRef={mapInstanceRef}
                    behaviorRef={behaviorRef}
                    markersRef={markersRef}
                    routesRef={routesRef}
                    updateRoutesWrapper={updateRoutesWrapper}
                    initialData={initialData}
                    style={{ width: '100%', height: '90%' }}
                  />
                </div>
              )}
              <Box mt={2}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Atrás
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Guardar' : 'Siguiente'}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
        <Footer />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default RutaForm;
