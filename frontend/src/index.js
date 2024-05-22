import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Ruta from './pages/rutas'
import Admin from './pages/adminMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/ruta" element={<Ruta/>}/>
      <Route path="/*" element={<App/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


