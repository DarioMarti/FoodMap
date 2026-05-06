import { Globe, Check } from 'lucide-react';

export default function Idioma() {
    const idiomas = [
        { nombre: 'Español', nativo: 'Español', codigo: 'es', activo: true },
        { nombre: 'Inglés', nativo: 'English', codigo: 'en', activo: false },
        { nombre: 'Francés', nativo: 'Français', codigo: 'fr', activo: false },
        { nombre: 'Alemán', nativo: 'Deutsch', codigo: 'de', activo: false },
        { nombre: 'Italiano', nativo: 'Italiano', codigo: 'it', activo: false },
    ];

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold">Idioma</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">

                <h2 className="text-2xl font-bold py-10 px-2">Selecciona un idioma</h2>
                <div className="flex flex-col gap-0 bg-background border-3 border-borde rounded-3xl overflow-hidden">
                    {idiomas.map((idioma, index) => (
                        <div key={idioma.codigo}>
                            <button className="w-full flex justify-between items-center px-10 py-6 hover:bg-slate-50 dark:hover:bg-background-tarjetas transition-colors cursor-pointer group text-left">
                                <div className="flex flex-col items-start">
                                    <strong className="text-xl font-semibold">{idioma.nombre}</strong>
                                    <p className="text-md text-text-tertiary">{idioma.nativo}</p>
                                </div>
                                {idioma.activo && (
                                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white">
                                        <Check size={20} strokeWidth={3} />
                                    </div>
                                )}
                            </button>
                            {index < idiomas.length - 1 && <span className="h-0.5 bg-borde w-full block"></span>}
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Región y Formatos</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Formato de fecha</strong>
                        <p className="text-lg text-text-tertiary">DD/MM/AAAA</p>
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <strong className="text-xl font-semibold">Primer día de la semana</strong>
                        <p className="text-lg text-text-tertiary">Lunes</p>
                    </div>
                </div>

            </article >
        </div>
    );
}
