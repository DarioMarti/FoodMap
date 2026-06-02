import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, MessageSquare, Bot, Settings, NotebookText } from 'lucide-react';
import Logo from '../../assets/foodmap_logo_blanco.svg';
import { obtener_mensajes_no_leidos } from '../../servicios/chat/obtener_mensajes_no_leidos';
import { comprobar_sesion_usuario } from '../../servicios/usuario/comprobar_sesion_usuario';

export function Sidebar() {

  //Estados
  const [usuariologueado, setUsuariologueado] = useState(false);
  const [usuario, setUsuario] = useState([]);
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState(0);
  const siglaInicial = usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U';
  const esFotoDefault = usuario.foto === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  //Funciones
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
    if (usuariologueado) {
      const fetchNoLeidos = async () => {
        const data = await obtener_mensajes_no_leidos();
        if (data && data.ok) {
          setMensajesNoLeidos(data.total);
        }
      };

      fetchNoLeidos();
      const intervalo = setInterval(fetchNoLeidos, 10000);
      return () => clearInterval(intervalo);
    }
  }, [usuariologueado]);

  return (
    <aside className="w-20 lg:w-24 h-full bg-background dark:bg-dark-tarjeta border-r border-borde dark:border-descripcion flex flex-col items-center py-6 gap-8 z-50">

      <NavLink to="/mapa">
        <div className="size-16 bg-primary rounded-lg flex items-center justify-center">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
        </div>
      </NavLink>

      <nav className="flex-1 flex flex-col gap-6 w-full px-4">
        <SidebarLink to="/mapa" icon={<MapPin size={24} />} />
        <SidebarLink to="/chat" icon={<MessageSquare size={24} />} badge={mensajesNoLeidos} />
        <SidebarLink to="/asistente_ia" icon={<Bot size={24} />} />
        {usuario.rol === "admin" && <SidebarLink to="/administrador" icon={<NotebookText size={24} />} />}
      </nav>

      <div className="flex flex-col gap-6 w-full px-4 mt-auto">
        <SidebarLink to="/config" icon={<Settings size={24} />} />

        {usuario.foto && !esFotoDefault ? (
          <img
            src={usuario.foto.startsWith('http') ? usuario.foto : import.meta.env.VITE_API_URL + `/uploads/img/${usuario.foto}`}
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

function SidebarLink({ to, icon, badge }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <button
          className={`w-full aspect-square rounded-2xl flex items-center justify-center relative cursor-pointer transition-all ${isActive
            ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20'
            : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
        >
          {icon}
          {badge > 0 && (
            <span className="absolute top-2 right-2 flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full min-w-[1.25rem] h-5 px-1 shadow-sm">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </button>
      )}
    </NavLink>
  );
}
