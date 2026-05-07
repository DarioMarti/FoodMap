import { BarraBusqueda } from "../components/layout/BarraBusqueda";
import Mapa from "../components/layout/Mapa";

export default function MapaPage({ darkMode }) {



    return (
        <main id="mapa_contenedor" className="flex-1 flex flex-col min-w-0 h-full">
            <BarraBusqueda />
            <Mapa darkMode={darkMode} />
        </main>
    );
}