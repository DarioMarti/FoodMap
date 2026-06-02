export const bloquear_usuario = async (id_amigo, obtener_solicitudes, mostrarNotificacion, actualizarContactos, setUsuarios) => {
    const formData = new FormData();
    formData.append("id", id_amigo);
    const respuesta = await fetch(import.meta.env.VITE_API_URL + "/modelos/chat/bloquear_usuario.php", {
        credentials: 'include',
        method: "POST",
        body: formData,
    });

    if (respuesta.ok) {
        obtener_solicitudes();
        mostrarNotificacion("Usuario bloqueado exitosamente", "success");
        actualizarContactos();
        setUsuarios(prev => prev.map(u => u.id === id_amigo ? { ...u, yo_lo_bloquee: 1, ya_amigos: 0, solicitud_enviada: 0, solicitud_recibida: 0 } : u));
    } else {
        mostrarNotificacion("Error al bloquear al usuario", "error");
    }
};
