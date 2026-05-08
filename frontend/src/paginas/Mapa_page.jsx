import { BarraBusqueda } from "../components/layout/BarraBusqueda";
import Mapa from "../components/layout/Mapa";
import Notificacion from "../components/ui/Notificacion.jsx";
import { useState } from "react";

export default function MapaPage({ darkMode }) {

    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });

    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });

        setTimeout(() => {
            setNotificacion({ ...notificacion, visible: false });
        }, 3000);
    };



    return (
        <main id="mapa_contenedor" className="flex-1 flex flex-col min-w-0 h-full">
            {notificacion.visible && (
                <Notificacion mensaje={notificacion.mensaje} tipo={notificacion.tipo} />
            )}
            <BarraBusqueda />
            <Mapa darkMode={darkMode} mostrarNotificacion={mostrarNotificacion} />
        </main>
    );
}