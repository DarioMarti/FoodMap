import { Crown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Etiqueta_marcador({ icon = "Crown", texto = "Underfined", color_borde = "#000000", color_fondo = "#ffffff", style = {}, className = "...", esPrincipal = false, ...props }) {
    
    const [mostrarIcono, setMostrarIcono] = useState(() => {
        return localStorage.getItem("mostrar-icono") !== "false";
    });
    
    const [mostrarTexto, setMostrarTexto] = useState(() => {
        return localStorage.getItem("mostrar-etiquetas") !== "false";
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setMostrarIcono(localStorage.getItem("mostrar-icono") !== "false");
            setMostrarTexto(localStorage.getItem("mostrar-etiquetas") !== "false");
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('preferenciasVisualesCambiada', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('preferenciasVisualesCambiada', handleStorageChange);
        };
    }, []);

    return (
        <button style={style} className={`${className} dark:bg-${color_fondo}/30 dark:text-${color_borde} py-3 px-6 rounded-full shadow-sm transition-all flex items-center gap-2 relative overflow-hidden`} {...props}>
            {mostrarIcono && icon}
            {mostrarTexto && <span className="font-semibold text-sm">{texto}</span>}
            {esPrincipal && <Crown
                className="w-5 h-5 text-yellow-500 fill-current absolute -top-2 -right-0.5 drop-shadow-md"
            />}
        </button>
    );
}