/*
export async function obtener_sesion_usuario() {
    try {

        const peticion = await fetch("http://localhost/foodmap/backend/modelos/sesion/obtener_sesion.php", {
            method: "POST",
            credentials: 'include'
        });

        const respuesta = await peticion.json();

        return respuesta;
    } catch (error) {
        console.error("Error al comprobar la sesión:", error);
        return { login: false };
    }
}*/
export async function obtener_sesion_usuario() {
    return {
        login: true,
        usuario: {
            id: 1,
            nombre: "Albertinho",
            nick: "Alex_martin",
            email: "usuario@gmail.com",
            ciudad: "Madrid, España",
            rol: "Admin"
        }
    };
}
