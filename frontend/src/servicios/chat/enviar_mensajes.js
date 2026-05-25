import { comprobar_sesion_usuario } from "../usuario/comprobar_sesion_usuario";

export const iniciarChat = async (setMiUsuario, setContactos, socket) => {
    const sesion = await comprobar_sesion_usuario();
    if (sesion.login) {
        setMiUsuario(sesion.usuario);
        socket.emit('unirse', sesion.usuario.id);
    }

    // Obtener lista de amigos y grupos
    const resp = await fetch(import.meta.env.VITE_API_URL + '/modelos/chat/obtener_contactos.php', { credentials: 'include' });
    const data = await resp.json();
    if (data.ok) {
        setContactos(data);
    }
};

export const manejarNuevoMensaje = (mensaje, conversacion_activa, miUsuario, setMensajes) => {
    // Solo lo añadimos si pertenece a la conversación que tenemos abierta
    const esParaEsteChat = conversacion_activa && (mensaje.emisor_id === conversacion_activa.id);

    if (esParaEsteChat || mensaje.emisor_id === miUsuario?.id) {
        setMensajes((prev) => [...prev, mensaje]);
    }
};


export const activarConversacion = async (contacto, set_conversacion_activa, setMensajes, setContactos) => {
    set_conversacion_activa(contacto);

    if (setContactos) {
        const formData = new FormData();
        formData.append('emisor_id', contacto.id);
        fetch(import.meta.env.VITE_API_URL + '/modelos/chat/marcar_leidos.php', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        setContactos(prev => ({
            ...prev,
            amigos: prev.amigos.map(a =>
                a.id === contacto.id
                    ? { ...a, mensajes_no_leidos: 0 }
                    : a
            )
        }));
    }

    const url = import.meta.env.VITE_API_URL + `/modelos/chat/obtener_mensajes.php?otro_id=${contacto.id}`;
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
        receptor_id: conversacion_activa.id,
        fecha_envio: new Date().toISOString(),
        nombre_usuario: miUsuario.nombre
    };
    socket.emit('enviar_mensaje', dataMensaje);
    setMensajes((prev) => [...prev, dataMensaje]);
};