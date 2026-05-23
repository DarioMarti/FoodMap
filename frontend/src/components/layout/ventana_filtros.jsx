import { useState, useEffect } from "react";
import * as lucideIcons from "lucide-react";

export default function Ventana_filtros({ estado, marcadores, onFilterChange, puntuacionMinima = 0, setPuntuacionMinima }) {
    const [categorias, setCategorias] = useState([]);
    const [seleccionadas, setSeleccionadas] = useState([]);

    useEffect(() => {
        fetch("http://localhost/foodmap/backend/modelos/categorias/mostrar_categorias.php", { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCategorias(data);
                } else {
                    console.error("Error del servidor (no autorizado o formato incorrecto):", data);
                }
            })
            .catch((err) => console.error("Error al cargar categorías:", err));
    }, []);

    const toggleCategoria = (id) => {
        let nuevasSeleccionadas;
        if (seleccionadas.includes(id)) {
            nuevasSeleccionadas = seleccionadas.filter((s) => s !== id);
        } else {
            nuevasSeleccionadas = [...seleccionadas, id];
        }
        setSeleccionadas(nuevasSeleccionadas);
        onFilterChange(nuevasSeleccionadas);
    };

    const limpiarFiltros = () => {
        setSeleccionadas([]);
        onFilterChange([]);
        if (setPuntuacionMinima) setPuntuacionMinima(0);
    };

    return (
        <div
            className={`w-[350px] bg-white dark:bg-dark-tarjeta rounded-3xl shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border border-borde dark:border-descripcion/30 overflow-hidden absolute top-26 right-26 z-[2000] ${estado
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
                }`}
        >
            {/* Header */}
            <div className="p-6 border-b border-borde dark:border-descripcion/20 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <lucideIcons.Filter className="size-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-text-main dark:text-background">
                        Filtros
                    </h2>
                </div>
                {(seleccionadas.length > 0 || puntuacionMinima > 0) && (
                    <button
                        onClick={limpiarFiltros}
                        className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors px-3 py-1 bg-primary/10 rounded-full cursor-pointer"
                    >
                        Limpiar ({seleccionadas.length + (puntuacionMinima > 0 ? 1 : 0)})
                    </button>
                )}
            </div>

            {/* Categorías */}
            <div className="p-6">
                <h3 className="text-sm font-semibold text-text-tertiary mb-4 uppercase tracking-wider">
                    Categorías
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {categorias.map((cat) => {
                        const isSelected = seleccionadas.includes(cat.id);
                        const Icono = lucideIcons[cat.Icono] || lucideIcons.MapPin;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => toggleCategoria(cat.id)}
                                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 group cursor-pointer ${isSelected
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                                    : "bg-background-input/50 dark:bg-background-oscuro/40 border-transparent hover:border-primary/50 text-text-secondary dark:text-background/70"
                                    }`}
                            >
                                <div
                                    className={`p-1.5 rounded-lg transition-colors ${isSelected
                                        ? "bg-white/20"
                                        : "bg-white dark:bg-dark-tarjeta group-hover:bg-primary/10"
                                        }`}
                                >
                                    <Icono
                                        className={`size-4 ${isSelected ? "text-white" : "text-primary"
                                            }`}
                                    />
                                </div>
                                <span className="text-sm font-medium truncate">
                                    {cat.Nombre}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="p-6 border-t border-borde dark:border-descripcion/20">
                <h3 className="text-sm font-semibold text-text-tertiary mb-4 uppercase tracking-wider">
                    Puntuación mínima
                </h3>
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((val) => {
                        const isActive = val <= puntuacionMinima;
                        return (
                            <button
                                key={val}
                                type="button"
                                onClick={() => setPuntuacionMinima && setPuntuacionMinima(puntuacionMinima === val ? 0 : val)}
                                className="p-1 rounded-lg  transition-colors cursor-pointer group"
                                title={`Filtrar por ${val} estrellas o más`}
                            >
                                <lucideIcons.Star
                                    className={`size-8 transition-transform ${isActive
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-300 dark:text-descripcion fill-descripcion hover:fill-background-claro/20 hover:text-background-claro/20"
                                        }`}
                                />
                            </button>
                        );
                    })}

                </div>
            </div>


        </div>
    );
}