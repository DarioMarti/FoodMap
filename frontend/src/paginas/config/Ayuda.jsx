import { HelpCircle, MessageCircle, FileText, ExternalLink, Info } from 'lucide-react';
import Boton_main from "../../components/ui/Boton_main";

export default function Ayuda() {
    const faqs = [
        { q: '¿Cómo añado un nuevo marcador?', a: 'Mantén pulsado cualquier punto del mapa para añadir un marcador personalizado o usa el buscador para encontrar un sitio específico.' },
        { q: '¿Puedo compartir mis mapas con amigos?', a: 'Sí, desde la sección de Marcadores puedes exportar tus listas o activar tu Perfil Público para que otros las vean.' },
        { q: '¿Cómo activo el modo oscuro?', a: 'Ve a Ajustes > Apariencia y selecciona el tema Oscuro o Sistema para que se adapte automáticamente.' },
    ];

    return (
        <div className="h-full flex flex-col overflow-hidden dark:bg-background-oscuro bg-background">
            <div className="border-b-3 border-borde dark:border-text-tertiary py-5 px-10 flex-shrink-0">
                <h1 className="text-3xl font-semibold dark:text-background">Ayuda</h1>
            </div>
            <article className="p-10 flex-1 overflow-y-auto">

                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Preguntas frecuentes</h2>
                <div className="flex flex-col gap-0 bg-background dark:bg-dark-tarjeta border-3 border-borde dark:border-white/10 rounded-3xl overflow-hidden ">
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <div className="p-8 transition-colors cursor-pointer group">
                                <strong className="text-xl font-semibold dark:text-white text-text-main block mb-2  transition-colors">{faq.q}</strong>
                                <p className="text-lg text-text-tertiary leading-relaxed">{faq.a}</p>
                            </div>
                            {index < faqs.length - 1 && <span className="h-0.5 bg-borde w-full block  dark:border-1 dark:border-white/10 bg-white/10"></span>}
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold py-10 px-2 dark:text-white text-text-main">Legal y Versión</h2>
                <div className="flex flex-col gap-6 bg-background border-3 border-borde dark:border-white/10 py-8 rounded-3xl dark:bg-dark-tarjeta ">
                    <div className="flex justify-between px-10 items-center cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <FileText size={24} className="text-text-tertiary group-hover:text-primary transition-colors" />
                            <strong className="text-xl font-semibold dark:text-white text-text-main">Términos y condiciones</strong>
                        </div>
                        <ExternalLink size={20} className="text-text-tertiary group-hover:text-primary" />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:border-1 dark:bg-white/10 "></span>
                    <div className="flex justify-between px-10 items-center cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <Info size={24} className="text-text-tertiary group-hover:text-primary transition-colors" />
                            <strong className="text-xl font-semibold dark:text-white text-text-main">Política de privacidad</strong>
                        </div>
                        <ExternalLink size={20} className="text-text-tertiary group-hover:text-primary" />
                    </div>
                    <span className=" h-1 bg-borde w-full dark:border-1 dark:bg-white/10 "></span>
                    <div className="flex justify-between px-10 items-center">
                        <div className="flex items-center gap-4">
                            <Info size={24} className="text-text-tertiary" />
                            <strong className="text-xl font-semibold dark:text-white text-text-main">Versión de la aplicación</strong>
                        </div>
                        <p className="text-lg text-text-tertiary font-mono">v1.15</p>
                    </div>
                </div>

            </article >
        </div >
    );
}
