export async function iniciar_sesion(data) {
    const respuesta = await fetch(import.meta.env.VITE_API_URL + "/modelos/usuario/login_usuario.php", {
        method: "POST",
        body: data,
        credentials: 'include'
    });
    return await respuesta.json();
}