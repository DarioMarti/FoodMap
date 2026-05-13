import { comprobar_sesion_usuario } from "../usuario/comprobar_sesion_usuario";

export const iniciarChat = async (setMiUsuario, setContactos, socket) => {
    const sesion = await comprobar_sesion_usuario();
    if (sesion.login) {
        setMiUsuario(sesion.usuario);
        socket.emit('unirse', sesion.usuario.id);
    }

    // Obtener lista de amigos y grupos
    const resp = await fetch('http://localhost/foodmap/backend/modelos/chat/obtener_contactos.php', { credentials: 'include' });
    const data = await resp.json();
    if (data.ok) {
        setContactos(data);
    }
};

export const manejarNuevoMensaje = (mensaje, conversacion_activa, miUsuario, setMensajes) => {
    // Solo lo añadimos si pertenece a la conversación que tenemos abierta
    const esParaEsteChat = conversacion_activa && (
        (conversacion_activa.esGrupo && mensaje.grupo_id === conversacion_activa.id) ||
        (!conversacion_activa.esGrupo && mensaje.emisor_id === conversacion_activa.id)
    );

    if (esParaEsteChat || mensaje.emisor_id === miUsuario?.id) {
        setMensajes((prev) => [...prev, mensaje]);
    }
};


export const activarConversacion = async (contacto, esGrupo, set_conversacion_activa, setMensajes) => {
    const idActivo = { ...contacto, esGrupo };
    set_conversacion_activa(idActivo);
    const url = esGrupo
        ? `http://localhost/foodmap/backend/modelos/chat/obtener_mensajes.php?grupo_id=${contacto.id}`
        : `http://localhost/foodmap/backend/modelos/chat/obtener_mensajes.php?otro_id=${contacto.id}`;
    // Pedimos el historial a PHP
    try {
        const resp = await fetch(url, { credentials: 'include' });
        const data = await resp.json();
        if (data.ok) {
            setMensajes(data.mensajes);
        }
    } catch (error) {
        console.error("Error al cargar el historial:", error);
    }
};


export const enviarMensaje = (contenido, conversacion_activa, miUsuario, socket, setMensajes) => {
    if (!contenido.trim() || !conversacion_activa || !miUsuario) return;
    const dataMensaje = {
        contenido: contenido,
        emisor_id: miUsuario.id,
        receptor_id: conversacion_activa.esGrupo ? null : conversacion_activa.id,
        grupo_id: conversacion_activa.esGrupo ? conversacion_activa.id : null,
        fecha_envio: new Date().toISOString(),
        nombre_usuario: miUsuario.nombre
    };
    socket.emit('enviar_mensaje', dataMensaje);
    setMensajes((prev) => [...prev, dataMensaje]);
};