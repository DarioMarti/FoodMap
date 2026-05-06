import { HelpCircle, MessageCircle, FileText, ExternalLink, Info } from 'lucide-react';
import Boton_main from "../../components/ui/Boton_main";

export default function Ayuda() {
    const faqs = [
        { q: '¿Cómo añado un nuevo marcador?', a: 'Mantén pulsado cualquier punto del mapa para añadir un marcador personalizado o usa el buscador para encontrar un sitio específico.' },
        { q: '¿Puedo compartir mis mapas con amigos?', a: 'Sí, desde la sección de Marcadores puedes exportar tus listas o activar tu Perfil Público para que otros las vean.' },
        { q: '¿Cómo activo el modo oscuro?', a: 'Ve a Ajustes > Apariencia y selecciona el tema Oscuro o Sistema para que se adapte automáticamente.' },
    ];

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="border-b-3 border-borde dark:border-borde-dark py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold">Ayuda</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">

                <h2 className="text-2xl font-bold py-10 px-2">Preguntas frecuentes</h2>
                <div className="flex flex-col gap-0 bg-background border-3 border-borde rounded-3xl overflow-hidden">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <div className="p-8 hover:bg-slate-50 dark:hover:bg-background-tarjetas transition-colors cursor-pointer group">
                                <strong className="text-xl font-semibold block mb-2 group-hover:text-primary transition-colors">{faq.q}</strong>
                                <p className="text-lg text-text-tertiary leading-relaxed">{faq.a}</p>
                            </div>
                            {index < faqs.length - 1 && <span className="h-0.5 bg-borde w-full block"></span>}
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Contacto y Soporte</h2>
                <div className="grid grid-cols-2 gap-6 mb-4">
                    <div className="p-8 bg-background border-3 border-borde rounded-3xl flex flex-col items-center text-center gap-4 hover:border-primary transition-colors group">
                        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <MessageCircle size={32} />
                        </div>
                        <div>
                            <strong className="text-xl font-semibold">Chat en vivo</strong>
                            <p className="text-md text-text-tertiary">Habla con nuestro equipo de soporte</p>
                        </div>
                        <Boton_main nombre="Iniciar chat" />
                    </div>
                    <div className="p-8 bg-background border-3 border-borde rounded-3xl flex flex-col items-center text-center gap-4 hover:border-primary transition-colors group">
                        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <HelpCircle size={32} />
                        </div>
                        <div>
                            <strong className="text-xl font-semibold">Centro de ayuda</strong>
                            <p className="text-md text-text-tertiary">Consulta nuestra documentación</p>
                        </div>
                        <Boton_main nombre="Ir al centro" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold py-10 px-2">Legal y Versión</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde py-8 rounded-3xl ">
                    <div className="flex justify-between px-10 items-center cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <FileText size={24} className="text-text-tertiary group-hover:text-primary transition-colors" />
                            <strong className="text-xl font-semibold">Términos y condiciones</strong>
                        </div>
                        <ExternalLink size={20} className="text-text-tertiary" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <Info size={24} className="text-text-tertiary group-hover:text-primary transition-colors" />
                            <strong className="text-xl font-semibold">Política de privacidad</strong>
                        </div>
                        <ExternalLink size={20} className="text-text-tertiary" />
                    </div>
                    <span className=" h-1 bg-borde w-full"></span>
                    <div className="flex justify-between px-10 items-center">
                        <div className="flex items-center gap-4">
                            <Info size={24} className="text-text-tertiary" />
                            <strong className="text-xl font-semibold">Versión de la aplicación</strong>
                        </div>
                        <p className="text-lg text-text-tertiary font-mono">v2.4.0-stable</p>
                    </div>
                </div>

            </article >
        </div>
    );
}
