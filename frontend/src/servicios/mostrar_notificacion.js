export const mostrarNotificacion = (mensaje, tipo, notificacion, setNotificacion) => {
    setNotificacion({ visible: true, mensaje, tipo });

    setTimeout(() => {
        setNotificacion({ ...notificacion, visible: false });
    }, 3000);
};