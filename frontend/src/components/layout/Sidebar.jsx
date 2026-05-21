import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, MessageSquare, Bot, Settings, NotebookText } from 'lucide-react';
import Logo from '../../assets/foodmap_logo_blanco.svg';
import { comprobar_sesion_usuario } from '../../servicios/usuario/comprobar_sesion_usuario';

export function Sidebar() {
  const [usuariologueado, setUsuariologueado] = useState(false);
  const [usuario, setUsuario] = useState({});
  const siglaInicial = usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U';
  const esFotoDefault = usuario.foto === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const comprobar_sesion = async () => {
    const respuesta = await comprobar_sesion_usuario();
    if (respuesta.login) {
      setUsuariologueado(true);
      setUsuario(respuesta.usuario);
      console.log(respuesta.usuario);
      console.log('La sigla es: ' + siglaInicial);
    } else {
      setUsuariologueado(false);
    }
  };


  useEffect(() => {
    comprobar_sesion();
    window.addEventListener("actualizar_sesion", comprobar_sesion);
    return () => {
      window.removeEventListener("actualizar_sesion", comprobar_sesion);
    };
  }, []);

  useEffect(() => {
  }, [usuariologueado]);

  return (
    <aside className="w-20 lg:w-24 h-full bg-background dark:bg-dark-tarjeta border-r border-borde dark:border-descripcion flex flex-col items-center py-6 gap-8 z-50">

      {/* Logo */}
      <NavLink to="/mapa">
        <div className="size-16 bg-primary rounded-lg flex items-center justify-center">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
        </div>
      </NavLink>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-6 w-full px-4">
        <SidebarLink to="/mapa" icon={<MapPin size={24} />} />
        <SidebarLink to="/chat" icon={<MessageSquare size={24} />} />
        <SidebarLink to="/asistente_ia" icon={<Bot size={24} />} />
        <SidebarLink to="/administrador" icon={<NotebookText size={24} />} />
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-6 w-full px-4 mt-auto">
        <SidebarLink to="/config" icon={<Settings size={24} />} />

        {usuario.foto && !esFotoDefault ? (
          <img
            src={usuario.foto.startsWith('http') ? usuario.foto : `http://localhost/foodmap/backend/uploads/img/${usuario.foto}`}
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg  transition-colors mx-auto">
            {siglaInicial}
          </span>
        )}

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
          className={`w-full aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all ${isActive
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
