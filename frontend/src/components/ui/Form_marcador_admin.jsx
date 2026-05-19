import { useState, useEffect } from "react";
import { actualizarMarcadorAdmin, crearMarcadorAdmin } from "../../servicios/administrador/crud_admin";
import * as lucideIcons from 'lucide-react';
import Etiqueta_marcador from './etiqueta_marcador';

export default function Form_marcador_admin({ marcadorSeleccionado, setFormularioMarcadorActivo, className, mostrarNotificacion, recargarTabla, categoriasBD }) {
    const [nombre, setNombre] = useState(marcadorSeleccionado?.Titulo || marcadorSeleccionado?.Nombre || "");
    const [descripcion, setDescripcion] = useState(marcadorSeleccionado?.Descripcion || "");
    const [puntuacion, setPuntuacion] = useState(marcadorSeleccionado?.Puntuacion || "");
    const [latitud, setLatitud] = useState(marcadorSeleccionado?.Latitud || "");
    const [longitud, setLongitud] = useState(marcadorSeleccionado?.Longitud || "");
    const [direccion, setDireccion] = useState(marcadorSeleccionado?.Direccion || "");

    const [etiquetasMarcador, setEtiquetasMarcador] = useState([]);
    const [esPrincipal, setEsPrincipal] = useState(false);
    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState({ id: "1", nombre: "" });

    useEffect(() => {
        setNombre(marcadorSeleccionado?.Titulo || marcadorSeleccionado?.Nombre || "");
        setDescripcion(marcadorSeleccionado?.Descripcion || "");
        setPuntuacion(marcadorSeleccionado?.Puntuacion || "");
        setLatitud(marcadorSeleccionado?.Latitud || "");
        setLongitud(marcadorSeleccionado?.Longitud || "");
        setDireccion(marcadorSeleccionado?.Direccion || "");
        setEsPrincipal(false);

        if (marcadorSeleccionado?.id) {
            fetch(`http://localhost/foodmap/backend/modelos/marcadores/obtener_todas_etiquetas.php?id_marcador=${marcadorSeleccionado.id}`)
                .then(res => res.json())
                .then(data => {
                    setEtiquetasMarcador(data || []);
                });
        } else {
            setEtiquetasMarcador([]);
        }
        if (categoriasBD && categoriasBD.length > 0) {
            setEtiquetaSeleccionada({ id: categoriasBD[0].id, nombre: categoriasBD[0].Nombre });
        }
    }, [marcadorSeleccionado, categoriasBD]);

    const IconoDinamico = ({ nombre, ...props }) => {
        const nombreReal = nombre === "Hamburger" ? "Burger" : nombre;
        const IconoComponente = lucideIcons[nombreReal];
        if (!IconoComponente) return <lucideIcons.MapPin {...props} />;
        return <IconoComponente {...props} />;
    };

    const agregarEtiqueta = () => {
        if (esPrincipal && etiquetasMarcador.some(e => e.esPrincipal || e.EsPrincipal)) {
            mostrarNotificacion("Ya existe una etiqueta principal para este marcador.", "error");
            return;
        }
        const categoria = categoriasBD?.find(c => String(c.id) === String(etiquetaSeleccionada.id));
        if (categoria) {
            if (etiquetasMarcador.some(e => String(e.id) === String(categoria.id) || String(e.Categoria_id) === String(categoria.id))) {
                mostrarNotificacion("Esta etiqueta ya está añadida.", "error");
                return;
            }
            const nuevaEtiqueta = {
                id: categoria.id,
                Nombre: categoria.Nombre,
                esPrincipal: esPrincipal,
                Color: categoria.Color,
                Icono: categoria.Icono
            };
            setEtiquetasMarcador([...etiquetasMarcador, nuevaEtiqueta]);
            setEsPrincipal(false);
        }
    };

    const eliminarEtiqueta = (idAEliminar) => {
        setEtiquetasMarcador(etiquetasMarcador.filter(e => String(e.id) !== String(idAEliminar) && String(e.Categoria_id) !== String(idAEliminar)));
    };

    const manejarGuardar = async (e) => {
        e.preventDefault();

        if (etiquetasMarcador.length > 0 && !etiquetasMarcador.some(e => e.esPrincipal || e.EsPrincipal)) {
            mostrarNotificacion("Debes asignar al menos una etiqueta como principal.", "error");
            return;
        }

        const data = new FormData(e.target);
        data.append('etiquetas', JSON.stringify(etiquetasMarcador));

        let respuesta;
        if (marcadorSeleccionado?.id) {
            respuesta = await actualizarMarcadorAdmin(data);
        } else {
            respuesta = await crearMarcadorAdmin(data);
        }

        if (respuesta?.success) {
            setFormularioMarcadorActivo(false);
            mostrarNotificacion(respuesta.mensaje, "success");
            recargarTabla();
        } else {
            mostrarNotificacion(respuesta.mensaje, "error");
        }
    };

    return (
        <form onSubmit={manejarGuardar} className={` w-[800px] max-h-[90vh] overflow-y-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white dark:bg-dark-tarjeta border border-borde dark:border-text-tertiary/30 shadow-2xl rounded-2xl p-10 ${className}`}>
            <input type="hidden" name="id" value={marcadorSeleccionado?.id || ""} />

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Nombre del Restaurante</label>
                    <input type="text" required value={nombre} name="nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full mt-4 px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>

                <div className="space-y-4 col-span-2 md:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Puntuación</label>
                    <input type="number" step="0.1" min="0" max="5" value={puntuacion} name="puntuacion"
                        onChange={(e) => setPuntuacion(e.target.value)}
                        className="w-full mt-4 px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>

                <div className="space-y-4 col-span-2 md:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Dirección</label>
                    <input type="text" value={direccion} name="direccion"
                        onChange={(e) => setDireccion(e.target.value)}
                        className="w-full mt-4 px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>

                <div className="space-y-4 col-span-2 md:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Latitud</label>
                    <input type="number" step="any" required value={latitud} name="latitud"
                        onChange={(e) => setLatitud(e.target.value)}
                        className="w-full mt-4 px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>

                <div className="space-y-4 col-span-2 md:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Longitud</label>
                    <input type="number" step="any" required value={longitud} name="longitud"
                        onChange={(e) => setLongitud(e.target.value)}
                        className="w-full mt-4 px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm"
                    />
                </div>
                <div className="space-y-4 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Descripción</label>
                    <textarea required value={descripcion} name="descripcion"
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full mt-4 px-5 py-4 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm h-32"
                    />
                </div>

                <div className="space-y-4 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Categorías / Etiquetas</label>
                    <div className='flex gap-4 w-full items-center justify-between mt-4'>
                        <select
                            value={etiquetaSeleccionada.id}
                            onChange={(e) => setEtiquetaSeleccionada({ id: e.target.value, nombre: e.target.options[e.target.selectedIndex].text })}
                            className='border-2 border-borde dark:border-white/10 bg-background dark:bg-dark-tarjeta p-2 rounded-xl w-full focus:border-primary focus:outline-none transition-all text-sm'
                        >
                            {categoriasBD?.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>{categoria.Nombre}</option>
                            ))}
                        </select>
                        <button type='button'
                            onClick={agregarEtiqueta}
                            className='px-4 py-2 bg-primary hover:bg-primary-hover text-white uppercase rounded-xl cursor-pointer text-sm font-bold'>
                            Añadir
                        </button>
                    </div>
                    <div className='flex gap-2 items-center mt-2'>
                        <input checked={esPrincipal} onChange={(e) => setEsPrincipal(e.target.checked)}
                            disabled={!esPrincipal && etiquetasMarcador.some(e => e.esPrincipal || e.EsPrincipal)}
                            className='accent-primary cursor-pointer size-4' type="checkbox" id="es_principal_admin" />
                        <label htmlFor="es_principal_admin" className="text-sm">Es principal</label>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {etiquetasMarcador.map((item, index) => (
                            <div key={index} className="flex items-center gap-1 group relative">
                                <Etiqueta_marcador
                                    style={{
                                        backgroundColor: `${item.Color}33`,
                                        borderColor: item.Color,
                                        color: item.Color
                                    }}
                                    icon={<IconoDinamico nombre={item.Icono} size={16} />}
                                    texto={item.Nombre}
                                    esPrincipal={item.esPrincipal || item.EsPrincipal}
                                />
                                <button type="button" onClick={() => eliminarEtiqueta(item.id || item.Categoria_id)} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-0.5 hidden group-hover:block cursor-pointer">
                                    <lucideIcons.X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-4 pt-4 mt-8">
                <button type="button" onClick={() => setFormularioMarcadorActivo(false)} className="flex-1 py-4 bg-text-tertiary/10 rounded-2xl font-bold hover:bg-text-tertiary/20 transition-all cursor-pointer text-sm">Cancelar</button>
                <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-hover transition-all cursor-pointer text-sm">Guardar</button>
            </div>
        </form>
    );
}
