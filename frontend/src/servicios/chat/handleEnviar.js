import { enviarMensaje as servicioEnviarMensaje } from "./enviar_mensajes";

export const handleEnviar = (contenido, conversacion_activa, miUsuario, socket, setMensajes, setContactos) => {
    servicioEnviarMensaje(contenido, conversacion_activa, miUsuario, socket, setMensajes);

    if (conversacion_activa) {
        const horaCorta = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        setContactos(prev => ({
            ...prev,
            amigos: prev.amigos.map(a =>
                a.id === conversacion_activa.id
                    ? { ...a, ultimo_mensaje: contenido, ultima_hora: horaCorta }
                    : a
            )
        }));
    }
};
