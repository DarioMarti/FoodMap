export const aceptar_solicitud = async (amigo_id, obtener_solicitudes, mostrarNotificacion, actualizarContactos) => {
    const formData = new FormData();
    formData.append("amigo_id", amigo_id);
    const respuesta = await fetch(import.meta.env.VITE_API_URL + "/modelos/chat/aceptar_solicitud.php", {
        credentials: 'include',
        method: "POST",
        body: formData,
    });

    if (respuesta.ok) {
        obtener_solicitudes();
        mostrarNotificacion("Solicitud aceptada exitosamente", "success");
        actualizarContactos();
    } else {
        mostrarNotificacion("Error al aceptar la solicitud", "error");
    }
};
