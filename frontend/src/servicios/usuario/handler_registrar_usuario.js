export async function registrar_usuario(data) {

    const respuesta = await fetch(import.meta.env.VITE_API_URL + "/modelos/usuario/registrar_usuario.php", {
        method: "POST",
        body: data,
        credentials: 'include'
    });
    return await respuesta.json();
}