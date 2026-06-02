export const buscar_usuarios = async (e, nombre_usuario, setUsuarios) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre_usuario);
    const respuesta = await fetch(import.meta.env.VITE_API_URL + "/modelos/usuario/mostrar_usuarios.php", {
        credentials: 'include',
        method: "POST",
        body: formData,
    });

    if (respuesta.ok) {
        const data = await respuesta.json();
        setUsuarios(data);
    }
};
