import React from 'react';
import { Sidebar } from './Sidebar';

export function MainLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-background text-text-main">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col min-w-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
      </div>
    </div>
  );
}
