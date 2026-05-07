import { Plus } from 'lucide-react';
export default function Tarjeta_foto_marcador({ foto }) {
    return (
        <img className='w-40 h-30 bg-primary rounded-xl' src={foto} alt="" />
    );
}

export function Tarjeta_foto_marcador_añadir() {
    return (
        <button className='w-40 h-30 bg-background dark:bg-dark-tarjeta hover:bg-borde hover:border-borde-dark cursor-pointer transition-colors duration-300 border-dashed border-2 border-text-main dark:border-background dark:text-background dark:hover:bg-text-secondary rounded-xl flex flex-col items-center justify-center' >
            <Plus size={26} />
            <span className='font-regular text-sm'>Añadir foto</span>
        </button>
    );
}