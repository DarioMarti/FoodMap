import { useState, useEffect } from 'react';
import { MessageSquare, Bot, MapPin, User, Settings, MapPinned } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { obtener_mensajes_no_leidos } from '../../servicios/chat/obtener_mensajes_no_leidos';

export default function MenuMovil() {
    const [mensajesNoLeidos, setMensajesNoLeidos] = useState(0);
    const temaGuardado = localStorage.getItem('user-theme-palette');

    if (temaGuardado) {
        const paleta = JSON.parse(temaGuardado);
        const colorPrimario = paleta.primary;
        console.log("El color principal actual es: " + colorPrimario);

    }

    useEffect(() => {
        const fetchNoLeidos = async () => {
            const data = await obtener_mensajes_no_leidos();
            if (data && data.ok) {
                setMensajesNoLeidos(data.total);
            }
        };

        fetchNoLeidos();
        const intervalo = setInterval(fetchNoLeidos, 10000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-primary flex justify-around items-center h-16 text-white md:hidden z-[9999] shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">

            {/* Botón Chats */}
            <NavLink to="/chat" className="flex flex-col items-center justify-center gap-1 w-1/5 cursor-pointer hover:text-white/80 transition-colors">
                <div className="relative">
                    <MessageSquare size={24} />
                    {mensajesNoLeidos > 0 && (
                        <span className="absolute -top-2 -right-3 flex items-center justify-center bg-white text-primary text-[9px] font-bold rounded-full min-w-[1.2rem] h-[1.2rem] px-1 shadow-sm border border-primary">
                            {mensajesNoLeidos > 99 ? '99+' : mensajesNoLeidos}
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-semibold">Chats</span>
            </NavLink>

            {/* Botón IA */}
            <NavLink to="/asistente_ia" className="flex flex-col items-center justify-center gap-1 w-1/5 cursor-pointer hover:text-white/80 transition-colors">
                <Bot size={24} />
                <span className="text-[10px] font-semibold">IA</span>
            </NavLink>

            <div className="w-1/5 flex justify-center">
                <NavLink to="/mapa" className="bg-white rounded-full h-16 w-16 flex items-center justify-center -mt-8 shadow-lg border-[6px] border-primary dark:border-primary cursor-pointer group transition-transform active:scale-95">
                    <MapPinned size={28} className="text-primary group-hover:scale-110 transition-transform" />
                </NavLink>
            </div>

            {/* Botón Perfil */}
            <NavLink to="/chat" state={{ abrirSolicitudes: true }} className="flex flex-col items-center justify-center gap-1 w-1/5 cursor-pointer hover:text-white/80 transition-colors" >
                <User size={24} />
                <span className="text-[10px] font-semibold">Amigos</span>
            </NavLink>

            {/* Botón Ajustes */}
            <NavLink to="/config" className="flex flex-col items-center justify-center gap-1 w-1/5 cursor-pointer hover:text-white/80 transition-colors">
                <Settings size={24} />
                <span className="text-[10px] font-semibold">Ajustes</span>
            </NavLink>

        </div>
    );
}
