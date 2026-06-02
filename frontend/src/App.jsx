import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Mapa from './paginas/Mapa_page';
import Chat from './paginas/Chat';
import Config from './paginas/Config';
import Login from './paginas/Login';
import Asistente_IA from './paginas/Asistente_IA';
import { comprobar_sesion_usuario } from './servicios/usuario/comprobar_sesion_usuario';
import Administrador from './paginas/Administrador';
import Perfil from './paginas/config/Perfil';

function App() {
  const [darkMode, setDarkMode] = useState(() => { const temaGuardado = localStorage.getItem('theme'); return temaGuardado === 'dark'; });

  const paletaPorDefecto = {
    primary: '#EA2678',
    hover: '#F03989',
    active: '#C41863',
    dark: '#9A0F4A',
    light: '#FFDEEF'
  };

  const [primaryColor, setPrimaryColor] = useState(() => {
    const guardado = localStorage.getItem('user-theme-palette');
    try {
      return guardado ? JSON.parse(guardado) : paletaPorDefecto;
    } catch (e) {
      return paletaPorDefecto;
    }
  }); const [fontSize, setFontSize] = useState(localStorage.getItem('user-font-size') || '16');
  const [usuario_logueado, set_usuario_logueado] = useState(null);

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
        set_usuario_logueado(respuesta.usuario);
      } else {
        set_usuario_logueado(null);
      }
    }
    comprobar_sesion();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', primaryColor.primary);
    root.style.setProperty('--color-primary-hover', primaryColor.hover);
    root.style.setProperty('--color-primary-active', primaryColor.active);
    root.style.setProperty('--color-primary-dark', primaryColor.dark);
    root.style.setProperty('--color-primary-light', primaryColor.light);

    localStorage.setItem('user-theme-palette', JSON.stringify(primaryColor));
  }, [primaryColor]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('user-font-size', fontSize);
  }, [fontSize]);

  return (
    usuario_logueado ?
      <MainLayout>
        <Routes>
          <Route path="/" element={<Mapa darkMode={darkMode} />} />
          <Route path="/mapa" element={<Mapa darkMode={darkMode} />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/asistente_ia" element={<Asistente_IA />} />
          <Route 
            path="/administrador" 
            element={usuario_logueado?.Rol === 'Administrador' ? <Administrador /> : <Navigate to="/" />} 
          />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/config" element={<Config darkMode={darkMode} setDarkMode={setDarkMode} setPrimaryColor={setPrimaryColor} fontSize={fontSize} setFontSize={setFontSize} />} />
        </Routes>
      </MainLayout> : <Login />
  );
}

export default App;
