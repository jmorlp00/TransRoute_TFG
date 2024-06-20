import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl, FormHelperText, Snackbar, SnackbarContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/axiosConfig';
import Ruta from '../../components/Rutas/ShowMap'; // Importa el componente Ruta para mostrar el mapa

function EncargoForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { initialData, privilegio } = location.state || {};

    const [formData, setFormData] = useState({
        id: initialData?.id || undefined,
        fechaSalida: initialData?.fechaSalida.substring(0, 10) || '',
        fechaEntrega: initialData?.fechaEntrega.substring(0, 10) || '',
        transportistaId: initialData?.transportista?.id || '',
        rutaId: initialData?.ruta?.id || ''
    });

    const [transportistas, setTransportistas] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [selectedRuta, setSelectedRuta] = useState(null);
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(initialData?.ruta || '');

    useEffect(() => {
        console.log(formData)
        if (location.state == null) {
            navigate('/');
        } else {
            if (location.state.user == null) {
                navigate('/');
            }
        }
    }, [location.state, navigate]);
    useEffect(() => {
        if (rutas.length > 0 && initialData && initialData.ruta) {
            const ruta = rutas.find((ruta) => ruta.id === initialData.ruta.id);
            setSelectedRuta(ruta);
        }
    }, [initialData, rutas]);
    useEffect(() => {
        // Fetch transportistas and rutas based on privileges
        if (location.state != null) {
            if (location.state.user != null) {
                const fetchTransportistas = async () => {
                    try {
                        let response;
                        if (privilegio === "gerente") {
                            response = await api.get('transportistas/sucursal/', { params: { sucursalId: location.state.user.sucursalId.id } });
                        } else {
                            response = await api.get('transportistas/');
                        }
                        setTransportistas(response.data);
                    } catch (error) {
                        console.error('Error fetching transportistas:', error);
                    }
                };

                const fetchRutas = async () => {
                    try {
                        const response = await api.get('ruta/');
                        setRutas(response.data);
                    } catch (error) {
                        console.error('Error fetching rutas:', error);
                    }
                };

                fetchTransportistas();
                fetchRutas();
            }
        }
    }, [privilegio, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({ ...errors, [name]: '' });
    };

    const handleRutaChange = (e) => {
        const rutaId = e.target.value;
        setFormData({
            ...formData,
            rutaId
        });
        const ruta = rutas.find((ruta) => ruta.id === rutaId);
        setSelectedRuta(ruta);
        setErrors({ ...errors, rutaId: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fechaSalida) newErrors.fechaSalida = 'La fecha de salida es requerida';
        if (!formData.fechaEntrega) newErrors.fechaEntrega = 'La fecha de entrega es requerida';
        if (!formData.transportistaId) newErrors.transportistaId = 'Debe seleccionar un transportista';
        if (!formData.rutaId) newErrors.rutaId = 'Debe seleccionar una ruta';

        // Validación adicional para verificar altura, mma y longitud del transportista
        if (transportistas.length > 0 && formData.transportistaId) {
            const transportistaSeleccionado = transportistas.find(transportista => transportista.id === formData.transportistaId);

            if (selectedRuta && (transportistaSeleccionado.altura > selectedRuta.altura ||
                transportistaSeleccionado.mma > selectedRuta.mma ||
                transportistaSeleccionado.longitud > selectedRuta.longitud)) {
                newErrors.alturaMmaLongitud = 'Los valores de Altura, MMA y Longitud del transportista deben ser mayores que los de la ruta.';
                newErrors.showSnackbar = true;
            } else {
                newErrors.showSnackbar = false;
            }
        }

        // Validación de fecha de salida y fecha de llegada
        if (formData.fechaSalida && formData.fechaEntrega) {
            const fechaSalida = new Date(formData.fechaSalida);
            const fechaEntrega = new Date(formData.fechaEntrega);
            if (fechaSalida >= fechaEntrega) {
                newErrors.fechaSalida = 'La fecha de salida debe ser anterior a la fecha de llegada';
                newErrors.fechaEntrega = 'La fecha de llegada debe ser posterior a la fecha de salida';
                newErrors.fechaError = true;
            }
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        console.log("Pruba");
        if (newErrors.showSnackbar || newErrors.fechaError) {
            if (newErrors.showSnackbar) {
                setSnackbarMessage('Los valores de Altura, MMA y Longitud del transportista deben ser mayores que los de la ruta.');
                setSnackbarOpen(true);
            }
            setErrors(newErrors);
        } else {

            await saveEncargoData(formData);
        }
    };

    const saveEncargoData = async (data) => {
        const url = data.id ? `/encargo/${data.id}` : '/encargo/add';
        const method = data.id ? 'patch' : 'post';

        try {
            const encargoData = {
                ...data,
                fechaSalida: new Date(data.fechaSalida),
                fechaEntrega: new Date(data.fechaEntrega)
            };

            const params = {
                transportistaId: data.transportistaId,
                rutaId: data.rutaId,
            };

            console.log(encargoData);
            const response = await api({
                method,
                url,
                data: encargoData,
                params: params
            });

            console.log('Encargo saved successfully:', response.data);
            navigate('/main', { state: { user: location.state.user } });
        } catch (error) {
            console.error('Error saving encargo:', error);
            // Handle the error appropriately, such as displaying a message to the user
        }
    };
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {initialData ? 'Modificar Encargo' : 'Nuevo Encargo'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Transportista y Fechas
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Apellido</TableCell>
                                        <TableCell>Altura</TableCell>
                                        <TableCell>MMA</TableCell>
                                        <TableCell>Longitud</TableCell>
                                        <TableCell>Seleccionar</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transportistas.map((transportista) => (
                                        <TableRow key={transportista.id}>
                                            <TableCell>{transportista.name}</TableCell>
                                            <TableCell>{transportista.surname}</TableCell>
                                            <TableCell>{transportista ? transportista.altura : '-'}</TableCell>
                                            <TableCell>{transportista ? transportista.mma : '-'}</TableCell>
                                            <TableCell>{transportista ? transportista.longitud : '-'}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant={formData.transportistaId === transportista.id ? "contained" : "outlined"}
                                                    onClick={() => {
                                                        setFormData({ ...formData, transportistaId: transportista.id });
                                                        setErrors({ ...errors, transportistaId: '' });
                                                    }}
                                                >
                                                    Seleccionar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {errors.transportistaId && <Typography color="error">{errors.transportistaId}</Typography>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de Salida"
                            type="date"
                            name="fechaSalida"
                            value={formData.fechaSalida}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                            error={!!errors.fechaSalida}
                            helperText={errors.fechaSalida}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha de Entrega"
                            type="date"
                            name="fechaEntrega"
                            value={formData.fechaEntrega}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                            error={!!errors.fechaEntrega}
                            helperText={errors.fechaEntrega}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal" error={!!errors.rutaId}>
                            <InputLabel id="ruta-label">Seleccionar Ruta</InputLabel>
                            <Select
                                labelId="ruta-label"
                                name="rutaId"
                                value={formData.rutaId}
                                onChange={handleRutaChange}
                            >
                                {rutas.map((ruta) => (
                                    <MenuItem key={ruta.id} value={ruta.id}>
                                        {ruta.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.rutaId}</FormHelperText>
                        </FormControl>
                        {selectedRuta && (
                            <Box mt={2} style={{ maxHeight: '150px', overflow: 'auto' }}>
                                <Typography variant="subtitle1">Datos de la Ruta</Typography>
                                <Typography>Altura: {selectedRuta.altura}</Typography>
                                <Typography>MMA: {selectedRuta.mma}</Typography>
                                <Typography>Longitud: {selectedRuta.longitud}</Typography>
                            </Box>
                        )}
                    </Grid>

                </Grid>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000} // Duración en milisegundos para ocultar automáticamente el Snackbar
                    onClose={() => setSnackbarOpen(false)}
                >
                    <SnackbarContent
                        sx={{ backgroundColor: 'error.dark' }} // Estilo personalizado para el SnackbarContent
                        message={snackbarMessage}
                        action={
                            <Button color="inherit" size="small" onClick={() => setSnackbarOpen(false)}>
                                Cerrar
                            </Button>
                        }
                    />
                </Snackbar>

                {selectedRuta && selectedRuta.coordenadas && (
                    <Box mt={2} style={{ width: '100%', position: 'relative', left: 0 }}>
                        <Ruta key={selectedRuta.id} coordinates={selectedRuta.coordenadas} st={{ height: '40vh', width: '100%' }} />
                    </Box>
                )}
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default EncargoForm;
