export const enviar_solicitud = async (amigo_id, mostrarNotificacion, setUsuarios) => {
    const formData = new FormData();
    formData.append("amigo_id", amigo_id);
    const respuesta = await fetch(import.meta.env.VITE_API_URL + "/modelos/chat/enviar_solicitud.php", {
        credentials: 'include',
        method: "POST",
        body: formData,
    });

    if (respuesta.ok) {
        const data = await respuesta.json();
        if (data.ok) {
            mostrarNotificacion(data.mensaje, "success");
            setUsuarios(prev => prev.map(u => u.id === amigo_id ? { ...u, solicitud_enviada: 1 } : u));
        } else {
            mostrarNotificacion(data.error || "Error al enviar", "error");
        }
    }
};
