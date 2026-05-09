import { Crown } from 'lucide-react';

export default function Etiqueta_marcador({ icon, texto, color_borde, color_fondo, style, className = "...", esPrincipal }) {
    return (
        <button style={style} className={`${className} dark:bg-${color_fondo}/30 dark:text-${color_borde} py-3 px-6 rounded-full  shadow-sm  transition-all flex items-center gap-2 relative`}>
            {icon}
            <span className="font-semibold text-sm">{texto}</span>
            {esPrincipal && <Crown
                className="w-5 h-5 text-yellow-500 fill-current absolute -top-2 -right-0.5 drop-shadow-md"
            />}
        </button>

    );
}