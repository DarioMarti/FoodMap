import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';

export default function Marcador({ position, icono, eventHandlers, color = 'primary' }) {

    const iconoHtml = renderToString(
        <div className="relative group flex flex-col items-center">
            <div style={{ backgroundColor: color, borderColor: color }} className="w-10 h-10 rounded-full border-2 border-red-500 shadow-xl flex items-center justify-center">
                <span className="text-background  p-1.5 rounded-full">{icono}</span>
            </div>
            <div style={{ borderTopColor: color }} className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[16px]  -mt-1.5" />
        </div>
    );

    const customIcon = L.divIcon({
        html: iconoHtml,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });

    return (
        <Marker position={position} icon={customIcon} eventHandlers={eventHandlers} />
    );
}
