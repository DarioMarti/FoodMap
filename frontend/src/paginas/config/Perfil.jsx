import Boton_cuadrado from "../../components/ui/Boton_cuadrado";
import { Pen, User, Mail, MapPin, X, AtSign } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import InputGeneral from "../../components/ui/input_general";
import { useState, useEffect } from "react";
import { obtener_sesion_usuario } from "../../servicios/usuario/obtener_sesion_usuario";

export default function Perfil() {
    const [editando, setEditando] = useState(false);
    const [usuario, setUsuario] = useState(null);

    const editar_usuario = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost/foodmap/backend/modelos/usuario/editar_usuario.php", {
                method: "POST",
                credentials: 'include',
                body: new FormData(e.target)
            });
            const respuesta = await res.json();
            setUsuario(respuesta.usuario);
            setEditando(false);
        } catch (error) {
            console.error("Error al editar usuario:", error);
        }
    }

    useEffect(() => {
        const obtenerSesionUsuario = async () => {
            const res = await obtener_sesion_usuario();
            setUsuario(res.usuario);

        };
        obtenerSesionUsuario();
    }, []);

    return (
        <div className="h-full flex flex-col overflow-hidden dark:bg-text-main bg-background relative">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold dark:text-white text-text-main">Perfil</h1>
            </div>

            <article className="p-10 flex-1 overflow-y-auto">
                {/* Profile Card */}
                <div className="p-12 dark:bg-dark-tarjeta bg-background-tarjetas rounded-3xl relative dark:text-white text-text-main shadow-xl border border-white/10">
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <img className="size-32 rounded-full object-cover ring-4 ring-primary shadow-2xl  duration-300" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop" alt="Foto de perfil" />
                            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <Pen className="text-white size-6" />
                            </div>
                            <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 rounded-full cursor-pointer" />

                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">
                                {usuario?.nombre.charAt(0).toUpperCase() + usuario?.nombre.slice(1)}
                            </h2>
                            <p className="text-lg text-text-tertiary flex items-center gap-2 mt-1">
                                <span className="text-primary font-medium">@Alex_martin</span>
                                <span className="opacity-30">·</span>
                                <span className="flex items-center gap-1"><MapPin size={16} /> Madrid, España</span>
                            </p>
                            <div className="flex gap-10 mt-6">
                                <div className="flex flex-col">
                                    <strong className="text-2xl font-bold tracking-tight">27</strong>
                                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-text-tertiary">marcadores</p>
                                </div>
                                <div className="flex flex-col">
                                    <strong className="text-2xl font-bold tracking-tight">125</strong>
                                    <p className="text-xs uppercase tracking-[0.2em] font-semibold text-text-tertiary">amigos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Boton_cuadrado
                        onClick={() => setEditando(true)}
                        className="absolute right-8 top-8 bg-primary hover:bg-primary-hover text-white size-14 shadow-lg shadow-primary/30 transition-all "
                        icon={<Pen size={24} />}
                    />
                </div>

                {/* Personal Information */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 px-2 dark:text-white text-text-main flex items-center gap-3">
                        <User className="text-primary" size={24} />
                        Información personal
                    </h2>
                    <div className="flex flex-col dark:bg-dark-tarjeta bg-white border border-borde dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
                        <div className="flex justify-between p-8 items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-1">Nombre completo</span>
                                <strong className="text-xl font-medium dark:text-white text-text-main">
                                    {usuario?.nombre.charAt(0).toUpperCase() + usuario?.nombre.slice(1)}
                                </strong>
                            </div>
                            <button onClick={() => setEditando(true)} className="text-primary font-semibold text-sm hover:underline">Editar</button>
                        </div>
                        <div className="flex justify-between p-8 items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-1">Nick de usuario</span>
                                <strong className="text-xl font-medium dark:text-white text-text-main">{usuario?.nick ? "@" + usuario.nick : "No especificado"}</strong>
                            </div>
                            <button onClick={() => setEditando(true)} className="text-primary font-semibold text-sm hover:underline">Editar</button>
                        </div>
                        <div className="h-px bg-borde dark:bg-white/5 w-full"></div>
                        <div className="flex justify-between p-8 items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-1">Email</span>
                                <strong className="text-xl font-medium dark:text-white text-text-main">{usuario?.email}</strong>
                            </div>
                            <button onClick={() => setEditando(true)} className="text-primary font-semibold text-sm hover:underline">Cambiar</button>
                        </div>
                        <div className="h-px bg-borde dark:bg-white/5 w-full"></div>
                        <div className="flex justify-between p-8 items-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-1">Ciudad</span>
                                <strong className="text-xl font-medium dark:text-white text-text-main">{usuario?.ciudad ? usuario.ciudad : "No especificado"}</strong>
                            </div>
                            <button onClick={() => setEditando(true)} className="text-primary font-semibold text-sm hover:underline">Editar</button>
                        </div>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="mt-12 mb-10">
                    <h2 className="text-2xl font-bold mb-6 px-2 dark:text-white text-text-main flex items-center gap-3">
                        <Pen className="text-primary" size={24} />
                        Privacidad del perfil
                    </h2>
                    <div className="flex flex-col dark:bg-dark-tarjeta bg-white border border-borde dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
                        <div className="flex justify-between p-8 items-center">
                            <strong className="text-xl font-medium dark:text-white text-text-main">Perfil público</strong>
                            <Toggle id="perfil-publico" />
                        </div>
                        <div className="h-px bg-borde dark:bg-white/5 w-full"></div>
                        <div className="flex justify-between p-8 items-center">
                            <strong className="text-xl font-medium dark:text-white text-text-main">Compartir ubicación</strong>
                            <Toggle id="compartir-ubicacion" />
                        </div>
                        <div className="h-px bg-borde dark:bg-white/5 w-full"></div>
                        <div className="flex justify-between p-8 items-center">
                            <strong className="text-xl font-medium dark:text-white text-text-main">Mostrar marcadores</strong>
                            <Toggle id="mostrar-valoraciones" />
                        </div>
                    </div>
                </div>
            </article>

            {/* Edit Profile Overlay/Form */}
            {editando && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setEditando(false)}
                    ></div>

                    <form
                        className="relative w-full max-w-xl bg-white dark:bg-background-oscuro p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in-95 duration-300"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setEditando(false);
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setEditando(false)}
                            className="absolute top-8 right-8 text-text-tertiary hover:text-text-main dark:hover:text-primary transition-colors cursor-pointer"
                        >
                            <X size={28} />
                        </button>

                        <div className="mb-10">
                            <h2 className="text-3xl font-bold dark:text-white text-text-main mb-2">Editar Perfil</h2>
                            <p className="text-text-tertiary">Actualiza tu información personal para que otros puedan conocerte mejor.</p>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Nombre completo</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-tertiary group-focus-within:text-primary transition-colors">
                                        <User size={20} />
                                    </div>
                                    <InputGeneral
                                        className="pl-14 h-16 bg-background dark:bg-dark-tarjeta/50 border-transparent focus:ring-2 focus:ring-primary/20"
                                        placeholder="Nombre completo"
                                        type="text"
                                        value={usuario?.nombre}
                                        name="nombre"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Correo electrónico</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-tertiary group-focus-within:text-primary transition-colors">
                                        <AtSign size={20} />
                                    </div>
                                    <InputGeneral
                                        className="pl-14 h-16 bg-background dark:bg-dark-tarjeta/50 border-transparent focus:ring-2 focus:ring-primary/20"
                                        placeholder="nick"
                                        type="text"
                                        value={usuario?.nick}
                                        name="nick"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1 ">Ciudad actual</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-tertiary group-focus-within:text-primary transition-colors">
                                        <MapPin size={20} />
                                    </div>
                                    <InputGeneral
                                        className="pl-14 h-16 bg-background dark:bg-dark-tarjeta/50 border-transparent focus:ring-2 focus:ring-primary/20"
                                        placeholder="Ciudad"
                                        type="text"
                                        value={usuario?.ciudad}
                                        name="ciudad"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditando(false)}
                                    className="flex-1 cursor-pointer text-lg font-bold py-5 px-8 bg-text-tertiary/10 dark:text-white text-text-main rounded-2xl hover:bg-text-tertiary/20 transition-all "
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => editar_usuario()}
                                    className="flex-1 cursor-pointer text-lg font-bold py-5 px-8 bg-primary text-white rounded-2xl hover:bg-primary-hover shadow-xl shadow-primary/30 transition-all"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
