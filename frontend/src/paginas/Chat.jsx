import Tarjeta_chat from "../components/ui/Tarjeta_chat";
import Chat_mensaje from "../components/ui/Chat_mensaje";
import * as lucideIcons from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Chat_input from "../components/ui/Chat_input";
import { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import { iniciarChat, manejarNuevoMensaje, enviarMensaje as servicioEnviarMensaje, activarConversacion } from "../servicios/chat/enviar_mensajes";
import Form_amistad from "../components/ui/Form_amistad";
import Notificacion from "../components/ui/Notificacion.jsx";
import { obtener_solicitudes as handlerObtenerSolicitudes } from "../servicios/chat/obtener_solicitudes";
import { handleSeleccionarChat as handlerSeleccionarChat } from "../servicios/chat/handleSeleccionarChat";
import { handleEnviar as handlerEnviar } from "../servicios/chat/handleEnviar";
import { handleSolicitudes as handlerSolicitudesFn } from "../servicios/chat/handleSolicitudes";
import { mostrarNotificacion as handlerMostrarNotificacion } from "../servicios/chat/mostrarNotificacion";
import { actualizarContactos as handlerActualizarContactos } from "../servicios/chat/actualizarContactos";

const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
const socket = io(socketUrl);

export default function Chat() {

    //Estados
    const [conversacion_activa, set_conversacion_activa] = useState(null);
    const [vistaMovil, setVistaMovil] = useState(false);
    const [vistaChat, setVistaChat] = useState(false);
    const [contactos, setContactos] = useState({ amigos: [] });
    const [mensajes, setMensajes] = useState([]);
    const [miUsuario, setMiUsuario] = useState(null);
    const [solicitudes, setSolicitudes] = useState(false);
    const [solicitudesLista, setSolicitudesLista] = useState([]);
    const scrollRef = useRef(null);
    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });
    const location = useLocation();


    //Funciones
    const obtener_solicitudes = async () => handlerObtenerSolicitudes(setSolicitudesLista);
    const handleSeleccionarChat = (contacto) => handlerSeleccionarChat(contacto, set_conversacion_activa, setMensajes, setContactos, setVistaChat);
    const handleEnviar = (contenido) => handlerEnviar(contenido, conversacion_activa, miUsuario, socket, setMensajes, setContactos);
    const handleSolicitudes = () => handlerSolicitudesFn(solicitudes, setSolicitudes);
    const mostrarNotificacion = (mensaje, tipo) => handlerMostrarNotificacion(mensaje, tipo, setNotificacion);
    const actualizarContactos = () => handlerActualizarContactos(setMiUsuario, setContactos, socket);

    useEffect(() => {
        iniciarChat(setMiUsuario, setContactos, socket);
        obtener_solicitudes();
    }, []);


    useEffect(() => {
        const callbackMensajes = (mensaje) => {
            manejarNuevoMensaje(mensaje, conversacion_activa, miUsuario, setMensajes);

            const idEmisor = mensaje.emisor_id;
            const chatAbierto = conversacion_activa?.id === idEmisor;
            const horaCorta = new Date(mensaje.fecha_envio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

            // Actualizar preview y contador del emisor
            if (idEmisor && idEmisor !== miUsuario?.id) {
                setContactos(prev => ({
                    ...prev,
                    amigos: prev.amigos.map(a =>
                        a.id === idEmisor
                            ? {
                                ...a,
                                ultimo_mensaje: mensaje.contenido,
                                ultima_hora: horaCorta,
                                mensajes_no_leidos: chatAbierto ? a.mensajes_no_leidos : (a.mensajes_no_leidos || 0) + 1
                            }
                            : a
                    )
                }));
            }
        };
        socket.on('nuevo_mensaje', callbackMensajes);
        return () => socket.off('nuevo_mensaje', callbackMensajes);
    }, [conversacion_activa, miUsuario]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);


    useEffect(() => {
        if (location.state?.abrirSolicitudes) {
            setSolicitudes(true);
        }
    }, [location]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');

        const manejarCambioDeTamaño = (e) => {
            setVistaMovil(e.matches);
            if (!e.matches) {
                setVistaChat(true);
            } else {
                setVistaChat(false);
            }
        };

        setVistaMovil(mediaQuery.matches);
        setVistaChat(!mediaQuery.matches);

        mediaQuery.addEventListener('change', manejarCambioDeTamaño);
        return () => {
            mediaQuery.removeEventListener('change', manejarCambioDeTamaño);
        };
    }, []);

    return (
        <div className="flex flex-col h-full w-full min-h-0 bg-background dark:bg-background-oscuro">
            <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
                {notificacion.visible && (
                    <Notificacion mensaje={notificacion.mensaje} tipo={notificacion.tipo} />
                )}
            </div>
            <div className="flex justify-between items-center pr-6 md:pr-20 border-b border-borde dark:border-text-tertiary/20 shrink-0">
                <div className="h-18 flex w-1/4  ">
                    <div className={`w-1/2 min-w-[150px] text-text-main flex  justify-center items-center cursor-pointer`}>
                        <h1 className={`text-xl font-semibold text-text-main dark:text-background cursor-pointer`}>Amigos</h1>
                    </div>

                </div>
                <div className="relative">
                    <lucideIcons.Bell onClick={handleSolicitudes} className="w-7 h-7 text-text-main dark:text-background cursor-pointer hover:text-primary dark:hover:text-primary-hover" />
                    {solicitudesLista?.length > 0 && (
                        <span className="absolute -right-0.5 -top-1.5 md:-right-1.5 bg-primary text-white rounded-full min-w-5 h-5 flex items-center justify-center text-[10px] font-bold px-1 pointer-events-none">
                            {solicitudesLista.length}
                        </span>
                    )}
                </div>
            </div>
            {!vistaChat && (
                <div className="shrink-0">
                    <h2 className="text-2xl font-bold dark:text-background border-b-2 border-text-tertiary/20 md:hidden p-6">Mensajes</h2>
                </div>
            )}
            <main className="flex-1 flex min-h-0 bg-background dark:bg-background-oscuro">
                {(!vistaMovil || !vistaChat) && (
                    <section className="w-full md:w-1/4 border-r-3 border-r-borde dark:border-r-text-tertiary/20 overflow-y-auto">
                        {contactos.amigos.map(amigo => (
                            <Tarjeta_chat
                                onClick={() => { handleSeleccionarChat(amigo); setVistaChat(true); }}
                                key={amigo.id}

                                isActiva={conversacion_activa?.id === amigo.id}
                                sigla={amigo.Nombre[0]}
                                nombre={amigo.Nombre}
                                texto={amigo.ultimo_mensaje || ''}
                                hora={amigo.ultima_hora || ''}
                                fotoPerfil={amigo.Foto_perfil}
                                mensajesNuevos={amigo.mensajes_no_leidos || 0}
                            />
                        ))}
                    </section>
                )}
                {(!vistaMovil || vistaChat) && (
                    <section className="w-full md:w-3/4 flex flex-col h-full min-h-0 overflow-hidden">
                        {conversacion_activa ? (

                            <div className="flex flex-col w-full h-full min-h-0">
                                <div className="px-6 py-4 md:px-12 md:py-6 border-b border-borde dark:border-text-tertiary/20 shrink-0">
                                    <span className="flex items-center gap-4 md:gap-6">
                                        {vistaMovil && (
                                            <lucideIcons.ArrowLeft
                                                className="w-8 h-8 text-text-main dark:text-background cursor-pointer"
                                                onClick={() => setVistaChat(false)}
                                            />
                                        )}
                                        <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg  ">
                                            {conversacion_activa.Foto_perfil ? <img src={conversacion_activa.Foto_perfil.startsWith('http') ? conversacion_activa.Foto_perfil : import.meta.env.VITE_API_URL + `/uploads/img/${conversacion_activa.Foto_perfil}`} alt={conversacion_activa.Nombre} className="w-full h-full rounded-full object-cover" /> : conversacion_activa.Nombre[0]}
                                        </span>
                                        <strong className="text-lg md:text-3xl font-semibold text-text-main dark:text-background">{conversacion_activa.Nombre}</strong>

                                    </span>
                                </div>

                                <div className="flex flex-col flex-1 min-h-0 bg-background dark:bg-background-oscuro relative p-0 md:p-1">
                                    <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-4">
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

                                    <div className="w-full px-1 md:px-4 py-4 pb-20 md:p-8 md:pb-8 shrink-0">
                                        <Chat_input onSend={handleEnviar} />
                                    </div>
                                </div>
                            </div>
                        ) : (

                            <div className="flex-1 flex items-center justify-center text-text-tertiary text-2xl relative  top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                Selecciona una conversación para empezar

                            </div>
                        )}
                    </section>
                )}
            </main>

            <Form_amistad className="absolute bottom-10 left-0 right-0 mx-auto z-[4000]" estado={solicitudes} miUsuario={miUsuario} mostrarNotificacion={mostrarNotificacion} actualizarContactos={actualizarContactos} contactos={contactos} solicitudes={solicitudesLista} obtener_solicitudes={obtener_solicitudes} handleSolicitudes={handleSolicitudes} handleSeleccionarChat={handleSeleccionarChat} />

        </div>
    );
}
