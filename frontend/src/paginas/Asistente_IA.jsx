import Chat_mensaje from "../components/ui/Chat_mensaje";
import Chat_input from "../components/ui/Chat_input";

export default function Asistente_IA() {

    return (
        <div className="flex flex-col h-full w-full bg-background dark:bg-dark-tarjeta">

            <main className="flex-1 flex min-h-0 bg-background dark:bg-dark-tarjeta ">
                <section className="w-3/4 relative  h-full overflow-hidden w-full">
                    <div className="p-16">
                        <div className="flex-1 overflow-y-auto pb-24 flex flex-col gap-4">
                            <Chat_mensaje
                                texto="texto de prueba"
                                hora="hora de prueba"
                                isMe={true}
                                isBot={false}
                            />
                            <Chat_mensaje
                                texto="texto de prueba"
                                hora="hora de prueba"
                                isMe={false}
                                isBot={true}
                            />
                        </div>
                        <Chat_input className="w-full absolute bottom-10 left-0" />
                    </div>
                </section>
            </main>
        </div >
    );
}
