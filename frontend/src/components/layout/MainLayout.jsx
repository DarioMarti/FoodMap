import React from 'react';
import { Sidebar } from './Sidebar';
import MenuMovil from './MenuMovil';

export function MainLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-background text-text-main">
      {/* Contenido móvil*/}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Contenido principal*/}
      <main className="flex-1 relative flex flex-col min-h-0 min-w-0">
        {children}
      </main>

      {/* Barra de navegación para móviles*/}
      <div className="md:hidden">
        <MenuMovil />
      </div>
    </div>
  );
}
