import Boton_cuadrado from "../../components/ui/Boton_cuadrado";
import { Pen } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
export default function Perfil() {
    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold">Perfil</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">
                <div className="p-12 bg-background-tarjetas rounded-3xl relative">
                    <div className="flex items-center gap-8">
                        <img className="size-28 rounded-full bg-primary" src="" alt="" />
                        <div>
                            <h2 className="text-2xl font-bold">Alex Martín</h2>
                            <p className="text-lg text-text-tertiary">@Alex_martin  · Madrid, España</p>
                            <div className="flex gap-8 mt-4 text-center">
                                <div>
                                    <strong className="text-xl font-bold">27</strong>
                                    <p className="text-md uppercase text-text-tertiary">marcadores</p>
                                </div>
                                <div>
                                    <strong className="text-xl font-bold">125</strong>
                                    <p className="text-md uppercase text-text-tertiary">amigos</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Boton_cuadrado className=" absolute right-8 top-8 bg-primary text-white size-14 dark:bg-dark-tarjeta dark:text-input dark:border-descripcion " icon={<Pen size={24} />} />
                </div>
                <h2 className="text-2xl font-bold py-10 px-2">Información personal</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Nombre completo</strong>
                        <p className="text-lg text-text-tertiary">Alex Martín</p>
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Email</strong>
                        <p className="text-lg text-text-tertiary">Alexmartín@gmail.com</p>
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Ciudad</strong>
                        <p className="text-lg text-text-tertiary">Madrid</p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold py-10 px-2">Privacidad del perfil</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Perfil público</strong>
                        <Toggle id="perfil-publico" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Compartir ubicación</strong>
                        <Toggle id="compartir-ubicacion" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Mostrar marcadores</strong>
                        <Toggle id="mostrar-valoraciones" />
                    </div>
                </div>
            </article >
        </div>
    );
}   