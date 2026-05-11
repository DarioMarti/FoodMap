import { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import Boton_cuadrado from './Boton_cuadrado.jsx';

export default function Chat_input({ onSend, className = "" }) {
    const [mensaje, setMensaje] = useState("");

    const manejarEnvio = () => {
        if (mensaje.trim()) {
            onSend(mensaje);
            setMensaje("");
        }
    };

    const manejarKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            manejarEnvio();
        }
    };

    return (
        <div className={`flex items-center gap-4 px-4 py-3 ${className} `}>
            <div className="flex-1">
                <textarea
                    rows={1}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    onKeyDown={manejarKeyDown}
                    placeholder="Escribe un mensaje..."
                    className="w-full resize-none overflow-y-auto text-xl bg-background-input dark:bg-dark-tarjeta text-text-main dark:text-background placeholder:text-text-tertiary
                    border border-borde dark:border-text-tertiary rounded-2xl px-4 py-[20px] text-sm leading-5 outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/30 dark:focus:border-primary transition-all"
                />
            </div>

            <Boton_cuadrado
                onClick={manejarEnvio}
                className="bg-primary text-input size-16 rounded-full cursor-pointer flex-shrink-0 mb-[1px]"
                icon={<Send size={24} />}
            />
        </div>
    );
}
