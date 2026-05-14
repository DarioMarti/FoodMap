import * as lucideIcons from 'lucide-react';
import Boton_cuadrado from './Boton_cuadrado';
import { useState, useEffect } from 'react';

export default function Form_amistad({ estado, miUsuario, mostrarNotificacion, actualizarContactos }) {
    const [tabActiva, setTabActiva] = useState("buscar");
    const [nombre_usuario, setNombre_usuario] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);

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

    const obtener_solicitudes = async () => {
        const respuesta = await fetch("http://localhost/foodmap/backend/modelos/chat/obtener_solicitud.php", {
            credentials: 'include'
        });

        if (respuesta.ok) {
            const data = await respuesta.json();
            setSolicitudes(data.solicitudes);
            console.log(solicitudes);
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
        } else {
            mostrarNotificacion("Error al bloquear al usuario", "error");
        }
    };


    useEffect(() => {
        obtener_solicitudes();
    }, []);


    return (
        <div className={`absolute top-0 -mt-[10%] left-1/2 -translate-x-1/2 flex items-start z-1500 ${estado ? 'block' : 'hidden'}`}>

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
                        solicitudes?.length > 0 && (
                            <span className="absolute top-4 right-12 bg-primary text-white rounded-full px-2 py-1 text-xs">
                                {solicitudes.length}
                            </span>
                        )
                    }
                </button>
            </div>

            <div className="bg-dark-tarjeta p-8 rounded-2xl rounded-tl-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[700px]  min-h-120 ">

                {tabActiva === "buscar" ? (
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
                                    (<div className={`flex items-center justify-between py-4 px-6 text-text-main dark:text-background hover:bg-primary/5 transition-colors`}>
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 text-lg rounded-full bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center text-white font-bold">
                                                {usuario.Nombre.toUpperCase()[0]}
                                            </div>
                                            <strong className="font-medium text-2xl">{usuario.Nombre}</strong>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Boton_cuadrado
                                                onClick={() => enviar_solicitud(usuario.id)}
                                                className="bg-success/20 text-success hover:bg-success hover:text-white size-11 border border-success/30"
                                                icon={<lucideIcons.UserPlus className="size-5" />}
                                                title="Enviar solicitud"
                                            />
                                            <Boton_cuadrado
                                                onClick={() => bloquear_usuario(usuario.id)}
                                                className="bg-error/20 text-error hover:bg-error hover:text-white size-11 border border-error/30"
                                                icon={<lucideIcons.MessageCircleOff className="size-5" />}
                                                title="Bloquear"
                                            />
                                        </div>
                                    </div>) : null
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h1 className="text-2xl font-bold text-text-main dark:text-background mb-6 flex items-center gap-3">
                            Solicitudes Pendientes
                        </h1>

                        {solicitudes.length === 0 ? (
                            <div className="flex items-center justify-center py-20 text-text-tertiary">
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
            </div>

        </div>
    );
}
