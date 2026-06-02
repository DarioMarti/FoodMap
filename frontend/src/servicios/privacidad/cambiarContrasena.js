import { validarPassword } from "./validarPassword";

export const cambiarContrasena = async (e, mostrarNotificacion, manejarFormContrasena) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const nueva = formData.get('contrasena_nueva');
    if (!validarPassword(nueva)) {
        mostrarNotificacion("La contraseña nueva debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.", "error");
        return;
    }

    const res = await fetch(import.meta.env.VITE_API_URL + "/modelos/usuario/editar_contraseña.php", {
        method: "POST",
        credentials: 'include',
        body: formData
    });
    const data = await res.json();
    if (data.ok) {
        mostrarNotificacion(data.mensaje, "success");
        manejarFormContrasena();
        e.target.reset();
    } else {
        mostrarNotificacion(data.error, "error");
    }
};
