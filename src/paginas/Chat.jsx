import { useState } from 'react';
import Tarjeta_chat from "../components/ui/Tarjeta_chat";
import Chat_mensaje from "../components/ui/Chat_mensaje";
import Chat_input from "../components/ui/Chat_input";

export default function Chat() {
    const [mensajes, setMensajes] = useState([
        { id: 1, texto: "Oye! ¿has añadido el marcador del parque del Retiro ya?", hora: "10:00", isMe: false },
        { id: 2, texto: "No, todavía no, ahora lo hago.", hora: "10:01", isMe: true },
    ]);

    const handleSend = (texto) => {
        const nuevoMensaje = {
            id: mensajes.length + 1,
            texto,
            hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        };
        setMensajes([...mensajes, nuevoMensaje]);
    };

    return (
        <div className="h-full w-full flex flex-col">

            {/* Tabs Amigos / Grupos */}
            <div className="w-1/4 h-14 flex flex-shrink-0 border-b border-borde dark:border-borde-dark">
                <div className="flex-1 text-text-main flex border-b-4 border-primary justify-center items-center cursor-pointer">
                    <h1 className="text-base font-semibold">Amigos</h1>
                </div>
                <div className="flex-1 text-text-main flex justify-center items-center cursor-pointer hover:bg-borde/30 transition-colors">
                    <h3 className="text-base font-semibold text-text-tertiary">Grupos</h3>
                </div>
            </div>

            {/* Área principal */}
            <main className="flex-1 flex min-w-0 overflow-hidden">

                {/* Lista de conversaciones (1/4) */}
                <section className="w-1/4 flex flex-col border-r border-borde dark:border-borde-dark overflow-y-auto">
                    <Tarjeta_chat />
                    <Tarjeta_chat />
                    <Tarjeta_chat />
                </section>

                {/* Ventana de mensajes (3/4) */}
                <section className="flex-1 flex flex-col h-full">

                    {/* Área de mensajes con scroll */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-1">
                        {mensajes.map((msg) => (
                            <Chat_mensaje
                                key={msg.id}
                                texto={msg.texto}
                                hora={msg.hora}
                                isMe={msg.isMe}
                            />
                        ))}
                    </div>

                    {/* Input de escritura fijado abajo */}
                    <Chat_input onSend={handleSend} />

                </section>
            </main>
        </div>
    );
}