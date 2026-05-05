import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { BarraBusqueda } from './components/layout/BarraBusqueda';
import { Moon, Sun } from 'lucide-react';
//import Mapa from './paginas/Mapa';
import Chat from './paginas/Chat';
function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Apply dark mode class to html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <MainLayout>
      <Chat />
    </MainLayout>
  );
}

export default App;
