import * as lucideIcons from 'lucide-react';


export default function form_amistad({ }) {
    return (
        <div className="bg-dark-tarjeta p-6 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
            <h1>Formulario de Amistad</h1>
            <div className="flex items-center gap-2">
                <input type="text" placeholder="Usuario" className="border border-borde rounded-lg px-3 py-2" />
                <button className="bg-primary text-white px-4 py-2 rounded-lg">Buscar</button>
            </div>
            <span>
                <strong>Mariano</strong>
                <div className="flex items-center gap-2">
                    <div className="rounded-2xl border-2 border-violet-600 size-14 flex items-center justify-center">
                        <lucideIcons.Plus className="size-6 text-white "></lucideIcons.Plus>
                    </div>
                    <div className="rounded-2xl border-2 border-violet-600 size-14 flex items-center justify-center">
                        <lucideIcons.Plus className="size-6 text-white "></lucideIcons.Plus>
                    </div>
                </div>
            </span>
            <button className="bg-primary text-white px-4 py-2 rounded-lg">Enviar Solicitud</button>
        </div>
    );
}