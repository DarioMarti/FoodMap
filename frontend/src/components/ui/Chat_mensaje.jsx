import * as lucideIcons from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Chat_mensaje({ texto, hora, isMe, isBot }) {
    const formatearHora = (fechaString) => {
        if (!fechaString) return '';
        if (fechaString.includes(':') && fechaString.length <= 5) return fechaString; // Ya está formateada como HH:MM
        try {
            const fecha = new Date(fechaString);
            if (isNaN(fecha.getTime())) return fechaString;
            return fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return fechaString;
        }
    };

    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-3`}>
            {isBot ? (
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <lucideIcons.Bot className="size-6 text-white" />
                </div>
            ) : null}
            <div className={`max-w-[70%] py-3 px-6 rounded-2xl ${isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-background-claro text-text-main rounded-tl-none'} overflow-hidden`}>
                <div className={`text-lg space-y-2 break-words [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>h1]:text-2xl [&>h1]:font-bold [&>h2]:text-xl [&>h2]:font-bold [&>h3]:text-lg [&>h3]:font-bold [&>strong]:font-bold`}>
                    {isBot ? (
                        <ReactMarkdown>{texto}</ReactMarkdown>
                    ) : (
                        <p>{texto}</p>
                    )}
                </div>
                <span className="text-[12px] opacity-70 mt-1 block text-right">{formatearHora(hora)}</span>
            </div>
        </div>
    );
}
