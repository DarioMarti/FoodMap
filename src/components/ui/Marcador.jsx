import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';

export default function Marcador({ position, icono }) {

    // 1. DISEÑO: Lo que quieres que se vea (Tu diseño de ahora)
    const iconoHtml = renderToString(
        <div className="relative group flex flex-col items-center">
            <div className="w-10 h-10 bg-primary rounded-full border-2 border-primary shadow-xl flex items-center justify-center">
                <span className="text-background bg-primary p-1.5 rounded-full">{icono}</span>
            </div>
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-primary -mt-1" />
        </div>
    );

    // 2. ICONO: Convertimos ese diseño en algo que Leaflet entienda
    const customIcon = L.divIcon({
        html: iconoHtml,
        className: '', // Limpiamos clases de Leaflet
        iconSize: [40, 40],
        iconAnchor: [20, 40] // Centramos la punta del pin en la coordenada
    });

    // 3. RESULTADO: Devolvemos el componente Marker de react-leaflet
    return (
        <Marker position={position} icon={customIcon} />
    );
}
