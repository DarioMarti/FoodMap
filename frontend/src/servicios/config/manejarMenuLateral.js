export const manejarMenuLateral = (vistaBloque, setVistaBloque) => {
    let menuLateral = document.getElementById("menuLateralConfig");
    if (vistaBloque) {
        setVistaBloque(false);
        menuLateral.style.transform = "translateX(0)";
    } else {
        setVistaBloque(true);
        menuLateral.style.transform = "translateX(-100%)";
    }
};
