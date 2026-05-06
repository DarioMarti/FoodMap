import Boton_cuadrado from "../../components/ui/Boton_cuadrado";
import { Pen } from 'lucide-react';
import Toggle from "../../components/ui/Toggle";
import Boton_main from "../../components/ui/Boton_main";

export default function Perfil() {
    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold">Perfil</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">


                <h2 className="text-2xl font-bold py-10 px-2">Permisos</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10">
                        <strong className="text-xl font-semibold">Invitaciones de amistad</strong>
                        <Toggle id="invitaciones-amistad" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Invitaciones a grupos</strong>
                        <Toggle id="invitaciones-grupos" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Mensajes de chat</strong>
                        <Toggle id="mensajes-chat" />
                    </div>
                </div>

            </article >
        </div>
    );
}   