import Tarjeta_chat from "../components/ui/Tarjeta_chat";
import Chat_mensaje from "../components/ui/Chat_mensaje";
import * as lucideIcons from 'lucide-react';

import Chat_input from "../components/ui/Chat_input";
import { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import { iniciarChat, manejarNuevoMensaje, enviarMensaje as servicioEnviarMensaje, activarConversacion } from "../servicios/chat/enviar_mensajes";
import Form_amistad from "../components/ui/Form_amistad";
import Notificacion from "../components/ui/Notificacion.jsx";

const socket = io('http://localhost:4000');

export default function Chat() {
    const [conversacion_activa, set_conversacion_activa] = useState(null);
    const [tipoConversacion, setTipoCOnversacion] = useState("Amigos");
    const [contactos, setContactos] = useState({ amigos: [], grupos: [] });
    const [mensajes, setMensajes] = useState([]);
    const [miUsuario, setMiUsuario] = useState(null);
    const [solicitudes, setSolicitudes] = useState(false);
    const scrollRef = useRef(null);
    const ultimoMensajeCualquiera = mensajes.length > 0 ? mensajes[mensajes.length - 1] : null;
    const mensajesSoloDelOtro = mensajes.filter(m => { const idEmisor = m.Usuario_id || m.emisor_id; return idEmisor != miUsuario?.id; });
    const ultimoMensajeDelOtro = mensajesSoloDelOtro.length > 0 ? mensajesSoloDelOtro[mensajesSoloDelOtro.length - 1] : null;
    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });

    useEffect(() => {
        iniciarChat(setMiUsuario, setContactos, socket);
    }, []);

    useEffect(() => {
        const callbackMensajes = (mensaje) => {
            manejarNuevoMensaje(mensaje, conversacion_activa, miUsuario, setMensajes);
        };
        socket.on('nuevo_mensaje', callbackMensajes);
        return () => socket.off('nuevo_mensaje', callbackMensajes);
    }, [conversacion_activa, miUsuario]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    const cambiarTipoConversacion = (tipo) => setTipoCOnversacion(tipo);

    const handleSeleccionarChat = (contacto, esGrupo) => {
        activarConversacion(contacto, esGrupo, set_conversacion_activa, setMensajes);
    };

    const handleEnviar = (contenido) => {
        servicioEnviarMensaje(contenido, conversacion_activa, miUsuario, socket, setMensajes);
    };

    const handleSolicitudes = () => {
        setSolicitudes(!solicitudes);
    };


    const mostrarNotificacion = (mensaje, tipo) => {
        setNotificacion({ visible: true, mensaje, tipo });

        setTimeout(() => {
            setNotificacion({ ...notificacion, visible: false });
        }, 3000);
    };

    const actualizarContactos = () => {
        iniciarChat(setMiUsuario, setContactos, socket);
    };


    return (
        <div className="flex flex-col h-full w-full bg-background dark:bg-background-oscuro">
            <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[3000] pointer-events-none">
                {notificacion.visible && (
                    <Notificacion mensaje={notificacion.mensaje} tipo={notificacion.tipo} />
                )}
            </div>
            <div className="flex  justify-between items-center pr-20  border-b border-borde dark:border-text-tertiary/20 ">
                <div className="h-18 flex w-1/4  ">
                    <div onClick={() => cambiarTipoConversacion("Amigos")} className={`w-1/2 min-w-[150px] text-text-main flex ${tipoConversacion === "Amigos" ? "dark:bg-secondary/25 border-b-6 border-primary text-background dark:text-background-oscuro" : "border-none border-text-tertiary"} justify-center items-center cursor-pointer`}>
                        <h1 className={`text-xl font-semibold ${tipoConversacion === "Amigos" ? "text-text-main dark:text-background " : "text-text-tertiary"} cursor-pointer`}>Amigos</h1>
                    </div>

                    <div onClick={() => cambiarTipoConversacion("Grupos")} className={`w-1/2 min-w-[150px] text-text-main flex ${tipoConversacion === "Grupos" ? "dark:bg-secondary/25 border-b-6 border-primary " : "border-none border-text-tertiary"} justify-center items-center cursor-pointer`}>
                        <h3 className={`text-xl  font-semibold ${tipoConversacion === "Grupos" ? "text-text-main dark:text-background" : "text-text-tertiary"}`}>Grupos</h3>
                    </div>
                </div>
                <lucideIcons.Bell onClick={handleSolicitudes} className="w-7 h-7 text-text-main dark:text-background cursor-pointer hover:text-primary dark:hover:text-primary-hover" />
            </div>

            <main className="flex-1 flex min-h-0 bg-background dark:bg-background-oscuro">
                <section className="w-1/4 border-r-3 border-r-borde dark:border-r-text-tertiary/20 overflow-y-auto">
                    {tipoConversacion === "Amigos" ? (
                        contactos.amigos.map(amigo => (
                            <Tarjeta_chat
                                onClick={() => handleSeleccionarChat(amigo, false)}
                                key={amigo.id}
                                isActiva={conversacion_activa?.id === amigo.id && !conversacion_activa?.esGrupo}
                                sigla={amigo.Nombre[0]}
                                nombre={amigo.Nombre}
                                texto={ultimoMensajeCualquiera?.Contenido}
                                hora={ultimoMensajeDelOtro?.Fecha_envio || ultimoMensajeCualquiera?.Fecha_envio}
                            />
                        ))
                    ) : (
                        contactos.grupos.map(grupo => (
                            <Tarjeta_chat
                                onClick={() => handleSeleccionarChat(grupo, true)}
                                key={grupo.id}
                                isActiva={conversacion_activa?.id === grupo.id && conversacion_activa?.esGrupo}
                                sigla={grupo.Nombre[0]}
                                nombre={grupo.Nombre}
                                texto="Chat de grupo"
                                hora=""
                            />
                        ))
                    )}
                </section>

                <section className="w-3/4 relative  h-full overflow-hidden">
                    {conversacion_activa ? (

                        <div className="flex flex-col w-full">
                            <div className="px-12 py-6 border-b border-borde dark:border-text-tertiary/20">
                                <span className="flex items-center gap-6">
                                    <span className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg  ">
                                        {conversacion_activa.Nombre[0]}
                                    </span>
                                    <strong className="text-md font-semibold text-3xl text-text-main dark:text-background">{conversacion_activa.Nombre}</strong>

                                </span>
                            </div>
                            <div className="p-16">
                                <div className="flex-1 overflow-y-auto pb-24 flex flex-col gap-4">
                                    {mensajes.map((m, i) => (
                                        <Chat_mensaje
                                            key={i}
                                            texto={m.Contenido || m.contenido}
                                            hora={m.Fecha_envio || m.fecha_envio}
                                            isMe={m.Usuario_id === miUsuario?.id || m.emisor_id === miUsuario?.id}
                                        />
                                    ))}
                                    <div ref={scrollRef} />
                                </div>
                                <Chat_input onSend={handleEnviar} className="w-full absolute bottom-10 left-0" />
                            </div>
                        </div>
                    ) : (

                        <div className="flex-1 flex items-center justify-center text-text-tertiary text-2xl relative  top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Form_amistad estado={solicitudes} miUsuario={miUsuario} mostrarNotificacion={mostrarNotificacion} actualizarContactos={actualizarContactos} />
                            Selecciona una conversación para empezar

                        </div>
                    )}
                </section>
            </main>

        </div>
    );
}
