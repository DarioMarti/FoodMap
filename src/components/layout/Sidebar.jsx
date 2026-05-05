import React, { useState } from 'react';
import { MapPin, MessageSquare, Bot, Settings, User } from 'lucide-react';
import Logo from '../../assets/foodmap_logo_blanco.svg';
import NavItem from '../ui/NavItem';

export function Sidebar() {
  const [activeTab, setActiveTab] = useState('mapa');

  return (
    <aside className="w-20 lg:w-24 h-full bg-background dark:bg-background-oscuro border-r border-borde dark:border-borde-oscuro flex flex-col items-center py-6 gap-8 z-50">

      <div className="size-16 bg-primary rounded-lg flex items-center justify-center">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-6 w-full px-4">
        <NavItem
          icon={<MapPin size={24} />}
          active={activeTab === 'mapa'}
          onClick={() => setActiveTab('mapa')}
        />
        <NavItem
          icon={<MessageSquare size={24} />}
          active={activeTab === 'chats'}
          onClick={() => setActiveTab('chats')}
        />
        <NavItem
          icon={<Bot size={24} />}
          active={activeTab === 'ia'}
          onClick={() => setActiveTab('ia')}
        />
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-6 w-full px-4 mt-auto">
        <NavItem
          icon={<Settings size={24} />}
          active={activeTab === 'ajustes'}
          onClick={() => setActiveTab('ajustes')}
        />
        <button className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg hover:bg-indigo-600 transition-colors mx-auto">
          A
        </button>
      </div>
    </aside>
  );
}


