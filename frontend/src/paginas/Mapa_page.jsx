import { BarraBusqueda } from "../components/layout/BarraBusqueda";
import Mapa from "../components/layout/Mapa";
import Notificacion from "../components/ui/Notificacion.jsx";
import { useState } from "react";
import Ventana_filtros from "../components/layout/ventana_filtros.jsx";
import { mostrarNotificacion } from "../servicios/mostrar_notificacion.js";

export default function MapaPage({ darkMode }) {

    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });
    const [nombreBusqueda, setNombreBusqueda] = useState("");
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [puntuacionMinima, setPuntuacionMinima] = useState(0);

    const buscarMarcadores = (nombre) => {
        setNombreBusqueda(nombre);
    };

    return (
        <main id="mapa_contenedor" className="flex-1 flex flex-col min-w-0 h-full">
            <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[3000] pointer-events-none">
                {notificacion.visible && (
                    <Notificacion mensaje={notificacion.mensaje} tipo={notificacion.tipo} />
                )}
            </div>
            <BarraBusqueda buscarMarcadores={buscarMarcadores} toggleFiltros={() => setMostrarFiltros(!mostrarFiltros)} />
            <Ventana_filtros estado={mostrarFiltros} onFilterChange={setCategoriasSeleccionadas} puntuacionMinima={puntuacionMinima} setPuntuacionMinima={setPuntuacionMinima} />
            <Mapa darkMode={darkMode} mostrarNotificacion={(mensaje, tipo) => mostrarNotificacion(mensaje, tipo, notificacion, setNotificacion)} nombreBusqueda={nombreBusqueda} categoriasFiltro={categoriasSeleccionadas} puntuacionMinima={puntuacionMinima} />
        </main>
    );
}