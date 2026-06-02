export const mostrarNotificacion = (mensaje, tipo, setNotificacion) => {
    setNotificacion({ visible: true, mensaje, tipo });

    setTimeout(() => {
        setNotificacion(prev => ({ ...prev, visible: false }));
    }, 3000);
};
