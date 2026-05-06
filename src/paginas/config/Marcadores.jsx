import { Bookmark, MapPin, Settings, Plus, Utensils, Coffee, Beer, TreePine } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";

export default function Marcadores() {
    const categorias = [
        { nombre: 'Restaurantes', count: 12, color: 'text-orange-500', icono: Utensils },
        { nombre: 'Cafeterías', count: 5, color: 'text-amber-500', icono: Coffee },
        { nombre: 'Bares', count: 8, color: 'text-red-500', icono: Beer },
        { nombre: 'Parques', count: 2, color: 'text-green-500', icono: TreePine },
        { nombre: 'Cines', count: 3, color: 'text-blue-500', icono: MapPin },
        { nombre: 'Tiendas', count: 15, color: 'text-purple-500', icono: MapPin },
    ];

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold">Marcadores</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">

                <div className="flex justify-between items-center py-6 px-2">
                    <h2 className="text-2xl font-bold">Mis categorías</h2>
                    <button className="flex items-center gap-2 text-primary font-semibold hover:underline cursor-pointer">
                        <Plus size={20} />
                        Nueva
                    </button>
                </div>
                <div className="flex flex-wrap gap-3 mb-10">
                    {categorias.map((cat) => (
                        <button key={cat.nombre} className="flex items-center gap-3 px-4 py-2.5 bg-background border-2 border-borde rounded-2xl hover:border-primary hover:bg-slate-50 dark:hover:bg-background-tarjetas transition-all cursor-pointer group">
                            <div className={`${cat.color} group-hover:scale-110 transition-transform`}>
                                <cat.icono size={20} />
                            </div>
                            <strong className="text-md font-semibold">{cat.nombre}</strong>
                            <span className="ml-1 px-2 py-0.5 bg-slate-100 dark:bg-dark-tarjeta text-text-tertiary text-[10px] font-bold rounded-full border border-borde">
                                {cat.count}
                            </span>
                        </button>
                    ))}

                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Ajustes visuales</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Mostrar etiquetas de nombre</strong>
                        <Toggle id="mostrar-etiquetas" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Marcadores grandes</strong>
                        <Toggle id="marcadores-grandes" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Agrupar por color</strong>
                        <Toggle id="agrupar-color" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Gestión</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Exportar marcadores (.json)</strong>
                        <Boton_main nombre="Exportar" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Importar desde archivo</strong>
                        <Boton_main nombre="Importar" />
                    </div>
                </div>

            </article >
        </div>
    );
}
