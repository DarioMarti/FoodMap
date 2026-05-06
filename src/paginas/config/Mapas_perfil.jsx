import Boton_cuadrado from "../../components/ui/Boton_cuadrado";
import { Map as MapIcon, Layers, Navigation, Trash2 } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";

export default function Mapas_perfil() {
    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold">Ajustes del Mapa</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">

                <h2 className="text-2xl font-bold py-10 px-2">Interfaz del mapa</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Centrar en mi ubicación al inicio</strong>
                        <Toggle id="centrar-inicio" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Mostrar controles de zoom (+/-)</strong>
                        <Toggle id="controles-zoom" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Mostrar barra de escala</strong>
                        <Toggle id="mostrar-escala" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Capas y Marcadores</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Tipo de mapa predeterminado</strong>
                        <p className="text-lg text-text-tertiary">Callejero (OSM)</p>
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Agrupar marcadores (Clustering)</strong>
                        <Toggle id="clustering" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Cargar imágenes de satélite</strong>
                        <Toggle id="satelite-leaflet" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Datos y Rendimiento</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Limpiar caché de teselas</strong>
                        <Boton_main nombre="Limpiar" />
                    </div>
                </div>

            </article >
        </div>
    );
}   