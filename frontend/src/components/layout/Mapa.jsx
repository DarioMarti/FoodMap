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
import { agregarMarcador, alPincharMapa, DetectarCordenadas, obtenerMarcadores, manejarFormularioMarcador, agregarEtiqueta, obtenerTodasEtiquetas, obtenerFotografias, eliminarMarcador } from '../../servicios/mapa/marcador_servicio.js';
import { LocalizacionUsuario } from '../../servicios/mapa/localizar_usuario.jsx';
import TarjetaConfirmacion from '../ui/tarjeta_confirmacion';

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

export default function Mapa({ darkMode, mostrarNotificacion, nombreBusqueda, categoriasFiltro }) {
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
    const [formularioActivo, setFormularioActivo] = useState(false);
    const [formularioActivo_editar, setFormularioEditarActivo] = useState(false);
    const [posicionClick, setPosicionClick] = useState(null);
    const [puntuacion, setPuntuacion] = useState(0);
    const [marcadores, setMarcadores] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    const [categoriasBD, setCategoriasBD] = useState([]);
    const [esPrincipal, setEsPrincipal] = useState(false);
    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState({ id: "1", nombre: "Cafetería" });
    const [etiquetasMarcador, setEtiquetasMarcador] = useState([]);
    const [fotos, setFotos] = useState([]);
    const [fotosMarcador, setFotosMarcador] = useState([]);
    const [isEditando, setIsEditando] = useState(false);
    const [usuarioUbicacion, setUsuarioUbicacion] = useState([40.4167, -3.7032]);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const urlClaro = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const urlOscuro = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
    const atribucion = '&copy; Stadia Maps, &copy; OpenStreetMap contributors';
    let lugarSeleccionadoEstrellas = 1;

    // Funciones

    const manejarEnvio = async (e) => {
        e.preventDefault();
        const listaEtiquetasActual = isEditando ? etiquetasMarcador : etiquetas;
        const tienePrincipal = listaEtiquetasActual.some(e => e.esPrincipal || e.EsPrincipal);
        if (!tienePrincipal) {
            mostrarNotificacion("Debes asignar al menos una etiqueta como principal.", "error");
            return;
        }
        const formData = new FormData(e.target);
        if (isEditando) {
            formData.append('etiquetas', JSON.stringify(etiquetasMarcador));
            fotosMarcador.forEach((foto, index) => {
                formData.append('fotos[]', foto);
            });
        } else {
            formData.append('etiquetas', JSON.stringify(etiquetas));
            fotos.forEach((foto, index) => {
                formData.append('fotos[]', foto);
            });
        }
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

    const manejarEliminarMarcador = () => {
        setMostrarConfirmacion(!mostrarConfirmacion);
    };
    const elimiarMarcador = async (id) => {
        const respuesta = await eliminarMarcador(id);

        if (respuesta?.ok) {
            mostrarNotificacion(respuesta.message, "success");
            setFormularioEditarActivo(false);
            setLugarSeleccionado(null);
            obtenerMarcadores(setMarcadores, nombreBusqueda);
            manejarEliminarMarcador();
        } else {
            mostrarNotificacion("Error al eliminar el marcador", "error");
        }
    }

    const alElegirFoto = (e) => {
        const nuevosArchivos = Array.from(e.target.files);
        setFotos([...fotos, ...nuevosArchivos]);
    };
    const alElegirFotoEditar = (e) => {
        const nuevosArchivos = Array.from(e.target.files);
        setFotosMarcador([...fotosMarcador, ...nuevosArchivos]);
    };

    useEffect(() => {
        LocalizacionUsuario(setUsuarioUbicacion);

        fetch("http://localhost/foodmap/backend/modelos/categorias/mostrar_categorias.php")
            .then(res => res.json())
            .then(data => {
                setCategoriasBD(data);
                if (data.length > 0) {
                    setEtiquetaSeleccionada({ id: data[0].id, nombre: data[0].Nombre });
                }
            });
    }, []);

    useEffect(() => {
        obtenerMarcadores(setMarcadores, nombreBusqueda);
    }, [nombreBusqueda]);

    return (
        <main className="flex-1 flex flex-col min-w-0 h-full z-0 relative">
            <Boton_cuadrado
                onClick={() => manejarFormularioMarcador("crear", true, false, setFormularioEditarActivo, setFormularioActivo, setEtiquetas, setEtiquetaSeleccionada, esPrincipal, setEsPrincipal, setIsEditando)}
                className="bg-primary-light dark:bg-primary-dark/30 border-2 border-primary hover:bg-primary/100 dark:hover:bg-primary-hover hover:text-background  text-primary size-14 absolute top-26 left-8 z-1000" icon={<lucideIcons.Plus size={26} />} />

            <form onSubmit={manejarEnvio} className={`absolute w-150 top-26 left-30 flex flex-col gap-4 bg-background dark:bg-dark-tarjeta  dark:border-text-main p-6 rounded-xl dark:text-background
                shadow-[0_10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300 z-1200 ${formularioActivo ? 'block' : 'hidden'}`}>
                <button
                    onClick={() => manejarFormularioMarcador("crear", false, false, setFormularioEditarActivo, setFormularioActivo, setEtiquetas, setEtiquetaSeleccionada, esPrincipal, setEsPrincipal, setIsEditando)}
                    className='bg-primary rounded-full size-8 flex items-center justify-center absolute top-4 right-4 hover:bg-primary-hover dark:hover:bg-primary-hover cursor-pointer' type="button">{<lucideIcons.XIcon size={26} color='white' />}</button>

                <label className='mt-4' htmlFor="nombre">Nombre:</label>
                <input required className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id="nombre" name="nombre" />
                <label htmlFor="descripcion">Descripción:</label>
                <textarea className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id="descripcion" name="descripcion" />
                <label htmlFor="puntuacion">Puntuación:</label>
                <div className="relative flex items-center">
                    <input className="border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl w-full" type="number" id="puntuacion" name="puntuacion" value={puntuacion || 1} readOnly />
                    <div className="absolute right-2 flex gap-1">
                        <button type="button" onClick={() => setPuntuacion(prev => Math.min(prev + 1, 5))} className="text-background rounded-lg bg-primary dark:bg-descripcion hover:bg-primary-active dark:hover:bg-primary-active p-1 cursor-pointer" ><lucideIcons.ChevronUp size={20} /></button>
                        <button type="button" onClick={() => setPuntuacion(prev => Math.max(prev - 1, 0))} className="text-background rounded-lg bg-primary dark:bg-descripcion hover:bg-primary-active dark:hover:bg-primary-active p-1 cursor-pointer" ><lucideIcons.ChevronDown size={20} /></button>
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-start'>
                    <label htmlFor="etiquetas">Etiquetas:</label>
                    <div className='flex gap-4 w-full items-center justify-between'>
                        <select value={etiquetaSeleccionada.id} onChange={(e) => setEtiquetaSeleccionada({ id: e.target.value, nombre: e.target.options[e.target.selectedIndex].text })}
                            className='border-2 border-borde dark:border-descripcion dark:text-input bg-background dark:bg-dark-tarjeta p-2 rounded-xl w-full' id="etiquetas" name="etiquetas">
                            {
                                categoriasBD.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>{categoria.Nombre}</option>
                                ))
                            }
                        </select>
                        <button type='button'
                            onClick={() => { agregarEtiqueta(etiquetaSeleccionada.id, etiquetaSeleccionada.nombre, esPrincipal, setEtiquetas, etiquetas); setEsPrincipal(false); }}
                            className='px-4 py-2 bg-primary dark:bg-primary hover:bg-primary-hover dark:hover:bg-primary-hover text-background uppercase rounded-xl cursor-pointer'>

                            Agregar
                        </button>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input checked={esPrincipal} onChange={(e) => setEsPrincipal(e.target.checked)}
                            disabled={!esPrincipal && (isEditando ? etiquetasMarcador : etiquetas).some(e => e.esPrincipal || e.EsPrincipal)}
                            className='accent-primary cursor-pointer size-4' type="checkbox" id="es_principal" name="es_principal" />
                        <label htmlFor="es_principal">Es principal</label>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {etiquetas.map((item, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <Etiqueta_marcador
                                    style={{
                                        backgroundColor: `${item.Color}33`, // El '33' al final añade transparencia (20%)
                                        borderColor: item.Color,
                                        color: item.Color
                                    }}
                                    icon={<IconoDinamico nombre={item.Icono} size={16} />}
                                    texto={item.Nombre}
                                    esPrincipal={item.esPrincipal}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <label htmlFor="coordenadas">Coordenadas:</label>
                <div className='flex gap-4'>
                    <input required className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id='latitud' name='latitud' value={posicionClick?.lat || ""} readOnly />
                    <input required className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id='longitud' name='longitud' value={posicionClick?.lng || ""} readOnly />
                </div>
                <label>Fotos:</label>
                <div id="contenedor_fotos" className='flex gap-4 mb-4 flex-wrap'>
                    {/* Input oculto que realmente hace el trabajo */}
                    <input
                        type="file" id="foto_input" name="fotos[]" multiple
                        className="hidden" onChange={alElegirFoto}
                    />

                    {/* Previsualización de fotos seleccionadas */}
                    {fotos.map((foto, index) => (
                        <Tarjeta_foto_marcador key={index} foto={URL.createObjectURL(foto)} />
                    ))}

                    <div className='cursor-pointer' onClick={(e) => { e.stopPropagation(); document.getElementById('foto_input').click(); }}>
                        <Tarjeta_foto_marcador_añadir />
                    </div>
                </div>
                <button className="bg-primary dark:bg-primary  hover:bg-primary-hover dark:hover:bg-primary-hover text-background  uppercase rounded-xl p-4 cursor-pointer w-full">Agregar</button>
            </form>

            <MapContainer key={usuarioUbicacion.toString()}
                center={usuarioUbicacion}
                zoom={17}
                scrollWheelZoom={true}
                zoomControl={false}
                className="flex-1 h-full w-full relative">

                <DetectarCordenadas alPincharMapa={(latlng) => alPincharMapa(latlng, formularioActivo, setPosicionClick)} />
                {formularioActivo && posicionClick && <Marker position={posicionClick} />}

                <TileLayer
                    url={darkMode ? urlOscuro : urlClaro}
                    attribution={atribucion}
                />

                <ZoomControl position="bottomright" />

                {marcadores
                    .filter(m => categoriasFiltro?.length === 0 || categoriasFiltro?.includes(m.Categoria_id))
                    .map((marcador) => (
                    <Marcador key={marcador.id} position={[marcador.Latitud, marcador.Longitud]} color={marcador.Color || '#EA2678'} icono={<IconoDinamico nombre={marcador.Icono || 'MapPin'} size={22} />}
                        eventHandlers={{
                            click: async () => {
                                setLugarSeleccionado(marcador);
                                const etiquetas = await obtenerTodasEtiquetas(marcador.id);
                                const fotos = await obtenerFotografias(marcador.id)
                                setEtiquetasMarcador(etiquetas || []);
                                setFotosMarcador(fotos || [])

                            },


                        }}
                    />
                ))}
            </MapContainer>

            {
                lugarSeleccionado && (
                    <div className="max-h-[50vh] overflow-y-auto absolute bottom-0 left-0 right-0 z-[1001] bg-background dark:bg-dark-tarjeta p-6 rounded-t-xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300">
                        <div className="flex gap-2 absolute top-4 right-4 z-1000">
                            <Boton_cuadrado className="bg-primary-light border-2 border-primary hover:bg-primary hover:text-background  text-primary size-14 dark:bg-text-main dark:hover:bg-primary dark:border-descripcion dark:text-background" onClick={() => manejarFormularioMarcador("editar", false, true, setFormularioEditarActivo, setFormularioActivo, setEtiquetasMarcador, setEtiquetaSeleccionada, esPrincipal, setEsPrincipal, setIsEditando)} icon={<lucideIcons.Pencil size={26} />} />
                            <Boton_cuadrado className="bg-primary-light border-2 border-primary hover:bg-primary hover:text-background  text-primary size-14 dark:bg-text-main dark:hover:bg-primary dark:border-descripcion dark:text-background" onClick={() => setLugarSeleccionado(null)} icon={<lucideIcons.XIcon size={26} />} />


                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-3xl text-text-main dark:text-background">
                                {lugarSeleccionado.Titulo}
                            </h3>
                            <div className="flex gap-1 text-yellow-500">
                                {darPuntuacion(lugarSeleccionado.Puntuacion)}
                            </div>
                            <p className="text-text-main dark:text-background text-xl">
                                {lugarSeleccionado.Descripcion}
                            </p>

                            <div id="contenedor_fotos" className='flex gap-4'>
                                <div id="contenedor_fotos" className='flex gap-4'>
                                    {fotosMarcador.map((foto, index) => (
                                        <Tarjeta_foto_marcador
                                            key={index}
                                            foto={`http://localhost/foodmap/backend/uploads/img/${foto.Url_archivo}`}
                                        />
                                    ))}
                                </div>
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





            <form onSubmit={manejarEnvio} className={`absolute w-150 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 bg-background dark:bg-dark-tarjeta  dark:border-text-main p-6 rounded-xl dark:text-background
                shadow-[0_10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300 z-1100 ${formularioActivo_editar ? 'block' : 'hidden'}`}>
                <button
                    onClick={() => manejarFormularioMarcador("editar", false, false, setFormularioEditarActivo, setFormularioActivo, setEtiquetasMarcador, setEtiquetaSeleccionada, esPrincipal, setEsPrincipal, setIsEditando)}
                    className='bg-primary rounded-full size-8 flex items-center justify-center absolute top-4 right-4 hover:bg-primary-hover dark:hover:bg-primary-hover cursor-pointer' type="button">{<lucideIcons.XIcon size={26} color='white' />}</button>

                <label className='mt-4' htmlFor="nombre">Nombre:</label>
                <input required className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id="nombre" name="nombre" defaultValue={lugarSeleccionado?.Titulo || ""} />
                <label htmlFor="descripcion">Descripción:</label>
                <textarea className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id="descripcion" name="descripcion" defaultValue={lugarSeleccionado?.Descripcion || ""} />
                <label htmlFor="puntuacion">Puntuación:</label>
                <div className="relative flex items-center">
                    <input className="border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl w-full" type="number" id="puntuacion" name="puntuacion" value={parseInt(lugarSeleccionado?.Puntuacion) || 1} readOnly />
                    <div className="absolute right-2 flex gap-1">
                        <button type="button" onClick={() => setPuntuacion(prev => Math.min(prev + 1, 5))} className="text-background rounded-lg bg-primary dark:bg-descripcion hover:bg-primary-active dark:hover:bg-primary-active p-1 cursor-pointer" ><lucideIcons.ChevronUp size={20} /></button>
                        <button type="button" onClick={() => setPuntuacion(prev => Math.max(prev - 1, 0))} className="text-background rounded-lg bg-primary dark:bg-descripcion hover:bg-primary-active dark:hover:bg-primary-active p-1 cursor-pointer" ><lucideIcons.ChevronDown size={20} /></button>
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-start'>
                    <label htmlFor="etiquetas">Etiquetas:</label>
                    <div className='flex gap-4 w-full items-center justify-between'>
                        <select value={etiquetaSeleccionada.id} onChange={(e) => setEtiquetaSeleccionada({ id: e.target.value, nombre: e.target.options[e.target.selectedIndex].text })}
                            className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl w-full' id="etiquetas" name="etiquetas">
                            <option value="1">Cafetería</option>
                            <option value="2">Hamburguesería</option>
                            <option value="3">Restaurante</option>
                        </select>
                        <button type='button'
                            onClick={() => { agregarEtiqueta(etiquetaSeleccionada.id, etiquetaSeleccionada.nombre, esPrincipal, setEtiquetasMarcador, etiquetasMarcador); setEsPrincipal(false); }}
                            className='px-4 py-2 bg-primary dark:bg-primary hover:bg-primary-hover dark:hover:bg-primary-hover text-background uppercase rounded-xl cursor-pointer'
                        >
                            Agregar
                        </button>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input checked={esPrincipal} onChange={(e) => setEsPrincipal(e.target.checked)}
                            disabled={!esPrincipal && (isEditando ? etiquetasMarcador : etiquetas).some(e => e.esPrincipal || e.EsPrincipal)}
                            className='accent-primary cursor-pointer size-4' type="checkbox" id="es_principal" name="es_principal" />
                        <label htmlFor="es_principal">Es principal</label>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {etiquetasMarcador.map((item, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <Etiqueta_marcador
                                    style={{
                                        backgroundColor: `${item.Color}33`, // El '33' al final añade transparencia (20%)
                                        borderColor: item.Color,
                                        color: item.Color
                                    }}
                                    icon={<IconoDinamico nombre={item.Icono} size={16} />}
                                    texto={item.Nombre}
                                    esPrincipal={item.esPrincipal || item.EsPrincipal}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <label htmlFor="coordenadas">Coordenadas:</label>
                <div className='flex gap-4'>
                    <input required className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id='latitud' name='latitud' value={lugarSeleccionado?.Latitud || ""} readOnly />
                    <input required className='border-2 border-borde dark:border-descripcion dark:text-input p-2 rounded-xl' type="text" id='longitud' name='longitud' value={lugarSeleccionado?.Longitud || ""} readOnly />
                </div>
                <label>Fotos:</label>
                <div id="contenedor_fotos_editar" className='flex gap-4 mb-4 flex-wrap'>
                    <input
                        type="file" id="foto_input_editar" name="fotos[]" multiple
                        className="hidden" onChange={alElegirFotoEditar}
                    />
                    {fotosMarcador.map((foto, index) => {
                        const urlFoto = foto.Url_archivo
                            ? `http://localhost/foodmap/backend/uploads/img/${foto.Url_archivo}`
                            : URL.createObjectURL(foto);
                        return <Tarjeta_foto_marcador key={index} foto={urlFoto} />;
                    })}
                    <div className='cursor-pointer' onClick={(e) => { e.stopPropagation(); document.getElementById('foto_input_editar').click(); }}>
                        <Tarjeta_foto_marcador_añadir />
                    </div>
                </div>
                <button className="bg-primary dark:bg-primary  hover:bg-primary-hover dark:hover:bg-primary-hover text-background  uppercase rounded-xl p-4 cursor-pointer w-full">Agregar</button>
                <span className="text-center font-bold hover:text-primary  cursor-pointer text-error text-md   rounded-xl p-2 w-full" onClick={() => { setMostrarConfirmacion(true); }}>Eliminar marcador</span>
            </form>
            {mostrarConfirmacion && <TarjetaConfirmacion cancelar={manejarEliminarMarcador} confirmar={() => elimiarMarcador(lugarSeleccionado?.id)} mensaje="¿Está seguro de que desea eliminar este marcador?" />}
        </main >
    );
}