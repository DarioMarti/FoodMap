export async function registrar_usuario(data) {

    const respuesta = await fetch("http://localhost/foodmap/backend/modelos/usuario/registrar_usuario.php", {
        method: "POST",
        body: data,
        credentials: 'include'
    });
    return await respuesta.json();
}