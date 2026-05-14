
import * as lucideIcons from 'lucide-react';

export default function TarjetaConfirmacion({ mensaje, confirmar, cancelar }) {
    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-background dark:bg-dark-tarjeta border border-borde dark:border-text-tertiary/20 p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-sm w-full mx-4 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">

                <div className="bg-error/10 text-error p-4 rounded-full mb-6">
                    <lucideIcons.AlertTriangle className="size-10" />
                </div>

                <h3 className="text-2xl font-bold text-text-main dark:text-background mb-2">¿Estás seguro?</h3>
                <p className="text-text-tertiary dark:text-descripcion mb-8">{mensaje}</p>

                <div className="flex gap-4 w-full">
                    <button
                        onClick={cancelar}
                        className="flex-1 bg-text-tertiary/10 hover:bg-text-tertiary/20 text-text-main dark:text-background font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmar}
                        className="flex-1 bg-error hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-error/30 transition-colors cursor-pointer"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}