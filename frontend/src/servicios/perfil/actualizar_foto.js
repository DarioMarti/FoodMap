export const actualizar_foto = async (e, setUsuario) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('foto', file);

    try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/modelos/usuario/actualizar_foto.php", {
            method: "POST",
            credentials: 'include',
            body: formData
        });
        const respuesta = await res.json();
        if (respuesta.ok) {
            setUsuario(respuesta.usuario);
            window.dispatchEvent(new Event("actualizar_sesion"));
        } else {
            console.error("Error al actualizar foto:", respuesta.error);
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
};
