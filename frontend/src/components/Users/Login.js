import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from '../../api/axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import logo from '../../logo.jfif';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Transroute
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      user: location.state
    });

    const loginRequest = {
      email: data.get('email'),
      password: data.get('password')
    };

    try {
      const response = await api.post('users/login', loginRequest);
      if (response.data) {
        const userRole = response.data;
        navigate(`/main`, { state: { user: userRole } });
      }
    } catch (error) {
      console.log("Error");
    }



  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '94.7vh'
      }}>

        <CssBaseline />
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Centra verticalmente el contenido
            paddingBottom: 5 // Añade espacio inferior para evitar que el contenido esté demasiado cerca del footer
          }}
        >

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <img src={logo} style={{ width: 52, height: 52 }} />
          </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}