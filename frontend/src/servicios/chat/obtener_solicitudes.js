export const obtener_solicitudes = async (setSolicitudesLista) => {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL + "/modelos/chat/obtener_solicitud.php", {
            credentials: 'include'
        });
        if (respuesta.ok) {
            const data = await respuesta.json();
            setSolicitudesLista(data.solicitudes || []);
        }
    } catch (error) {
        console.error("Error al obtener solicitudes:", error);
    }
};
