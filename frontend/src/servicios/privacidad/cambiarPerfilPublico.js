export const cambiarPerfilPublico = async (valor, setPerfilPublico, setUsuario) => {
    setPerfilPublico(valor);
    try {
        const formData = new FormData();
        formData.append("perfil_publico", valor ? 1 : 0);

        const res = await fetch(import.meta.env.VITE_API_URL + "/modelos/usuario/actualizar_privacidad.php", {
            method: "POST",
            credentials: 'include',
            body: formData
        });
        const data = await res.json();
        if (data.success && data.usuario) {
            setUsuario(data.usuario);
        }
    } catch (error) {
        console.error("Error al actualizar la privacidad del perfil:", error);
    }
};
