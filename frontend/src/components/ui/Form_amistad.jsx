import * as lucideIcons from 'lucide-react';
import Boton_cuadrado from './Boton_cuadrado';
import { useState, useEffect } from 'react';

export default function Form_amistad({ estado, miUsuario, mostrarNotificacion, actualizarContactos, contactos, solicitudes, obtener_solicitudes, handleSolicitudes, handleSeleccionarChat }) {
    const [tabActiva, setTabActiva] = useState("buscar");
    const [nombre_usuario, setNombre_usuario] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    const buscar_usuarios = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre_usuario);
        const respuesta = await fetch("http://localhost/foodmap/backend/modelos/usuario/mostrar_usuarios.php", {
            credentials: 'include',
            method: "POST",
            body: formData,
        });

        if (respuesta.ok) {
            const data = await respuesta.json();
            setUsuarios(data);
            console.log(usuarios);
        }

    };



    const aceptar_solicitud = async (amigo_id) => {
        const formData = new FormData();
        formData.append("amigo_id", amigo_id);
        const respuesta = await fetch("http://localhost/foodmap/backend/modelos/chat/aceptar_solicitud.php", {
            credentials: 'include',
            method: "POST",
            body: formData,
        });

        if (respuesta.ok) {
            obtener_solicitudes();
            mostrarNotificacion("Solicitud aceptada exitosamente", "success");
            actualizarContactos();
        } else {
            mostrarNotificacion("Error al aceptar la solicitud", "error");
        }
    };

    const enviar_solicitud = async (amigo_id) => {
        const formData = new FormData();
        formData.append("amigo_id", amigo_id);
        const respuesta = await fetch("http://localhost/foodmap/backend/modelos/chat/enviar_solicitud.php", {
            credentials: 'include',
            method: "POST",
            body: formData,
        });

        if (respuesta.ok) {
            const data = await respuesta.json();
            if (data.ok) {
                mostrarNotificacion(data.mensaje, "success");
                setUsuarios(prev => prev.map(u => u.id === amigo_id ? { ...u, solicitud_enviada: 1 } : u));
            } else {
                mostrarNotificacion(data.error || "Error al enviar", "error");
            }
        }
    };

    const bloquear_usuario = async (id_amigo) => {
        const formData = new FormData();
        formData.append("id", id_amigo);
        const respuesta = await fetch("http://localhost/foodmap/backend/modelos/chat/bloquear_usuario.php", {
            credentials: 'include',
            method: "POST",
            body: formData,
        });

        if (respuesta.ok) {
            obtener_solicitudes();
            mostrarNotificacion("Usuario bloqueado exitosamente", "success");
            actualizarContactos();
            setUsuarios(prev => prev.map(u => u.id === id_amigo ? { ...u, yo_lo_bloquee: 1, ya_amigos: 0, solicitud_enviada: 0, solicitud_recibida: 0 } : u));
        } else {
            mostrarNotificacion("Error al bloquear al usuario", "error");
        }
    };

    const desbloquear_usuario = async (id_amigo) => {
        const formData = new FormData();
        formData.append("id", id_amigo);
        const respuesta = await fetch("http://localhost/foodmap/backend/modelos/chat/desbloquear_usuario.php", {
            credentials: 'include',
            method: "POST",
            body: formData,
        });

        if (respuesta.ok) {
            mostrarNotificacion("Usuario desbloqueado exitosamente", "success");
            setUsuarios(prev => prev.map(u => u.id === id_amigo ? { ...u, yo_lo_bloquee: 0 } : u));
        } else {
            mostrarNotificacion("Error al desbloquear al usuario", "error");
        }
    };


    useEffect(() => {
        obtener_solicitudes();
    }, []);


    return (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-start z-1500 ${estado ? 'block' : 'hidden'}`}>

            <div className="flex flex-col gap-1 items-end ">
                <button
                    onClick={() => setTabActiva("buscar")}
                    title="Buscar Amigos"
                    className={`p-4 rounded-l-2xl transition-all cursor-pointer flex items-center justify-center h-20  border-borde/10 ${tabActiva === "buscar"
                        ? "bg-dark-tarjeta text-primary shadow-[-20px_10px_30px_rgba(0,0,0,0.3)]  border-l-4 border-l-primary w-16 z-10"
                        : "bg-dark-tarjeta text-primary-dark/60 shadow-[-20px_10px_30px_rgba(0,0,0,0.3)] border-r-0 border-l-4 border-l-primary-dark/60 w-14 z-10 "
                        }`}
                >
                    <lucideIcons.UserSearch className="size-6" />
                </button>

                <button
                    onClick={() => setTabActiva("solicitudes")}
                    title="Solicitudes Pendientes"
                    className={`p-4 rounded-l-2xl transition-all cursor-pointer flex items-center justify-center h-20  border-borde/10 ${tabActiva === "solicitudes"
                        ? "bg-dark-tarjeta text-primary shadow-[-20px_10px_30px_rgba(0,0,0,0.3)] border-r-0 border-l-4 border-l-primary w-16 z-10"
                        : "bg-dark-tarjeta text-primary-dark/60 shadow-[-20px_10px_30px_rgba(0,0,0,0.3)] border-r-0 border-l-4 border-l-primary-dark/60 w-14 z-10 "
                        }`}
                >
                    <lucideIcons.Bell className="size-6" />
                    {

                        <span onClick={handleSolicitudes} className="absolute flex items-center justify-center size-8 top-4 right-6 bg-error hover:bg-error/80 transition-colors cursor-pointer text-white rounded-full  text-xs">

                            <lucideIcons.X className="size-4" />
                        </span>
                    }
                </button>
                <button
                    onClick={() => setTabActiva("Contactos")}
                    title="Mis Amigos"
                    className={`p-4 rounded-l-2xl transition-all cursor-pointer flex items-center justify-center h-20 border-borde/10 ${tabActiva === "Contactos"
                        ? "bg-dark-tarjeta text-primary shadow-[-20px_10px_30px_rgba(0,0,0,0.3)] border-r-0 border-l-4 border-l-primary w-16 z-10"
                        : "bg-dark-tarjeta text-primary-dark/60 shadow-[-20px_10px_30px_rgba(0,0,0,0.3)] border-r-0 border-l-4 border-l-primary-dark/60 w-14 z-10 "
                        }`}
                >
                    <lucideIcons.Contact className="size-6" />
                </button>
            </div>

            <div className="bg-dark-tarjeta p-8 rounded-2xl rounded-tl-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[700px]  min-h-120 ">

                {tabActiva === "buscar" && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h1 className="text-2xl font-bold text-text-main dark:text-background mb-6 flex items-center gap-3">
                            Buscar Amigos
                        </h1>

                        <form className="flex items-center gap-4 mb-8">
                            <input
                                type="text"
                                value={nombre_usuario}
                                onChange={(e) => setNombre_usuario(e.target.value)}
                                placeholder="Escribe el nombre de usuario..."
                                className="bg-background-oscuro/50 border border-text-tertiary text-lg rounded-xl px-4 py-3 w-full text-text-main dark:text-background focus:outline-none focus:border-primary transition-colors"
                            />
                            <button onClick={buscar_usuarios} className="bg-primary text-white px-6 py-3 border border-primary rounded-xl text-lg font-semibold cursor-pointer hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95">
                                Buscar
                            </button>
                        </form>

                        <div className="flex flex-col gap-1 overflow-hidden rounded-xl ">

                            {usuarios?.map((usuario) => (
                                (usuario.id !== miUsuario?.id) ?
                                    (<div key={usuario.id} className={`flex items-center justify-between py-4 px-6 text-text-main dark:text-background hover:bg-primary/5 transition-colors`}>
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 text-lg rounded-full bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center text-white font-bold">
                                                {usuario.Nombre.toUpperCase()[0]}
                                            </div>
                                            <strong className="font-medium text-2xl">{usuario.Nombre}</strong>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Boton_cuadrado
                                                onClick={() => enviar_solicitud(usuario.id)}
                                                className={usuario.ya_amigos == 1
                                                    ? "bg-primary/20 text-primary size-11 border border-primary/30"
                                                    : usuario.solicitud_enviada == 1
                                                        ? "bg-slate-500/20 text-slate-500 size-11 border border-slate-500/30"
                                                        : usuario.solicitud_recibida == 1
                                                            ? "bg-amber-500/20 text-amber-600 size-11 border border-amber-500/30"
                                                            : "bg-success/20 text-success hover:bg-success hover:text-white size-11 border border-success/30"
                                                }
                                                icon={usuario.ya_amigos == 1
                                                    ? <lucideIcons.Users className="size-5" />
                                                    : usuario.solicitud_enviada == 1
                                                        ? <lucideIcons.UserCheck className="size-5" />
                                                        : usuario.solicitud_recibida == 1
                                                            ? <lucideIcons.BellRing className="size-5" />
                                                            : <lucideIcons.UserPlus className="size-5" />
                                                }
                                                title={usuario.ya_amigos == 1
                                                    ? "Ya son amigos"
                                                    : usuario.solicitud_enviada == 1
                                                        ? "Solicitud enviada"
                                                        : usuario.solicitud_recibida == 1
                                                            ? "Te ha enviado una solicitud"
                                                            : "Enviar solicitud"
                                                }
                                                disabled={usuario.ya_amigos == 1 || usuario.solicitud_enviada == 1 || usuario.solicitud_recibida == 1 || usuario.yo_lo_bloquee == 1}
                                            />
                                            {usuario.yo_lo_bloquee == 1 ? (
                                                <Boton_cuadrado
                                                    onClick={() => desbloquear_usuario(usuario.id)}
                                                    className="bg-primary/20 text-primary hover:bg-primary hover:text-white size-11 border border-primary/30"
                                                    icon={<lucideIcons.Unlock className="size-5" />}
                                                    title="Desbloquear"
                                                />
                                            ) : (
                                                <Boton_cuadrado
                                                    onClick={() => bloquear_usuario(usuario.id)}
                                                    className="bg-error/20 text-error hover:bg-error hover:text-white size-11 border border-error/30"
                                                    icon={<lucideIcons.Ban className="size-5" />}
                                                    title="Bloquear"
                                                />
                                            )}
                                        </div>
                                    </div>) : null
                            ))}
                        </div>
                    </div>
                )}

                {tabActiva === "solicitudes" && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h1 className="text-2xl font-bold text-text-main dark:text-background mb-6 flex items-center gap-3">
                            Solicitudes Pendientes
                        </h1>

                        {solicitudes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
                                <lucideIcons.Inbox className="size-16 mb-4 opacity-20" />
                                <p className="text-xl">No tienes solicitudes nuevas</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1 overflow-hidden rounded-xl ">
                                {solicitudes.map((solicitud, index) => (
                                    <div
                                        key={solicitud.id}
                                        className={`flex items-center justify-between py-4 px-6 ${index % 2 === 0 ? "bg-text-tertiary/10" : "bg-transparent"
                                            } text-text-main dark:text-background hover:bg-primary/5 transition-colors`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center text-white font-bold">
                                                {solicitud.Nombre[0]}
                                            </div>
                                            <strong className="font-medium text-lg">{solicitud.Nombre}</strong>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Boton_cuadrado
                                                onClick={() => aceptar_solicitud(solicitud.Usuario_solicita_id)}
                                                className="bg-success/20 text-success hover:bg-success hover:text-white size-11 border border-success/30"
                                                icon={<lucideIcons.Check className="size-6" />}
                                                title="Aceptar solicitud"
                                            />
                                            <Boton_cuadrado
                                                className="bg-error/20 text-error hover:bg-error hover:text-white size-11 border border-error/30"
                                                icon={<lucideIcons.X className="size-6" />}
                                                title="Rechazar solicitud"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {tabActiva === "Contactos" && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h1 className="text-2xl font-bold text-text-main dark:text-background mb-6 flex items-center gap-3">
                            Mis Amigos
                        </h1>

                        {contactos?.amigos?.length > 0 ? (
                            <div className="flex flex-col gap-1 overflow-hidden rounded-xl">
                                {contactos.amigos.map((amigo) => (
                                    <div key={amigo.id} className="flex items-center justify-between py-4 px-6 text-text-main dark:text-background hover:bg-primary/5 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 text-lg rounded-full bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center text-white font-bold">
                                                {amigo.Nombre.toUpperCase()[0]}
                                            </div>
                                            <strong className="font-medium text-2xl">{amigo.Nombre}</strong>
                                        </div>
                                        <Boton_cuadrado
                                            className="bg-primary/20 text-primary hover:bg-primary hover:text-white size-11 border border-primary/30"
                                            onClick={() => handleSeleccionarChat(amigo, false)}
                                            icon={<lucideIcons.MessageCircle className="size-5" />}
                                            title="Chatear"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
                                <lucideIcons.Users className="size-16 mb-4 opacity-20" />
                                <p className="text-xl">Aún no tienes amigos agregados</p>
                            </div>
                        )}
                    </div>
                )}
            </div>


        </div>
    );
}
