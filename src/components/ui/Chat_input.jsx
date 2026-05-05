import { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import Boton_cuadrado from './Boton_cuadrado.jsx'

export default function Chat_input() {


    return (
        <div className="flex items-center gap-3 px-4 py-3 border-t border-borde dark:border-borde-dark bg-input dark:bg-background-oscuro">

            <div className="flex-1 relative">
                <textarea

                    placeholder="Escribe un mensaje..."
                    className="w-full resize-none bg-background dark:bg-dark-tarjeta text-text-main placeholder:text-text-tertiary border border-borde dark:border-borde-dark rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
            </div>


            <Boton_cuadrado className="bg-primary text-input size-14 dark:border dark:border-descripcion cursor-pointer" icon={<Send size={20} />} />

        </div>
    );
}
