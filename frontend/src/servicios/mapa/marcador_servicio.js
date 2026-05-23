import { API_URL } from "../../connstantes.js";
import { useMapEvents } from 'react-leaflet';
import * as lucideIcons from 'lucide-react';


export const agregarMarcador = async (formData) => {
    const respuesta = await fetch(`${API_URL}modelos/marcadores/Agregar_marcador.php`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });

    if (!respuesta.ok) {
        const error = await respuesta.text();
        throw new Error(error);
    }

    return await respuesta.text();
};

export const editarMarcador = async (formData) => {
    const respuesta = await fetch(`${API_URL}modelos/marcadores/editar_marcador.php`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });

    if (!respuesta.ok) {
        const error = await respuesta.text();
        throw new Error(error);
    }

    return await respuesta.json();
};

//Detecta las coordenadas al pinchar en el mapa
export function DetectarCordenadas({ alPincharMapa }) {
    useMapEvents({
        click: (e) => {
            alPincharMapa(e.latlng);
        },
    });
    return null;
}

//Le da las coordenadas al marcador
export const alPincharMapa = (latlng, formularioActivo, setPosicionClick) => {
    if (formularioActivo) {
        setPosicionClick(latlng);
    }
};

// Muestra los marcadores en el mapa
export const obtenerMarcadores = async (setMarcadores, nombre = null) => {
    try {
        const url = (nombre && nombre !== "null" && nombre !== "undefined")
            ? `http://localhost/foodmap/backend/modelos/marcadores/mostrar_marcador.php?nombre=${nombre}`
            : `http://localhost/foodmap/backend/modelos/marcadores/mostrar_marcador.php`;

        const respuesta = await fetch(url, { credentials: 'include' });
        const datos = await respuesta.json();
        setMarcadores(datos);
    } catch (error) {
        console.error("Error cargando marcadores:", error);
    }
};




// Abre y cierra el formulario para editar marcadores
export function manejarFormularioMarcador(tipo, estado, estadoEditar, setFormularioEditarActivo, setFormularioActivo, setEtiquetas, setEtiquetaSeleccionada, esPrincipal, setEsPrincipal, setIsEditando) {

    if (tipo === "crear") {
        setFormularioActivo(estado);
        setFormularioEditarActivo(estadoEditar);
        setEtiquetas([]);
        setEtiquetaSeleccionada({ id: "", nombre: "" });
        setEsPrincipal(esPrincipal || false);
        setIsEditando(false);
    }

    if (tipo === "editar") {
        setFormularioEditarActivo(estadoEditar);
        setFormularioActivo(estado);
        setEtiquetaSeleccionada({ id: "", nombre: "" });
        setEsPrincipal(esPrincipal || false);
        setIsEditando(true);
    }
}

//Obtener etiqueta
export const obtenerEtiquetas = async (id_categoria) => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/marcadores/obtener_etiqueta.php?id_categoria=${id_categoria}`, { credentials: 'include' });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando etiquetas:", error);
    }
};

//Obtener todas las etiquetas de un marcador
export const obtenerTodasEtiquetas = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/marcadores/obtener_todas_etiquetas.php?id_marcador=${id}`, { credentials: 'include' });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando etiquetas:", error);
    }
};


//Agregar etiquetas
export const agregarEtiqueta = async (id, nombre, principal, setEtiquetas, etiquetas, mostrarNotificacion) => {
    const finalId = id || "1";
    const finalNombre = nombre || "Cafetería";

    if (etiquetas.some(e => String(e.id) === String(finalId) || String(e.Categoria_id) === String(finalId))) {
        if (mostrarNotificacion) {
            mostrarNotificacion("Esta categoría ya ha sido agregada a este marcador.", "error");
        } else {
            alert("Esta categoría ya ha sido agregada a este marcador.");
        }
        return;
    }

    if (principal && etiquetas.some(e => e.esPrincipal || e.EsPrincipal)) {
        if (mostrarNotificacion) {
            mostrarNotificacion("Ya existe una etiqueta principal para este marcador.", "error");
        } else {
            alert("Ya existe una etiqueta principal para este marcador.");
        }
        return; // Salimos de la función sin añadir nada
    }

    const datosEtiqueta = await obtenerEtiquetas(finalId);

    if (datosEtiqueta && datosEtiqueta[0]) {
        const nuevaEtiqueta = {
            id: finalId,
            Nombre: finalNombre,
            esPrincipal: principal,
            Color: datosEtiqueta[0].Color,
            Icono: datosEtiqueta[0].Icono
        };
        setEtiquetas([...etiquetas, nuevaEtiqueta]);
    }
}

//Obtener todas las fotos del marcador
export const obtenerFotografias = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/marcadores/obtener_fotos_marcador.php?id_marcador=${id}`, { credentials: 'include' });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando fotos:", error);
    }
}

//Eliminar marcador
export const eliminarMarcador = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/marcadores/eliminar_marcador.php?id_marcador=${id}`, { credentials: 'include' });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error eliminando marcador:", error);
    }
}