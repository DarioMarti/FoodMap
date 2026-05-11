import Tarjeta_chat from "../components/ui/Tarjeta_chat";
import Chat_mensaje from "../components/ui/Chat_mensaje";
import Chat_input from "../components/ui/Chat_input";

export default function Chat() {
    return (
        <div className="h-full w-full bg-background dark:bg-dark-tarjeta">
            <div className="w-1/4 h-18  flex ">

                <div className="flex-1 text-text-main flex border-b-6 border-primary justify-center items-center cursor-pointer  z-2">
                    <h1 className="text-xl font-semibold text-text-main dark:text-background cursor-pointer">Amigos</h1>
                </div>

                <div className="flex-1 text-text-main flex justify-center items-center cursor-pointer ">
                    <h3 className="text-xl font-semibold text-text-tertiary">Grupos</h3>
                </div>
            </div>


            {/* Área Principal de Chat (2/3 del ancho total) */}
            <main className="w-full h-full flex min-w-0 bg-background dark:bg-background-oscuro outline-2 outline-3 outline-offset outline-borde outline-text-tertiary">
                <section className="w-1/4 border-r-3 border-r-borde dark:border-r-text-tertiary ">
                    <Tarjeta_chat />
                    <Tarjeta_chat />
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