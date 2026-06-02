import { actualizarMarcadorAdmin, crearMarcadorAdmin } from '../administrador/crud_admin';

export const manejarGuardar = async (e, etiquetasMarcador, marcadorSeleccionado, setFormularioMarcadorActivo, mostrarNotificacion, recargarTabla) => {
    e.preventDefault();

    if (etiquetasMarcador.length === 0) {
        mostrarNotificacion("Debes añadir al menos una etiqueta al marcador.", "error");
        return;
    }

    if (!etiquetasMarcador.some(e => e.esPrincipal === true || e.EsPrincipal == 1)) {
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
