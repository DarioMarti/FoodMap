export const editar_usuario = async (e, setUsuario, setEditando) => {
    e.preventDefault();
    try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/modelos/usuario/editar_usuario.php", {
            method: "POST",
            credentials: 'include',
            body: new FormData(e.target)
        });
        const respuesta = await res.json();
        if (respuesta.usuario) {
            setUsuario(respuesta.usuario);
            setEditando(false);
            window.dispatchEvent(new Event("actualizar_sesion"));
        }
    } catch (error) {
        console.error("Error al editar usuario:", error);
    }
};
