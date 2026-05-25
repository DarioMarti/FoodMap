import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Notificacion({ mensaje, tipo = 'success' }) {

    // Configuración de colores e iconos según el tipo
    const estilos = {
        success: {
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/50',
            text: 'text-emerald-600 dark:text-emerald-400',
            icon: <CheckCircle className="size-6" />,
            glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]'
        },
        error: {
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/50',
            text: 'text-rose-600 dark:text-rose-400',
            icon: <AlertCircle className="size-6" />,
            glow: 'shadow-[0_0_20px_rgba(244,63,94,0.2)]'
        },
        info: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/50',
            text: 'text-blue-600 dark:text-blue-400',
            icon: <Info className="size-6" />,
            glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]'
        }
    };

    const config = estilos[tipo] || estilos.info;

    return (
        <div className={`
            flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-md max-w-[90vw] md:max-w-xl mx-auto
            animate-in fade-in slide-in-from-top-4 duration-300
            ${config.bg} ${config.border} ${config.text} ${config.glow}
        `}>
            {/* Icono */}
            <div className="flex-shrink-0">
                {config.icon}
            </div>

            {/* Mensaje */}
            <p className="text-sm md:text-lg font-semibold break-words">
                {mensaje}
            </p>

            {/* Decoración lateral */}
            <div className={`absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl ${config.text.split(' ')[0].replace('text', 'bg')}`}></div>
        </div>
    );
}
