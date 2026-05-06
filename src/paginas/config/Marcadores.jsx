import { Bookmark, MapPin, Settings, Plus, Utensils, Coffee, Beer, TreePine } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";

export default function Marcadores() {
    const categorias = [
        { nombre: 'Restaurantes', count: 12, color: 'orange', icono: Utensils },
        { nombre: 'Cafeterías', count: 5, color: 'amber', icono: Coffee },
        { nombre: 'Bares', count: 8, color: 'red', icono: Beer },
        { nombre: 'Parques', count: 2, color: 'green', icono: TreePine },
        { nombre: 'Cines', count: 3, color: 'blue', icono: MapPin },
        { nombre: 'Tiendas', count: 15, color: 'purple', icono: MapPin },
    ];

    const colorClasses = {
        orange: { text: 'text-orange-500', hoverBg: 'hover:bg-orange-500', hoverBorder: 'hover:border-orange-600' },
        amber: { text: 'text-amber-500', hoverBg: 'hover:bg-amber-500', hoverBorder: 'hover:border-amber-600' },
        red: { text: 'text-red-500', hoverBg: 'hover:bg-red-500', hoverBorder: 'hover:border-red-600' },
        green: { text: 'text-green-500', hoverBg: 'hover:bg-green-500', hoverBorder: 'hover:border-green-600' },
        blue: { text: 'text-blue-500', hoverBg: 'hover:bg-blue-500', hoverBorder: 'hover:border-blue-600' },
        purple: { text: 'text-purple-500', hoverBg: 'hover:bg-purple-500', hoverBorder: 'hover:border-purple-600' },
    };

    return (
        <div className="h-full flex flex-col overflow-hidden dark:bg-background-oscuro bg-background">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold dark:text-white text-text-main">Marcadores</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">

                <div className="flex justify-between items-center py-6 px-2">
                    <h2 className="text-2xl font-bold dark:text-white text-text-main">Mis categorías</h2>
                    <button className="flex items-center gap-2 text-primary font-semibold hover:underline cursor-pointer">
                        <Plus size={20} />
                        Nueva
                    </button>
                </div>
                <div className="flex flex-wrap gap-3 mb-10">
                    {categorias.map((cat) => (
                        <button key={cat.nombre} className={`flex items-center gap-3 px-4 py-2.5 bg-background dark:bg-dark-tarjeta border-2 border-borde dark:border-borde-dark rounded-2xl transition-all cursor-pointer group ${colorClasses[cat.color].hoverBg} ${colorClasses[cat.color].hoverBorder} shadow-sm hover:shadow-md`}>
                            <div className={`${colorClasses[cat.color].text} group-hover:text-white group-hover:scale-110 transition-all`}>
                                <cat.icono size={20} />
                            </div>
                            <strong className="text-md font-semibold text-text-main dark:text-white group-hover:text-white transition-colors">{cat.nombre}</strong>
                            <span className="ml-1 px-2 py-0.5 bg-slate-100 dark:bg-background text-text-tertiary dark:text-text-tertiary text-[10px] font-bold rounded-full border border-borde dark:border-borde-dark group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-inner">
                                {cat.count}
                            </span>
                        </button>
                    ))}

                </div>

                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Ajustes visuales</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-text-tertiary py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Mostrar etiquetas de nombre</strong>
                        <Toggle id="mostrar-etiquetas" />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-text-tertiary"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Marcadores grandes</strong>
                        <Toggle id="marcadores-grandes" />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-text-tertiary"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Agrupar por color</strong>
                        <Toggle id="agrupar-color" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Gestión</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-text-tertiary py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Exportar marcadores (.json)</strong>
                        <Boton_main nombre="Exportar" />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-text-tertiary "></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Importar desde archivo</strong>
                        <Boton_main nombre="Importar" />
                    </div>
                </div>

            </article >
        </div>
    );
}
