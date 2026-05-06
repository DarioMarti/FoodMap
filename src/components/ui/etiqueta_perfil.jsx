export default function Etiqueta_perfil({ icono: Icono, nombre, active, onClick }) {
    return (
        <div onClick={onClick} className={`flex items-center gap-4 px-14 py-6 hover:bg-primary/20 cursor-pointer ${active ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'bg-background dark:bg-dark-tarjeta dark:text-background text-text-main'}`}>
            <Icono size={24} />
            <strong className="font-medium text-xl">{nombre}</strong>
        </div>
    );
}

