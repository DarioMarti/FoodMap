export default function Etiqueta_perfil({ icono: Icono, nombre, active }) {
    return (
        <div className={`flex items-center gap-4 px-14 py-6  cursor-pointer ${active ? 'bg-primary/10 text-primary, border-2 border-primary-active text-primary-active' : 'bg-background text-text-main'}`}>
            <Icono size={24} />

            <strong className="font-medium text-xl ">{nombre}</strong>

        </div>
    );
}

