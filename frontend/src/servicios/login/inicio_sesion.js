import { iniciar_sesion } from '../usuario/handler_iniciar_sesion';

export const inicio_sesion = async (e, setMensajeError) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
        const respuesta = await iniciar_sesion(data);
        if (respuesta.ok) {
            window.location.href = "/";
        } else {
            setMensajeError(true);
            setTimeout(() => {
                setMensajeError(false);
            }, 5000);
        }
    } catch (error) {
        console.error("Error conectando con el servidor:", error);
        setMensajeError(true);
        setTimeout(() => {
            setMensajeError(false);
        }, 5000);
    }
};
