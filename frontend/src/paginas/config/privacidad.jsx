import Boton_cuadrado from "../../components/ui/Boton_cuadrado";
import { Pen } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";
import { useState, useEffect } from "react";
import { obtener_sesion_usuario } from "../../servicios/usuario/obtener_sesion_usuario";

export default function Privacidad() {
    const [usuario, setUsuario] = useState(null);

    // Configuración de privacidad
    const [perfilPublico, setPerfilPublico] = useState(true);
    const [compartirUbicacion, setCompartirUbicacion] = useState(() => {
        return localStorage.getItem("compartir-ubicacion") !== "false";
    });
    const [mostrarValoraciones, setMostrarValoraciones] = useState(() => {
        return localStorage.getItem("mostrar-valoraciones") !== "false";
    });

    const cambiarPerfilPublico = async (valor) => {
        setPerfilPublico(valor);
        try {
            const formData = new FormData();
            formData.append("perfil_publico", valor ? 1 : 0);

            const res = await fetch("http://localhost/foodmap/backend/modelos/usuario/actualizar_privacidad.php", {
                method: "POST",
                credentials: 'include',
                body: formData
            });
            const data = await res.json();
            if (data.success && data.usuario) {
                setUsuario(data.usuario);
            }
        } catch (error) {
            console.error("Error al actualizar la privacidad del perfil:", error);
        }
    };

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
            <div className="border-b-3 border-borde dark:border-text-tertiary py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold dark:text-white text-text-main">Privacidad</h1>
            </div>
            <article className="p-5 md:p-10 flex-1 overflow-y-auto">

                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Datos de usuario</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-white/10 py-8 rounded-3xl ">

                    <div className="flex justify-between px-4 md:px-10 items-center ">
                        <strong className="text-lg md:text-xl font-semibold dark:text-white text-text-main">Contraseña</strong>
                        <Boton_main nombre="Cambiar" />
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
        </div>
    );
}   