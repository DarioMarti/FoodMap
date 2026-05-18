export const obtenerTodasEtiquetas = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/categorias/mostrar_categorias.php`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando etiquetas:", error);
    }
};

export const obtenerTodosUsuarios = async () => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/usuario/mostrar_todos_usuarios.php`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando usuarios:", error);
    }
};

export const obtenerTodosMarcadores = async () => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/marcadores/mostrar_todos_marcadores.php`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando marcadores:", error);
    }
};


export const actualizarUsuario = async (formData) => {
    const respuesta = await fetch(
        `http://localhost/foodmap/backend/modelos/usuario/editar_usuario_admin.php`,
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};