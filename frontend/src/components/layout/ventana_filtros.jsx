import { useState, useEffect } from "react";
export default function Ventana_filtros({ estado, marcadores, setMarcadores }) {

    const [categorias, setCategorias] = useState([]);

    return (
        <div className={`w-[300px] bg-dark-tarjeta rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform ${estado ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'
            }`}>
            <h1>Filtros</h1>

        </div>
    );
}
