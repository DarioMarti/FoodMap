import { eliminarMarcador, obtenerMarcadores } from './marcador_servicio';

export const elimiarMarcador = async (
    id, mostrarNotificacion, setFormularioEditarActivo, setLugarSeleccionado,
    setMarcadores, nombreBusqueda, manejarEliminarMarcadorHandler
) => {
    const respuesta = await eliminarMarcador(id);

    if (respuesta?.ok) {
        mostrarNotificacion(respuesta.message, "success");
        setFormularioEditarActivo(false);
        setLugarSeleccionado(null);
        obtenerMarcadores(setMarcadores, nombreBusqueda);
        manejarEliminarMarcadorHandler();
    } else {
        mostrarNotificacion("Error al eliminar el marcador", "error");
    }
};
