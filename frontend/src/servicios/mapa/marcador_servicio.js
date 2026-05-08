import { API_URL } from "../../connstantes.js";

export const agregarMarcador = async (formData) => {
    const respuesta = await fetch(`${API_URL}modelos/marcadores/Agregar_marcador.php`, {
        method: 'POST',
        body: formData
    });

    if (!respuesta.ok) {
        const error = await respuesta.text();
        throw new Error(error);
    }

    return await respuesta.text();
};
