import Boton_cuadrado from "../../components/ui/Boton_cuadrado";
import { Pen } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";
import { useState, useEffect } from "react";
import { obtener_sesion_usuario } from "../../servicios/usuario/obtener_sesion_usuario";
import Notificacion from "../../components/ui/Notificacion";
import * as lucideIcons from 'lucide-react';
import { cambiarPerfilPublico as handlerCambiarPerfilPublico } from '../../servicios/privacidad/cambiarPerfilPublico';
import { manejarFormContrasena as handlerManejarFormContrasena } from '../../servicios/privacidad/manejarFormContrasena';
import { cambiarContrasena as handlerCambiarContrasena } from '../../servicios/privacidad/cambiarContrasena';
import { mostrarNotificacion as handlerMostrarNotificacion } from '../../servicios/privacidad/mostrarNotificacion';

export default function Privacidad() {

    //Estados
    const [usuario, setUsuario] = useState(null);
    const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });
    const [formContrasena, setFormContrasena] = useState(false);
    const [perfilPublico, setPerfilPublico] = useState(true);
    const [compartirUbicacion, setCompartirUbicacion] = useState(() => { return localStorage.getItem("compartir-ubicacion") !== "false"; });
    const [mostrarValoraciones, setMostrarValoraciones] = useState(() => { return localStorage.getItem("mostrar-valoraciones") !== "false"; });


    //Funnciones
    const cambiarPerfilPublico = (valor) => { handlerCambiarPerfilPublico(valor, setPerfilPublico, setUsuario); };
    const manejarFormContrasena = () => { handlerManejarFormContrasena(formContrasena, setFormContrasena); };
    const mostrarNotificacion = (mensaje, tipo) => { handlerMostrarNotificacion(mensaje, tipo, setNotificacion); };
    const cambiarContraseña = (e) => { handlerCambiarContrasena(e, mostrarNotificacion, manejarFormContrasena); };

    useEffect(() => {
        const obtenerSesionUsuario = async () => {
            const res = await obtener_sesion_usuario();
            setUsuario(res.usuario);
            if (res.usuario) {
                setPerfilPublico(res.usuario.perfil_publico !== 0);
            }
        };
        obtenerSesionUsuario();
    }, []);

    return (
        <div className="h-full flex flex-col overflow-hidden dark:bg-background-oscuro">
            <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[3000] pointer-events-none">
                {notificacion.visible && (
                    <Notificacion mensaje={notificacion.mensaje} tipo={notificacion.tipo} />
                )}
            </div>
            <div className="border-b-3 border-borde dark:border-text-tertiary py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold dark:text-white text-text-main">Privacidad</h1>
            </div>
            <article className="p-5 md:p-10 flex-1 overflow-y-auto">

                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Datos de usuario</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-white/10 py-8 rounded-3xl ">

                    <div className="flex justify-between px-4 md:px-10 items-center ">
                        <strong className="text-lg md:text-xl font-semibold dark:text-white text-text-main">Contraseña</strong>
                        <button type="button" onClick={manejarFormContrasena} className="bg-primary text-white cursor-pointer py-2 px-4 rounded-lg font-semibold transition-colors hover:bg-primary-dark">
                            Cambiar
                        </button>
                    </div>

                </div>
                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Privacidad del perfil</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-white/10 py-8 rounded-3xl ">
                    <div className="flex justify-between px-4 md:px-10">
                        <strong className="text-lg md:text-xl font-semibold dark:text-white text-text-main">Perfil público</strong>
                        <Toggle
                            id="perfil-publico"
                            checked={perfilPublico}
                            onChange={(e) => cambiarPerfilPublico(e.target.checked)}
                        />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-white/10"></span>
                    <div className="flex justify-between px-4 md:px-10 items-center">
                        <strong className="text-lg md:text-xl font-semibold dark:text-white text-text-main">Compartir ubicación</strong>
                        <Toggle
                            id="compartir-ubicacion"
                            checked={compartirUbicacion}
                            onChange={(e) => {
                                const val = e.target.checked;
                                setCompartirUbicacion(val);
                                localStorage.setItem("compartir-ubicacion", val);
                            }}
                        />
                    </div>

                </div>

            </article >
            <form onSubmit={cambiarContraseña} className={`${formContrasena ? "block" : "hidden"} z-50 absolute md:w-160 dark:text-background top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white dark:bg-dark-tarjeta border border-borde dark:border-text-tertiary/30 shadow-2xl rounded-2xl p-10 flex flex-col gap-6`}>
                <button type="button" onClick={manejarFormContrasena} className="absolute top-4 right-4 bg-error text-white p-2 rounded-full shadow-lg hover:bg-error/80 transition-colors cursor-pointer z-[60]">
                    <lucideIcons.X className="size-5" />
                </button>
                <label htmlFor="contrasena_actual">
                    Contraseña actual
                </label>
                <input type="password" name="contrasena_actual" id="contrasena_actual" className="w-full px-5 py-3 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm" />
                <label htmlFor="contrasena_nueva">
                    Contraseña nueva
                </label>
                <input type="password" name="contrasena_nueva" id="contrasena_nueva" className="w-full px-5 py-3 rounded-2xl border-2 border-borde dark:border-white/10 dark:bg-dark-tarjeta focus:border-primary focus:outline-none transition-all text-sm" />
                <div className="flex w-full gap-4">
                    <button type="submit" className="flex-1 p-5 bg-primary text-white rounded-2xl font-bold hover:bg-primary-hover transition-all cursor-pointer">Guardar</button>
                    <button type="button" onClick={manejarFormContrasena} className="flex-1 p-5 bg-text-tertiary/10 rounded-2xl font-bold hover:bg-text-tertiary/20 transition-all cursor-pointer">Cancelar</button>
                </div>
            </form>
        </div>
    );
}   