import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Boton_cuadrado from '../ui/Boton_cuadrado';
import { Plus, Star, Pencil, Coffee, XIcon, ChevronDown, ChevronUp } from 'lucide-react';
import Tarjeta_foto_marcador, { Tarjeta_foto_marcador_añadir } from '../ui/tarjetas_fotos_marcador';
import Marcador from '../ui/Marcador';
import Etiqueta_marcador from '../ui/etiqueta_marcador';
import { agregarMarcador } from '../../servicios/mapa/marcador_servicio.js';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function DetectarCordenadas({ alPinchar }) {
    useMapEvents({
        click: (e) => {
            alPinchar(e.latlng);
        },
    });
    return null;
}

export default function Mapa({ darkMode, mostrarNotificacion }) {
    const posicionInicial = [20.6736, -103.3477];
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
    const [formularioActivo, setFormularioActivo] = useState(false);
    const [posicionClick, setPosicionClick] = useState(null);
    const [puntuacion, setPuntuacion] = useState(0);
    const [marcadores, setMarcadores] = useState([]);

    const urlClaro = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const urlOscuro = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
    const atribucion = '&copy; Stadia Maps, &copy; OpenStreetMap contributors';



    // Funciones
    function manejarFormularioMarcador(estado) {
        setFormularioActivo(estado);
    }

    const alPincharMapa = (latlng) => {
        if (formularioActivo) {
            setPosicionClick(latlng);
        }
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const resultado = await agregarMarcador(formData);
            mostrarNotificacion("¡Marcador guardado con éxito!", "success");
            setFormularioActivo(false);
            setPuntuacion(0);
            setPosicionClick(null);
        } catch (error) {
            mostrarNotificacion("Error al guardar el marcador", "error");
        }
        obtenerMarcadores();
    };

    // Fetcc Marcadores
    const obtenerMarcadores = async () => {
        try {
            const respuesta = await fetch("http://localhost/foodmap/backend/modelos/marcadores/mostrar_marcador.php");
            const datos = await respuesta.json();
            setMarcadores(datos);
        } catch (error) {
            console.error("Error cargando marcadores:", error);
        }
    };

    useEffect(() => {
        obtenerMarcadores();
    }, []);

    return (
        <main className="flex-1 flex flex-col min-w-0 h-full z-0 relative">
            <Boton_cuadrado
                onClick={() => manejarFormularioMarcador(true)}
                className="bg-primary-light dark:bg-primary-dark/30 border-2 border-primary hover:bg-primary/100 dark:hover:bg-primary-hover hover:text-background  text-primary size-14 absolute top-26 left-8 z-1000" icon={<Plus size={26} />} />

            <form onSubmit={manejarEnvio} className={`absolute w-150 top-26 left-30 flex flex-col gap-4 bg-background dark:bg-dark-tarjeta  dark:border-text-main p-6 rounded-xl dark:text-background
                shadow-[0_10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300 z-1000 ${formularioActivo ? 'block' : 'hidden'}`}>
                <button
                    onClick={() => manejarFormularioMarcador(false)}
                    className='bg-primary rounded-full size-8 flex items-center justify-center absolute top-4 right-4 hover:bg-primary-hover dark:hover:bg-primary-hover cursor-pointer' type="button">{<XIcon size={26} color='white' />}</button>

                <label className='mt-4' htmlFor="nombre">Nombre:</label>
                <input className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id="nombre" name="nombre" />
                <label htmlFor="descripcion">Descripción:</label>
                <textarea className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id="descripcion" name="descripcion" />
                <label htmlFor="puntuacion">Puntuación:</label>
                <div className="relative flex items-center">
                    <input className="border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl w-full" type="number" id="puntuacion" name="puntuacion" value={puntuacion} readOnly />
                    <div className="absolute right-2 flex gap-1">
                        <button type="button" onClick={() => setPuntuacion(prev => Math.min(prev + 1, 5))} className="text-background rounded-lg bg-primary dark:bg-descripcion hover:bg-primary-active dark:hover:bg-primary-active p-1 cursor-pointer" ><ChevronUp size={20} /></button>
                        <button type="button" onClick={() => setPuntuacion(prev => Math.max(prev - 1, 0))} className="text-background rounded-lg bg-primary dark:bg-descripcion hover:bg-primary-active dark:hover:bg-primary-active p-1 cursor-pointer" ><ChevronDown size={20} /></button>
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-start'>
                    <label htmlFor="etiquetas">Etiquetas:</label>
                    <select className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl w-full mb-2' id="etiquetas" name="etiquetas">
                        <option value="1">Cafetería</option>
                        <option value="2">Hamburguesería</option>
                        <option value="3">Restaurante</option>
                    </select>
                    <div className='flex gap-2 items-center'>
                        <input className='accent-primary cursor-pointer size-4' type="checkbox" id="es_principal" name="es_principal" />
                        <label htmlFor="es_principal">Es principal</label>
                    </div>
                </div>
                <label htmlFor="coordenadas">Coordenadas:</label>
                <div className='flex gap-4'>
                    <input className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id='latitud' name='latitud' value={posicionClick?.lat} />
                    <input className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id='longitud' name='longitud' value={posicionClick?.lng} />
                </div>
                <button className="bg-primary dark:bg-primary  hover:bg-primary-hover dark:hover:bg-primary-hover text-background  uppercase rounded-xl p-4 cursor-pointer w-full">Agregar</button>
            </form>

            <MapContainer center={posicionInicial} zoom={22} scrollWheelZoom={true} zoomControl={false}
                className="flex-1 h-full w-full relative">

                <DetectarCordenadas alPinchar={alPincharMapa} />
                {formularioActivo && posicionClick && <Marker position={posicionClick} />}

                <TileLayer
                    url={darkMode ? urlOscuro : urlClaro}
                    attribution={atribucion}
                />

                <ZoomControl position="bottomright" />


                {marcadores.map((marcador) => (
                    <Marcador key={marcador.id} position={[marcador.Latitud, marcador.Longitud]} icono={<Coffee size={22} />}
                        eventHandlers={{
                            click: () => {
                                setLugarSeleccionado({
                                    nombre: marcador.Titulo,
                                    descripcion: marcador.Descripcion
                                });
                            },
                        }}
                    />
                ))}
            </MapContainer>


            {lugarSeleccionado && (
                <div className="max-h-[50vh] overflow-y-auto absolute bottom-0 left-0 right-0 z-[1001] bg-background dark:bg-dark-tarjeta p-6 rounded-t-xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300">
                    <div className="flex gap-2 absolute top-4 right-4 z-1000">
                        <Boton_cuadrado className="bg-primary-light border-2 border-primary hover:bg-primary hover:text-background  text-primary size-14 dark:bg-text-main dark:hover:bg-primary dark:border-descripcion dark:text-background" icon={<Pencil size={26} />} />
                        <Boton_cuadrado className="bg-primary-light border-2 border-primary hover:bg-primary hover:text-background  text-primary size-14 dark:bg-text-main dark:hover:bg-primary dark:border-descripcion dark:text-background" onClick={() => setLugarSeleccionado(null)} icon={<XIcon size={26} />} />


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