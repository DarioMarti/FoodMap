import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Boton_cuadrado from '../ui/Boton_cuadrado';
import * as lucideIcons from 'lucide-react';
import Tarjeta_foto_marcador, { Tarjeta_foto_marcador_añadir } from '../ui/tarjetas_fotos_marcador';
import Marcador from '../ui/Marcador';
import Etiqueta_marcador from '../ui/etiqueta_marcador';
import { agregarMarcador, alPincharMapa, DetectarCordenadas, obtenerMarcadores, manejarFormularioMarcador, agregarEtiqueta, obtenerTodasEtiquetas } from '../../servicios/mapa/marcador_servicio.js';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

//icono dinamico
const IconoDinamico = ({ nombre, ...props }) => {
    const IconoComponente = lucideIcons[nombre];
    if (!IconoComponente) return <lucideIcons.MapPin {...props} />;
    return <IconoComponente {...props} />;
};

export default function Mapa({ darkMode, mostrarNotificacion }) {
    const posicionInicial = [20.6736, -103.3477];
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
    const [formularioActivo, setFormularioActivo] = useState(false);
    const [posicionClick, setPosicionClick] = useState(null);
    const [puntuacion, setPuntuacion] = useState(0);
    const [marcadores, setMarcadores] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    const [esPrincipal, setEsPrincipal] = useState(false);
    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState({ id: "1", nombre: "Cafetería" });
    const [etiquetasMarcador, setEtiquetasMarcador] = useState([]);

    const urlClaro = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const urlOscuro = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
    const atribucion = '&copy; Stadia Maps, &copy; OpenStreetMap contributors';
    let lugarSeleccionadoEstrellas = 1;

    // Funciones

    const manejarEnvio = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('etiquetas', JSON.stringify(etiquetas));

        try {
            const resultado = await agregarMarcador(formData);
            mostrarNotificacion("¡Marcador guardado con éxito!", "success");
            e.target.reset();
            setEtiquetas([]);
            setFormularioActivo(false);
            setPuntuacion(0);
            setPosicionClick(null);
        } catch (error) {
            mostrarNotificacion("Error al guardar el marcador", "error");
        }
        obtenerMarcadores(setMarcadores);
    };

    const darPuntuacion = (puntuacion) => {
        let estrellas = [];
        for (let i = 1; i <= puntuacion; i++) {
            estrellas.push(<lucideIcons.Star className="w-5 h-5 fill-current" key={i} />);
        }
        console.log(puntuacion)
        return estrellas;
    }

    useEffect(() => {
        obtenerMarcadores(setMarcadores);
    }, []);
    useEffect(() => {
        console.log('El estado de etiquetas ha cambiado y ahora es:', etiquetas);
    }, [etiquetas]);

    return (
        <main className="flex-1 flex flex-col min-w-0 h-full z-0 relative">
            <Boton_cuadrado
                onClick={() => manejarFormularioMarcador(true, setFormularioActivo)}
                className="bg-primary-light dark:bg-primary-dark/30 border-2 border-primary hover:bg-primary/100 dark:hover:bg-primary-hover hover:text-background  text-primary size-14 absolute top-26 left-8 z-1000" icon={<lucideIcons.Plus size={26} />} />

            <form onSubmit={manejarEnvio} className={`absolute w-150 top-26 left-30 flex flex-col gap-4 bg-background dark:bg-dark-tarjeta  dark:border-text-main p-6 rounded-xl dark:text-background
                shadow-[0_10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300 z-1000 ${formularioActivo ? 'block' : 'hidden'}`}>
                <button
                    onClick={() => manejarFormularioMarcador(false, setFormularioActivo)}
                    className='bg-primary rounded-full size-8 flex items-center justify-center absolute top-4 right-4 hover:bg-primary-hover dark:hover:bg-primary-hover cursor-pointer' type="button">{<lucideIcons.XIcon size={26} color='white' />}</button>

                <label className='mt-4' htmlFor="nombre">Nombre:</label>
                <input className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id="nombre" name="nombre" />
                <label htmlFor="descripcion">Descripción:</label>
                <textarea className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id="descripcion" name="descripcion" />
                <label htmlFor="puntuacion">Puntuación:</label>
                <div className="relative flex items-center">
                    <input className="border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl w-full" type="number" id="puntuacion" name="puntuacion" value={puntuacion} readOnly />
                    <div className="absolute right-2 flex gap-1">
                        <button type="button" onClick={() => setPuntuacion(prev => Math.min(prev + 1, 5))} className="text-background rounded-lg bg-primary dark:bg-descripcion hover:bg-primary-active dark:hover:bg-primary-active p-1 cursor-pointer" ><lucideIcons.ChevronUp size={20} /></button>
                        <button type="button" onClick={() => setPuntuacion(prev => Math.max(prev - 1, 0))} className="text-background rounded-lg bg-primary dark:bg-descripcion hover:bg-primary-active dark:hover:bg-primary-active p-1 cursor-pointer" ><lucideIcons.ChevronDown size={20} /></button>
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-start'>
                    <label htmlFor="etiquetas">Etiquetas:</label>
                    <div className='flex gap-4 w-full items-center justify-between'>
                        <select onChange={(e) => setEtiquetaSeleccionada({ id: e.target.value, nombre: e.target.options[e.target.selectedIndex].text })}
                            className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl w-full' id="etiquetas" name="etiquetas">
                            <option value="1">Cafetería</option>
                            <option value="2">Hamburguesería</option>
                            <option value="3">Restaurante</option>
                        </select>
                        <button type='button'
                            onClick={() => agregarEtiqueta(etiquetaSeleccionada.id, etiquetaSeleccionada.nombre, esPrincipal, setEtiquetas, etiquetas)}
                            className='px-4 py-2 bg-primary dark:bg-primary hover:bg-primary-hover dark:hover:bg-primary-hover text-background uppercase rounded-xl cursor-pointer'>
                            Agregar
                        </button>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input onChange={(e) => setEsPrincipal(e.target.checked)} className='accent-primary cursor-pointer size-4' type="checkbox" id="es_principal" name="es_principal" />
                        <label htmlFor="es_principal">Es principal</label>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {etiquetas.map((item, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <Etiqueta_marcador
                                    style={{
                                        backgroundColor: `${item.color}33`, // El '33' al final añade transparencia (20%)
                                        borderColor: item.color,
                                        color: item.color
                                    }}
                                    icon={<IconoDinamico nombre={item.icono} size={16} />}
                                    texto={item.nombre}
                                    esPrincipal={item.esPrincipal}
                                />
                            </div>
                        ))}
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

                <DetectarCordenadas alPincharMapa={(latlng) => alPincharMapa(latlng, formularioActivo, setPosicionClick)} />
                {formularioActivo && posicionClick && <Marker position={posicionClick} />}

                <TileLayer
                    url={darkMode ? urlOscuro : urlClaro}
                    attribution={atribucion}
                />

                <ZoomControl position="bottomright" />


                {marcadores.map((marcador) => (
                    <Marcador key={marcador.id} position={[marcador.Latitud, marcador.Longitud]} color={marcador.Color} icono={<IconoDinamico nombre={marcador.Icono} size={22} />}
                        eventHandlers={{
                            click: async () => {
                                setLugarSeleccionado({
                                    nombre: marcador.Titulo,
                                    descripcion: marcador.Descripcion,
                                    puntuacion: marcador.Puntuacion
                                });
                                const etiquetas = await obtenerTodasEtiquetas(marcador.id);
                                setEtiquetasMarcador(etiquetas || []);
                            },


                        }}
                    />
                ))}
            </MapContainer>


            {lugarSeleccionado && (
                <div className="max-h-[50vh] overflow-y-auto absolute bottom-0 left-0 right-0 z-[1001] bg-background dark:bg-dark-tarjeta p-6 rounded-t-xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300">
                    <div className="flex gap-2 absolute top-4 right-4 z-1000">
                        <Boton_cuadrado className="bg-primary-light border-2 border-primary hover:bg-primary hover:text-background  text-primary size-14 dark:bg-text-main dark:hover:bg-primary dark:border-descripcion dark:text-background" icon={<lucideIcons.Pencil size={26} />} />
                        <Boton_cuadrado className="bg-primary-light border-2 border-primary hover:bg-primary hover:text-background  text-primary size-14 dark:bg-text-main dark:hover:bg-primary dark:border-descripcion dark:text-background" onClick={() => setLugarSeleccionado(null)} icon={<lucideIcons.XIcon size={26} />} />


                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-3xl text-text-main dark:text-background">
                            {lugarSeleccionado.nombre}
                        </h3>
                        <div className="flex gap-1 text-yellow-500">
                            {darPuntuacion(lugarSeleccionado.puntuacion)}
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
                            {etiquetasMarcador.map((etiqueta, index) => (
                                <Etiqueta_marcador key={index} icon={<IconoDinamico nombre={etiqueta.Icono} size={26} />} texto={etiqueta.Nombre} style={{
                                    backgroundColor: `${etiqueta.Color}33`,
                                    borderColor: etiqueta.Color,
                                    color: etiqueta.Color
                                }} />
                            ))}
                        </div>
                    </div>
                </div>
            )
            }

        </main >
    );
}