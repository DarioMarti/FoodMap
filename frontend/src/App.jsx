import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Mapa from './paginas/Mapa_page';
import Chat from './paginas/Chat';
import Config from './paginas/Config';
import Login from './paginas/Login';
import { comprobar_sesion_usuario } from './servicios/usuario/comprobar_sesion_usuario';

function App() {
  const [darkMode, setDarkMode] = useState(() => { const temaGuardado = localStorage.getItem('theme'); return temaGuardado === 'dark'; });
  const [primaryColor, setPrimaryColor] = useState(() => { return localStorage.getItem('user-primary-color') || '#EA2678'; });
  const [fontSize, setFontSize] = useState(localStorage.getItem('user-font-size') || '16');
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

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    localStorage.setItem('user-primary-color', primaryColor);
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
          <Route path="/config" element={<Config darkMode={darkMode} setDarkMode={setDarkMode} setPrimaryColor={setPrimaryColor} fontSize={fontSize} setFontSize={setFontSize} />} />
        </Routes>
      </MainLayout> : <Login />
  );
}

export default App;
