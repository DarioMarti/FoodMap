import { Plus, X } from 'lucide-react';
export default function Tarjeta_foto_marcador({ foto, onDelete }) {
    return (
        <div className='relative w-40 h-30 group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
            <img className='w-full h-full object-cover bg-primary rounded-xl' src={foto} alt="" />
            {onDelete && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-500 text-white rounded-full p-1 flex items-center justify-center cursor-pointer shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Eliminar foto"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
}

export function Tarjeta_foto_marcador_añadir() {
    return (
        <button type='button' className='w-40 h-30 bg-background dark:bg-dark-tarjeta hover:bg-borde hover:border-borde-dark cursor-pointer transition-colors duration-300 border-dashed border-2 border-text-main dark:border-background dark:text-background dark:hover:bg-text-secondary rounded-xl flex flex-col items-center justify-center' >
            <Plus size={26} />
            <span className='font-regular text-sm'>Añadir foto</span>
        </button>
    );
}