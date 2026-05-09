import { API_URL } from "../../connstantes.js";
import { useMapEvents } from 'react-leaflet';
import * as lucideIcons from 'lucide-react';


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
export const obtenerMarcadores = async (setMarcadores) => {
    try {
        const respuesta = await fetch("http://localhost/foodmap/backend/modelos/marcadores/mostrar_marcador.php");
        const datos = await respuesta.json();
        setMarcadores(datos);
    } catch (error) {
        console.error("Error cargando marcadores:", error);
    }
};

// Abre y cierra el formulario para crear marcadores
export function manejarFormularioMarcador(estado, setFormularioActivo) {
    setFormularioActivo(estado);
}

//Obtener etiqueta
export const obtenerEtiquetas = async (id_categoria) => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/marcadores/obtener_etiqueta.php?id_categoria=${id_categoria}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando etiquetas:", error);
    }
};

//Obtener todas las etiquetas de un marcador
export const obtenerTodasEtiquetas = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/marcadores/obtener_todas_etiquetas.php?id_marcador=${id}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando etiquetas:", error);
    }
};


//Agregar etiquetas
export const agregarEtiqueta = async (id, nombre, principal, setEtiquetas, etiquetas) => {
    const finalId = id || "1";
    const finalNombre = nombre || "Cafetería";

    // Ponemos 'await' para esperar los datos reales de la base de datos
    const datosEtiqueta = await obtenerEtiquetas(finalId);

    if (datosEtiqueta && datosEtiqueta[0]) {
        const nuevaEtiqueta = {
            id: finalId,
            nombre: finalNombre,
            esPrincipal: principal,
            color: datosEtiqueta[0].Color, // Ahora sí tendrá el valor (ej: #FF5733)
            icono: datosEtiqueta[0].Icono
        };
        setEtiquetas([...etiquetas, nuevaEtiqueta]);
    }
}

//Obtener todas las fotos del marcador
export const obtenerFotografias = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost/foodmap/backend/modelos/marcadores/obtener_fotos_marcador.php?id_marcador=${id}`);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error cargando fotos:", error);
    }
}