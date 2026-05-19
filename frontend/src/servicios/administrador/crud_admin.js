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

//USUARIOS

export const actualizarUsuario = async (formData) => {
    const respuesta = await fetch(
        `http://localhost/foodmap/backend/modelos/usuario/editar_usuario_admin.php`,
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};

export const crearUsuarioAdmin = async (formData) => {
    const respuesta = await fetch(
        `http://localhost/foodmap/backend/modelos/usuario/crear_usuario_admin.php`,
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};


export const desactivarUsuarioAdmin = async (id) => {
    const formData = new FormData();
    formData.append('id', id);

    const respuesta = await fetch(
        `http://localhost/foodmap/backend/modelos/usuario/eliminar_usuario_admin.php`,
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};

export const reactivarUsuarioAdmin = async (id) => {
    const formData = new FormData();
    formData.append('id', id);

    const respuesta = await fetch(
        `http://localhost/foodmap/backend/modelos/usuario/reactivar_usuario_admin.php`,
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};


//MARCADORES

export const actualizarMarcadorAdmin = async (data) => {
    const respuesta = await fetch(
        "http://localhost/foodmap/backend/modelos/marcadores/editar_marcador_admin.php",
        { method: "POST", credentials: "include", body: data }
    );
    return await respuesta.json();
};

export const eliminarMarcadorAdmin = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    const respuesta = await fetch(
        "http://localhost/foodmap/backend/modelos/marcadores/eliminar_marcador_admin.php",
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};

export const crearMarcadorAdmin = async (data) => {
    const respuesta = await fetch(
        "http://localhost/foodmap/backend/modelos/marcadores/crear_marcador_admin.php",
        { method: "POST", credentials: "include", body: data }
    );
    return await respuesta.json();
};


//CATEGORIAS

export const actualizarCategoriaAdmin = async (data) => {
    const respuesta = await fetch(
        "http://localhost/foodmap/backend/modelos/categorias/editar_categoria_admin.php",
        { method: "POST", credentials: "include", body: data }
    );
    return await respuesta.json();
};

export const eliminarCategoriaAdmin = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    const respuesta = await fetch(
        "http://localhost/foodmap/backend/modelos/categorias/eliminar_categoria_admin.php",
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};

export const crearCategoriaAdmin = async (data) => {
    const respuesta = await fetch(
        "http://localhost/foodmap/backend/modelos/categorias/crear_categoria_admin.php",
        { method: "POST", credentials: "include", body: data }
    );
    return await respuesta.json();
};

