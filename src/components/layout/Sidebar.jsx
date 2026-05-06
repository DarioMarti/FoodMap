import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, MessageSquare, Bot, Settings } from 'lucide-react';
import Logo from '../../assets/foodmap_logo_blanco.svg';

export function Sidebar() {
  return (
    <aside className="w-20 lg:w-24 h-full bg-background dark:bg-background-oscuro border-r border-borde dark:border-borde-oscuro flex flex-col items-center py-6 gap-8 z-50">

      {/* Logo */}
      <NavLink to="/mapa">
        <div className="size-16 bg-primary rounded-lg flex items-center justify-center">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
        </div>
      </NavLink>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-6 w-full px-4">
        <SidebarLink to="/mapa"   icon={<MapPin size={24} />} />
        <SidebarLink to="/chat"   icon={<MessageSquare size={24} />} />
        <SidebarLink to="/ia"     icon={<Bot size={24} />} />
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-6 w-full px-4 mt-auto">
        <SidebarLink to="/config" icon={<Settings size={24} />} />
        <button className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg hover:bg-indigo-600 transition-colors mx-auto">
          A
        </button>
      </div>
    </aside>
  );
}

// NavLink nos da isActive automáticamente según la URL actual
function SidebarLink({ to, icon }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <button
          className={`w-full aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all ${
            isActive
              ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20'
              : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
          }`}
        >
          {icon}
        </button>
      )}
    </NavLink>
  );
}
