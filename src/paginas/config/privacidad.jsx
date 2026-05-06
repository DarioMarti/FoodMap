import Boton_cuadrado from "../../components/ui/Boton_cuadrado";
import { Pen } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";

export default function Perfil() {
    return (
        <div className="h-full flex flex-col overflow-hidden dark:bg-background-oscuro">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold dark:text-white text-text-main">Perfil</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">

                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Datos de usuario</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-text-tertiary py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Nombre</strong>
                        <Boton_main nombre="Cambiar" />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-text-tertiary"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Contraseña</strong>
                        <Boton_main nombre="Cambiar" />
                    </div>

                </div>
                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Privacidad del perfil</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-text-tertiary py-8 rounded-3xl ">
                    <div className="flex justify-between px-10">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Perfil público</strong>
                        <Toggle id="perfil-publico" />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-text-tertiary"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Compartir ubicación</strong>
                        <Toggle id="compartir-ubicacion" />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-text-tertiary"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Mostrar marcadores</strong>
                        <Toggle id="mostrar-valoraciones" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold py-10 px-2">Amistades</h2>
                <div className="flex flex-col gap-6 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-text-tertiary py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Permitir solicitudes de amistad</strong>
                        <Toggle id="solicitudes-amistad" />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:bg-text-tertiary"></span>
                    <div className="flex justify-between px-10 items-center ">
                        <strong className="text-xl font-semibold dark:text-white text-text-main">Bloquear usuario</strong>
                        <Boton_main nombre="Gestionar" />
                    </div>

                </div>
            </article >
        </div>
    );
}   