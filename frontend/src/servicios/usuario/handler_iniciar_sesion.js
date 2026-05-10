export async function iniciar_sesion(data) {
    const respuesta = await fetch("http://localhost/foodmap/backend/modelos/usuario/login_usuario.php", {
        method: "POST",
        body: data,
        credentials: 'include'
    });
    return await respuesta.json();
}