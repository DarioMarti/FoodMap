import { BarraBusqueda } from "../components/layout/BarraBusqueda";
import Mapa from "../components/layout/Mapa";
import Notificacion from "../components/ui/Notificacion.jsx";
import { useState } from "react";

export default function MapaPage({ darkMode }) {

    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });
    const [nombreBusqueda, setNombreBusqueda] = useState("");

    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });

        setTimeout(() => {
            setNotificacion({ ...notificacion, visible: false });
        }, 3000);
    };

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
            <BarraBusqueda buscarMarcadores={buscarMarcadores} />
            <Mapa darkMode={darkMode} mostrarNotificacion={mostrarNotificacion} nombreBusqueda={nombreBusqueda} />
        </main>
    );
}