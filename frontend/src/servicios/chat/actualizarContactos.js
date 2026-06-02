import { iniciarChat } from "./enviar_mensajes";

export const actualizarContactos = (setMiUsuario, setContactos, socket) => {
    iniciarChat(setMiUsuario, setContactos, socket);
};
