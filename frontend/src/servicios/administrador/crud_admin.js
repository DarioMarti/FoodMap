export const obtenerTodasEtiquetas = async (id) => {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL + `/modelos/categorias/mostrar_categorias.php`, { credentials: 'include' });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando etiquetas:", error);
    }
};

export const obtenerTodosUsuarios = async () => {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL + `/modelos/usuario/mostrar_todos_usuarios.php`, { credentials: 'include' });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando usuarios:", error);
    }
};

export const obtenerTodosMarcadores = async () => {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL + `/modelos/marcadores/mostrar_todos_marcadores.php`, { credentials: 'include' });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando marcadores:", error);
    }
};

//USUARIOS

export const actualizarUsuario = async (formData) => {
    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + `/modelos/usuario/editar_usuario_admin.php`,
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};

export const crearUsuarioAdmin = async (formData) => {
    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + `/modelos/usuario/crear_usuario_admin.php`,
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};


export const desactivarUsuarioAdmin = async (id) => {
    const formData = new FormData();
    formData.append('id', id);

    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + `/modelos/usuario/eliminar_usuario_admin.php`,
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};

export const reactivarUsuarioAdmin = async (id) => {
    const formData = new FormData();
    formData.append('id', id);

    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + `/modelos/usuario/reactivar_usuario_admin.php`,
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};


//MARCADORES

export const actualizarMarcadorAdmin = async (data) => {
    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + "/modelos/marcadores/editar_marcador_admin.php",
        { method: "POST", credentials: "include", body: data }
    );
    return await respuesta.json();
};

export const eliminarMarcadorAdmin = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + "/modelos/marcadores/eliminar_marcador_admin.php",
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};

export const crearMarcadorAdmin = async (data) => {
    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + "/modelos/marcadores/crear_marcador_admin.php",
        { method: "POST", credentials: "include", body: data }
    );
    return await respuesta.json();
};


//CATEGORIAS

export const actualizarCategoriaAdmin = async (data) => {
    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + "/modelos/categorias/editar_categoria_admin.php",
        { method: "POST", credentials: "include", body: data }
    );
    return await respuesta.json();
};

export const eliminarCategoriaAdmin = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + "/modelos/categorias/eliminar_categoria_admin.php",
        { method: "POST", credentials: "include", body: formData }
    );
    return await respuesta.json();
};

export const crearCategoriaAdmin = async (data) => {
    const respuesta = await fetch(
        import.meta.env.VITE_API_URL + "/modelos/categorias/crear_categoria_admin.php",
        { method: "POST", credentials: "include", body: data }
    );
    return await respuesta.json();
};


// Confirmar de acciones

export const confirmarEliminarUsuario = async (usuarioSeleccionado, notificacion, setNotificacion, mostrarNotificacion, mostrarUsuarios, setMostrarConfirmacionEliminar, setIdUsuarioAEliminar) => {
    const respuesta = await desactivarUsuarioAdmin(usuarioSeleccionado.id);
    if (respuesta?.success) {
        mostrarNotificacion(respuesta.mensaje, "success", notificacion, setNotificacion);
        mostrarUsuarios();
    } else {
        mostrarNotificacion(respuesta.mensaje, "error", notificacion, setNotificacion);
    }
    setMostrarConfirmacionEliminar(false);
    setIdUsuarioAEliminar(null);
};

export const manejarReactivarUsuario = async (id, notificacion, setNotificacion, mostrarNotificacion, mostrarUsuarios) => {
    const respuesta = await reactivarUsuarioAdmin(id);
    if (respuesta?.success) {
        mostrarNotificacion(respuesta.mensaje, "success", notificacion, setNotificacion);
        mostrarUsuarios();
    } else {
        mostrarNotificacion(respuesta.mensaje, "error", notificacion, setNotificacion);
    }
};


export const confirmarEliminarMarcador = async (idMarcadorAEliminar, notificacion, setNotificacion, mostrarNotificacion, mostrarMarcadores, setMostrarConfirmacionEliminarMarcador, setIdMarcadorAEliminar) => {
    const respuesta = await eliminarMarcadorAdmin(idMarcadorAEliminar);
    if (respuesta?.success) {
        mostrarNotificacion(respuesta.mensaje, "success", notificacion, setNotificacion);
        mostrarMarcadores();
    } else {
        mostrarNotificacion(respuesta.mensaje, "error", notificacion, setNotificacion);
    }
    setMostrarConfirmacionEliminarMarcador(false);
    setIdMarcadorAEliminar(null);
};

export const confirmarEliminarCategoria = async (idCategoriaAEliminar, notificacion, setNotificacion, mostrarNotificacion, mostrarEtiquetas, setMostrarConfirmacionEliminarCategoria, setIdCategoriaAEliminar) => {
    const respuesta = await eliminarCategoriaAdmin(idCategoriaAEliminar);
    if (respuesta?.success) {
        mostrarNotificacion(respuesta.mensaje, "success", notificacion, setNotificacion);
        mostrarEtiquetas();
    } else {
        mostrarNotificacion(respuesta.mensaje, "error", notificacion, setNotificacion);
    }
    setMostrarConfirmacionEliminarCategoria(false);
    setIdCategoriaAEliminar(null);
};
