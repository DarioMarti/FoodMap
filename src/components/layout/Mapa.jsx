import { useState } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Boton_cuadrado from '../ui/Boton_cuadrado';
import { Plus, Star, Pencil } from 'lucide-react';
import Tarjeta_foto_marcador, { Tarjeta_foto_marcador_añadir } from '../ui/tarjetas_fotos_marcador';

import Etiqueta_marcador from '../ui/etiqueta_marcador';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


export default function Mapa({ darkMode }) {
    const posicionInicial = [20.6736, -103.3477];
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);

    const urlClaro = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const urlOscuro = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
    const atribucion = '&copy; Stadia Maps, &copy; OpenStreetMap contributors';

    return (
        <main className="flex-1 flex flex-col min-w-0 h-full z-0 relative">
            <Boton_cuadrado className="bg-primary-light dark:bg-primary-dark/30 border-2 border-primary hover:bg-primary/100 dark:hover:bg-primary-hover hover:text-background  text-primary size-14 absolute top-26 left-8 z-1000" icon={<Plus size={26} />} />
            <MapContainer center={posicionInicial} zoom={22} scrollWheelZoom={true} zoomControl={false}
                className="flex-1 h-full w-full relative">
                <TileLayer
                    url={darkMode ? urlOscuro : urlClaro}
                    attribution={atribucion}
                />

                <ZoomControl position="bottomright" />

                <Marker
                    position={posicionInicial}
                    eventHandlers={{
                        click: () => {
                            setLugarSeleccionado({
                                nombre: "Nombre del Sitio",
                                descripcion: "Cafetería acogedora en el barrio norte. Excelente café de especialidad, Opción A: Cambiar el Import (Recomendado) Mantienes el archivo de la tarjeta como está, pero cambias la forma de traerlo a Mapa.jsx. El export por defecto va fuera de las llaves: postres caseros y WiFi rápido. Perfecto para quedar con amigos,afetería acogedora en el barrio norte. Excelente café de especialidad, postres caseros y WiFi rápido. Perfecto para quedar con amigos- afetería acogedora en el barrio norte. Excelente café de especialidad, postres caseros y WiFi rápido. Perfecto para quedar con amigos afetería acogedora en el barrio norte. Excelente café de especialidad, postres caseros y WiFi rápido. Perfecto para quedar con amigosafetería acogedora en el barrio norte. Excelente café de especialidad, postres caseros y WiFi rápido. Perfecto para quedar con amigos",
                                imagen: "..."
                            });
                        },
                    }}
                />

            </MapContainer>


            {lugarSeleccionado && (
                <div className="max-h-[50vh] overflow-y-auto absolute bottom-0 left-0 right-0 z-[1001] bg-background dark:bg-dark-tarjeta p-6 rounded-t-xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300">
                    <div className="flex gap-2 absolute top-4 right-4 z-1000">
                        <Boton_cuadrado className="bg-primary-light border-2 border-primary hover:bg-primary hover:text-background  text-primary size-14 dark:bg-text-main dark:hover:bg-primary dark:border-descripcion dark:text-background" icon={<Pencil size={26} />} />
                        <Boton_cuadrado className="bg-primary-light border-2 border-primary hover:bg-primary hover:text-background  text-primary size-14 dark:bg-text-main dark:hover:bg-primary dark:border-descripcion dark:text-background" onClick={() => setLugarSeleccionado(null)} icon={<Plus size={26} />} />


                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-3xl text-text-main dark:text-background">
                            {lugarSeleccionado.nombre}
                        </h3>
                        <div className="flex gap-1 text-yellow-500">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                        <p className="text-text-main dark:text-background text-xl">
                            {lugarSeleccionado.descripcion}
                        </p>

                        <div id="contenedor_fotos" className='flex gap-4'>
                            <Tarjeta_foto_marcador foto={lugarSeleccionado.imagen} />
                            <Tarjeta_foto_marcador foto={lugarSeleccionado.imagen} />
                            <Tarjeta_foto_marcador foto={lugarSeleccionado.imagen} />
                            <Tarjeta_foto_marcador_añadir />
                        </div>

                        <div className='flex gap-4'>
                            <Etiqueta_marcador icon={<Plus size={26} />} texto="Cafetería" />
                            <Etiqueta_marcador icon={<Plus size={26} />} texto="Hamburguesería" />
                            <Etiqueta_marcador icon={<Plus size={26} />} texto="Bar" />
                        </div>
                    </div>
                </div>
            )
            }

        </main >
    );
}