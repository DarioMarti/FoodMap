export const desbloquear_usuario = async (id_amigo, mostrarNotificacion, setUsuarios) => {
    const formData = new FormData();
    formData.append("id", id_amigo);
    const respuesta = await fetch(import.meta.env.VITE_API_URL + "/modelos/chat/desbloquear_usuario.php", {
        credentials: 'include',
        method: "POST",
        body: formData,
    });

    if (respuesta.ok) {
        mostrarNotificacion("Usuario desbloqueado exitosamente", "success");
        setUsuarios(prev => prev.map(u => u.id === id_amigo ? { ...u, yo_lo_bloquee: 0 } : u));
    } else {
        mostrarNotificacion("Error al desbloquear al usuario", "error");
    }
};
