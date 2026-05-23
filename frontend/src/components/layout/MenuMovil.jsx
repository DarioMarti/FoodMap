import { MessageSquare, Bot, MapPin, User, Settings, MapPinned } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function MenuMovil() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-primary flex justify-around items-center h-16 text-white md:hidden z-[9999] shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">

            {/* Botón Chats */}
            <NavLink to="/chat" className="flex flex-col items-center justify-center gap-1 w-1/5 cursor-pointer hover:text-white/80 transition-colors">
                <MessageSquare size={24} />
                <span className="text-[10px] font-semibold">Chats</span>
            </NavLink>

            {/* Botón IA */}
            <NavLink to="/asistente_ia" className="flex flex-col items-center justify-center gap-1 w-1/5 cursor-pointer hover:text-white/80 transition-colors">
                <Bot size={24} />
                <span className="text-[10px] font-semibold">IA</span>
            </NavLink>

            <div className="w-1/5 flex justify-center">
                <NavLink to="/mapa" className="bg-white rounded-full h-16 w-16 flex items-center justify-center -mt-8 shadow-lg border-[6px] border-background dark:border-primary cursor-pointer group transition-transform active:scale-95">
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
