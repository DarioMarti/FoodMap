export const cambiarSeccion = (seccion, setSeccion, vistaMovil, manejarMenuLateralHandler) => {
    setSeccion(seccion);
    if (vistaMovil) {
        manejarMenuLateralHandler();
    }
};
