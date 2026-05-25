import { useState, useEffect, useRef } from "react";
import Chat_mensaje from "../components/ui/Chat_mensaje";
import Chat_input from "../components/ui/Chat_input";
import io from 'socket.io-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
const socket = io(socketUrl);


export default function Asistente_IA() {

    const [mensajes, setMensajes] = useState([{ texto: "¡Hola! Soy el asistente de FoodMap 🍔. ¿En qué puedo ayudarte hoy?", isBot: true, isMe: false }
    ]);
    const [cargando, setCargando] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        socket.on('respuesta_asistente', (data) => {
            setCargando(false);
            
            const fechaValida = data.fecha ? new Date(data.fecha) : new Date();
            const horaFormateada = isNaN(fechaValida.getTime())
                ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : fechaValida.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            setMensajes(prev => [...prev, {
                texto: data.texto,
                isBot: true,
                isMe: false,
                hora: horaFormateada
            }]);
        });
        return () => socket.off('respuesta_asistente');
    }, []);

    //Scroll al recibir nuevos mensajes
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    const handleEnviar = (contenido) => {
        const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setMensajes(prev => [...prev, {
            texto: contenido,
            isMe: true,
            isBot: false,
            hora: horaActual
        }]);

        setCargando(true);
        socket.emit('pregunta_asistente', {
            mensaje: contenido,
            historial: []
        });
    };



    return (
        <div className="flex flex-col h-full w-full min-h-0 bg-background dark:bg-dark-tarjeta overflow-hidden">
            {/* Cuerpo del Chat */}
            <main className="flex-1 flex flex-col min-h-0">

                {/* Zona de mensajes con scroll */}
                <section className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-16">
                    <div className="flex flex-col gap-4">
                        {mensajes.map((msg, index) => (
                            <Chat_mensaje
                                key={index}
                                texto={msg.texto}
                                hora={msg.hora}
                                isMe={msg.isMe}
                                isBot={msg.isBot}
                            />
                        ))}

                        {cargando && (
                            <div className="flex gap-2 items-center text-text-tertiary animate-pulse ml-4 italic">
                                <span className="text-sm">Asistente escribiendo...</span>
                            </div>
                        )}

                        {/* Referencia para el auto-scroll */}
                        <div ref={scrollRef} className="h-4" />
                    </div>
                </section>

                {/* Zona del Input (Fija abajo) */}
                <footer className="w-full p-4 pb-20 md:p-8 md:pb-8 shrink-0 bg-background dark:bg-dark-tarjeta border-t border-borde dark:border-text-tertiary/10">
                    <Chat_input onSend={handleEnviar} className="w-full mx-auto" />
                </footer>

            </main>
        </div>
    );


}
