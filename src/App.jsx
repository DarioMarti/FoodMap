import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Mapa from './paginas/Mapa';
import Chat from './paginas/Chat';
import Config from './paginas/Config';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/mapa" replace />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/config" element={<Config darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
