import { registrar_usuario } from '../usuario/handler_registrar_usuario';
import { mostrarNotificacion } from '../mostrar_notificacion';
import { validarPassword } from './validarPassword';

export const registro_usuario = async (e, notificacion, setNotificacion, setMensajeError) => {
    e.preventDefault();
    const data = new FormData(e.target);

    if (!validarPassword(data.get('password'))) {
        mostrarNotificacion("La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.", "error", notificacion, setNotificacion);
        return;
    }

    const respuesta = await registrar_usuario(data);
    if (respuesta.ok) {
        window.location.href = "/";
    } else {
        mostrarNotificacion(respuesta.error || "Error al registrar usuario", "error", notificacion, setNotificacion);
        setMensajeError(true);
        setTimeout(() => {
            setMensajeError(false);
        }, 5000);
    }
};
