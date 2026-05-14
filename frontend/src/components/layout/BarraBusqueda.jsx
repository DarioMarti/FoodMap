import React from 'react';
import { Search, Filter, Send } from 'lucide-react';
import Boton_cuadrado from '../ui/Boton_cuadrado';
import NavItem from '../ui/NavItem';

export function BarraBusqueda({ buscarMarcadores }) {

  const [nombre, setNombre] = useState("");

  const buscarMarcadoresPorNombre = (e) => {
    setNombre(e.target.value);
  };
  const activarBusqueda = () => {
    buscarMarcadores(nombre);
  };

  return (
    <div className="absolute top-0 left-0 right-0 py-4 px-4 md:py-6 md:px-8 flex items-center gap-2 md:gap-4 z-40 pointer-events-none">
      {/* Search Input Container */}
      <div className="flex-1 max-w-full mx-auto flex gap-4 md:gap-4 pointer-events-auto w-full justify-between ">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar lugares, marcadores..."
            className="w-full h-14 rounded-2xl px-14 bg-background dark:bg-dark-tarjeta border border-borde dark:border-descripcion text-text-main outline-none focus:ring-2 focus:ring-primary-hover shadow-sm transition-all"
            onChange={buscarMarcadoresPorNombre}
          />
        </div>

        {/* Action Buttons */}
        <Boton_cuadrado className="bg-input dark:bg-dark-tarjeta text-text-main dark:text-background size-14 border border-borde dark:border-descripcion dark:hover:bg-primary-hover" icon={<Filter size={20} />} />
        <Boton_cuadrado onClick={activarBusqueda} className="bg-primary dark:bg-dark-tarjeta text-input dark:text-background size-14 border border-borde dark:border-descripcion dark:hover:bg-primary-hover" icon={<Send size={20} />} />

      </div>
    </div>
  );
}
