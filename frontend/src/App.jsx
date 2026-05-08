import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Mapa from './paginas/Mapa_page';
import Chat from './paginas/Chat';
import Config from './paginas/Config';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const temaGuardado = localStorage.getItem('theme');
    return temaGuardado === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/mapa" element={<Mapa darkMode={darkMode} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/config" element={<Config darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
