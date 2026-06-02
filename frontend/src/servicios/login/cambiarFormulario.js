export const cambiarFormulario = (formulario, setFormularioMostrado) => {
    if (formulario === "login") {
        setFormularioMostrado("register");
    } else {
        setFormularioMostrado("login");
    }
};
