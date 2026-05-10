import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Mapa from './paginas/Mapa_page';
import Chat from './paginas/Chat';
import Config from './paginas/Config';
import Login from './paginas/Login';
import { comprobar_sesion_usuario } from './servicios/usuario/comprobar_sesion_usuario';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const temaGuardado = localStorage.getItem('theme');
    return temaGuardado === 'dark';
  });
  const [usuario_logueado, set_usuario_logueado] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const comprobar_sesion = async () => {
      const respuesta = await comprobar_sesion_usuario();
      if (respuesta.login) {
        set_usuario_logueado(true);
      } else {
        set_usuario_logueado(false);
      }
    }
    comprobar_sesion();
  }, []);

  return (
    usuario_logueado ?
      <MainLayout>
        <Routes>
          <Route path="/" element={<Mapa darkMode={darkMode} />} />
          <Route path="/mapa" element={<Mapa darkMode={darkMode} />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/config" element={<Config darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </MainLayout> : <Login />
  );
}

export default App;
