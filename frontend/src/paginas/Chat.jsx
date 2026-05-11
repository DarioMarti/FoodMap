import Tarjeta_chat from "../components/ui/Tarjeta_chat";
import Chat_mensaje from "../components/ui/Chat_mensaje";
import Chat_input from "../components/ui/Chat_input";
import { useState } from "react";

export default function Chat() {
    const [conversacion_activa, set_conversacion_activa] = useState(null);
    const [tipoConversacion, setTipoCOnversacion] = useState("Amigos");

    const cambiarTipoConversacion = (tipo) => {
        setTipoCOnversacion(tipo);
    };

    const activarConversacion = (id) => {
        set_conversacion_activa(id);
    };

    return (
        <div className="h-full w-full bg-background dark:bg-dark-tarjeta">
            <div className="w-1/4 h-18  flex ">

                <div onClick={() => cambiarTipoConversacion("Amigos")} className={`flex-1  text-text-main flex ${tipoConversacion === "Amigos" ? "dark:bg-secondary/25 border-b-6 border-primary text-background dark:text-background-oscuro" : "border-none border-text-tertiary"} justify-center items-center cursor-pointer z-2`}>
                    <h1 className={`text-xl font-semibold ${tipoConversacion === "Amigos" ? "text-text-main dark:text-background " : "text-text-tertiary"} cursor-pointer`}>Amigos</h1>
                </div>

                <div onClick={() => cambiarTipoConversacion("Grupos")} className={`flex-1  text-text-main flex ${tipoConversacion === "Grupos" ? "dark:bg-secondary/25 border-b-6 border-primary " : "border-none border-text-tertiary"} justify-center items-center cursor-pointer z-2`}>
                    <h3 className={`text-xl font-semibold ${tipoConversacion === "Grupos" ? "text-text-main dark:text-background" : "text-text-tertiary"}`}>Grupos</h3>
                </div>
            </div>


            {/* Área Principal de Chat (2/3 del ancho total) */}
            <main className="w-full h-full flex min-w-0 bg-background dark:bg-background-oscuro outline-2 outline-3 outline-offset outline-borde outline-text-tertiary/20">
                <section className="w-1/4 border-r-3 border-r-borde dark:border-r-text-tertiary/20 ">
                    <Tarjeta_chat onClick={() => activarConversacion(1)} key={1} isActiva={conversacion_activa == 1} sigla="M" nombre="Maria" texto="¿Qué vamos a comer hoy?" hora="10:00" />
                    <Tarjeta_chat onClick={() => activarConversacion(2)} key={2} isActiva={conversacion_activa == 2} sigla="N" nombre="Nicolas" texto="¿Qué vamos a comer hoy?" hora="10:00" />
                    <Tarjeta_chat onClick={() => activarConversacion(3)} key={3} isActiva={conversacion_activa == 3} sigla="P" nombre="Pepe" texto="¿Qué vamos a comer hoy?" hora="10:00" />
                    <Tarjeta_chat onClick={() => activarConversacion(4)} key={4} isActiva={conversacion_activa == 4} sigla="R" nombre="Rosa" texto="¿Qué vamos a comer hoy?" hora="10:00" />
                    <Tarjeta_chat onClick={() => activarConversacion(5)} key={5} isActiva={conversacion_activa == 5} sigla="T" nombre="Tomas" texto="¿Qué vamos a comer hoy?" hora="10:00" />
                    <Tarjeta_chat onClick={() => activarConversacion(6)} key={6} isActiva={conversacion_activa == 6} sigla="L" nombre="Laura" texto="¿Qué vamos a comer hoy?" hora="10:00" />
                    <Tarjeta_chat onClick={() => activarConversacion(7)} key={7} isActiva={conversacion_activa == 7} sigla="S" nombre="Sara" texto="¿Qué vamos a comer hoy?" hora="10:00" />
                </section>
                <section className="w-3/4 p-16 relative ">
                    <Chat_mensaje texto="Oye! ¿has añadido el marcador del parque del Retiro ya?" hora="10:00" isMe={false} />
                    <Chat_mensaje texto="No, todavía no, ahora lo hago. " hora="10:00" isMe={true} />
                    <Chat_input className="w-full absolute bottom-20 left-0" />
                </section>
            </main>
        </div>
    );
}