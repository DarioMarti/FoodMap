import { activarConversacion } from "./enviar_mensajes";

export const handleSeleccionarChat = (contacto, set_conversacion_activa, setMensajes, setContactos, setVistaChat) => {
    activarConversacion(contacto, set_conversacion_activa, setMensajes, setContactos);
    setVistaChat(true);
};
