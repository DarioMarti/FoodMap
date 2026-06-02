export const cerrarSesion = async () => {
    const respuesta = await fetch(import.meta.env.VITE_API_URL + "/modelos/sesion/cerrar_sesion.php", {
        credentials: 'include'
    });

    const data = await respuesta.json();

    if (data.ok) {
        window.location.href = "/";
    }
};
