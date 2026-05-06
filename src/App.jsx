import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { BarraBusqueda } from './components/layout/BarraBusqueda';
import { Moon, Sun } from 'lucide-react';
//import Mapa from './paginas/Mapa';
import Chat from './paginas/Chat';
import Config from './paginas/Config';
function App() {


  return (
    <MainLayout>
      <Config />
    </MainLayout>
  );
}

export default App;
