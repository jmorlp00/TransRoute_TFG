import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import RutaForm from './pages/Forms/RutaForm'
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserForm from './pages/Forms/UserForm';
import SucursalForm from './pages/Forms/SucursalForm';
import MapComponent from './pages/prueba';
import EncargoForm from './pages/Forms/EncargoForm';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/rutaform" element={<RutaForm />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/sucursalform" element={<SucursalForm />} />
        <Route path="/encargoform" element={<EncargoForm/>}/>
        <Route path="/ruta" element={<MapComponent />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);




