export const obtener_mensajes_no_leidos = async () => {
    try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/modelos/chat/obtener_mensajes_no_leidos_totales.php", {
            credentials: "include"
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error al obtener mensajes no leídos", error);
        return { ok: false, error };
    }
};
