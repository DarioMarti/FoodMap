
export async function obtener_sesion_usuario() {
    try {

        const peticion = await fetch(import.meta.env.VITE_API_URL + "/modelos/sesion/obtener_sesion.php", {
            method: "POST",
            credentials: 'include'
        });

        const respuesta = await peticion.json();

        return respuesta;
    } catch (error) {
        console.error("Error al comprobar la sesión:", error);
        return { login: false };
    }
}