//SESSIÓN DE PRUEBA PARA NO TENER QUE LOGUEARSE SIEMPRE

export async function comprobar_sesion_usuario() {
    // Simulamos una respuesta exitosa del servidor
    return {
        login: true,
        usuario: {
            id: 1,
            nombre: "Abel",
            email: "test@foodmap.com"
        }
    };
}

/*
export async function comprobar_sesion_usuario() {
 try {
 
       const peticion = await fetch("http://localhost/foodmap/backend/modelos/usuario/comprobar_sesion.php", {
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